'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface AnalyticsDashboardProps {
  language: 'ar' | 'en';
}

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  description?: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export function AnalyticsDashboard({ language }: AnalyticsDashboardProps) {
  const isRTL = language === 'ar';
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [realTimeData, setRealTimeData] = useState<ChartData[]>([]);
  const [isRealTime, setIsRealTime] = useState(true);

  const texts = {
    ar: {
      title: 'لوحة التحليلات المتقدمة',
      subtitle: 'مراقبة الأداء وتحليل البيانات في الوقت الفعلي',
      overview: 'نظرة عامة',
      performance: 'الأداء',
      workflows: 'سير العمل',
      usage: 'الاستخدام',
      alerts: 'التنبيهات',
      reports: 'التقارير',
      timeRange: 'الفترة الزمنية',
      lastHour: 'آخر ساعة',
      last24Hours: 'آخر 24 ساعة',
      last7Days: 'آخر 7 أيام',
      last30Days: 'آخر 30 يوم',
      last3Months: 'آخر 3 أشهر',
      realTime: 'الوقت الفعلي',
      toggleRealTime: 'تفعيل/إلغاء الوقت الفعلي',
      totalExecutions: 'إجمالي التنفيذات',
      successRate: 'معدل النجاح',
      avgResponseTime: 'متوسط وقت الاستجابة',
      activeWorkflows: 'سير العمل النشط',
      errorRate: 'معدل الأخطاء',
      dataProcessed: 'البيانات المعالجة',
      costSavings: 'التوفير في التكلفة',
      userSatisfaction: 'رضا المستخدمين',
      topPerforming: 'الأكثر أداءً',
      recentActivity: 'النشاط الأخير',
      systemHealth: 'صحة النظام',
      resourceUsage: 'استخدام الموارد',
      cpuUsage: 'استخدام المعالج',
      memoryUsage: 'استخدام الذاكرة',
      diskUsage: 'استخدام القرص',
      networkUsage: 'استخدام الشبكة',
      excellent: 'ممتاز',
      good: 'جيد',
      warning: 'تحذير',
      critical: 'حرج',
      exportReport: 'تصدير التقرير',
      refreshData: 'تحديث البيانات',
      viewDetails: 'عرض التفاصيل',
      configure: 'إعداد',
      since: 'منذ',
      change: 'التغيير',
      trend: 'الاتجاه',
      increasing: 'متزايد',
      decreasing: 'متناقص',
      stable: 'مستقر',
      workflowAnalytics: 'تحليلات سير العمل',
      executionTrends: 'اتجاهات التنفيذ',
      errorAnalysis: 'تحليل الأخطاء',
      performanceMetrics: 'مقاييس الأداء',
      usageStatistics: 'إحصائيات الاستخدام',
      alertsOverview: 'نظرة عامة على التنبيهات',
      reportsGenerated: 'التقارير المُنتجة',
      dataQuality: 'جودة البيانات',
      automationEfficiency: 'كفاءة الأتمتة',
      monthlyGrowth: 'النمو الشهري',
      weeklyGrowth: 'النمو الأسبوعي',
      dailyGrowth: 'النمو اليومي'
    },
    en: {
      title: 'Advanced Analytics Dashboard',
      subtitle: 'Real-time performance monitoring and data analytics',
      overview: 'Overview',
      performance: 'Performance',
      workflows: 'Workflows',
      usage: 'Usage',
      alerts: 'Alerts',
      reports: 'Reports',
      timeRange: 'Time Range',
      lastHour: 'Last Hour',
      last24Hours: 'Last 24 Hours',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last3Months: 'Last 3 Months',
      realTime: 'Real Time',
      toggleRealTime: 'Toggle Real Time',
      totalExecutions: 'Total Executions',
      successRate: 'Success Rate',
      avgResponseTime: 'Avg Response Time',
      activeWorkflows: 'Active Workflows',
      errorRate: 'Error Rate',
      dataProcessed: 'Data Processed',
      costSavings: 'Cost Savings',
      userSatisfaction: 'User Satisfaction',
      topPerforming: 'Top Performing',
      recentActivity: 'Recent Activity',
      systemHealth: 'System Health',
      resourceUsage: 'Resource Usage',
      cpuUsage: 'CPU Usage',
      memoryUsage: 'Memory Usage',
      diskUsage: 'Disk Usage',
      networkUsage: 'Network Usage',
      excellent: 'Excellent',
      good: 'Good',
      warning: 'Warning',
      critical: 'Critical',
      exportReport: 'Export Report',
      refreshData: 'Refresh Data',
      viewDetails: 'View Details',
      configure: 'Configure',
      since: 'Since',
      change: 'Change',
      trend: 'Trend',
      increasing: 'Increasing',
      decreasing: 'Decreasing',
      stable: 'Stable',
      workflowAnalytics: 'Workflow Analytics',
      executionTrends: 'Execution Trends',
      errorAnalysis: 'Error Analysis',
      performanceMetrics: 'Performance Metrics',
      usageStatistics: 'Usage Statistics',
      alertsOverview: 'Alerts Overview',
      reportsGenerated: 'Reports Generated',
      dataQuality: 'Data Quality',
      automationEfficiency: 'Automation Efficiency',
      monthlyGrowth: 'Monthly Growth',
      weeklyGrowth: 'Weekly Growth',
      dailyGrowth: 'Daily Growth'
    }
  };

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const now = new Date();
        const newData = {
          name: now.toLocaleTimeString(),
          value: Math.floor(Math.random() * 100) + 50
        };
        
        const updatedData = [...prev, newData];
        return updatedData.slice(-20); // Keep last 20 points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  // Sample metrics data
  const metrics: MetricCard[] = [
    {
      title: texts[language].totalExecutions,
      value: '1,247,891',
      change: 15.2,
      trend: 'up',
      icon: '⚡',
      color: 'bg-blue-500',
      description: '+189,234 since last week'
    },
    {
      title: texts[language].successRate,
      value: '98.5%',
      change: 2.1,
      trend: 'up',
      icon: '✅',
      color: 'bg-green-500',
      description: '+2.1% improvement'
    },
    {
      title: texts[language].avgResponseTime,
      value: '1.23s',
      change: -8.5,
      trend: 'down',
      icon: '⏱️',
      color: 'bg-purple-500',
      description: '8.5% faster response'
    },
    {
      title: texts[language].activeWorkflows,
      value: '247',
      change: 12.0,
      trend: 'up',
      icon: '🔄',
      color: 'bg-orange-500',
      description: '+26 new workflows'
    },
    {
      title: texts[language].errorRate,
      value: '1.5%',
      change: -15.3,
      trend: 'down',
      icon: '🚨',
      color: 'bg-red-500',
      description: '15.3% fewer errors'
    },
    {
      title: texts[language].costSavings,
      value: '$24.7K',
      change: 23.8,
      trend: 'up',
      icon: '💰',
      color: 'bg-emerald-500',
      description: '+$4.6K this month'
    },
    {
      title: texts[language].userSatisfaction,
      value: '94.2%',
      change: 4.7,
      trend: 'up',
      icon: '😊',
      color: 'bg-pink-500',
      description: 'Based on 1,250 reviews'
    },
    {
      title: texts[language].dataProcessed,
      value: '2.4TB',
      change: 18.9,
      trend: 'up',
      icon: '📊',
      color: 'bg-cyan-500',
      description: '+387GB this week'
    }
  ];

  // Sample workflow performance data
  const workflowPerformance = [
    { name: 'Email Automation', executions: 45678, successRate: 99.2, avgTime: '0.8s', status: 'excellent' },
    { name: 'Data Processing', executions: 34521, successRate: 97.8, avgTime: '2.1s', status: 'good' },
    { name: 'Report Generation', executions: 23456, successRate: 96.5, avgTime: '5.7s', status: 'good' },
    { name: 'API Integration', executions: 18765, successRate: 94.2, avgTime: '1.9s', status: 'warning' },
    { name: 'File Processing', executions: 12389, successRate: 98.9, avgTime: '3.4s', status: 'excellent' }
  ];

  // Sample resource usage data
  const resourceUsage = [
    { name: texts[language].cpuUsage, value: 67, status: 'good' },
    { name: texts[language].memoryUsage, value: 84, status: 'warning' },
    { name: texts[language].diskUsage, value: 45, status: 'excellent' },
    { name: texts[language].networkUsage, value: 58, status: 'good' }
  ];

  // Sample recent activity
  const recentActivity = [
    { time: '14:23', type: 'workflow', action: 'Email Campaign Completed', status: 'success' },
    { time: '14:21', type: 'trigger', action: 'New File Upload Detected', status: 'info' },
    { time: '14:18', type: 'action', action: 'Report Generated Successfully', status: 'success' },
    { time: '14:15', type: 'error', action: 'API Timeout - Retrying', status: 'warning' },
    { time: '14:12', type: 'workflow', action: 'Data Sync Started', status: 'info' },
    { time: '14:08', type: 'alert', action: 'High Memory Usage Detected', status: 'warning' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workflow': return '🔄';
      case 'trigger': return '⚡';
      case 'action': return '⚙️';
      case 'error': return '🚨';
      case 'alert': return '🔔';
      default: return '📝';
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'info': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
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
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">{texts[language].lastHour}</SelectItem>
                  <SelectItem value="24h">{texts[language].last24Hours}</SelectItem>
                  <SelectItem value="7d">{texts[language].last7Days}</SelectItem>
                  <SelectItem value="30d">{texts[language].last30Days}</SelectItem>
                  <SelectItem value="3m">{texts[language].last3Months}</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={isRealTime ? "default" : "outline"}
                onClick={() => setIsRealTime(!isRealTime)}
                className={isRealTime ? "btn-primary" : ""}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${isRealTime ? 'bg-white animate-pulse' : 'bg-muted-foreground'}`}></div>
                {texts[language].realTime}
              </Button>
              
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {texts[language].exportReport}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={`grid w-full grid-cols-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <TabsTrigger value="overview">{texts[language].overview}</TabsTrigger>
            <TabsTrigger value="performance">{texts[language].performance}</TabsTrigger>
            <TabsTrigger value="workflows">{texts[language].workflows}</TabsTrigger>
            <TabsTrigger value="usage">{texts[language].usage}</TabsTrigger>
            <TabsTrigger value="alerts">{texts[language].alerts}</TabsTrigger>
            <TabsTrigger value="reports">{texts[language].reports}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <Card key={index} className="p-6 card-shadow-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 ${metric.color} rounded-lg flex items-center justify-center text-lg`}>
                          {metric.icon}
                        </div>
                        <h3 className="font-medium text-sm text-muted-foreground">{metric.title}</h3>
                      </div>
                      <div className="text-2xl font-bold mb-1">{metric.value}</div>
                      <div className={`flex items-center gap-1 text-xs ${
                        metric.trend === 'up' ? 'text-green-500' : 
                        metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        <span className="text-base">{getTrendIcon(metric.trend)}</span>
                        <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                        <span className="text-muted-foreground">{texts[language].since} last week</span>
                      </div>
                      {metric.description && (
                        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts and Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Real-time Performance Chart */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="section-title text-xl">{texts[language].performanceMetrics}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-muted-foreground">
                      {isRealTime ? texts[language].realTime : 'Static'}
                    </span>
                  </div>
                </div>
                
                <div className="h-64 flex items-end justify-between gap-2">
                  {realTimeData.length > 0 ? realTimeData.map((data, index) => (
                    <div key={index} className="flex-1 bg-[#4F97FF]/20 rounded-t-lg relative" 
                         style={{ height: `${(data.value / 150) * 100}%` }}>
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-[#4F97FF] to-[#1ABC9C] rounded-t-lg"
                           style={{ height: '4px' }}></div>
                    </div>
                  )) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p>Enable real-time monitoring to see live data</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground text-center">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">{texts[language].recentActivity}</h3>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </Button>
                </div>
                
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          <Badge variant="outline" className={`text-xs ${getActivityColor(activity.status)}`}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* System Health */}
            <Card className="p-6 mt-8">
              <h3 className="section-title text-xl mb-6">{texts[language].systemHealth}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resourceUsage.map((resource, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{resource.name}</span>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(resource.status)}/10`}>
                        {texts[language][resource.status as keyof typeof texts[typeof language]]}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={resource.value} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span className="font-medium">{resource.value}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Execution Trends */}
              <Card className="p-6">
                <h3 className="section-title text-xl mb-6">{texts[language].executionTrends}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">1.2K</div>
                      <div className="text-xs text-muted-foreground">{texts[language].dailyGrowth}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">8.7K</div>
                      <div className="text-xs text-muted-foreground">{texts[language].weeklyGrowth}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-500">35.2K</div>
                      <div className="text-xs text-muted-foreground">{texts[language].monthlyGrowth}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Error Analysis */}
              <Card className="p-6">
                <h3 className="section-title text-xl mb-6">{texts[language].errorAnalysis}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">API Timeouts</span>
                    </div>
                    <span className="text-sm font-medium">23 (45%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Data Validation</span>
                    </div>
                    <span className="text-sm font-medium">18 (35%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Network Issues</span>
                    </div>
                    <span className="text-sm font-medium">10 (20%)</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="mt-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="section-title text-xl">{texts[language].workflowAnalytics}</h3>
                <Button variant="outline" size="sm">
                  {texts[language].viewDetails}
                </Button>
              </div>
              
              <div className="space-y-4">
                {workflowPerformance.map((workflow, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{workflow.name}</h4>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(workflow.status)}/10`}>
                          {texts[language][workflow.status as keyof typeof texts[typeof language]]}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Executions: </span>
                        <span className="font-medium">{workflow.executions.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success Rate: </span>
                        <span className="font-medium text-green-500">{workflow.successRate}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Time: </span>
                        <span className="font-medium">{workflow.avgTime}</span>
                      </div>
                      <div>
                        <Progress value={workflow.successRate} className="mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="section-title text-xl mb-6">{texts[language].usageStatistics}</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Most Active Hour</span>
                    <span className="font-medium">2:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Peak Day</span>
                    <span className="font-medium">Wednesday</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Top User</span>
                    <span className="font-medium">admin@company.com</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="section-title text-xl mb-6">{texts[language].automationEfficiency}</h3>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-[#4F97FF]/10 to-[#1ABC9C]/10 rounded-lg">
                    <div className="text-3xl font-bold text-[#4F97FF]">94.2%</div>
                    <div className="text-sm text-muted-foreground">Overall Efficiency</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">120h</div>
                      <div className="text-xs text-muted-foreground">Time Saved</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">$24.7K</div>
                      <div className="text-xs text-muted-foreground">Cost Saved</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-8">
            <Card className="p-6">
              <h3 className="section-title text-xl mb-6">{texts[language].alertsOverview}</h3>
              <div className="text-center py-12 text-muted-foreground">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-5 5v-5zM4.828 12l1.415 1.414L8.657 11l6.364 6.364-1.414 1.414L8.657 14l-6.364 6.364L.879 19.95L7.243 13.586 5.828 12.171 12.192 5.807l1.415 1.414L7.243 13.586 13.607 7.222l1.414 1.414L8.657 14.414 14.021 9.05l1.414 1.414L9.071 16.828 15.435 10.464l1.414 1.414L10.485 18.242z" />
                </svg>
                <p className="text-lg mb-2">Smart Alerts System</p>
                <p className="text-sm">Advanced alert system will be integrated in the next update</p>
              </div>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="mt-8">
            <Card className="p-6">
              <h3 className="section-title text-xl mb-6">{texts[language].reportsGenerated}</h3>
              <div className="text-center py-12 text-muted-foreground">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg mb-2">Advanced Reporting Suite</p>
                <p className="text-sm">Comprehensive reporting system coming soon</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}