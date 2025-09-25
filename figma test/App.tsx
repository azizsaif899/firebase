'use client';

import { useState, useEffect } from 'react';
import { ConversationPage } from './components/ConversationPage';
import { VisualWorkflowPage } from './components/VisualWorkflowPage';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

// Professional FlowCanvasAI Header Component
function FlowCanvasHeader({ language, onLanguageChange, isDark, onThemeChange, onNavigate, currentPage }: {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  onThemeChange: (dark: boolean) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* FlowCanvasAI Professional Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary via-chart-2 to-primary/60 rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-primary-foreground rounded-lg flex items-center justify-center">
              <span className="font-black text-primary text-sm">FC</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
              FlowCanvasAI
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              {language === 'ar' ? 'منصة الذكاء الاصطناعي والأتمتة' : 'AI & Automation Platform'}
            </p>
          </div>
        </div>

        {/* Professional Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {[
            { id: 'home', ar: 'الرئيسية', en: 'Home', icon: '🏠', badge: '' },
            { id: 'conversation', ar: 'المحادثة الذكية', en: 'Smart Chat', icon: '💬', badge: 'AI' },
            { id: 'visual-automation', ar: 'الأتمتة المرئية', en: 'Visual Automation', icon: '⚡', badge: 'Pro' },
            { id: 'design-library', ar: 'مكتبة التصميم', en: 'Design Library', icon: '🎨', badge: '' },
            { id: 'automation-advanced', ar: 'الأتمتة المتقدمة', en: 'Advanced Automation', icon: '🔄', badge: 'New' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 group ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-primary to-chart-2 text-primary-foreground shadow-lg scale-105'
                  : 'hover:bg-muted/70 hover:text-primary hover:shadow-md hover:scale-102'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm font-semibold">
                {language === 'ar' ? item.ar : item.en}
              </span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs px-1 py-0 h-4 bg-gradient-to-r from-chart-2 to-primary text-white">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        {/* Professional Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
            className="px-4 py-2 rounded-xl border bg-background hover:bg-muted transition-all text-sm font-semibold shadow-sm hover:shadow-md"
          >
            {language === 'ar' ? '🇺🇸 EN' : '🇸🇦 العربية'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => onThemeChange(!isDark)}
            className="p-2 rounded-xl hover:bg-muted transition-all shadow-sm hover:shadow-md"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}

// Enhanced Professional Hero Section
function ProfessionalHeroSection({ language, onNavigate }: {
  language: 'ar' | 'en';
  onNavigate: (page: string) => void;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-chart-2/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-chart-2/5 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-primary/5 to-chart-2/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Title */}
          <div className="space-y-8">
            <h1 className="text-7xl md:text-9xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                {language === 'ar' ? 'FlowCanvas' : 'FlowCanvas'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-chart-2 via-primary to-chart-2 bg-clip-text text-transparent">
                {language === 'ar' ? 'AI' : 'AI'}
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-6">
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1"></div>
              <Badge className="px-6 py-2 bg-gradient-to-r from-primary to-chart-2 text-white font-bold text-sm">
                {language === 'ar' ? 'الإصدار الاحترافي المتقدم' : 'Advanced Professional Edition'}
              </Badge>
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1"></div>
            </div>
          </div>

          {/* Professional Subtitle */}
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            {language === 'ar' 
              ? 'منصة الذكاء الاصطناعي الاحترافية مع أتمتة مرئية متقدمة وواجهة محادثة ذكية تشبه WhatsApp، مصممة لتحويل رؤيتك إلى واقع رقمي متطور.'
              : 'Professional AI platform with advanced visual automation and WhatsApp-like smart chat interface, designed to transform your vision into cutting-edge digital reality.'
            }
          </p>

          {/* CTA Section */}
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => onNavigate('conversation')}
                className="px-10 py-6 text-lg bg-gradient-to-r from-primary to-chart-2 text-primary-foreground rounded-2xl hover:from-primary/90 hover:to-chart-2/90 transition-all transform hover:scale-105 shadow-2xl hover:shadow-primary/50 flex items-center gap-4 font-bold"
              >
                <span className="text-2xl">🚀</span>
                <span>
                  {language === 'ar' ? 'ابدأ المحادثة الذكية' : 'Start Smart Chat'}
                </span>
              </Button>
              
              <Button
                onClick={() => onNavigate('visual-automation')}
                className="px-10 py-6 text-lg border-2 border-primary/30 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-chart-2/10 hover:border-primary/50 transition-all transform hover:scale-105 flex items-center gap-4 font-bold"
              >
                <span className="text-2xl">⚡</span>
                <span>
                  {language === 'ar' ? 'الأتمتة المرئية المتقدمة' : 'Advanced Visual Automation'}
                </span>
              </Button>
            </div>

            {/* Quick Access */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: 'design-library', ar: '🎨 مكتبة التصميم', en: '🎨 Design Library' },
                { id: 'automation-advanced', ar: '🔄 أتمتة متقدمة', en: '🔄 Advanced Automation' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="px-6 py-3 bg-card/50 hover:bg-card/70 rounded-xl transition-all text-sm font-semibold backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg"
                >
                  {language === 'ar' ? item.ar : item.en}
                </button>
              ))}
            </div>
          </div>

          {/* Professional Features Preview */}
          <div className="grid md:grid-cols-4 gap-8 mt-24">
            {[
              {
                icon: '💬',
                title: language === 'ar' ? 'محادثة ذكية متقدمة' : 'Advanced Smart Chat',
                desc: language === 'ar' 
                  ? 'واجهة محادثة احترافية مع AI متطور وتفاعل طبيعي'
                  : 'Professional chat interface with advanced AI and natural interaction'
              },
              {
                icon: '⚡',
                title: language === 'ar' ? 'أتمتة مرئية متطورة' : 'Advanced Visual Automation',
                desc: language === 'ar' 
                  ? 'نظام أتمتة مرئي متطور مع واجهة سحب وإفلات احترافية'
                  : 'Advanced visual automation system with professional drag-and-drop interface'
              },
              {
                icon: '🎨',
                title: language === 'ar' ? 'تصميم احترافي متكامل' : 'Integrated Professional Design',
                desc: language === 'ar' 
                  ? 'نظام تصميم متكامل مع مكونات جاهزة ومخصصة'
                  : 'Complete design system with ready-made and customizable components'
              },
              {
                icon: '🔄',
                title: language === 'ar' ? 'منشئ العمليات المتقدم' : 'Advanced Workflow Builder',
                desc: language === 'ar' 
                  ? 'بناء وإدارة العمليات المعقدة بطريقة بصرية سهلة'
                  : 'Build and manage complex processes with intuitive visual interface'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-xl group hover:bg-card/60"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-4 group-hover:text-primary transition-colors text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Professional Design Library
function ProfessionalDesignLibrary({ language }: { language: 'ar' | 'en' }) {
  const [activeCategory, setActiveCategory] = useState('buttons');

  const categories = [
    { id: 'buttons', ar: 'الأزرار المتقدمة', en: 'Advanced Buttons', icon: '🔘' },
    { id: 'cards', ar: 'البطاقات الذكية', en: 'Smart Cards', icon: '🃏' },
    { id: 'forms', ar: 'النماذج التفاعلية', en: 'Interactive Forms', icon: '📝' },
    { id: 'navigation', ar: 'التنقل الاحترافي', en: 'Professional Navigation', icon: '🧭' },
    { id: 'feedback', ar: 'التفاعل المتطور', en: 'Advanced Feedback', icon: '💬' }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Professional Header */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black mb-6">
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            {language === 'ar' ? '🎨 مكتبة التصميم الاحترافية' : '🎨 Professional Design Library'}
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
          {language === 'ar' 
            ? 'مجموعة شاملة من مكونات UI الاحترافية المتقدمة الجاهزة للاستخدام مع دعم كامل للعربية والإنجليزية وتكامل مع أنظمة الذكاء الاصطناعي'
            : 'Comprehensive collection of advanced professional UI components ready for use with full Arabic and English support and AI system integration'
          }
        </p>
      </div>

      {/* Advanced Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-xl transition-all flex items-center gap-3 font-semibold ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-primary to-chart-2 text-primary-foreground shadow-lg scale-105'
                : 'bg-card/50 hover:bg-card/70 border border-border/50 hover:border-primary/30 hover:shadow-md'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>
              {language === 'ar' ? category.ar : category.en}
            </span>
          </button>
        ))}
      </div>

      {/* Advanced Component Showcase */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCategory === 'buttons' && (
          <>
            <div className="p-8 border rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold mb-6 flex items-center gap-3 text-lg">
                <span>🔘</span>
                {language === 'ar' ? 'الأزرار الأساسية المتطورة' : 'Advanced Primary Buttons'}
              </h3>
              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-primary to-chart-2 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-chart-2/90 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر أساسي متدرج متطور' : 'Advanced Primary Gradient Button'}
                </button>
                <button className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-semibold">
                  {language === 'ar' ? 'زر أساسي احترافي' : 'Professional Primary Button'}
                </button>
                <button className="w-full px-6 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-all font-semibold">
                  {language === 'ar' ? 'زر أساسي مفرغ متقدم' : 'Advanced Primary Outline'}
                </button>
              </div>
            </div>

            <div className="p-8 border rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold mb-6 flex items-center gap-3 text-lg">
                <span>⚡</span>
                {language === 'ar' ? 'أزرار الإجراءات الذكية' : 'Smart Action Buttons'}
              </h3>
              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر إجراء ذكي' : 'Smart Action Button'}
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر AI متقدم' : 'Advanced AI Button'}
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر أتمتة ذكية' : 'Smart Automation Button'}
                </button>
              </div>
            </div>

            <div className="p-8 border rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold mb-6 flex items-center gap-3 text-lg">
                <span>🎯</span>
                {language === 'ar' ? 'أزرار الحالات المتقدمة' : 'Advanced State Buttons'}
              </h3>
              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر خطر متقدم' : 'Advanced Danger Button'}
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر نجاح محسّن' : 'Enhanced Success Button'}
                </button>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  {language === 'ar' ? 'زر تحذير ذكي' : 'Smart Warning Button'}
                </button>
              </div>
            </div>
          </>
        )}

        {activeCategory === 'cards' && (
          <>
            <div className="p-8 border rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold mb-6 text-lg">
                {language === 'ar' ? 'بطاقة احترافية متقدمة' : 'Advanced Professional Card'}
              </h3>
              <div className="p-6 border rounded-xl bg-gradient-to-br from-background to-muted/20">
                <h4 className="font-bold mb-3 text-lg">
                  {language === 'ar' ? 'عنوان البطاقة المتطورة' : 'Advanced Card Title'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {language === 'ar' 
                    ? 'هذا مثال على بطاقة احترافية متقدمة مع تصميم حديث وتفاعل ذكي.'
                    : 'This is an example of an advanced professional card with modern design and smart interaction.'
                  }
                </p>
                <Button className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground">
                  {language === 'ar' ? 'إجراء متقدم' : 'Advanced Action'}
                </Button>
              </div>
            </div>

            <div className="p-8 border rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold mb-6 text-lg">
                {language === 'ar' ? 'بطاقة إحصائيات ذكية' : 'Smart Analytics Card'}
              </h3>
              <div className="p-6 border rounded-xl bg-gradient-to-br from-primary/5 to-chart-2/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'المستخدمون النشطون' : 'Active Users'}
                  </span>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    +25%
                  </Badge>
                </div>
                <div className="text-3xl font-black text-primary mb-4">4,847</div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-chart-2 h-3 rounded-full transition-all duration-1000" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Enhanced Professional Automation Page
function ProfessionalAutomationPage({ language }: { language: 'ar' | 'en' }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black mb-6">
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            {language === 'ar' ? '🔄 الأتمتة المتقدمة الاحترافية' : '🔄 Advanced Professional Automation'}
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
          {language === 'ar' 
            ? 'نظام أتمتة متطور ومتقدم للعمليات والمهام المعقدة مع تكامل كامل مع الذكاء الاصطناعي وخدمات Google Cloud وFirebase'
            : 'Advanced and sophisticated automation system for complex processes and tasks with full AI integration and Google Cloud and Firebase services'
          }
        </p>
      </div>

      {/* Advanced Features Grid */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* AI-Powered Workflow */}
        <div className="p-10 border rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
            <span className="text-4xl">🤖</span>
            {language === 'ar' ? 'منشئ العمليات المدعوم بالذكاء الاصطناعي' : 'AI-Powered Workflow Builder'}
          </h3>
          
          <div className="space-y-6 mb-8">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  {language === 'ar' ? 'محفز ذكي - AI Trigger' : 'Smart Trigger - AI Detection'}
                </span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">
                {language === 'ar' ? 'كشف ذكي للأحداث والمحفزات باستخدام الذكاء الاصطناعي المتقدم' : 'Smart detection of events and triggers using advanced AI algorithms'}
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  {language === 'ar' ? 'معالجة متقدمة بـ Gemini 2.0 Flash' : 'Advanced Processing with Gemini 2.0 Flash'}
                </span>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-400 leading-relaxed">
                {language === 'ar' ? 'تحليل وفهم عميق للبيانات مع قدرات استجابة فورية' : 'Deep data analysis and understanding with instant response capabilities'}
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-green-600 rounded-full"></div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                <span className="font-bold text-green-700 dark:text-green-300">
                  {language === 'ar' ? 'تنفيذ ذكي للإجراءات' : 'Smart Action Execution'}
                </span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 leading-relaxed">
                {language === 'ar' ? 'تنفيذ تلقائي ذكي مع التكيف والتعلم المستمر' : 'Intelligent automatic execution with adaptive learning'}
              </p>
            </div>
          </div>
          
          <Button className="w-full py-4 bg-gradient-to-r from-primary via-chart-2 to-primary text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-bold">
            <span className="mr-2">🚀</span>
            {language === 'ar' ? 'بناء عملية ذكية جديدة' : 'Build New Smart Workflow'}
          </Button>
        </div>

        {/* Real-time Analytics */}
        <div className="p-10 border rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
            <span className="text-4xl">📊</span>
            {language === 'ar' ? 'لوحة التحليلات الفورية المتقدمة' : 'Advanced Real-time Analytics Dashboard'}
          </h3>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-green-700 dark:text-green-300">
                  {language === 'ar' ? 'مهام مكتملة' : 'Completed Tasks'}
                </span>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs">
                  +32%
                </Badge>
              </div>
              <div className="text-4xl font-black text-green-600 mb-3">5,847</div>
              <div className="w-full bg-green-100 dark:bg-green-800 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  {language === 'ar' ? 'قيد المعالجة' : 'Processing'}
                </span>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs">
                  Live
                </Badge>
              </div>
              <div className="text-4xl font-black text-blue-600 mb-3">243</div>
              <div className="w-full bg-blue-100 dark:bg-blue-800 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full animate-pulse transition-all duration-1000" style={{ width: '67%' }}></div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  {language === 'ar' ? 'في الانتظار' : 'Pending'}
                </span>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs">
                  Queue
                </Badge>
              </div>
              <div className="text-4xl font-black text-amber-600 mb-3">89</div>
              <div className="w-full bg-amber-100 dark:bg-amber-800 rounded-full h-3">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-red-700 dark:text-red-300">
                  {language === 'ar' ? 'أخطاء' : 'Errors'}
                </span>
                <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs">
                  -8%
                </Badge>
              </div>
              <div className="text-4xl font-black text-red-600 mb-3">12</div>
              <div className="w-full bg-red-100 dark:bg-red-800 rounded-full h-3">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 h-3 rounded-full transition-all duration-1000" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
          
          <Button className="w-full py-4 border-2 border-primary text-primary rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-chart-2/10 transition-all font-bold">
            <span className="mr-2">📈</span>
            {language === 'ar' ? 'عرض التقرير التفصيلي المتقدم' : 'View Advanced Detailed Report'}
          </Button>
        </div>
      </div>

      {/* Advanced Integration Tools */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 border rounded-2xl bg-card/50 text-center hover:border-primary/30 transition-all group backdrop-blur-sm">
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🔗</div>
          <h4 className="font-bold mb-4 group-hover:text-primary transition-colors text-xl">
            {language === 'ar' ? 'تكامل التطبيقات المتقدم' : 'Advanced App Integration'}
          </h4>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {language === 'ar' 
              ? 'اربط أكثر من 1000+ تطبيق وخدمة في سير عمل واحد متكامل مع AI'
              : 'Connect 1000+ apps and services in one integrated AI-powered workflow'
            }
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">Google</Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">Microsoft</Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">Slack</Badge>
            <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white">Firebase</Badge>
          </div>
        </div>

        <div className="p-8 border rounded-2xl bg-card/50 text-center hover:border-primary/30 transition-all group backdrop-blur-sm">
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
          <h4 className="font-bold mb-4 group-hover:text-primary transition-colors text-xl">
            {language === 'ar' ? 'أتمتة فورية ذكية' : 'Smart Instant Automation'}
          </h4>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {language === 'ar' 
              ? 'قوالب جاهزة للأتمتة الذكية مع إعداد يستغرق ثوانٍ'
              : 'Ready templates for smart automation with setup in seconds'
            }
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">Email AI</Badge>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">Smart Reports</Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">AI Analysis</Badge>
          </div>
        </div>

        <div className="p-8 border rounded-2xl bg-card/50 text-center hover:border-primary/30 transition-all group backdrop-blur-sm">
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🛡️</div>
          <h4 className="font-bold mb-4 group-hover:text-primary transition-colors text-xl">
            {language === 'ar' ? 'أمان متقدم ومتطور' : 'Advanced Enterprise Security'}
          </h4>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {language === 'ar' 
              ? 'حماية على مستوى المؤسسات مع تشفير شامل وصلاحيات متقدمة وحماية AI'
              : 'Enterprise-level security with end-to-end encryption, advanced permissions and AI protection'
            }
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white">SSL/TLS</Badge>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">OAuth 2.0</Badge>
            <Badge className="bg-gradient-to-r from-gray-500 to-slate-600 text-white">RBAC</Badge>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">AI Guard</Badge>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Start Section */}
      <div className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 rounded-2xl p-12 text-center">
        <h3 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'ابدأ أول عملية أتمتة ذكية في ثوانٍ' : 'Start Your First Smart Automation in Seconds'}
        </h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          {language === 'ar' 
            ? 'اختر من مكتبة القوالب الذكية الجاهزة أو ابني عملية مخصصة من الصفر باستخدام منشئ العمليات المرئي المدعوم بالذكاء الاصطناعي'
            : 'Choose from our library of smart ready templates or build a custom process from scratch using our AI-powered visual workflow builder'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button className="px-8 py-4 bg-gradient-to-r from-primary to-chart-2 text-white rounded-xl hover:from-primary/90 hover:to-chart-2/90 transition-all transform hover:scale-105 shadow-xl font-bold">
            <span className="mr-2">🚀</span>
            {language === 'ar' ? 'بناء عملية ذكية جديدة' : 'Build New Smart Workflow'}
          </Button>
          <Button className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-chart-2/10 transition-all transform hover:scale-105 font-bold">
            <span className="mr-2">📚</span>
            {language === 'ar' ? 'تصفح القوالب الذكية' : 'Browse Smart Templates'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'conversation' | 'visual-automation' | 'design-library' | 'automation-advanced'>('home');

  // Initialize theme and language
  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Apply language direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = language === 'ar' 
      ? '"Cairo", "Noto Sans Arabic", "Inter", sans-serif'
      : '"Inter", "Helvetica Neue", sans-serif';
  }, [isDark, language]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
  };

  const handleLanguageChange = (newLanguage: 'ar' | 'en') => {
    setLanguage(newLanguage);
  };

  const handleThemeChange = (newIsDark: boolean) => {
    setIsDark(newIsDark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Render appropriate page */}
      {currentPage === 'conversation' ? (
        <ConversationPage 
          language={language}
          onBackToHome={() => setCurrentPage('home')}
        />
      ) : currentPage === 'visual-automation' ? (
        <VisualWorkflowPage 
          language={language}
          onClose={() => setCurrentPage('home')}
        />
      ) : (
        <>
          <FlowCanvasHeader
            language={language}
            onLanguageChange={handleLanguageChange}
            isDark={isDark}
            onThemeChange={handleThemeChange}
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
          
          {currentPage === 'home' && (
            <ProfessionalHeroSection 
              language={language}
              onNavigate={handleNavigate}
            />
          )}
          
          {currentPage === 'design-library' && (
            <ProfessionalDesignLibrary language={language} />
          )}
          
          {currentPage === 'automation-advanced' && (
            <ProfessionalAutomationPage language={language} />
          )}
        </>
      )}
    </div>
  );
}