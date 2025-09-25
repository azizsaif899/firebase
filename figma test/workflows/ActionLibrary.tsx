'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface ActionLibraryProps {
  language: 'ar' | 'en';
}

interface ActionTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  inputs: ActionInput[];
  outputs: ActionOutput[];
  config: any;
  isCustom: boolean;
  usageCount: number;
  rating: number;
}

interface ActionInput {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'file' | 'json' | 'select';
  required: boolean;
  description: string;
  options?: string[];
  defaultValue?: any;
}

interface ActionOutput {
  name: string;
  type: string;
  description: string;
}

export function ActionLibrary({ language }: ActionLibraryProps) {
  const isRTL = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<ActionTemplate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);

  const texts = {
    ar: {
      title: 'مكتبة الإجراءات',
      subtitle: 'مجموعة شاملة من الإجراءات القابلة للتخصيص والتطوير',
      search: 'البحث في الإجراءات...',
      categories: 'التصنيفات',
      allCategories: 'جميع التصنيفات',
      communication: 'التواصل',
      dataProcessing: 'معالجة البيانات',
      automation: 'الأتمتة',
      integration: 'التكامل',
      ai: 'الذكاء الاصطناعي',
      custom: 'مخصص',
      createAction: 'إنشاء إجراء جديد',
      editAction: 'تعديل الإجراء',
      testAction: 'اختبار الإجراء',
      deleteAction: 'حذف الإجراء',
      duplicateAction: 'نسخ الإجراء',
      exportAction: 'تصدير الإجراء',
      importAction: 'استيراد إجراء',
      actionName: 'اسم الإجراء',
      actionDescription: 'وصف الإجراء',
      actionCategory: 'التصنيف',
      actionIcon: 'الأيقونة',
      actionColor: 'اللون',
      inputs: 'المدخلات',
      outputs: 'المخرجات',
      configuration: 'الإعدادات',
      save: 'حفظ',
      cancel: 'إلغاء',
      test: 'اختبار',
      run: 'تشغيل',
      usage: 'مرات الاستخدام',
      rating: 'التقييم',
      addInput: 'إضافة مدخل',
      addOutput: 'إضافة مخرج',
      inputName: 'اسم المدخل',
      inputType: 'نوع المدخل',
      inputRequired: 'مطلوب',
      inputDescription: 'وصف المدخل',
      outputName: 'اسم المخرج',
      outputType: 'نوع المخرج',
      outputDescription: 'وصف المخرج',
      testResults: 'نتائج الاختبار',
      executionTime: 'وقت التنفيذ',
      status: 'الحالة',
      success: 'نجح',
      failed: 'فشل',
      popular: 'الأكثر استخداماً',
      recent: 'الأحدث',
      myActions: 'إجراءاتي'
    },
    en: {
      title: 'Action Library',
      subtitle: 'Comprehensive collection of customizable and extensible actions',
      search: 'Search actions...',
      categories: 'Categories',
      allCategories: 'All Categories',
      communication: 'Communication',
      dataProcessing: 'Data Processing',
      automation: 'Automation',
      integration: 'Integration',
      ai: 'Artificial Intelligence',
      custom: 'Custom',
      createAction: 'Create New Action',
      editAction: 'Edit Action',
      testAction: 'Test Action',
      deleteAction: 'Delete Action',
      duplicateAction: 'Duplicate Action',
      exportAction: 'Export Action',
      importAction: 'Import Action',
      actionName: 'Action Name',
      actionDescription: 'Action Description',
      actionCategory: 'Category',
      actionIcon: 'Icon',
      actionColor: 'Color',
      inputs: 'Inputs',
      outputs: 'Outputs',
      configuration: 'Configuration',
      save: 'Save',
      cancel: 'Cancel',
      test: 'Test',
      run: 'Run',
      usage: 'Usage Count',
      rating: 'Rating',
      addInput: 'Add Input',
      addOutput: 'Add Output',
      inputName: 'Input Name',
      inputType: 'Input Type',
      inputRequired: 'Required',
      inputDescription: 'Input Description',
      outputName: 'Output Name',
      outputType: 'Output Type',
      outputDescription: 'Output Description',
      testResults: 'Test Results',
      executionTime: 'Execution Time',
      status: 'Status',
      success: 'Success',
      failed: 'Failed',
      popular: 'Most Popular',
      recent: 'Recently Added',
      myActions: 'My Actions'
    }
  };

  // Sample actions data
  const [actions, setActions] = useState<ActionTemplate[]>([
    {
      id: '1',
      name: texts[language].communication === 'Communication' ? 'Send Email' : 'إرسال بريد إلكتروني',
      description: 'Send email with customizable content and recipients',
      category: 'communication',
      icon: '📧',
      color: 'bg-blue-500',
      inputs: [
        { name: 'to', type: 'text', required: true, description: 'Recipient email address' },
        { name: 'subject', type: 'text', required: true, description: 'Email subject' },
        { name: 'body', type: 'text', required: true, description: 'Email content' },
        { name: 'attachments', type: 'file', required: false, description: 'File attachments' }
      ],
      outputs: [
        { name: 'messageId', type: 'string', description: 'Email message ID' },
        { name: 'status', type: 'string', description: 'Delivery status' }
      ],
      config: { provider: 'smtp', timeout: 30000 },
      isCustom: false,
      usageCount: 1247,
      rating: 4.8
    },
    {
      id: '2',
      name: texts[language].dataProcessing === 'Data Processing' ? 'Process CSV Data' : 'معالجة بيانات CSV',
      description: 'Parse and process CSV files with validation',
      category: 'dataProcessing',
      icon: '📊',
      color: 'bg-green-500',
      inputs: [
        { name: 'csvFile', type: 'file', required: true, description: 'CSV file to process' },
        { name: 'delimiter', type: 'select', required: false, description: 'CSV delimiter', options: [',', ';', '\t'], defaultValue: ',' },
        { name: 'hasHeaders', type: 'boolean', required: false, description: 'First row contains headers', defaultValue: true }
      ],
      outputs: [
        { name: 'processedData', type: 'json', description: 'Processed data array' },
        { name: 'rowCount', type: 'number', description: 'Number of processed rows' },
        { name: 'errors', type: 'json', description: 'Processing errors' }
      ],
      config: { maxRows: 10000, validateData: true },
      isCustom: false,
      usageCount: 856,
      rating: 4.6
    },
    {
      id: '3',
      name: texts[language].ai === 'Artificial Intelligence' ? 'Analyze Text Sentiment' : 'تحليل المشاعر في النص',
      description: 'Analyze text sentiment using AI models',
      category: 'ai',
      icon: '🧠',
      color: 'bg-purple-500',
      inputs: [
        { name: 'text', type: 'text', required: true, description: 'Text to analyze' },
        { name: 'language', type: 'select', required: false, description: 'Text language', options: ['ar', 'en', 'auto'], defaultValue: 'auto' },
        { name: 'model', type: 'select', required: false, description: 'AI model to use', options: ['basic', 'advanced'], defaultValue: 'basic' }
      ],
      outputs: [
        { name: 'sentiment', type: 'string', description: 'Sentiment: positive, negative, neutral' },
        { name: 'confidence', type: 'number', description: 'Confidence score (0-1)' },
        { name: 'emotions', type: 'json', description: 'Detailed emotion analysis' }
      ],
      config: { threshold: 0.7, includeEmotions: true },
      isCustom: false,
      usageCount: 523,
      rating: 4.9
    },
    {
      id: '4',
      name: texts[language].integration === 'Integration' ? 'Call REST API' : 'استدعاء REST API',
      description: 'Make HTTP requests to external APIs',
      category: 'integration',
      icon: '🔗',
      color: 'bg-orange-500',
      inputs: [
        { name: 'url', type: 'text', required: true, description: 'API endpoint URL' },
        { name: 'method', type: 'select', required: true, description: 'HTTP method', options: ['GET', 'POST', 'PUT', 'DELETE'], defaultValue: 'GET' },
        { name: 'headers', type: 'json', required: false, description: 'Request headers' },
        { name: 'body', type: 'json', required: false, description: 'Request body' }
      ],
      outputs: [
        { name: 'response', type: 'json', description: 'API response data' },
        { name: 'statusCode', type: 'number', description: 'HTTP status code' },
        { name: 'headers', type: 'json', description: 'Response headers' }
      ],
      config: { timeout: 10000, retries: 3 },
      isCustom: false,
      usageCount: 734,
      rating: 4.7
    }
  ]);

  const categories = [
    { id: 'all', name: texts[language].allCategories, count: actions.length },
    { id: 'communication', name: texts[language].communication, count: actions.filter(a => a.category === 'communication').length },
    { id: 'dataProcessing', name: texts[language].dataProcessing, count: actions.filter(a => a.category === 'dataProcessing').length },
    { id: 'automation', name: texts[language].automation, count: actions.filter(a => a.category === 'automation').length },
    { id: 'integration', name: texts[language].integration, count: actions.filter(a => a.category === 'integration').length },
    { id: 'ai', name: texts[language].ai, count: actions.filter(a => a.category === 'ai').length },
    { id: 'custom', name: texts[language].custom, count: actions.filter(a => a.isCustom).length }
  ];

  // Filter actions based on category and search
  const filteredActions = actions.filter(action => {
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory || (selectedCategory === 'custom' && action.isCustom);
    const matchesSearch = action.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         action.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'communication': return 'bg-blue-500';
      case 'dataProcessing': return 'bg-green-500';
      case 'automation': return 'bg-yellow-500';
      case 'integration': return 'bg-orange-500';
      case 'ai': return 'bg-purple-500';
      case 'custom': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  // Handle action selection
  const handleActionSelect = (action: ActionTemplate) => {
    setSelectedAction(action);
  };

  // Handle test action
  const handleTestAction = (action: ActionTemplate) => {
    setSelectedAction(action);
    setIsTestDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-background via-card to-background border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="hero-text bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] bg-clip-text text-transparent">
              {texts[language].title}
            </h1>
            <p className="body-large text-muted-foreground mt-4 max-w-2xl mx-auto">
              {texts[language].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder={texts[language].search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {texts[language].createAction}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{texts[language].createAction}</DialogTitle>
                  <DialogDescription>
                    Create a new custom action for your workflows
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">{texts[language].actionName}</Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">{texts[language].actionDescription}</Label>
                    <Textarea id="description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">{texts[language].actionCategory}</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="communication">{texts[language].communication}</SelectItem>
                        <SelectItem value="dataProcessing">{texts[language].dataProcessing}</SelectItem>
                        <SelectItem value="automation">{texts[language].automation}</SelectItem>
                        <SelectItem value="integration">{texts[language].integration}</SelectItem>
                        <SelectItem value="ai">{texts[language].ai}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    {texts[language].cancel}
                  </Button>
                  <Button className="btn-primary">
                    {texts[language].save}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              {texts[language].importAction}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-4">{texts[language].categories}</h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-[#4F97FF] text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary" className={`text-xs ${
                      selectedCategory === category.id ? 'bg-white/20 text-white' : ''
                    }`}>
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground mb-3">Quick Filters</h4>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {texts[language].popular}
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {texts[language].recent}
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {texts[language].myActions}
                </Button>
              </div>
            </Card>
          </div>

          {/* Actions Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredActions.map((action) => (
                <Card key={action.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleActionSelect(action)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-2xl`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {texts[language][action.category as keyof typeof texts[typeof language]] || action.category}
                        </Badge>
                      </div>
                    </div>
                    {action.isCustom && (
                      <Badge variant="outline" className="text-xs">
                        {texts[language].custom}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{action.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>{action.usageCount}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestAction(action);
                      }}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {texts[language].test}
                    </Button>
                    <Button size="sm" className="btn-primary flex-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Workflow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredActions.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg text-muted-foreground mb-2">No actions found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Test Action Dialog */}
        <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">{selectedAction?.icon}</span>
                {texts[language].testAction}: {selectedAction?.name}
              </DialogTitle>
              <DialogDescription>
                Configure and test the action with sample data
              </DialogDescription>
            </DialogHeader>
            
            {selectedAction && (
              <Tabs defaultValue="inputs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="inputs">{texts[language].inputs}</TabsTrigger>
                  <TabsTrigger value="outputs">{texts[language].outputs}</TabsTrigger>
                  <TabsTrigger value="results">{texts[language].testResults}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="inputs" className="space-y-4 mt-4">
                  <div className="grid gap-4 max-h-80 overflow-y-auto">
                    {selectedAction.inputs.map((input, index) => (
                      <div key={index} className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-medium">
                          {input.name}
                          {input.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="col-span-3">
                          {input.type === 'select' ? (
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${input.name}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {input.options?.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : input.type === 'boolean' ? (
                            <div className="flex items-center space-x-2">
                              <Switch id={`switch-${index}`} />
                              <Label htmlFor={`switch-${index}`}>{input.description}</Label>
                            </div>
                          ) : input.type === 'text' && input.name.includes('body') ? (
                            <Textarea placeholder={input.description} />
                          ) : (
                            <Input 
                              type={input.type === 'number' ? 'number' : 'text'}
                              placeholder={input.description}
                              defaultValue={input.defaultValue}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="outputs" className="space-y-4 mt-4">
                  <div className="grid gap-4">
                    {selectedAction.outputs.map((output, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{output.name}</div>
                          <div className="text-sm text-muted-foreground">{output.description}</div>
                        </div>
                        <Badge variant="outline">{output.type}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="results" className="space-y-4 mt-4">
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{texts[language].testResults}</h4>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        {texts[language].success}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">{texts[language].executionTime}: </span>
                        <span className="font-medium">1.23s</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{texts[language].status}: </span>
                        <span className="font-medium text-green-600">{texts[language].success}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Output Data:</h5>
                      <pre className="bg-card p-3 rounded text-xs overflow-x-auto">
{JSON.stringify({
  messageId: "msg_abc123",
  status: "delivered",
  timestamp: new Date().toISOString()
}, null, 2)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>
                Close
              </Button>
              <Button className="btn-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {texts[language].run} {texts[language].test}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}