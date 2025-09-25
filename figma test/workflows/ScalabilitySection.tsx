'use client';

import { ImageWithFallback } from './figma/ImageWithFallback';

interface ScalabilitySectionProps {
  language: 'ar' | 'en';
}

export function ScalabilitySection({ language }: ScalabilitySectionProps) {
  const isRTL = language === 'ar';
  
  const texts = {
    ar: {
      subtitle: 'قابلية التوسع',
      title: 'مبني للمستقبل',
      description: 'نظامنا مصمم للنمو معك. من الشركات الناشئة إلى المؤسسات الكبيرة، توفر منصتنا المرونة والقوة اللازمة لمواكبة نموك.',
      features: [
        'قابلية توسع لانهائية',
        'أداء عالي مضمون', 
        'أمان متطور',
        'دعم شامل'
      ]
    },
    en: {
      subtitle: 'SCALABILITY',
      title: 'Built for the Future',
      description: 'Our system is designed to grow with you. From startups to large enterprises, our platform provides the flexibility and power needed to keep pace with your growth.',
      features: [
        'Unlimited scalability',
        'Guaranteed high performance',
        'Advanced security',
        'Comprehensive support'
      ]
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with robot */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="AI Robot Interface"
          className="w-full h-full object-cover"
        />
        {/* Multiple overlay layers for depth */}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F97FF]/10 via-transparent to-[#1ABC9C]/10" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`backdrop-glass bg-card/20 border border-border/30 rounded-3xl p-12 card-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4 text-center">
              <p className="text-[#4F97FF] font-bold text-lg tracking-wider uppercase">
                {texts[language].subtitle}
              </p>
              <h2 className="section-title text-foreground">
                {texts[language].title}
              </h2>
              <p className="body-large text-muted-foreground max-w-2xl mx-auto">
                {texts[language].description}
              </p>
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {texts[language].features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-background/20 backdrop-glass border border-border/20 hover:bg-background/30 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="pt-8">
              <button className="btn-primary hover-scale px-8 py-4 rounded-xl text-white font-bold text-lg">
                {language === 'ar' ? 'اكتشف إمكانياتك' : 'Discover Your Potential'}
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-[#4F97FF] rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-16 w-6 h-6 bg-[#1ABC9C] rounded-full animate-bounce opacity-80" />
        <div className="absolute top-1/3 right-8 w-3 h-3 bg-[#8b5cf6] rounded-full animate-pulse delay-1000 opacity-70" />
      </div>
    </section>
  );
}