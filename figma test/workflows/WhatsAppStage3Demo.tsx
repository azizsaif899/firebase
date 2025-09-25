'use client';

import React, { useState, useEffect } from 'react';
import { WhatsAppIntegrated } from './WhatsAppIntegrated';

// مكون العرض التوضيحي للمرحلة الثالثة
export const WhatsAppStage3Demo: React.FC<{
  language: 'ar' | 'en';
}> = ({ language }) => {
  const [demoFeatures, setDemoFeatures] = useState({
    iconsVisible: true,
    animationsEnabled: true,
    interactionsEnabled: true,
    voiceEnabled: true,
    notificationsEnabled: true
  });

  const [stats, setStats] = useState({
    messagesProcessed: 0,
    iconsRendered: 0,
    animationsPlayed: 0,
    voiceMessagesPlayed: 0
  });

  // محاكاة الإحصائيات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 3),
        iconsRendered: prev.iconsRendered + Math.floor(Math.random() * 5),
        animationsPlayed: prev.animationsPlayed + Math.floor(Math.random() * 2),
        voiceMessagesPlayed: prev.voiceMessagesPlayed + Math.floor(Math.random() * 1)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="whatsapp-desktop-container h-screen flex flex-col">
      {/* شريط الحالة للمرحلة الثالثة */}
      <div 
        className="w-full px-6 py-3 border-b"
        style={{
          backgroundColor: 'var(--whatsapp-header-footer-bg)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: 'var(--whatsapp-accent-green)',
                color: 'white'
              }}
            >
              المرحلة 3: الأيقونات والتفاعلات
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div style={{ color: 'var(--whatsapp-primary-text)' }}>
                الرسائل: <span style={{ color: 'var(--whatsapp-accent-green)' }}>{stats.messagesProcessed}</span>
              </div>
              <div style={{ color: 'var(--whatsapp-primary-text)' }}>
                الأيقونات: <span style={{ color: 'var(--whatsapp-accent-green)' }}>{stats.iconsRendered}</span>
              </div>
              <div style={{ color: 'var(--whatsapp-primary-text)' }}>
                الحركات: <span style={{ color: 'var(--whatsapp-accent-green)' }}>{stats.animationsPlayed}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* مؤشرات الميزات */}
            {Object.entries(demoFeatures).map(([feature, enabled]) => (
              <div
                key={feature}
                className={`w-2 h-2 rounded-full ${enabled ? 'animate-pulse' : ''}`}
                style={{
                  backgroundColor: enabled ? 'var(--whatsapp-accent-green)' : 'var(--whatsapp-secondary-text)'
                }}
                title={feature}
              />
            ))}
          </div>
        </div>
      </div>

      {/* التطبيق المتكامل */}
      <div className="flex-1">
        <WhatsAppIntegrated language={language} />
      </div>

      {/* شريط معلومات المرحلة الثالثة */}
      <div
        className="w-full px-6 py-2 border-t"
        style={{
          backgroundColor: 'var(--whatsapp-header-footer-bg)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-between text-xs">
          <div style={{ color: 'var(--whatsapp-secondary-text)' }}>
            ✅ نظام الأيقونات المتقدم | ✅ التفاعلات الذكية | ✅ الرسوم المتحركة | ✅ الإشعارات
          </div>
          <div style={{ color: 'var(--whatsapp-accent-green)' }}>
            المرحلة الثالثة مكتملة 🚀
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون لعرض تفاصيل المرحلة الثالثة
export const WhatsAppStage3Features: React.FC<{
  language: 'ar' | 'en';
}> = ({ language }) => {
  const features = [
    {
      title: 'نظام الأيقونات الدقيق',
      description: 'أيقونات بالأحجام الدقيقة حسب مواصفات WhatsApp',
      specs: ['البحث: 24×24px', 'التنزيل: 16×16px', 'الإرسال: 24×24px', 'القائمة: 24×24px'],
      status: 'مكتمل'
    },
    {
      title: 'الصور الشخصية المتقدمة',
      description: 'صور دائرية 40×40px مع مؤشرات الحالة',
      specs: ['دائرية 100%', 'مؤشر الاتصال', 'تأثيرات تفاعلية', 'تدرجات لونية'],
      status: 'مكتمل'
    },
    {
      title: 'التفاعلات المتقدمة',
      description: 'تفاعلات ذكية وحيوية للمستخدم',
      specs: ['مؤشر الطباعة', 'الرسائل الصوتية', 'ردود فعل سريعة', 'إشعارات ذكية'],
      status: 'مكتمل'
    },
    {
      title: 'الرسوم المتحركة',
      description: 'حركات سلسة ومتطورة للعناصر',
      specs: ['دخول الرسائل', 'تأثيرات التمرير', 'نبضات الحالة', 'انتقالات سلسة'],
      status: 'مكتمل'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--whatsapp-primary-text)' }}
        >
          مميزات المرحلة الثالثة
        </h2>
        <p style={{ color: 'var(--whatsapp-secondary-text)' }}>
          نظام أيقونات وتفاعلات متقدم حسب مواصفات WhatsApp الدقيقة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border whatsapp-hover-lift"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 
                className="font-semibold"
                style={{ color: 'var(--whatsapp-primary-text)' }}
              >
                {feature.title}
              </h3>
              <span
                className="px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: 'var(--whatsapp-accent-green)',
                  color: 'white'
                }}
              >
                {feature.status}
              </span>
            </div>
            
            <p 
              className="text-sm mb-3"
              style={{ color: 'var(--whatsapp-secondary-text)' }}
            >
              {feature.description}
            </p>

            <ul className="space-y-1">
              {feature.specs.map((spec, specIndex) => (
                <li
                  key={specIndex}
                  className="text-xs flex items-center gap-2"
                  style={{ color: 'var(--whatsapp-secondary-text)' }}
                >
                  <span style={{ color: 'var(--whatsapp-accent-green)' }}>✓</span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div 
        className="text-center p-4 rounded-lg"
        style={{
          backgroundColor: 'rgba(37, 211, 102, 0.1)',
          border: '1px solid rgba(37, 211, 102, 0.3)'
        }}
      >
        <p style={{ color: 'var(--whatsapp-accent-green)' }}>
          🎉 المرحلة الثالثة مكتملة بنجاح! جميع الأيقونات والتفاعلات تعمل بالمواصفات الدقيقة.
        </p>
      </div>
    </div>
  );
};