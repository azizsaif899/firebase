'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQSectionProps {
  language: 'ar' | 'en';
}

export function FAQSection({ language }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const isRTL = language === 'ar';

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const texts = {
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'الأسئلة المتكررة',
      description: 'إجابات على الأسئلة الأكثر شيوعاً حول منصتنا وخدماتنا',
      faqs: [
        {
          question: 'ما هو الذكاء الاصطناعي وكيف يعمل؟',
          answer: 'الذكاء الاصطناعي هو تقنية تحاكي الذكاء البشري من خلال خوارزميات متقدمة. يتعلم النظام من البيانات ويحسن أداءه تلقائياً لتقديم حلول ذكية ومخصصة لاحتياجاتك.'
        },
        {
          question: 'كم من الوقت يستغرق تنفيذ الحل؟',
          answer: 'يختلف وقت التنفيذ حسب تعقيد المشروع وحجمه. عادة ما يستغرق التنفيذ من 2-8 أسابيع للمشاريع الصغيرة والمتوسطة، بينما المشاريع الكبيرة قد تستغرق 3-6 أشهر.'
        },
        {
          question: 'هل يمكن دمج الحل مع أنظمتنا الحالية؟',
          answer: 'نعم، منصتنا مصممة لتكون متوافقة مع معظم الأنظمة الحالية. نوفر واجهات برمجة تطبيقات (APIs) مرنة وأدوات تكامل متقدمة لضمان عملية انتقال سلسة.'
        },
        {
          question: 'ما مستوى الأمان المتوفر؟',
          answer: 'نوفر أعلى مستويات الأمان باستخدام تشفير من الدرجة العسكرية، مراقبة 24/7، ونسخ احتياطية متعددة. جميع بياناتك محمية وفقاً لأعلى المعايير الدولية.'
        },
        {
          question: 'هل هناك دعم فني متاح؟',
          answer: 'نعم، نقدم دعماً فنياً شاملاً على مدار الساعة طوال أيام الأسبوع. فريقنا من الخبراء متاح عبر الدردشة المباشرة، البريد الإلكتروني، والهاتف لضمان حصولك على المساعدة فوراً.'
        }
      ]
    },
    en: {
      title: 'FREQUENTLY ASKED',
      subtitle: 'QUESTIONS',
      description: 'Answers to the most common questions about our platform and services',
      faqs: [
        {
          question: 'What is AI and how does it work?',
          answer: 'Artificial Intelligence mimics human intelligence through advanced algorithms. Our system learns from data and automatically improves its performance to deliver smart, customized solutions for your needs.'
        },
        {
          question: 'How long does implementation take?',
          answer: 'Implementation time varies based on project complexity and size. Typically, small to medium projects take 2-8 weeks, while larger enterprise projects may require 3-6 months for full deployment.'
        },
        {
          question: 'Can the solution integrate with our existing systems?',
          answer: 'Yes, our platform is designed to be compatible with most existing systems. We provide flexible APIs and advanced integration tools to ensure a seamless transition process.'
        },
        {
          question: 'What level of security is provided?',
          answer: 'We provide the highest levels of security using military-grade encryption, 24/7 monitoring, and multiple backups. All your data is protected according to the highest international standards.'
        },
        {
          question: 'Is technical support available?',
          answer: 'Yes, we provide comprehensive 24/7 technical support. Our team of experts is available via live chat, email, and phone to ensure you get immediate assistance whenever needed.'
        }
      ]
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-radial gradient-electric" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20 space-y-6">
          <h2 className="section-title leading-tight">
            <span className="text-foreground">{texts[language].title}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C]">
              {texts[language].subtitle}
            </span>
          </h2>
          <p className="body-large text-muted-foreground max-w-3xl mx-auto">
            {texts[language].description}
          </p>
        </div>

        {/* Enhanced FAQ List */}
        <div className="space-y-6">
          {texts[language].faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <div className="backdrop-glass bg-card/20 border border-border/30 rounded-2xl card-shadow-hover transition-all duration-300 hover:border-[#4F97FF]/30">
                <CollapsibleTrigger className={`w-full p-8 hover:bg-muted/20 transition-colors rounded-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <h3 className="text-xl font-bold text-foreground pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className={`px-8 pb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="h-px bg-gradient-to-r from-[#4F97FF]/20 to-[#1ABC9C]/20 mb-6" />
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center p-12 rounded-3xl bg-gradient-to-br from-[#4F97FF]/10 to-[#1ABC9C]/10 border border-[#4F97FF]/20 backdrop-glass card-shadow">
          <h3 className="text-3xl font-black text-foreground mb-6">
            {language === 'ar' ? 'هل لديك سؤال آخر؟' : 'Have another question?'}
          </h3>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'فريقنا من الخبراء متاح على مدار الساعة لمساعدتك. احصل على إجابات فورية لجميع استفساراتك.'
              : 'Our expert team is available 24/7 to help you. Get instant answers to all your questions.'
            }
          </p>
          <div className={`flex flex-wrap gap-6 justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button className="btn-primary hover-scale px-8 py-4 rounded-xl text-white font-bold text-lg">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
            <button className="border-2 border-[#4F97FF] text-[#4F97FF] hover:bg-[#4F97FF]/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover-scale backdrop-glass">
              {language === 'ar' ? 'الدعم الفني' : 'Technical Support'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}