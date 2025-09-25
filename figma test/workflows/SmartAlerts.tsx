'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';

interface SmartAlertsProps {
  language: 'ar' | 'en';
}

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  timestamp: string;
  source: string;
  isRead: boolean;
  isResolved: boolean;
  actions?: AlertAction[];
}

interface AlertAction {
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  action: string;
}

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  channels: string[];
  cooldown: number;
}

export function SmartAlerts({ language }: SmartAlertsProps) {
  const isRTL = language === 'ar';
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);

  const texts = {
    ar: {
      title: 'نظام التنبيهات الذكي',
      subtitle: 'مراقبة وإدارة التنبيهات في الوقت الفعلي مع الذكاء الاصطناعي',
      activeAlerts: 'التنبيهات النشطة',
      alertRules: 'قواعد التنبيه',
      alertHistory: 'تاريخ التنبيهات',
      settings: 'الإعدادات',
      allAlerts: 'جميع التنبيهات',
      unread: 'غير مقروءة',
      critical: 'حرجة',
      high: 'عالية',
      medium: 'متوسطة',
      low: 'منخفضة',
      resolved: 'محلولة',
      createRule: 'إنشاء قاعدة جديدة',
      editRule: 'تعديل القاعدة',
      deleteRule: 'حذف القاعدة',
      markAsRead: 'تحديد كمقروءة',
      markAsResolved: 'تحديد كمحلولة',
      search: 'البحث في التنبيهات...',
      filterBy: 'تصفية حسب',
      severity: 'الخطورة',
      category: 'الفئة',
      source: 'المصدر',
      timestamp: 'الوقت',
      message: 'الرسالة',
      actions: 'الإجراءات',
      ruleName: 'اسم القاعدة',
      condition: 'الشرط',
      threshold: 'الحد الأدنى',
      channels: 'قنوات الإشعار',
      cooldown: 'فترة التهدئة',
      email: 'البريد الإلكتروني',
      sms: 'رسائل نصية',
      slack: 'سلاك',
      webhook: 'Webhook',
      minutes: 'دقيقة',
      hours: 'ساعة',
      days: 'يوم',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      enable: 'تفعيل',
      disable: 'إلغاء التفعيل',
      realTimeMonitoring: 'المراقبة في الوقت الفعلي',
      alertFrequency: 'تكرار التنبيهات',
      notificationChannels: 'قنوات الإشعار',
      prioritySettings: 'إعدادات الأولوية',
      autoResolution: 'الحل التلقائي',
      escalationRules: 'قواعد التصعيد',
      maintenanceMode: 'وضع الصيانة',
      systemHealth: 'صحة النظام',
      performance: 'الأداء',
      security: 'الأمان',
      dataQuality: 'جودة البيانات',
      workflow: 'سير العمل',
      user: 'المستخدم',
      api: 'واجهة برمجة التطبيقات',
      database: 'قاعدة البيانات',
      network: 'الشبكة',
      storage: 'التخزين',
      recent: 'الأحدث',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      acknowledge: 'إقرار',
      investigate: 'تحقيق',
      resolve: 'حل',
      ignore: 'تجاهل'
    },
    en: {
      title: 'Smart Alerts System',
      subtitle: 'Real-time alert monitoring and management with AI intelligence',
      activeAlerts: 'Active Alerts',
      alertRules: 'Alert Rules',
      alertHistory: 'Alert History',
      settings: 'Settings',
      allAlerts: 'All Alerts',
      unread: 'Unread',
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      resolved: 'Resolved',
      createRule: 'Create New Rule',
      editRule: 'Edit Rule',
      deleteRule: 'Delete Rule',
      markAsRead: 'Mark as Read',
      markAsResolved: 'Mark as Resolved',
      search: 'Search alerts...',
      filterBy: 'Filter by',
      severity: 'Severity',
      category: 'Category',
      source: 'Source',
      timestamp: 'Timestamp',
      message: 'Message',
      actions: 'Actions',
      ruleName: 'Rule Name',
      condition: 'Condition',
      threshold: 'Threshold',
      channels: 'Notification Channels',
      cooldown: 'Cooldown Period',
      email: 'Email',
      sms: 'SMS',
      slack: 'Slack',
      webhook: 'Webhook',
      minutes: 'Minutes',
      hours: 'Hours',
      days: 'Days',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      enable: 'Enable',
      disable: 'Disable',
      realTimeMonitoring: 'Real-time Monitoring',
      alertFrequency: 'Alert Frequency',
      notificationChannels: 'Notification Channels',
      prioritySettings: 'Priority Settings',
      autoResolution: 'Auto Resolution',
      escalationRules: 'Escalation Rules',
      maintenanceMode: 'Maintenance Mode',
      systemHealth: 'System Health',
      performance: 'Performance',
      security: 'Security',
      dataQuality: 'Data Quality',
      workflow: 'Workflow',
      user: 'User',
      api: 'API',
      database: 'Database',
      network: 'Network',
      storage: 'Storage',
      recent: 'Recent',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      acknowledge: 'Acknowledge',
      investigate: 'Investigate',
      resolve: 'Resolve',
      ignore: 'Ignore'
    }
  };

  // Sample alerts data
  useEffect(() => {
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        title: 'High CPU Usage Detected',
        message: 'CPU usage has exceeded 85% for the last 5 minutes on server-01',
        severity: 'high',
        category: 'performance',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        source: 'server-01',
        isRead: false,
        isResolved: false,
        actions: [
          { label: texts[language].acknowledge, type: 'secondary', action: 'acknowledge' },
          { label: texts[language].investigate, type: 'primary', action: 'investigate' }
        ]
      },
      {
        id: '2',
        title: 'Failed Login Attempts',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        severity: 'critical',
        category: 'security',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        source: 'auth-service',
        isRead: false,
        isResolved: false,
        actions: [
          { label: 'Block IP', type: 'danger', action: 'block_ip' },
          { label: texts[language].investigate, type: 'primary', action: 'investigate' }
        ]
      },
      {
        id: '3',
        title: 'Workflow Execution Failed',
        message: 'Email automation workflow failed to execute due to SMTP timeout',
        severity: 'medium',
        category: 'workflow',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        source: 'workflow-engine',
        isRead: true,
        isResolved: false,
        actions: [
          { label: texts[language].resolve, type: 'primary', action: 'resolve' },
          { label: 'Retry', type: 'secondary', action: 'retry' }
        ]
      },
      {
        id: '4',
        title: 'Database Connection Pool Full',
        message: 'Database connection pool has reached maximum capacity',
        severity: 'high',
        category: 'database',
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        source: 'db-primary',
        isRead: true,
        isResolved: true,
        actions: [
          { label: 'Scale Up', type: 'primary', action: 'scale_up' }
        ]
      },
      {
        id: '5',
        title: 'Low Disk Space Warning',
        message: 'Available disk space is below 10% on storage volume /data',
        severity: 'medium',
        category: 'storage',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        source: 'storage-monitor',
        isRead: true,
        isResolved: false,
        actions: [
          { label: 'Clean Up', type: 'primary', action: 'cleanup' },
          { label: texts[language].ignore, type: 'secondary', action: 'ignore' }
        ]
      }
    ];

    setAlerts(sampleAlerts);
  }, [language]);

  // Sample alert rules
  useEffect(() => {
    const sampleRules: AlertRule[] = [
      {
        id: '1',
        name: 'High CPU Usage',
        condition: 'cpu_usage > threshold',
        threshold: 85,
        severity: 'high',
        isActive: true,
        channels: ['email', 'slack'],
        cooldown: 300
      },
      {
        id: '2',
        name: 'Failed Login Attempts',
        condition: 'failed_logins > threshold',
        threshold: 5,
        severity: 'critical',
        isActive: true,
        channels: ['email', 'sms', 'slack'],
        cooldown: 600
      },
      {
        id: '3',
        name: 'Memory Usage',
        condition: 'memory_usage > threshold',
        threshold: 90,
        severity: 'high',
        isActive: true,
        channels: ['email'],
        cooldown: 300
      },
      {
        id: '4',
        name: 'Workflow Failure Rate',
        condition: 'workflow_failure_rate > threshold',
        threshold: 10,
        severity: 'medium',
        isActive: false,
        channels: ['slack'],
        cooldown: 900
      }
    ];

    setAlertRules(sampleRules);
  }, []);

  // Real-time alert simulation
  useEffect(() => {
    if (!realTimeAlerts) return;

    const interval = setInterval(() => {
      // Simulate new alerts randomly
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const newAlert: Alert = {
          id: Date.now().toString(),
          title: 'Real-time Alert',
          message: `System alert triggered at ${new Date().toLocaleTimeString()}`,
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          category: 'system',
          timestamp: new Date().toISOString(),
          source: 'monitor',
          isRead: false,
          isResolved: false,
          actions: [
            { label: texts[language].acknowledge, type: 'secondary', action: 'acknowledge' }
          ]
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]); // Keep last 20 alerts
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeAlerts, language]);

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = selectedFilter === 'all' || 
                         alert.severity === selectedFilter || 
                         (selectedFilter === 'unread' && !alert.isRead) ||
                         (selectedFilter === 'resolved' && alert.isResolved);
    
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return '⚡';
      case 'security': return '🔒';
      case 'workflow': return '🔄';
      case 'database': return '🗄️';
      case 'storage': return '💾';
      case 'network': return '🌐';
      case 'system': return '🖥️';
      default: return '📝';
    }
  };

  // Handle alert action
  const handleAlertAction = (alertId: string, action: string) => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        switch (action) {
          case 'acknowledge':
            return { ...alert, isRead: true };
          case 'resolve':
            return { ...alert, isRead: true, isResolved: true };
          default:
            return alert;
        }
      }
      return alert;
    }));
  };

  // Toggle alert rule
  const toggleAlertRule = (ruleId: string) => {
    setAlertRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-background via-card to-background border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="hero-text bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] bg-clip-text text-transparent">
                {texts[language].title}
              </h1>
              <p className="body-large text-muted-foreground mt-4">
                {texts[language].subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={realTimeAlerts}
                  onCheckedChange={setRealTimeAlerts}
                />
                <Label className="text-sm">{texts[language].realTimeMonitoring}</Label>
                <div className={`w-2 h-2 rounded-full ${realTimeAlerts ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              </div>
              
              <Dialog open={isCreateRuleOpen} onOpenChange={setIsCreateRuleOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {texts[language].createRule}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{texts[language].createRule}</DialogTitle>
                    <DialogDescription>
                      Create a new alert rule to monitor system conditions
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="ruleName" className="text-right">{texts[language].ruleName}</Label>
                      <Input id="ruleName" placeholder="Enter rule name" className="col-span-3" />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="condition" className="text-right">{texts[language].condition}</Label>
                      <Input id="condition" placeholder="cpu_usage > threshold" className="col-span-3" />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="threshold" className="text-right">{texts[language].threshold}</Label>
                      <div className="col-span-3 space-y-2">
                        <Slider defaultValue={[85]} max={100} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>85</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="severity" className="text-right">{texts[language].severity}</Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{texts[language].low}</SelectItem>
                          <SelectItem value="medium">{texts[language].medium}</SelectItem>
                          <SelectItem value="high">{texts[language].high}</SelectItem>
                          <SelectItem value="critical">{texts[language].critical}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">{texts[language].channels}</Label>
                      <div className="col-span-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="email" />
                          <Label htmlFor="email">{texts[language].email}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="sms" />
                          <Label htmlFor="sms">{texts[language].sms}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="slack" />
                          <Label htmlFor="slack">{texts[language].slack}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="webhook" />
                          <Label htmlFor="webhook">{texts[language].webhook}</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateRuleOpen(false)}>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className={`grid w-full grid-cols-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <TabsTrigger value="active">{texts[language].activeAlerts}</TabsTrigger>
            <TabsTrigger value="rules">{texts[language].alertRules}</TabsTrigger>
            <TabsTrigger value="history">{texts[language].alertHistory}</TabsTrigger>
            <TabsTrigger value="settings">{texts[language].settings}</TabsTrigger>
          </TabsList>

          {/* Active Alerts Tab */}
          <TabsContent value="active" className="mt-8">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{texts[language].allAlerts}</SelectItem>
                  <SelectItem value="unread">{texts[language].unread}</SelectItem>
                  <SelectItem value="critical">{texts[language].critical}</SelectItem>
                  <SelectItem value="high">{texts[language].high}</SelectItem>
                  <SelectItem value="medium">{texts[language].medium}</SelectItem>
                  <SelectItem value="low">{texts[language].low}</SelectItem>
                  <SelectItem value="resolved">{texts[language].resolved}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alert Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{alerts.filter(a => a.severity === 'critical' && !a.isResolved).length}</div>
                <div className="text-sm text-muted-foreground">{texts[language].critical}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{alerts.filter(a => a.severity === 'high' && !a.isResolved).length}</div>
                <div className="text-sm text-muted-foreground">{texts[language].high}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500">{alerts.filter(a => a.severity === 'medium' && !a.isResolved).length}</div>
                <div className="text-sm text-muted-foreground">{texts[language].medium}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{alerts.filter(a => a.isResolved).length}</div>
                <div className="text-sm text-muted-foreground">{texts[language].resolved}</div>
              </Card>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className={`p-4 transition-all hover:shadow-lg ${
                  !alert.isRead ? 'border-l-4 border-l-[#4F97FF]' : ''
                } ${alert.isResolved ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                        <span className="text-lg">{getCategoryIcon(alert.category)}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold ${!alert.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {alert.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                            {alert.isResolved && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                                {texts[language].resolved}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              <strong>{texts[language].severity}:</strong>
                              <Badge variant="outline" className={`ml-1 text-xs ${getSeverityColor(alert.severity)}/10`}>
                                {texts[language][alert.severity as keyof typeof texts[typeof language]]}
                              </Badge>
                            </span>
                            <span>
                              <strong>{texts[language].source}:</strong> {alert.source}
                            </span>
                          </div>
                          
                          {alert.actions && (
                            <div className="flex gap-2">
                              {alert.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant={action.type === 'primary' ? 'default' : action.type === 'danger' ? 'destructive' : 'outline'}
                                  onClick={() => handleAlertAction(alert.id, action.action)}
                                  className={action.type === 'primary' ? 'btn-primary' : ''}
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredAlerts.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-5 5v-5zM4.828 12l1.415 1.414L8.657 11l6.364 6.364-1.414 1.414L8.657 14l-6.364 6.364L.879 19.95L7.243 13.586 5.828 12.171 12.192 5.807l1.415 1.414L7.243 13.586 13.607 7.222l1.414 1.414L8.657 14.414 14.021 9.05l1.414 1.414L9.071 16.828 15.435 10.464l1.414 1.414L10.485 18.242z" />
                  </svg>
                  <p className="text-lg text-muted-foreground mb-2">No alerts found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Alert Rules Tab */}
          <TabsContent value="rules" className="mt-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="section-title text-xl">{texts[language].alertRules}</h3>
                <Button variant="outline" onClick={() => setIsCreateRuleOpen(true)}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {texts[language].createRule}
                </Button>
              </div>
              
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Switch 
                          checked={rule.isActive}
                          onCheckedChange={() => toggleAlertRule(rule.id)}
                        />
                        <div>
                          <h4 className="font-semibold">{rule.name}</h4>
                          <Badge variant="outline" className={`text-xs ${getSeverityColor(rule.severity)}/10 mt-1`}>
                            {texts[language][rule.severity as keyof typeof texts[typeof language]]}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <strong>{texts[language].condition}:</strong> {rule.condition}
                      </div>
                      <div>
                        <strong>{texts[language].threshold}:</strong> {rule.threshold}
                      </div>
                      <div>
                        <strong>{texts[language].cooldown}:</strong> {rule.cooldown / 60} {texts[language].minutes}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm">{texts[language].channels}:</strong>
                        {rule.channels.map((channel) => (
                          <Badge key={channel} variant="secondary" className="text-xs">
                            {texts[language][channel as keyof typeof texts[typeof language]]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Alert History Tab */}
          <TabsContent value="history" className="mt-8">
            <Card className="p-6">
              <h3 className="section-title text-xl mb-6">{texts[language].alertHistory}</h3>
              <div className="text-center py-12 text-muted-foreground">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg mb-2">Alert History</p>
                <p className="text-sm">Historical alert data will be available here</p>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="section-title text-xl mb-6">{texts[language].notificationChannels}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Slack Integration</Label>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="section-title text-xl mb-6">{texts[language].prioritySettings}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{texts[language].autoResolution}</Label>
                      <p className="text-sm text-muted-foreground">Automatically resolve alerts when conditions improve</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{texts[language].escalationRules}</Label>
                      <p className="text-sm text-muted-foreground">Enable alert escalation for unresolved issues</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{texts[language].maintenanceMode}</Label>
                      <p className="text-sm text-muted-foreground">Suppress non-critical alerts during maintenance</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}