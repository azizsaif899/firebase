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
import { Progress } from './ui/progress';

interface TriggerSystemProps {
  language: 'ar' | 'en';
}

interface TriggerTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  conditions: TriggerCondition[];
  config: any;
  isActive: boolean;
  lastTriggered: string | null;
  triggerCount: number;
  successRate: number;
}

interface TriggerCondition {
  field: string;
  operator: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'date';
}

export function TriggerSystem({ language }: TriggerSystemProps) {
  const isRTL = language === 'ar';
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerTemplate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [showConditionsBuilder, setShowConditionsBuilder] = useState(false);

  const texts = {
    ar: {
      title: 'نظام المحفزات التفاعلي',
      subtitle: 'إنشاء وإدارة المحفزات الذكية لسير العمل',
      search: 'البحث في المحفزات...',
      types: 'الأنواع',
      allTypes: 'جميع الأنواع',
      schedule: 'جدولة زمنية',
      webhook: 'Webhook',
      fileSystem: 'نظام الملفات',
      database: 'قاعدة البيانات',
      user: 'تفاعل المستخدم',
      api: 'API',
      email: 'البريد الإلكتروني',
      form: 'النماذج',
      createTrigger: 'إنشاء محفز جديد',
      editTrigger: 'تعديل المحفز',
      testTrigger: 'اختبار المحفز',
      deleteTrigger: 'حذف المحفز',
      duplicateTrigger: 'نسخ المحفز',
      triggerName: 'اسم المحفز',
      triggerDescription: 'وصف المحفز',
      triggerType: 'نوع المحفز',
      conditions: 'الشروط',
      configuration: 'الإعدادات',
      monitoring: 'المراقبة',
      save: 'حفظ',
      cancel: 'إلغاء',
      test: 'اختبار',
      activate: 'تفعيل',
      deactivate: 'إلغاء التفعيل',
      lastTriggered: 'آخر تشغيل',
      triggerCount: 'عدد مرات التشغيل',
      successRate: 'معدل النجاح',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
      addCondition: 'إضافة شرط',
      removeCondition: 'إزالة الشرط',
      field: 'الحقل',
      operator: 'المشغل',
      value: 'القيمة',
      equals: 'يساوي',
      notEquals: 'لا يساوي',
      contains: 'يحتوي على',
      notContains: 'لا يحتوي على',
      greaterThan: 'أكبر من',
      lessThan: 'أصغر من',
      greaterOrEqual: 'أكبر أو يساوي',
      lessOrEqual: 'أصغر أو يساوي',
      startsWith: 'يبدأ بـ',
      endsWith: 'ينتهي بـ',
      isEmpty: 'فارغ',
      isNotEmpty: 'ليس فارغ',
      testResults: 'نتائج الاختبار',
      executionTime: 'وقت التنفيذ',
      success: 'نجح',
      failed: 'فشل',
      conditionsBuilder: 'بناء الشروط',
      logicOperator: 'المشغل المنطقي',
      and: 'و',
      or: 'أو',
      recent: 'الأحدث',
      mostUsed: 'الأكثر استخداماً',
      myTriggers: 'محفزاتي'
    },
    en: {
      title: 'Interactive Trigger System',
      subtitle: 'Create and manage intelligent triggers for workflows',
      search: 'Search triggers...',
      types: 'Types',
      allTypes: 'All Types',
      schedule: 'Schedule',
      webhook: 'Webhook',
      fileSystem: 'File System',
      database: 'Database',
      user: 'User Interaction',
      api: 'API',
      email: 'Email',
      form: 'Forms',
      createTrigger: 'Create New Trigger',
      editTrigger: 'Edit Trigger',
      testTrigger: 'Test Trigger',
      deleteTrigger: 'Delete Trigger',
      duplicateTrigger: 'Duplicate Trigger',
      triggerName: 'Trigger Name',
      triggerDescription: 'Trigger Description',
      triggerType: 'Trigger Type',
      conditions: 'Conditions',
      configuration: 'Configuration',
      monitoring: 'Monitoring',
      save: 'Save',
      cancel: 'Cancel',
      test: 'Test',
      activate: 'Activate',
      deactivate: 'Deactivate',
      lastTriggered: 'Last Triggered',
      triggerCount: 'Trigger Count',
      successRate: 'Success Rate',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      addCondition: 'Add Condition',
      removeCondition: 'Remove Condition',
      field: 'Field',
      operator: 'Operator',
      value: 'Value',
      equals: 'Equals',
      notEquals: 'Not Equals',
      contains: 'Contains',
      notContains: 'Not Contains',
      greaterThan: 'Greater Than',
      lessThan: 'Less Than',
      greaterOrEqual: 'Greater or Equal',
      lessOrEqual: 'Less or Equal',
      startsWith: 'Starts With',
      endsWith: 'Ends With',
      isEmpty: 'Is Empty',
      isNotEmpty: 'Is Not Empty',
      testResults: 'Test Results',
      executionTime: 'Execution Time',
      success: 'Success',
      failed: 'Failed',
      conditionsBuilder: 'Conditions Builder',
      logicOperator: 'Logic Operator',
      and: 'AND',
      or: 'OR',
      recent: 'Recently Added',
      mostUsed: 'Most Used',
      myTriggers: 'My Triggers'
    }
  };

  // Sample triggers data
  const [triggers, setTriggers] = useState<TriggerTemplate[]>([
    {
      id: '1',
      name: texts[language].schedule === 'Schedule' ? 'Daily Report Generation' : 'إنشاء تقرير يومي',
      description: 'Generate daily performance report at 9 AM',
      type: 'schedule',
      icon: '⏰',
      color: 'bg-blue-500',
      conditions: [
        { field: 'time', operator: 'equals', value: '09:00', type: 'string' },
        { field: 'weekday', operator: 'notEquals', value: 'weekend', type: 'string' }
      ],
      config: { cron: '0 9 * * 1-5', timezone: 'Asia/Riyadh' },
      isActive: true,
      lastTriggered: '2024-01-22T09:00:00Z',
      triggerCount: 1247,
      successRate: 98.5
    },
    {
      id: '2',
      name: texts[language].webhook === 'Webhook' ? 'Payment Webhook' : 'وِب هوك المدفوعات',
      description: 'Process payment notifications from payment gateway',
      type: 'webhook',
      icon: '🔗',
      color: 'bg-green-500',
      conditions: [
        { field: 'event_type', operator: 'equals', value: 'payment.completed', type: 'string' },
        { field: 'amount', operator: 'greaterThan', value: 0, type: 'number' }
      ],
      config: { url: '/webhook/payments', method: 'POST', secret: 'webhook_secret' },
      isActive: true,
      lastTriggered: '2024-01-22T14:30:00Z',
      triggerCount: 856,
      successRate: 99.2
    },
    {
      id: '3',
      name: texts[language].email === 'Email' ? 'Support Email Trigger' : 'محفز بريد الدعم',
      description: 'Trigger when support email is received',
      type: 'email',
      icon: '📧',
      color: 'bg-purple-500',
      conditions: [
        { field: 'to', operator: 'contains', value: 'support@', type: 'string' },
        { field: 'subject', operator: 'contains', value: 'urgent', type: 'string' }
      ],
      config: { mailbox: 'support@company.com', folder: 'INBOX' },
      isActive: true,
      lastTriggered: '2024-01-22T11:15:00Z',
      triggerCount: 423,
      successRate: 96.8
    },
    {
      id: '4',
      name: texts[language].fileSystem === 'File System' ? 'File Upload Monitor' : 'مراقب رفع الملفات',
      description: 'Monitor file uploads in documents folder',
      type: 'fileSystem',
      icon: '📁',
      color: 'bg-orange-500',
      conditions: [
        { field: 'path', operator: 'startsWith', value: '/uploads/documents/', type: 'string' },
        { field: 'extension', operator: 'equals', value: '.pdf', type: 'string' }
      ],
      config: { watchPath: '/uploads/documents/', events: ['create', 'modify'] },
      isActive: false,
      lastTriggered: '2024-01-21T16:45:00Z',
      triggerCount: 234,
      successRate: 94.2
    }
  ]);

  const triggerTypes = [
    { id: 'all', name: texts[language].allTypes, count: triggers.length },
    { id: 'schedule', name: texts[language].schedule, count: triggers.filter(t => t.type === 'schedule').length },
    { id: 'webhook', name: texts[language].webhook, count: triggers.filter(t => t.type === 'webhook').length },
    { id: 'email', name: texts[language].email, count: triggers.filter(t => t.type === 'email').length },
    { id: 'fileSystem', name: texts[language].fileSystem, count: triggers.filter(t => t.type === 'fileSystem').length },
    { id: 'database', name: texts[language].database, count: triggers.filter(t => t.type === 'database').length },
    { id: 'api', name: texts[language].api, count: triggers.filter(t => t.type === 'api').length }
  ];

  const operators = [
    { value: 'equals', label: texts[language].equals },
    { value: 'notEquals', label: texts[language].notEquals },
    { value: 'contains', label: texts[language].contains },
    { value: 'notContains', label: texts[language].notContains },
    { value: 'greaterThan', label: texts[language].greaterThan },
    { value: 'lessThan', label: texts[language].lessThan },
    { value: 'greaterOrEqual', label: texts[language].greaterOrEqual },
    { value: 'lessOrEqual', label: texts[language].lessOrEqual },
    { value: 'startsWith', label: texts[language].startsWith },
    { value: 'endsWith', label: texts[language].endsWith },
    { value: 'isEmpty', label: texts[language].isEmpty },
    { value: 'isNotEmpty', label: texts[language].isNotEmpty }
  ];

  // Filter triggers
  const filteredTriggers = triggers.filter(trigger => {
    const matchesType = selectedType === 'all' || trigger.type === selectedType;
    const matchesSearch = trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         trigger.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'schedule': return 'bg-blue-500';
      case 'webhook': return 'bg-green-500';
      case 'email': return 'bg-purple-500';
      case 'fileSystem': return 'bg-orange-500';
      case 'database': return 'bg-red-500';
      case 'api': return 'bg-cyan-500';
      case 'user': return 'bg-pink-500';
      case 'form': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Toggle trigger status
  const toggleTriggerStatus = (triggerId: string) => {
    setTriggers(prev => prev.map(trigger => 
      trigger.id === triggerId 
        ? { ...trigger, isActive: !trigger.isActive }
        : trigger
    ));
  };

  // Handle test trigger
  const handleTestTrigger = (trigger: TriggerTemplate) => {
    setSelectedTrigger(trigger);
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
                  {texts[language].createTrigger}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{texts[language].createTrigger}</DialogTitle>
                  <DialogDescription>
                    Create a new trigger to automate your workflows
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="conditions">{texts[language].conditions}</TabsTrigger>
                    <TabsTrigger value="config">{texts[language].configuration}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">{texts[language].triggerName}</Label>
                      <Input id="name" className="col-span-3" placeholder="Enter trigger name" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">{texts[language].triggerDescription}</Label>
                      <Textarea id="description" className="col-span-3" placeholder="Describe what this trigger does" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">{texts[language].triggerType}</Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select trigger type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="schedule">{texts[language].schedule}</SelectItem>
                          <SelectItem value="webhook">{texts[language].webhook}</SelectItem>
                          <SelectItem value="email">{texts[language].email}</SelectItem>
                          <SelectItem value="fileSystem">{texts[language].fileSystem}</SelectItem>
                          <SelectItem value="database">{texts[language].database}</SelectItem>
                          <SelectItem value="api">{texts[language].api}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conditions" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{texts[language].conditionsBuilder}</h4>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {texts[language].addCondition}
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <Label className="col-span-2 text-sm">{texts[language].field}</Label>
                        <Label className="col-span-2 text-sm">{texts[language].operator}</Label>
                        <Label className="col-span-3 text-sm">{texts[language].value}</Label>
                        <Label className="col-span-2 text-sm">{texts[language].logicOperator}</Label>
                        <Label className="col-span-2 text-sm">Actions</Label>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <Input className="col-span-2" placeholder="email.to" />
                        <Select>
                          <SelectTrigger className="col-span-2">
                            <SelectValue placeholder="Operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {operators.map(op => (
                              <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input className="col-span-3" placeholder="support@company.com" />
                        <Select>
                          <SelectTrigger className="col-span-2">
                            <SelectValue placeholder="Logic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="and">{texts[language].and}</SelectItem>
                            <SelectItem value="or">{texts[language].or}</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="col-span-2 flex gap-1">
                          <Button variant="outline" size="sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </Button>
                          <Button variant="outline" size="sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="config" className="space-y-4 mt-4">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Timeout (seconds)</Label>
                        <Input type="number" defaultValue="30" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Retry Attempts</Label>
                        <Input type="number" defaultValue="3" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Enable Logging</Label>
                        <div className="col-span-3">
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Priority Level</Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Types Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-4">{texts[language].types}</h3>
              
              <div className="space-y-2">
                {triggerTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedType === type.id 
                        ? 'bg-[#4F97FF] text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="font-medium">{type.name}</span>
                    <Badge variant="secondary" className={`text-xs ${
                      selectedType === type.id ? 'bg-white/20 text-white' : ''
                    }`}>
                      {type.count}
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
                  {texts[language].mostUsed}
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
                  {texts[language].myTriggers}
                </Button>
              </div>
            </Card>
          </div>

          {/* Triggers Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTriggers.map((trigger) => (
                <Card key={trigger.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${trigger.color} rounded-lg flex items-center justify-center text-2xl`}>
                        {trigger.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{trigger.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {texts[language][trigger.type as keyof typeof texts[typeof language]] || trigger.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={trigger.isActive}
                        onCheckedChange={() => toggleTriggerStatus(trigger.id)}
                      />
                      <Badge variant={trigger.isActive ? 'default' : 'secondary'} className={`text-xs ${
                        trigger.isActive ? 'bg-green-500' : ''
                      }`}>
                        {trigger.isActive ? texts[language].active : texts[language].inactive}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {trigger.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{texts[language].successRate}:</span>
                      <span className="font-medium text-green-500">{trigger.successRate}%</span>
                    </div>
                    <Progress value={trigger.successRate} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span>{texts[language].triggerCount}: </span>
                        <span className="font-medium">{trigger.triggerCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span>{texts[language].lastTriggered}: </span>
                        <span className="font-medium">
                          {trigger.lastTriggered ? new Date(trigger.lastTriggered).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleTestTrigger(trigger)}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {texts[language].test}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredTriggers.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
                <p className="text-lg text-muted-foreground mb-2">No triggers found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Test Trigger Dialog */}
        <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">{selectedTrigger?.icon}</span>
                {texts[language].testTrigger}: {selectedTrigger?.name}
              </DialogTitle>
              <DialogDescription>
                Test the trigger with sample data to verify its configuration
              </DialogDescription>
            </DialogHeader>
            
            {selectedTrigger && (
              <Tabs defaultValue="conditions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="conditions">{texts[language].conditions}</TabsTrigger>
                  <TabsTrigger value="test">Test Data</TabsTrigger>
                  <TabsTrigger value="results">{texts[language].testResults}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="conditions" className="space-y-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Current Conditions:</h4>
                    <div className="space-y-2">
                      {selectedTrigger.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded text-sm">
                          <code className="bg-muted px-2 py-1 rounded">{condition.field}</code>
                          <span className="text-muted-foreground">{condition.operator}</span>
                          <code className="bg-muted px-2 py-1 rounded">{JSON.stringify(condition.value)}</code>
                          {index < selectedTrigger.conditions.length - 1 && (
                            <Badge variant="outline" className="text-xs">AND</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="test" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Sample Test Data:</h4>
                    <Textarea 
                      placeholder="Enter test data in JSON format..."
                      rows={8}
                      defaultValue={JSON.stringify({
                        event_type: "payment.completed",
                        amount: 100.50,
                        currency: "USD",
                        timestamp: new Date().toISOString()
                      }, null, 2)}
                    />
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
                        <span className="font-medium">0.89s</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{texts[language].status}: </span>
                        <span className="font-medium text-green-600">{texts[language].success}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Conditions Evaluation:</h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>event_type equals "payment.completed" ✓</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>amount greaterThan 0 ✓</span>
                        </div>
                      </div>
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
                Run Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}