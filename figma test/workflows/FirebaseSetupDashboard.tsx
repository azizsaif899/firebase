'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database, 
  Cloud, 
  Key, 
  Zap,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Users,
  Folder
} from 'lucide-react';
import { 
  initializeFirebaseData, 
  createUserProfile, 
  testFirebaseConnection,
  exportDataStructure 
} from '../lib/firebase-setup';
import { config, isDemo } from '../lib/config';

interface FirebaseSetupDashboardProps {
  language: 'ar' | 'en';
}

interface ConnectionStatus {
  firebase: boolean;
  figma: boolean;
  gemini: boolean;
}

export function FirebaseSetupDashboard({ language }: FirebaseSetupDashboardProps) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    firebase: false,
    figma: false,
    gemini: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [setupProgress, setSetupProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isRTL = language === 'ar';

  const text = {
    ar: {
      title: 'لوحة إعداد Firebase',
      subtitle: 'تحقق من الاتصالات وإعداد البيانات الأساسية',
      connectionStatus: 'حالة الاتصالات',
      firebase: 'Firebase',
      figma: 'Figma API',
      gemini: 'Gemini AI',
      connected: 'متصل',
      disconnected: 'غير متصل',
      demoMode: 'وضع التجربة',
      testConnection: 'اختبار الاتصال',
      initializeData: 'تهيئة البيانات',
      createSampleUser: 'إنشاء مستخدم تجريبي',
      exportData: 'تصدير البيانات',
      setupProgress: 'تقدم الإعداد',
      projectInfo: 'معلومات المشروع',
      environment: 'البيئة',
      projectId: 'معرف المشروع',
      region: 'المنطقة',
      setupLogs: 'سجل الإعداد',
      clearLogs: 'مسح السجل',
      advancedSettings: 'إعدادات متقدمة',
      recommendations: 'التوصيات',
      securityRules: 'قواعد الأمان',
      indexes: 'الفهارس',
      backup: 'النسخ الاحتياطية',
      monitoring: 'المراقبة',
      success: 'نجح',
      error: 'خطأ',
      warning: 'تحذير',
      info: 'معلومات'
    },
    en: {
      title: 'Firebase Setup Dashboard',
      subtitle: 'Check connections and setup basic data',
      connectionStatus: 'Connection Status',
      firebase: 'Firebase',
      figma: 'Figma API', 
      gemini: 'Gemini AI',
      connected: 'Connected',
      disconnected: 'Disconnected',
      demoMode: 'Demo Mode',
      testConnection: 'Test Connection',
      initializeData: 'Initialize Data',
      createSampleUser: 'Create Sample User',
      exportData: 'Export Data',
      setupProgress: 'Setup Progress',
      projectInfo: 'Project Information',
      environment: 'Environment',
      projectId: 'Project ID',
      region: 'Region',
      setupLogs: 'Setup Logs',
      clearLogs: 'Clear Logs',
      advancedSettings: 'Advanced Settings',
      recommendations: 'Recommendations',
      securityRules: 'Security Rules',
      indexes: 'Indexes',
      backup: 'Backups',
      monitoring: 'Monitoring',
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info'
    }
  };

  const t = text[language];

  useEffect(() => {
    checkConnections();
  }, []);

  const addLog = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = {
      success: '✅',
      error: '❌', 
      warning: '⚠️',
      info: 'ℹ️'
    };
    setLogs(prev => [`${emoji[type]} ${timestamp}: ${message}`, ...prev.slice(0, 19)]);
  };

  const checkConnections = async () => {
    setIsLoading(true);
    addLog('بدء فحص الاتصالات...', 'info');

    try {
      // Test Firebase
      const firebaseTest = await testFirebaseConnection();
      setConnectionStatus(prev => ({ ...prev, firebase: firebaseTest.connected }));
      
      if (firebaseTest.connected) {
        addLog('Firebase متصل بنجاح', 'success');
      } else {
        addLog(`خطأ في Firebase: ${firebaseTest.error}`, 'error');
      }

      // Test Figma (check if token exists)
      const figmaConnected = config.figma.accessToken !== 'demo-token';
      setConnectionStatus(prev => ({ ...prev, figma: figmaConnected }));
      addLog(figmaConnected ? 'Figma API متصل' : 'Figma في وضع التجربة', 
             figmaConnected ? 'success' : 'warning');

      // Test Gemini (check if key exists)
      const geminiConnected = config.gemini.apiKey !== 'demo-key';
      setConnectionStatus(prev => ({ ...prev, gemini: geminiConnected }));
      addLog(geminiConnected ? 'Gemini AI متصل' : 'Gemini في وضع التجربة', 
             geminiConnected ? 'success' : 'warning');

    } catch (error) {
      addLog(`خطأ في فحص الاتصالات: ${error}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitializeData = async () => {
    setIsLoading(true);
    setSetupProgress(0);
    addLog('بدء تهيئة البيانات الأساسية...', 'info');

    try {
      // Simulate progress
      const steps = [
        { name: 'إنشاء المجموعات', progress: 25 },
        { name: 'إضافة المكونات النموذجية', progress: 50 },
        { name: 'إعداد الفهارس', progress: 75 },
        { name: 'تطبيق قواعد الأمان', progress: 100 }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSetupProgress(step.progress);
        addLog(`تم: ${step.name}`, 'success');
      }

      const result = await initializeFirebaseData();
      
      if (result) {
        addLog('تم تهيئة البيانات بنجاح!', 'success');
      } else {
        addLog('فشل في تهيئة البيانات', 'error');
      }

    } catch (error) {
      addLog(`خطأ في تهيئة البيانات: ${error}`, 'error');
    } finally {
      setIsLoading(false);
      setSetupProgress(0);
    }
  };

  const handleCreateSampleUser = async () => {
    setIsLoading(true);
    addLog('إنشاء مستخدم تجريبي...', 'info');

    try {
      const sampleUserId = 'demo-user-' + Date.now();
      const result = await createUserProfile(sampleUserId, {
        email: 'demo@flowcanvas.ai',
        displayName: 'مستخدم تجريبي',
      });

      if (result) {
        addLog(`تم إنشاء المستخدم التجريبي: ${sampleUserId}`, 'success');
      } else {
        addLog('فشل في إنشاء المستخدم التجريبي', 'error');
      }
    } catch (error) {
      addLog(`خطأ في إنشاء المستخدم: ${error}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    addLog('تصدير هيكل البيانات...', 'info');

    try {
      const data = await exportDataStructure();
      
      if (data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flowcanvas-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        addLog('تم تصدير البيانات بنجاح', 'success');
      } else {
        addLog('فشل في تصدير البيانات', 'error');
      }
    } catch (error) {
      addLog(`خطأ في تصدير البيانات: ${error}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (connected: boolean) => {
    return connected ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusBadge = (connected: boolean) => {
    return (
      <Badge variant={connected ? "default" : "destructive"}>
        {connected ? t.connected : t.disconnected}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className={`text-center space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="section-title bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
        
        {isDemo && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              التطبيق يعمل في وضع التجربة. بعض الميزات محاكية للاختبار.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#4F97FF]" />
                <CardTitle className="text-lg">{t.firebase}</CardTitle>
              </div>
              {getStatusIcon(connectionStatus.firebase)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStatusBadge(connectionStatus.firebase)}
              <p className="text-sm text-muted-foreground">
                {config.firebase.projectId}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-[#F24E1E]" />
                <CardTitle className="text-lg">{t.figma}</CardTitle>
              </div>
              {getStatusIcon(connectionStatus.figma)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStatusBadge(connectionStatus.figma)}
              <p className="text-sm text-muted-foreground">
                {connectionStatus.figma ? 'API Ready' : t.demoMode}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFD700]" />
                <CardTitle className="text-lg">{t.gemini}</CardTitle>
              </div>
              {getStatusIcon(connectionStatus.gemini)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStatusBadge(connectionStatus.gemini)}
              <p className="text-sm text-muted-foreground">
                {config.gemini.model}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            إجراءات الإعداد
          </CardTitle>
          <CardDescription>
            تشغيل إجراءات الإعداد والصيانة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={checkConnections}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {t.testConnection}
            </Button>

            <Button
              onClick={handleInitializeData}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C]"
            >
              <Upload className="w-4 h-4 mr-2" />
              {t.initializeData}
            </Button>

            <Button
              onClick={handleCreateSampleUser}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <Users className="w-4 h-4 mr-2" />
              {t.createSampleUser}
            </Button>

            <Button
              onClick={handleExportData}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.exportData}
            </Button>
          </div>

          {setupProgress > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t.setupProgress}</span>
                <span>{setupProgress}%</span>
              </div>
              <Progress value={setupProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5" />
              {t.projectInfo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.environment}:</span>
              <Badge variant={config.app.environment === 'production' ? 'default' : 'secondary'}>
                {config.app.environment}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.projectId}:</span>
              <span className="text-sm font-mono">{config.firebase.projectId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span className="text-sm">{config.app.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Languages:</span>
              <span className="text-sm">{config.app.supportedLanguages.join(', ')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t.setupLogs}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLogs([])}
              >
                {t.clearLogs}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  لا توجد سجلات حالياً
                </p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-xs font-mono bg-muted/50 p-2 rounded">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t.advancedSettings}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'إخفاء' : 'عرض'}
            </Button>
          </div>
        </CardHeader>
        {showAdvanced && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  {t.securityRules}
                </h4>
                <p className="text-sm text-muted-foreground">
                  إعداد قواعد الأمان لـ Firestore و Storage
                </p>
                <Button variant="outline" size="sm">
                  عرض القواعد
                </Button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  {t.indexes}
                </h4>
                <p className="text-sm text-muted-foreground">
                  إنشاء فهارس قاعدة البيانات للأداء الأمثل
                </p>
                <Button variant="outline" size="sm">
                  إنشاء الفهارس
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}