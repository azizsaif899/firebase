'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { 
  Save, 
  FolderOpen, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  Share,
  Clock,
  Star,
  FileText,
  Settings,
  CheckCircle,
  AlertCircle,
  CloudDownload,
  CloudUpload,
  History
} from 'lucide-react';

interface WorkflowFile {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  tags: string[];
  starred: boolean;
  data: any; // سير العمل الفعلي
  size: number; // حجم الملف بالبايت
  thumbnail?: string; // صورة مصغرة
}

interface WorkflowVersion {
  id: string;
  version: string;
  createdAt: Date;
  changes: string;
  data: any;
}

interface WorkflowManagerProps {
  language: 'ar' | 'en';
}

export function WorkflowManager({ language }: WorkflowManagerProps) {
  const [workflows, setWorkflows] = useState<WorkflowFile[]>([]);
  const [versions, setVersions] = useState<Record<string, WorkflowVersion[]>>({});
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowFile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'save' | 'load' | 'export' | 'import' | 'versions'>('save');
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [workflowTags, setWorkflowTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'starred' | 'recent'>('all');

  const text = {
    ar: {
      title: 'مدير ملفات سير العمل',
      description: 'نظام متقدم لحفظ وإدارة ملفات سير العمل',
      save: 'حفظ',
      load: 'تحميل',
      export: 'تصدير',
      import: 'استيراد',
      delete: 'حذف',
      duplicate: 'نسخ',
      share: 'مشاركة',
      star: 'إضافة للمفضلة',
      versions: 'الإصدارات',
      newWorkflow: 'سير عمل جديد',
      workflowName: 'اسم سير العمل',
      workflowDescription: 'وصف سير العمل',
      tags: 'العلامات (مفصولة بفواصل)',
      search: 'البحث في ملفات سير العمل...',
      sortBy: 'ترتيب حسب',
      filterBy: 'تصفية حسب',
      created: 'تم الإنشاء',
      updated: 'آخر تحديث',
      size: 'الحجم',
      version: 'الإصدار',
      noWorkflows: 'لا توجد ملفات سير عمل محفوظة',
      saveSuccess: 'تم حفظ سير العمل بنجاح',
      loadSuccess: 'تم تحميل سير العمل بنجاح',
      deleteSuccess: 'تم حذف سير العمل بنجاح',
      exportSuccess: 'تم تصدير سير العمل بنجاح',
      importSuccess: 'تم استيراد سير العمل بنجاح',
      confirmDelete: 'هل أنت متأكد من حذف سير العمل؟',
      filters: {
        all: 'الكل',
        starred: 'المفضلة',
        recent: 'الحديثة'
      },
      sorts: {
        name: 'الاسم',
        date: 'التاريخ',
        size: 'الحجم'
      },
      dialogs: {
        saveTitle: 'حفظ سير العمل',
        loadTitle: 'تحميل سير العمل',
        exportTitle: 'تصدير سير العمل',
        importTitle: 'استيراد سير العمل',
        versionsTitle: 'إصدارات سير العمل'
      }
    },
    en: {
      title: 'Workflow File Manager',
      description: 'Advanced system for saving and managing workflow files',
      save: 'Save',
      load: 'Load',
      export: 'Export',
      import: 'Import',
      delete: 'Delete',
      duplicate: 'Duplicate',
      share: 'Share',
      star: 'Add to Favorites',
      versions: 'Versions',
      newWorkflow: 'New Workflow',
      workflowName: 'Workflow Name',
      workflowDescription: 'Workflow Description',
      tags: 'Tags (comma separated)',
      search: 'Search workflows...',
      sortBy: 'Sort by',
      filterBy: 'Filter by',
      created: 'Created',
      updated: 'Updated',
      size: 'Size',
      version: 'Version',
      noWorkflows: 'No saved workflows',
      saveSuccess: 'Workflow saved successfully',
      loadSuccess: 'Workflow loaded successfully',
      deleteSuccess: 'Workflow deleted successfully',
      exportSuccess: 'Workflow exported successfully',
      importSuccess: 'Workflow imported successfully',
      confirmDelete: 'Are you sure you want to delete this workflow?',
      filters: {
        all: 'All',
        starred: 'Starred',
        recent: 'Recent'
      },
      sorts: {
        name: 'Name',
        date: 'Date',
        size: 'Size'
      },
      dialogs: {
        saveTitle: 'Save Workflow',
        loadTitle: 'Load Workflow',
        exportTitle: 'Export Workflow',
        importTitle: 'Import Workflow',
        versionsTitle: 'Workflow Versions'
      }
    }
  };

  const t = text[language];

  // تحميل ملفات سير العمل من localStorage عند التحميل
  useEffect(() => {
    const savedWorkflows = localStorage.getItem('workflows');
    const savedVersions = localStorage.getItem('workflow-versions');
    
    if (savedWorkflows) {
      try {
        const parsed = JSON.parse(savedWorkflows).map((w: any) => ({
          ...w,
          createdAt: new Date(w.createdAt),
          updatedAt: new Date(w.updatedAt)
        }));
        setWorkflows(parsed);
      } catch (error) {
        console.error('Error loading workflows:', error);
      }
    }
    
    if (savedVersions) {
      try {
        const parsed = JSON.parse(savedVersions);
        Object.keys(parsed).forEach(key => {
          parsed[key] = parsed[key].map((v: any) => ({
            ...v,
            createdAt: new Date(v.createdAt)
          }));
        });
        setVersions(parsed);
      } catch (error) {
        console.error('Error loading versions:', error);
      }
    }
  }, []);

  // حفظ ملفات سير العمل في localStorage عند التغيير
  useEffect(() => {
    if (workflows.length > 0) {
      localStorage.setItem('workflows', JSON.stringify(workflows));
    }
  }, [workflows]);

  useEffect(() => {
    if (Object.keys(versions).length > 0) {
      localStorage.setItem('workflow-versions', JSON.stringify(versions));
    }
  }, [versions]);

  // محاكاة بيانات سير العمل الحالي
  const generateSampleWorkflowData = () => ({
    nodes: [
      { id: '1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Start' } },
      { id: '2', type: 'action', position: { x: 300, y: 100 }, data: { label: 'Process' } },
      { id: '3', type: 'condition', position: { x: 500, y: 100 }, data: { label: 'Check' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ],
    settings: {
      autoSave: true,
      notifications: true,
      theme: 'dark'
    }
  });

  // حفظ سير العمل
  const saveWorkflow = () => {
    if (!workflowName.trim()) {
      alert(language === 'ar' ? 'يرجى إدخال اسم سير العمل' : 'Please enter workflow name');
      return;
    }

    const workflowData = generateSampleWorkflowData();
    const dataString = JSON.stringify(workflowData);
    const size = new Blob([dataString]).size;

    const newWorkflow: WorkflowFile = {
      id: Date.now().toString(),
      name: workflowName.trim(),
      description: workflowDescription.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0',
      tags: workflowTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      starred: false,
      data: workflowData,
      size
    };

    // إضافة إصدار أولي
    const initialVersion: WorkflowVersion = {
      id: Date.now().toString(),
      version: '1.0.0',
      createdAt: new Date(),
      changes: 'Initial version',
      data: workflowData
    };

    setWorkflows(prev => [newWorkflow, ...prev]);
    setVersions(prev => ({
      ...prev,
      [newWorkflow.id]: [initialVersion]
    }));

    // إعادة تعيين النموذج
    setWorkflowName('');
    setWorkflowDescription('');
    setWorkflowTags('');
    setIsDialogOpen(false);

    // عرض رسالة نجاح
    alert(t.saveSuccess);
  };

  // تحميل سير العمل
  const loadWorkflow = (workflow: WorkflowFile) => {
    console.log('Loading workflow:', workflow);
    alert(t.loadSuccess);
    setIsDialogOpen(false);
  };

  // حذف سير العمل
  const deleteWorkflow = (id: string) => {
    if (confirm(t.confirmDelete)) {
      setWorkflows(prev => prev.filter(w => w.id !== id));
      setVersions(prev => {
        const newVersions = { ...prev };
        delete newVersions[id];
        return newVersions;
      });
      alert(t.deleteSuccess);
    }
  };

  // نسخ سير العمل
  const duplicateWorkflow = (workflow: WorkflowFile) => {
    const duplicate: WorkflowFile = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0'
    };

    setWorkflows(prev => [duplicate, ...prev]);
  };

  // إضافة/إزالة من المفضلة
  const toggleStar = (id: string) => {
    setWorkflows(prev => 
      prev.map(w => 
        w.id === id ? { ...w, starred: !w.starred } : w
      )
    );
  };

  // تصدير سير العمل
  const exportWorkflow = (workflow: WorkflowFile) => {
    const exportData = {
      ...workflow,
      exportedAt: new Date(),
      appVersion: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(t.exportSuccess);
  };

  // استيراد سير العمل
  const importWorkflow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        
        const newWorkflow: WorkflowFile = {
          ...imported,
          id: Date.now().toString(),
          createdAt: new Date(imported.createdAt || Date.now()),
          updatedAt: new Date(),
          name: `${imported.name} (Imported)`
        };

        setWorkflows(prev => [newWorkflow, ...prev]);
        alert(t.importSuccess);
      } catch (error) {
        alert(language === 'ar' ? 'خطأ في استيراد الملف' : 'Error importing file');
      }
    };
    reader.readAsText(file);
    
    // إعادة تعيين input
    event.target.value = '';
  };

  // تصفية وترتيب ملفات سير العمل
  const filteredWorkflows = workflows
    .filter(workflow => {
      // تصفية حسب البحث
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          workflow.name.toLowerCase().includes(searchLower) ||
          workflow.description.toLowerCase().includes(searchLower) ||
          workflow.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      return true;
    })
    .filter(workflow => {
      // تصفية حسب النوع
      switch (filterBy) {
        case 'starred':
          return workflow.starred;
        case 'recent':
          return Date.now() - workflow.updatedAt.getTime() < 7 * 24 * 60 * 60 * 1000; // آخر أسبوع
        default:
          return true;
      }
    })
    .sort((a, b) => {
      // ترتيب
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.size - a.size;
        case 'date':
        default:
          return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
    });

  // تنسيق الحجم
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // تنسيق التاريخ
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const openDialog = (type: typeof dialogType, workflow?: WorkflowFile) => {
    setDialogType(type);
    setSelectedWorkflow(workflow || null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => openDialog('save')}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {t.save}
              </Button>
              
              <Button variant="outline" onClick={() => openDialog('load')}>
                <FolderOpen className="h-4 w-4 mr-2" />
                {t.load}
              </Button>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={importWorkflow}
                  className="hidden"
                />
                <Button variant="outline" as="span">
                  <Upload className="h-4 w-4 mr-2" />
                  {t.import}
                </Button>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t.filterBy}:</span>
            <div className="flex gap-1">
              {Object.entries(t.filters).map(([key, label]) => (
                <Button
                  key={key}
                  variant={filterBy === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy(key as any)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t.sortBy}:</span>
            <div className="flex gap-1">
              {Object.entries(t.sorts).map(([key, label]) => (
                <Button
                  key={key}
                  variant={sortBy === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(key as any)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Badge variant="outline">
          {filteredWorkflows.length} {language === 'ar' ? 'ملف' : 'files'}
        </Badge>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkflows.map(workflow => (
          <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {workflow.name}
                    {workflow.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {workflow.description || (language === 'ar' ? 'لا يوجد وصف' : 'No description')}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStar(workflow.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star className={`h-4 w-4 ${workflow.starred ? 'text-yellow-500 fill-current' : ''}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              {workflow.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {workflow.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>{t.created}:</span>
                  <span>{formatDate(workflow.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.updated}:</span>
                  <span>{formatDate(workflow.updatedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.size}:</span>
                  <span>{formatSize(workflow.size)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.version}:</span>
                  <span>{workflow.version}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  onClick={() => loadWorkflow(workflow)}
                  className="flex-1"
                >
                  <FolderOpen className="h-3 w-3 mr-1" />
                  {t.load}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => exportWorkflow(workflow)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  {t.export}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => duplicateWorkflow(workflow)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {t.duplicate}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openDialog('versions', workflow)}
                >
                  <History className="h-3 w-3 mr-1" />
                  {t.versions}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteWorkflow(workflow.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  {t.delete}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredWorkflows.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t.noWorkflows}</h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'ابدأ بإنشاء سير عمل جديد أو استيراد ملف موجود'
                : 'Start by creating a new workflow or importing an existing file'
              }
            </p>
            <Button onClick={() => openDialog('save')}>
              <Save className="h-4 w-4 mr-2" />
              {t.newWorkflow}
            </Button>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.dialogs[`${dialogType}Title` as keyof typeof t.dialogs]}</DialogTitle>
            <DialogDescription>
              {dialogType === 'save' && (language === 'ar' 
                ? 'احفظ سير العمل الحالي للوصول إليه لاحقاً'
                : 'Save the current workflow for later access'
              )}
              {dialogType === 'load' && (language === 'ar'
                ? 'اختر سير عمل لتحميله'
                : 'Choose a workflow to load'
              )}
              {dialogType === 'versions' && selectedWorkflow && (language === 'ar'
                ? `إصدارات سير العمل: ${selectedWorkflow.name}`
                : `Versions for workflow: ${selectedWorkflow.name}`
              )}
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'save' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t.workflowName}</label>
                <Input
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder={language === 'ar' ? 'اسم سير العمل...' : 'Workflow name...'}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">{t.workflowDescription}</label>
                <Textarea
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder={language === 'ar' ? 'وصف سير العمل...' : 'Workflow description...'}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">{t.tags}</label>
                <Input
                  value={workflowTags}
                  onChange={(e) => setWorkflowTags(e.target.value)}
                  placeholder={language === 'ar' ? 'تسويق، أتمتة، عمليات' : 'marketing, automation, operations'}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button onClick={saveWorkflow}>
                  <Save className="h-4 w-4 mr-2" />
                  {t.save}
                </Button>
              </div>
            </div>
          )}

          {dialogType === 'load' && (
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {workflows.map(workflow => (
                  <Card 
                    key={workflow.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => loadWorkflow(workflow)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {workflow.name}
                            {workflow.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {workflow.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(workflow.updatedAt)} • {formatSize(workflow.size)}
                          </p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}

          {dialogType === 'versions' && selectedWorkflow && (
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {versions[selectedWorkflow.id]?.map(version => (
                  <Card key={version.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{version.version}</h3>
                          <p className="text-sm text-muted-foreground">{version.changes}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(version.createdAt)}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <CloudDownload className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'استرجاع' : 'Restore'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <p className="text-center text-muted-foreground py-4">
                    {language === 'ar' ? 'لا توجد إصدارات محفوظة' : 'No saved versions'}
                  </p>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}