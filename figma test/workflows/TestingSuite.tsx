'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { ScrollArea } from './ui/scroll-area';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Play, 
  Pause,
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  Zap,
  Eye
} from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  category: 'performance' | 'accessibility' | 'responsive' | 'functionality' | 'usability';
  status: 'passed' | 'failed' | 'warning' | 'running' | 'pending';
  score: number;
  duration: number;
  description: string;
  details?: string[];
}

interface TestingSuiteProps {
  language: 'ar' | 'en';
}

export function TestingSuite({ language }: TestingSuiteProps) {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [activeCategory, setActiveCategory] = useState('performance');

  const text = {
    ar: {
      title: 'مجموعة اختبارات الجودة الشاملة',
      description: 'نظام متطور لاختبار جودة التطبيق وأدائه',
      runAllTests: 'تشغيل جميع الاختبارات',
      resetTests: 'إعادة تعيين',
      overallScore: 'النتيجة الإجمالية',
      categories: {
        performance: 'الأداء',
        accessibility: 'إمكانية الوصول',
        responsive: 'التصميم المتجاوب',
        functionality: 'الوظائف',
        usability: 'سهولة الاستخدام'
      },
      status: {
        passed: 'نجح',
        failed: 'فشل',
        warning: 'تحذير',
        running: 'قيد التشغيل',
        pending: 'في الانتظار'
      },
      tests: {
        performance: [
          { name: 'سرعة التحميل', description: 'قياس زمن التحميل الأولي' },
          { name: 'الذاكرة', description: 'استهلاك الذاكرة' },
          { name: 'تحسين الصور', description: 'ضغط وتحسين الصور' },
          { name: 'JavaScript', description: 'تحسين كود JavaScript' },
          { name: 'CSS', description: 'تحسين ملفات CSS' }
        ],
        accessibility: [
          { name: 'تباين الألوان', description: 'فحص تباين الألوان' },
          { name: 'النصوص البديلة', description: 'فحص النصوص البديلة للصور' },
          { name: 'التنقل بلوحة المفاتيح', description: 'إمكانية التنقل بلوحة المفاتيح' },
          { name: 'عناصر ARIA', description: 'فحص عناصر ARIA للمساعدة' },
          { name: 'ترتيب العناوين', description: 'ترتيب عناوين الصفحة' }
        ],
        responsive: [
          { name: 'الهواتف الذكية', description: 'عرض الموقع على الهواتف' },
          { name: 'الأجهزة اللوحية', description: 'عرض الموقع على التابلت' },
          { name: 'شاشات سطح المكتب', description: 'عرض الموقع على الكمبيوتر' },
          { name: 'الاتجاهات', description: 'عرض أفقي وعمودي' },
          { name: 'التكيف', description: 'تكيف العناصر مع الشاشات' }
        ],
        functionality: [
          { name: 'التنقل', description: 'وظائف التنقل بين الصفحات' },
          { name: 'النماذج', description: 'وظائف النماذج والإدخال' },
          { name: 'الأزرار', description: 'استجابة الأزرار' },
          { name: 'الروابط', description: 'وظائف الروابط' },
          { name: 'JavaScript', description: 'وظائف JavaScript' }
        ],
        usability: [
          { name: 'سهولة التنقل', description: 'وضوح التنقل' },
          { name: 'قابلية القراءة', description: 'وضوح النصوص' },
          { name: 'التفاعل', description: 'سهولة التفاعل مع العناصر' },
          { name: 'التحميل', description: 'مؤشرات التحميل' },
          { name: 'الأخطاء', description: 'وضوح رسائل الأخطاء' }
        ]
      }
    },
    en: {
      title: 'Comprehensive Quality Testing Suite',
      description: 'Advanced system for testing application quality and performance',
      runAllTests: 'Run All Tests',
      resetTests: 'Reset Tests',
      overallScore: 'Overall Score',
      categories: {
        performance: 'Performance',
        accessibility: 'Accessibility',
        responsive: 'Responsive Design',
        functionality: 'Functionality',
        usability: 'Usability'
      },
      status: {
        passed: 'Passed',
        failed: 'Failed',
        warning: 'Warning',
        running: 'Running',
        pending: 'Pending'
      },
      tests: {
        performance: [
          { name: 'Load Speed', description: 'Measure initial load time' },
          { name: 'Memory Usage', description: 'Memory consumption analysis' },
          { name: 'Image Optimization', description: 'Image compression and optimization' },
          { name: 'JavaScript', description: 'JavaScript code optimization' },
          { name: 'CSS', description: 'CSS file optimization' }
        ],
        accessibility: [
          { name: 'Color Contrast', description: 'Color contrast verification' },
          { name: 'Alt Text', description: 'Alternative text for images' },
          { name: 'Keyboard Navigation', description: 'Keyboard navigation capability' },
          { name: 'ARIA Elements', description: 'ARIA accessibility elements' },
          { name: 'Heading Order', description: 'Page heading hierarchy' }
        ],
        responsive: [
          { name: 'Mobile Phones', description: 'Mobile phone display' },
          { name: 'Tablets', description: 'Tablet device display' },
          { name: 'Desktop', description: 'Desktop computer display' },
          { name: 'Orientations', description: 'Portrait and landscape views' },
          { name: 'Adaptability', description: 'Element adaptation to screens' }
        ],
        functionality: [
          { name: 'Navigation', description: 'Page navigation functions' },
          { name: 'Forms', description: 'Form and input functions' },
          { name: 'Buttons', description: 'Button responsiveness' },
          { name: 'Links', description: 'Link functionality' },
          { name: 'JavaScript', description: 'JavaScript functionality' }
        ],
        usability: [
          { name: 'Easy Navigation', description: 'Clear navigation' },
          { name: 'Readability', description: 'Text clarity' },
          { name: 'Interaction', description: 'Easy element interaction' },
          { name: 'Loading', description: 'Loading indicators' },
          { name: 'Errors', description: 'Clear error messages' }
        ]
      }
    }
  };

  const t = text[language];

  // محاكاة تشغيل الاختبارات
  const runTests = async () => {
    setIsRunning(true);
    setTests([]);
    
    const categories = Object.keys(t.categories) as Array<keyof typeof t.categories>;
    const allTests: TestResult[] = [];
    
    for (const category of categories) {
      const categoryTests = t.tests[category];
      
      for (let i = 0; i < categoryTests.length; i++) {
        const test = categoryTests[i];
        const testResult: TestResult = {
          id: `${category}-${i}`,
          name: test.name,
          category: category as TestResult['category'],
          status: 'running',
          score: 0,
          duration: 0,
          description: test.description
        };
        
        allTests.push(testResult);
        setTests([...allTests]);
        
        // محاكاة زمن التشغيل
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        // توليد نتيجة عشوائية واقعية
        const score = Math.floor(Math.random() * 30) + 70; // 70-100
        const status: TestResult['status'] = 
          score >= 90 ? 'passed' : 
          score >= 75 ? 'warning' : 'failed';
        
        testResult.status = status;
        testResult.score = score;
        testResult.duration = Math.floor(Math.random() * 500) + 100;
        testResult.details = generateTestDetails(category, status);
        
        setTests([...allTests]);
      }
    }
    
    // حساب النتيجة الإجمالية
    const totalScore = allTests.reduce((sum, test) => sum + test.score, 0) / allTests.length;
    setOverallScore(totalScore);
    setIsRunning(false);
  };

  const generateTestDetails = (category: string, status: TestResult['status']): string[] => {
    const details = {
      performance: {
        passed: ['تحميل سريع < 2 ثانية', 'استهلاك ذاكرة منخفض', 'تحسين ممتاز للموارد'],
        warning: ['تحميل متوسط 2-4 ثواني', 'استهلاك ذاكرة متوسط', 'تحسين جيد للموارد'],
        failed: ['تحميل بطيء > 4 ثواني', 'استهلاك ذاكرة عالي', 'يحتاج تحسين للموارد']
      },
      accessibility: {
        passed: ['تباين ألوان ممتاز', 'نصوص بديلة كاملة', 'تنقل كامل بلوحة المفاتيح'],
        warning: ['تباين ألوان جيد', 'نصوص بديلة جزئية', 'تنقل جزئي بلوحة المفاتيح'],
        failed: ['تباين ألوان ضعيف', 'نصوص بديلة مفقودة', 'تنقل صعب بلوحة المفاتيح']
      },
      responsive: {
        passed: ['عرض مثالي على جميع الشاشات', 'تكيف تلقائي للعناصر', 'تجربة موحدة'],
        warning: ['عرض جيد على معظم الشاشات', 'تكيف جيد للعناصر', 'تجربة متسقة'],
        failed: ['مشاكل في العرض', 'عناصر غير متكيفة', 'تجربة متفاوتة']
      },
      functionality: {
        passed: ['جميع الوظائف تعمل بشكل صحيح', 'استجابة سريعة', 'لا توجد أخطاء'],
        warning: ['معظم الوظائف تعمل', 'استجابة متوسطة', 'أخطاء قليلة'],
        failed: ['بعض الوظائف لا تعمل', 'استجابة بطيئة', 'أخطاء متعددة']
      },
      usability: {
        passed: ['واجهة سهلة الاستخدام', 'تنقل واضح', 'تفاعل بديهي'],
        warning: ['واجهة جيدة الاستخدام', 'تنقل واضح نسبياً', 'تفاعل مفهوم'],
        failed: ['واجهة معقدة', 'تنقل غير واضح', 'تفاعل صعب']
      }
    };
    
    return details[category as keyof typeof details]?.[status] || ['لا توجد تفاصيل متاحة'];
  };

  const resetTests = () => {
    setTests([]);
    setOverallScore(0);
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const colors = {
      passed: 'bg-green-500/10 text-green-500 border-green-500/20',
      failed: 'bg-red-500/10 text-red-500 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      running: 'bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse',
      pending: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    
    return (
      <Badge className={`${colors[status]} border`}>
        {getStatusIcon(status)}
        <span className="mr-1">{t.status[status]}</span>
      </Badge>
    );
  };

  const getCategoryIcon = (category: TestResult['category']) => {
    const icons = {
      performance: <Zap className="h-4 w-4" />,
      accessibility: <Eye className="h-4 w-4" />,
      responsive: <Monitor className="h-4 w-4" />,
      functionality: <Wifi className="h-4 w-4" />,
      usability: <Smartphone className="h-4 w-4" />
    };
    return icons[category];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const filteredTests = tests.filter(test => test.category === activeCategory);
  const categoryStats = tests.reduce((acc, test) => {
    if (!acc[test.category]) acc[test.category] = { total: 0, passed: 0 };
    acc[test.category].total++;
    if (test.status === 'passed') acc[test.category].passed++;
    return acc;
  }, {} as Record<string, { total: number; passed: number }>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button 
          onClick={runTests} 
          disabled={isRunning}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {t.runAllTests}
        </Button>
        <Button 
          variant="outline" 
          onClick={resetTests}
          disabled={isRunning}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {t.resetTests}
        </Button>
      </div>

      {/* Overall Score */}
      {overallScore > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{t.overallScore}</h3>
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {Math.round(overallScore)}%
              </div>
              <Progress value={overallScore} className="mt-4 h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          {Object.entries(t.categories).map(([key, label]) => (
            <TabsTrigger 
              key={key} 
              value={key}
              className="flex items-center gap-2 text-xs"
            >
              {getCategoryIcon(key as TestResult['category'])}
              <span className="hidden sm:inline">{label}</span>
              {categoryStats[key] && (
                <Badge variant="outline" className="ml-1 text-xs">
                  {categoryStats[key].passed}/{categoryStats[key].total}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(t.categories).map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            <ScrollArea className="h-[400px] w-full">
              <div className="space-y-3">
                {filteredTests.map(test => (
                  <Card key={test.id} className="transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(test.category)}
                          <div>
                            <CardTitle className="text-base">{test.name}</CardTitle>
                            <CardDescription className="text-sm">
                              {test.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {test.status !== 'pending' && test.status !== 'running' && (
                            <span className={`font-semibold ${getScoreColor(test.score)}`}>
                              {test.score}%
                            </span>
                          )}
                          {getStatusBadge(test.status)}
                        </div>
                      </div>
                    </CardHeader>
                    {test.details && test.status !== 'running' && (
                      <CardContent className="pt-0">
                        <div className="space-y-1">
                          {test.details.map((detail, index) => (
                            <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                        {test.duration > 0 && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            ⏱ {test.duration}ms
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
                
                {filteredTests.length === 0 && !isRunning && (
                  <Card className="border-dashed">
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground">
                        {language === 'ar' ? 'لم يتم تشغيل أي اختبارات بعد' : 'No tests have been run yet'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      {/* Live Testing Alert */}
      {isRunning && (
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Clock className="h-4 w-4 animate-spin" />
          <AlertDescription>
            {language === 'ar' 
              ? 'الاختبارات قيد التشغيل... يرجى الانتظار'
              : 'Tests are running... Please wait'
            }
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}