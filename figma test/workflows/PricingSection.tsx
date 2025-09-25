'use client';

import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  language: 'ar' | 'en';
}

export function PricingSection({ language }: PricingSectionProps) {
  const isRTL = language === 'ar';
  
  const texts = {
    ar: {
      subtitle: 'تسريع التقدم',
      title: 'في كل مستوى',
      description: 'اختر الخطة المناسبة لاحتياجاتك وابدأ رحلتك مع الذكاء الاصطناعي',
      getStarted: 'ابدأ الآن',
      popular: 'الأكثر شعبية',
      plans: [
        {
          name: 'المبتدئ',
          price: '29',
          period: 'شهرياً',
          description: 'مثالي للشركات الصغيرة والفرق الناشئة',
          features: [
            'حتى 1000 معاملة شهرياً',
            'دعم عبر البريد الإلكتروني',
            'لوحة تحكم أساسية',
            'تكامل API أساسي',
            'تقارير شهرية'
          ]
        },
        {
          name: 'المتقدم',
          price: '79',
          period: 'شهرياً',
          description: 'الأنسب للشركات المتنامية والفرق المتوسطة',
          features: [
            'حتى 10,000 معاملة شهرياً',
            'دعم عبر الدردشة والهاتف',
            'لوحة تحكم متقدمة',
            'تكامل API كامل',
            'تقارير أسبوعية',
            'تحليلات متقدمة',
            'نسخ احتياطية تلقائية'
          ],
          popular: true
        },
        {
          name: 'المؤسسي',
          price: '129',
          period: 'شهرياً',
          description: 'للمؤسسات الكبيرة والحلول المخصصة',
          features: [
            'معاملات غير محدودة',
            'دعم مخصص 24/7',
            'لوحة تحكم مخصصة',
            'تكامل API مخصص',
            'تقارير يومية',
            'ذكاء اصطناعي متقدم',
            'أمان عالي المستوى',
            'تدريب فريق مخصص'
          ]
        }
      ]
    },
    en: {
      subtitle: 'POWERING PROGRESS',
      title: 'AT EVERY LEVEL',
      description: 'Choose the right plan for your needs and start your AI journey',
      getStarted: 'Get Started',
      popular: 'Most Popular',
      plans: [
        {
          name: 'Starter',
          price: '29',
          period: 'per month',
          description: 'Perfect for small businesses and growing teams',
          features: [
            'Up to 1,000 transactions/month',
            'Email support',
            'Basic dashboard',
            'Basic API integration',
            'Monthly reports'
          ]
        },
        {
          name: 'Professional',
          price: '79',
          period: 'per month',
          description: 'Best for growing companies and medium teams',
          features: [
            'Up to 10,000 transactions/month',
            'Chat & phone support',
            'Advanced dashboard',
            'Full API integration',
            'Weekly reports',
            'Advanced analytics',
            'Automated backups'
          ],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '129',
          period: 'per month',
          description: 'For large organizations and custom solutions',
          features: [
            'Unlimited transactions',
            'Dedicated 24/7 support',
            'Custom dashboard',
            'Custom API integration',
            'Daily reports',
            'Advanced AI features',
            'Enterprise-grade security',
            'Custom team training'
          ]
        }
      ]
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-radial gradient-electric" />
      <div className="abstract-shape w-80 h-80 -top-40 -right-40" />
      <div className="abstract-shape w-60 h-60 -bottom-30 -left-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20 space-y-6">
          <p className="text-[#4F97FF] font-bold text-lg tracking-wider uppercase">
            {texts[language].subtitle}
          </p>
          <h2 className="section-title text-foreground">
            {texts[language].title}
          </h2>
          <p className="body-large text-muted-foreground max-w-3xl mx-auto">
            {texts[language].description}
          </p>
        </div>

        {/* Enhanced Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {texts[language].plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative backdrop-glass bg-card/20 border border-border/30 rounded-3xl p-8 card-shadow-hover hover-scale transition-all duration-500 ${
                plan.popular ? 'border-[#4F97FF] shadow-2xl shadow-[#4F97FF]/20 scale-105 bg-gradient-to-br from-[#4F97FF]/5 to-[#1ABC9C]/5' : ''
              }`}
            >
              {/* Enhanced Popular badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                    {texts[language].popular}
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {/* Enhanced Plan name */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                {/* Enhanced Price */}
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground font-medium">{plan.period}</span>
                  </div>
                </div>

                {/* Enhanced Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-muted-foreground font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <button 
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover-scale ${
                    plan.popular 
                      ? 'btn-primary text-white' 
                      : 'bg-muted/50 hover:bg-muted text-foreground border-2 border-transparent hover:border-[#4F97FF]/30'
                  }`}
                >
                  {texts[language].getStarted}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}