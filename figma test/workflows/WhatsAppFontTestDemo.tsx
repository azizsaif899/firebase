import React from 'react';
import { WhatsAppBubble } from './WhatsAppBubble';
import { WhatsAppEnhancedBubble } from './WhatsAppEnhancedBubble';

interface WhatsAppFontTestDemoProps {
  language: 'ar' | 'en';
  isDark: boolean;
}

export const WhatsAppFontTestDemo: React.FC<WhatsAppFontTestDemoProps> = ({
  language,
  isDark
}) => {
  const testMessages = [
    {
      id: '1',
      sender: 'incoming' as const,
      content: language === 'ar' 
        ? 'السلام عليكم ورحمة الله وبركاته، كيف حالكم؟'
        : 'Hello there! How are you doing today?',
      timestamp: '10:30',
      status: 'read'
    },
    {
      id: '2',
      sender: 'outgoing' as const,
      content: language === 'ar' 
        ? 'وعليكم السلام ورحمة الله وبركاته، الحمد لله بخير وعافية'
        : 'I\'m doing great, thank you for asking!',
      timestamp: '10:31',
      status: 'read'
    },
    {
      id: '3',
      sender: 'incoming' as const,
      content: language === 'ar' 
        ? 'أحتاج مساعدتك في موضوع مهم جداً متعلق بالمشروع الجديد الذي نعمل عليه'
        : 'I need your help with something very important about the new project we\'re working on',
      timestamp: '10:32',
      status: 'delivered'
    },
    {
      id: '4',
      sender: 'outgoing' as const,
      content: language === 'ar' 
        ? 'بكل سرور! أنا جاهز لمساعدتك في أي وقت'
        : 'Of course! I\'m ready to help you anytime',
      timestamp: '10:33',
      status: 'read'
    },
    {
      id: '5',
      sender: 'incoming' as const,
      content: language === 'ar' 
        ? 'شكراً جزيلاً لك، سأرسل لك التفاصيل عبر البريد الإلكتروني خلال الساعة القادمة 📧'
        : 'Thank you so much! I\'ll send you the details via email within the next hour 📧',
      timestamp: '10:34',
      status: 'delivered'
    }
  ];

  return (
    <div 
      className="w-full max-w-2xl mx-auto p-6 space-y-4"
      style={{
        backgroundColor: isDark ? '#0B141A' : '#F0F2F5',
        borderRadius: '12px'
      }}
    >
      <h3 
        className="text-lg font-semibold mb-4"
        style={{
          color: isDark ? '#E1E1E1' : '#111827',
          textAlign: language === 'ar' ? 'right' : 'left'
        }}
      >
        {language === 'ar' ? 'اختبار الخطوط المحسنة' : 'Enhanced Fonts Test'}
      </h3>
      
      <div 
        className="space-y-3"
        style={{
          backgroundColor: isDark ? '#111B21' : '#ECE5DD',
          padding: '20px',
          borderRadius: '8px',
          minHeight: '400px',
          backgroundImage: isDark 
            ? 'radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.03) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.05) 0%, transparent 50%)'
        }}
      >
        {testMessages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.sender === 'outgoing' ? 'flex-end' : 'flex-start',
              marginBottom: '8px'
            }}
          >
            <WhatsAppBubble
              content={message.content}
              timestamp={message.timestamp}
              sender={message.sender}
              status={message.status}
              language={language}
              isDark={isDark}
              statusIcon={message.sender === 'outgoing' ? <div>✓✓</div> : undefined}
            />
          </div>
        ))}
      </div>

      <div 
        className="text-sm mt-4 p-3 rounded-lg"
        style={{
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          color: isDark ? '#8A8D91' : '#6b7280',
          textAlign: language === 'ar' ? 'right' : 'left'
        }}
      >
        {language === 'ar' 
          ? 'الخطوط المستخدمة: Segoe UI، Helvetica Neue، Noto Naskh Arabic'
          : 'Fonts used: Segoe UI, Helvetica Neue, Noto Naskh Arabic'
        }
      </div>
    </div>
  );
};