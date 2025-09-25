'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { WorkflowBuilder } from './WorkflowBuilder';
import { ActionLibrary } from './ActionLibrary';
import { TriggerSystem } from './TriggerSystem';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SmartAlerts } from './SmartAlerts';
import { AutomationNavigation } from './AutomationNavigation';
import { TestingSuite } from './TestingSuite';
import { PerformanceOptimizer } from './PerformanceOptimizer';
import { AnimationShowcase } from './AnimationShowcase';
import { WorkflowManager } from './WorkflowManager';
import { MinimalistCanvas } from './MinimalistCanvasFixed3';
import { ChatSidebar } from './ChatSidebar';
import { 
  FileText, 
  Users, 
  Clock, 
  Zap,
  Save,
  Share,
  Download,
  Play,
  Palette,
  Settings
} from 'lucide-react';

interface AutomationProps {
  language: 'ar' | 'en';
}

export function Automation({ language }: AutomationProps) {
  const isRTL = language === 'ar';
  
  const texts = {
    ar: {
      title: 'الأتمتة',
      subtitle: 'نظام أتمتة شامل لسير العمل والعمليات الذكية',
      workflows: 'سير العمل',
      workflowBuilder: 'مصمم سير العمل',
      triggers: 'المحفزات',
      actions: 'الإجراءات',
      analytics: 'التحليلات',
      createWorkflow: 'إنشاء سير عمل جديد',
      activeWorkflows: 'سير العمل النشط',
      totalAutomations: 'إجمالي العمليات',
      successRate: 'معدل النجاح',
      timeSaved: 'الوقت المُوفر',
      workflows_data: [
        {
          name: 'أتمتة الردود الآلية',
          status: 'نشط',
          triggers: 12,
          success: 98,
          description: 'ردود تلقائية على استفسارات العملاء'
        },
        {
          name: 'معالجة البيانات',
          status: 'نشط', 
          triggers: 8,
          success: 95,
          description: 'معالجة وتصنيف البيانات تلقائياً'
        },
        {
          name: 'تقارير دورية',
          status: 'متوقف',
          triggers: 24,
          success: 92,
          description: 'إنشاء التقارير الدورية تلقائياً'
        }
      ],
      triggers_data: [
        'وصول رسالة جديدة',
        'تحديث البيانات',
        'جدولة زمنية',
        'حدث مخصص'
      ],
      actions_data: [
        'إرسال إشعار',
        'معالجة البيانات',
        'إنشاء تقرير',
        'تحديث قاعدة البيانات'
      ],
      status: 'الحالة',
      edit: 'تعديل',
      delete: 'حذف',
      pause: 'إيقاف مؤقت',
      resume: 'استئناف',
      view: 'عرض',
      newTrigger: 'محفز جديد',
      newAction: 'إجراء جديد',
      // Visual Workflow Data
      visualWorkflow: {
        title: 'سير العمل المرئي',
        subtitle: 'صمم وأنشئ مخططات سير العمل التفاعلية بسهولة',
        startDesigning: 'ابدأ التصميم',
        features: {
          title: 'المميزات الرئيسية',
          dragDrop: 'سحب وإفلات',
          dragDropDesc: 'واجهة سهلة لإنشاء المخططات',
          templates: 'قوالب جاهزة',
          templatesDesc: 'مجموعة متنوعة من القوالب المهنية',
          collaboration: 'تعاون فوري',
          collaborationDesc: 'شارك وتعاون مع فريقك',
          export: 'تصدير متقدم',
          exportDesc: 'احفظ مخططاتك بصيغ متعددة'
        },
        stats: {
          templates: 'قالب جاهز',
          users: 'مستخدم نشط',
          workflows: 'مخطط منجز',
          integrations: 'تكامل متاح'
        },
        quickActions: {
          title: 'إجراءات سريعة',
          newWorkflow: 'مخطط جديد',
          openTemplate: 'فتح قالب',
          importFile: 'استيراد ملف',
          viewGallery: 'معرض التصاميم'
        },
        recentWorkflows: {
          title: 'المخططات الأخيرة',
          noWorkflows: 'لا توجد مخططات حديثة',
          createFirst: 'أنشئ أول مخطط لك'
        }
      }
    },
    en: {
      title: 'Automation',
      subtitle: 'Comprehensive Workflow Automation & Intelligent Process Management',
      workflows: 'Workflows',
      workflowBuilder: 'Workflow Builder',
      triggers: 'Triggers',
      actions: 'Actions',
      analytics: 'Analytics',
      createWorkflow: 'Create New Workflow',
      activeWorkflows: 'Active Workflows',
      totalAutomations: 'Total Automations',
      successRate: 'Success Rate',
      timeSaved: 'Time Saved',
      workflows_data: [
        {
          name: 'Auto Response System',
          status: 'Active',
          triggers: 12,
          success: 98,
          description: 'Automated responses to customer inquiries'
        },
        {
          name: 'Data Processing',
          status: 'Active',
          triggers: 8,
          success: 95,
          description: 'Automatic data processing and classification'
        },
        {
          name: 'Periodic Reports',
          status: 'Paused',
          triggers: 24,
          success: 92,
          description: 'Automated periodic report generation'
        }
      ],
      triggers_data: [
        'New Message Received',
        'Data Update',
        'Schedule',
        'Custom Event'
      ],
      actions_data: [
        'Send Notification',
        'Process Data',
        'Generate Report',
        'Update Database'
      ],
      status: 'Status',
      edit: 'Edit',
      delete: 'Delete',
      pause: 'Pause',
      resume: 'Resume',
      view: 'View',
      newTrigger: 'New Trigger',
      newAction: 'New Action',
      // Visual Workflow Data
      visualWorkflow: {
        title: 'Visual Workflow Designer',
        subtitle: 'Design and create interactive workflow diagrams with ease',
        startDesigning: 'Start Designing',
        features: {
          title: 'Key Features',
          dragDrop: 'Drag & Drop',
          dragDropDesc: 'Intuitive interface for creating diagrams',
          templates: 'Ready Templates',
          templatesDesc: 'Variety of professional templates',
          collaboration: 'Real-time Collaboration',
          collaborationDesc: 'Share and collaborate with your team',
          export: 'Advanced Export',
          exportDesc: 'Save your diagrams in multiple formats'
        },
        stats: {
          templates: 'Templates Available',
          users: 'Active Users',
          workflows: 'Workflows Created',
          integrations: 'Integrations Available'
        },
        quickActions: {
          title: 'Quick Actions',
          newWorkflow: 'New Workflow',
          openTemplate: 'Open Template',
          importFile: 'Import File',
          viewGallery: 'View Gallery'
        },
        recentWorkflows: {
          title: 'Recent Workflows',
          noWorkflows: 'No recent workflows',
          createFirst: 'Create your first workflow'
        }
      }
    }
  };

  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [currentTab, setCurrentTab] = useState('overview');
  const [showWorkflow, setShowWorkflow] = useState(false);

  const stats = {
    activeWorkflows: 15,
    totalAutomations: 247,
    successRate: 96,
    timeSaved: 120
  };

  // Visual Workflow Stats
  const visualStats = [
    { label: texts[language].visualWorkflow.stats.templates, value: '50+', icon: FileText, color: 'text-blue-500' },
    { label: texts[language].visualWorkflow.stats.users, value: '1,200+', icon: Users, color: 'text-green-500' },
    { label: texts[language].visualWorkflow.stats.workflows, value: '5,400+', icon: Zap, color: 'text-purple-500' },
    { label: texts[language].visualWorkflow.stats.integrations, value: '25+', icon: Settings, color: 'text-orange-500' }
  ];

  const recentWorkflows = [
    {
      id: 1,
      name: language === 'ar' ? 'عملية الموافقة' : 'Approval Process',
      lastModified: language === 'ar' ? 'منذ ساعتين' : '2 hours ago',
      nodes: 12,
      status: 'published'
    },
    {
      id: 2,
      name: language === 'ar' ? 'إدارة المشاريع' : 'Project Management',
      lastModified: language === 'ar' ? 'أمس' : 'Yesterday',
      nodes: 8,
      status: 'draft'
    },
    {
      id: 3,
      name: language === 'ar' ? 'خدمة العملاء' : 'Customer Service',
      lastModified: language === 'ar' ? 'منذ 3 أيام' : '3 days ago',
      nodes: 15,
      status: 'published'
    }
  ];

  const features = [
    {
      icon: Palette,
      title: texts[language].visualWorkflow.features.dragDrop,
      description: texts[language].visualWorkflow.features.dragDropDesc,
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: FileText,
      title: texts[language].visualWorkflow.features.templates,
      description: texts[language].visualWorkflow.features.templatesDesc,
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: texts[language].visualWorkflow.features.collaboration,
      description: texts[language].visualWorkflow.features.collaborationDesc,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Download,
      title: texts[language].visualWorkflow.features.export,
      description: texts[language].visualWorkflow.features.exportDesc,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const renderOverviewContent = () => (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workflows */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="section-title text-xl">{texts[language].workflows}</h3>
              <Button variant="outline" size="sm">
                {texts[language].view}
              </Button>
            </div>
            
            <div className="space-y-4">
              {texts[language].workflows_data.map((workflow, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-[#4F97FF]/50 ${
                    selectedWorkflow === index ? 'border-[#4F97FF] bg-[#4F97FF]/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedWorkflow(index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{workflow.name}</h4>
                      <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    </div>
                    <Badge 
                      variant={workflow.status === 'نشط' || workflow.status === 'Active' ? 'default' : 'secondary'}
                      className={workflow.status === 'نشط' || workflow.status === 'Active' ? 'bg-green-500' : ''}
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">{texts[language].triggers}: </span>
                      <span className="font-medium">{workflow.triggers}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{texts[language].successRate}: </span>
                      <span className="font-medium text-green-500">{workflow.success}%</span>
                    </div>
                  </div>
                  
                  <Progress value={workflow.success} className="mt-3" />
                  
                  <div className={`flex gap-2 mt-4 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                    <Button variant="ghost" size="sm">
                      {texts[language].edit}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {workflow.status === 'نشط' || workflow.status === 'Active' ? texts[language].pause : texts[language].resume}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Triggers & Actions */}
        <div className="space-y-6">
          {/* Triggers */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{texts[language].triggers}</h3>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {texts[language].newTrigger}
              </Button>
            </div>
            
            <div className="space-y-3">
              {texts[language].triggers_data.map((trigger, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-[#4F97FF] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">{trigger}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{texts[language].actions}</h3>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {texts[language].newAction}
              </Button>
            </div>
            
            <div className="space-y-3">
              {texts[language].actions_data.map((action, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-[#1ABC9C] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">{action}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderWorkflowsContent = () => (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="section-title text-xl mb-6">{texts[language].workflows}</h3>
          <div className="space-y-4">
            {texts[language].workflows_data.map((workflow, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-[#4F97FF]/50 ${
                  selectedWorkflow === index ? 'border-[#4F97FF] bg-[#4F97FF]/5' : 'border-border'
                }`}
                onClick={() => setSelectedWorkflow(index)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{workflow.name}</h4>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                  </div>
                  <Badge 
                    variant={workflow.status === 'نشط' || workflow.status === 'Active' ? 'default' : 'secondary'}
                    className={workflow.status === 'نشط' || workflow.status === 'Active' ? 'bg-green-500' : ''}
                  >
                    {workflow.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{texts[language].triggers}: </span>
                    <span className="font-medium">{workflow.triggers}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{texts[language].successRate}: </span>
                    <span className="font-medium text-green-500">{workflow.success}%</span>
                  </div>
                </div>
                
                <Progress value={workflow.success} className="mt-3" />
                
                <div className={`flex gap-2 mt-4 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                  <Button variant="ghost" size="sm">
                    {texts[language].edit}
                  </Button>
                  <Button variant="ghost" size="sm">
                    {workflow.status === 'نشط' || workflow.status === 'Active' ? texts[language].pause : texts[language].resume}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column - Triggers & Actions */}
        <div className="space-y-6">
          {/* Triggers */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{texts[language].triggers}</h3>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {texts[language].newTrigger}
              </Button>
            </div>
            
            <div className="space-y-3">
              {texts[language].triggers_data.map((trigger, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-[#4F97FF] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">{trigger}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{texts[language].actions}</h3>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {texts[language].newAction}
              </Button>
            </div>
            
            <div className="space-y-3">
              {texts[language].actions_data.map((action, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-[#1ABC9C] rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">{action}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-4">Performance Analytics</h3>
          <div className="text-3xl font-bold text-[#4F97FF] mb-2">96.5%</div>
          <p className="text-muted-foreground">Success Rate</p>
        </Card>
        
        <Card className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-4">Execution Time</h3>
          <div className="text-3xl font-bold text-[#1ABC9C] mb-2">2.3s</div>
          <p className="text-muted-foreground">Average Response</p>
        </Card>
        
        <Card className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-4">Cost Savings</h3>
          <div className="text-3xl font-bold text-[#f59e0b] mb-2">$12.5K</div>
          <p className="text-muted-foreground">Monthly Savings</p>
        </Card>
      </div>
    </div>
  );

  // Visual Workflow Builder Content
  const renderVisualWorkflowContent = () => (
    <div className="h-full w-full bg-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#9333EA]/10 to-[#4F97FF]/10 rounded-full filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-[#4F97FF]/10 to-[#1ABC9C]/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#1ABC9C]/5 to-[#9333EA]/5 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Centered Container with Enhanced Layout */}
      <div className="h-full w-full flex items-center justify-center relative z-10">
        <div className="w-full max-w-6xl h-full mx-auto px-4 py-8 flex flex-col">
          
          {/* Enhanced Hero Section */}
          <div className="text-center mb-12 backdrop-blur-sm bg-card/30 rounded-2xl p-8 border border-border/20 shadow-lg">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9333EA]/20 to-[#4F97FF]/20 px-4 py-2 rounded-full mb-6">
              <Zap className="h-4 w-4 text-[#9333EA]" />
              <span className="text-sm font-medium text-foreground">
                {language === 'ar' ? 'محرر مرئي متقدم' : 'Advanced Visual Editor'}
              </span>
            </div>
            
            <h1 className="hero-text bg-gradient-to-r from-[#9333EA] to-[#4F97FF] bg-clip-text text-transparent mb-4">
              {texts[language].visualWorkflow.title}
            </h1>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto mb-8">
              {texts[language].visualWorkflow.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowWorkflow(true)}
                className="btn-primary hover-scale px-8 py-3 bg-gradient-to-r from-[#9333EA] to-[#4F97FF] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2" />
                {texts[language].visualWorkflow.startDesigning}
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 border-border/50 hover:bg-card/50 backdrop-blur-sm"
              >
                <FileText className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'استعراض القوالب' : 'Browse Templates'}
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {visualStats.map((stat, index) => (
              <Card key={index} className="text-center backdrop-blur-sm bg-card/50 border-border/30 hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6 pb-4">
                  <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-background to-muted flex items-center justify-center shadow-md`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Main Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
            
            {/* Enhanced Quick Actions Panel */}
            <Card className="lg:col-span-1 backdrop-blur-sm bg-card/50 border-border/30 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#9333EA]" />
                  {texts[language].visualWorkflow.quickActions.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setShowWorkflow(true)}
                  className="w-full justify-start bg-gradient-to-r from-[#9333EA] to-[#4F97FF] hover:from-[#7C3AED] hover:to-[#3B82F6] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {texts[language].visualWorkflow.quickActions.newWorkflow}
                </Button>
                
                <Button variant="outline" className="w-full justify-start hover:bg-card/70 border-border/50">
                  <Palette className="h-4 w-4 mr-2" />
                  {texts[language].visualWorkflow.quickActions.openTemplate}
                </Button>
                
                <Button variant="outline" className="w-full justify-start hover:bg-card/70 border-border/50">
                  <Download className="h-4 w-4 mr-2" />
                  {texts[language].visualWorkflow.quickActions.importFile}
                </Button>
                
                <Button variant="outline" className="w-full justify-start hover:bg-card/70 border-border/50">
                  <FileText className="h-4 w-4 mr-2" />
                  {texts[language].visualWorkflow.quickActions.viewGallery}
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Recent Workflows Panel */}
            <Card className="lg:col-span-2 backdrop-blur-sm bg-card/50 border-border/30 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#4F97FF]" />
                  {texts[language].visualWorkflow.recentWorkflows.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-80">
                {recentWorkflows.length > 0 ? (
                  <div className="space-y-3">
                    {recentWorkflows.map((workflow) => (
                      <div key={workflow.id} className="p-4 border border-border/30 rounded-lg hover:bg-muted/30 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{workflow.name}</h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {workflow.lastModified}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {workflow.nodes} {language === 'ar' ? 'عقدة' : 'nodes'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <Badge 
                              variant={workflow.status === 'published' ? 'default' : 'secondary'}
                              className={`text-xs ${workflow.status === 'published' ? 'bg-green-500 hover:bg-green-600' : ''}`}
                            >
                              {workflow.status === 'published' ? 
                                (language === 'ar' ? 'منشور' : 'Published') : 
                                (language === 'ar' ? 'مسودة' : 'Draft')
                              }
                            </Badge>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted/50">
                              <Share className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted/50">
                              <Save className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#9333EA]/10 to-[#4F97FF]/10 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{texts[language].visualWorkflow.recentWorkflows.noWorkflows}</h3>
                    <p className="text-muted-foreground mb-6 text-sm">{texts[language].visualWorkflow.recentWorkflows.createFirst}</p>
                    <Button 
                      onClick={() => setShowWorkflow(true)}
                      className="bg-gradient-to-r from-[#9333EA] to-[#4F97FF] shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {texts[language].visualWorkflow.quickActions.newWorkflow}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Features Section at Bottom */}
          <Card className="mt-6 backdrop-blur-sm bg-card/50 border-border/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                <Palette className="h-5 w-5 text-[#1ABC9C]" />
                {texts[language].visualWorkflow.features.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderCurrentTabContent = () => {
    switch (currentTab) {
      case 'builder':
        return <WorkflowBuilder language={language} />;
      case 'actions':
        return <ActionLibrary language={language} />;
      case 'triggers':
        return <TriggerSystem language={language} />;
      case 'dashboard':
        return <AnalyticsDashboard language={language} />;
      case 'alerts':
        return <SmartAlerts language={language} />;
      case 'testing':
        return <TestingSuite language={language} />;
      case 'performance':
        return <PerformanceOptimizer language={language} />;
      case 'animations':
        return <AnimationShowcase language={language} />;
      case 'manager':
        return <WorkflowManager language={language} />;
      case 'workflows':
        return renderWorkflowsContent();
      case 'analytics':
        return renderAnalyticsContent();
      case 'visual-workflow':
        return renderVisualWorkflowContent();
      case 'overview':
      default:
        return renderOverviewContent();
    }
  };

  // Full Screen Workflow Builder with Chat Sidebar
  if (showWorkflow) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <ChatSidebar language={language} />
        <div className="h-screen w-full">
          <MinimalistCanvas language={language} onClose={() => setShowWorkflow(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-background via-card to-background border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="hero-text bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] bg-clip-text text-transparent">
              {texts[language].title}
            </h1>
            <p className="body-large text-muted-foreground mt-6 max-w-3xl mx-auto">
              {texts[language].subtitle}
            </p>
            <Button className="btn-primary hover-scale mt-8 px-8 py-3">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {texts[language].createWorkflow}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center card-shadow-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4F97FF] to-[#1ABC9C] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-[#4F97FF]">{stats.activeWorkflows}</h3>
            <p className="text-muted-foreground">{texts[language].activeWorkflows}</p>
          </Card>

          <Card className="p-6 text-center card-shadow-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1ABC9C] to-[#4F97FF] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-[#1ABC9C]">{stats.totalAutomations}</h3>
            <p className="text-muted-foreground">{texts[language].totalAutomations}</p>
          </Card>

          <Card className="p-6 text-center card-shadow-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4F97FF] to-[#1ABC9C] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-[#4F97FF]">{stats.successRate}%</h3>
            <p className="text-muted-foreground">{texts[language].successRate}</p>
          </Card>

          <Card className="p-6 text-center card-shadow-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1ABC9C] to-[#4F97FF] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-[#1ABC9C]">{stats.timeSaved}h</h3>
            <p className="text-muted-foreground">{texts[language].timeSaved}</p>
          </Card>
        </div>

        {/* Enhanced Navigation */}
        <AutomationNavigation 
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          language={language}
        />

        {/* Main Content */}
        {renderCurrentTabContent()}
      </div>
    </div>
  );
}