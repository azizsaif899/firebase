'use client';

import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BuiltToThinkSectionProps {
  language: 'ar' | 'en';
}

export function BuiltToThinkSection({ language }: BuiltToThinkSectionProps) {
  const isRTL = language === 'ar';
  
  const texts = {
    ar: {
      title1: 'مبني للتفكير.',
      title2: 'مصمم للتوسع.',
      description: 'نظامنا المدعوم بالذكاء الاصطناعي يتعلم ويتطور مع احتياجاتك. مصمم ليكون قابلاً للتوسع من الشركات الناشئة إلى المؤسسات الكبيرة.',
      features: [
        'تعلم آلي متقدم',
        'معالجة البيانات في الوقت الفعلي',
        'قابلية توسع لا محدودة',
        'أمان على مستوى المؤسسات'
      ],
      learnMore: 'تعرف على المزيد',
      getDemo: 'احصل على عرض توضيحي'
    },
    en: {
      title1: 'BUILT TO THINK.',
      title2: 'DESIGNED TO SCALE.',
      description: 'Our AI-powered system learns and evolves with your needs. Designed to scale from startups to enterprise organizations.',
      features: [
        'Advanced machine learning',
        'Real-time data processing',
        'Unlimited scalability',
        'Enterprise-grade security'
      ],
      learnMore: 'Learn More',
      getDemo: 'Get Demo'
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Left column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-foreground">{texts[language].title1}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {texts[language].title2}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {texts[language].description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {texts[language].features.map((feature, index) => (
                <div key={index} className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className={`flex gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                {texts[language].getDemo}
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                {texts[language].learnMore}
              </Button>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Main image */}
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMHNjcmVlbnxlbnwxfHx8fDE3NTgxOTAxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Analytics Dashboard"
                className="w-full h-[500px] object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20" />
              
              {/* Floating analytics cards */}
              <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-md rounded-lg p-4 border border-border/40 shadow-lg">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {language === 'ar' ? 'معدل المعالجة' : 'Processing Rate'}
                  </div>
                  <div className="text-2xl font-bold text-green-400">98.7%</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'نشط' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-md rounded-lg p-4 border border-border/40 shadow-lg">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {language === 'ar' ? 'المعاملات' : 'Transactions'}
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">15.2K</div>
                  <div className="text-xs text-green-400">
                    +12.5% {language === 'ar' ? 'هذا الشهر' : 'this month'}
                  </div>
                </div>
              </div>

              {/* Progress bars overlay */}
              <div className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-background/90 backdrop-blur-md rounded-lg p-4 border border-border/40 shadow-lg w-48">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {language === 'ar' ? 'حالة النظام' : 'System Status'}
                  </div>
                  {[
                    { label: 'CPU', value: 72, color: 'bg-cyan-400' },
                    { label: 'Memory', value: 58, color: 'bg-green-400' },
                    { label: 'Storage', value: 34, color: 'bg-blue-400' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}