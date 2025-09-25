import React from 'react';
import { WhatsAppMessageText, WhatsAppTimestamp } from './WhatsAppTypography';
import { CheckCheck, Clock } from 'lucide-react';

interface WhatsAppEnhancedBubbleProps {
  content: string;
  timestamp: string;
  sender: 'incoming' | 'outgoing';
  status?: string;
  language: 'ar' | 'en';
  isDark: boolean;
  onHover?: (isHovered: boolean) => void;
}

export const WhatsAppEnhancedBubble: React.FC<WhatsAppEnhancedBubbleProps> = ({
  content,
  timestamp,
  sender,
  status = 'read',
  language,
  isDark,
  onHover
}) => {
  // حالة الرسالة وألوانها
  const getStatusIcon = () => {
    const iconStyle = {
      size: 12 as const,
      className: `whatsapp-message-status-${status}`,
      style: {
        color: status === 'read' 
          ? 'var(--whatsapp-icon-active)' 
          : 'var(--whatsapp-text-secondary)'
      }
    };

    switch (status) {
      case 'sent':
        return <CheckCheck {...iconStyle} />;
      case 'delivered':
        return <CheckCheck {...iconStyle} />;
      case 'read':
        return <CheckCheck {...iconStyle} />;
      default:
        return <Clock {...iconStyle} />;
    }
  };

  return (
    <div
      className={`
        whatsapp-desktop-bubble 
        whatsapp-bubble-text 
        ${language === 'ar' ? 'whatsapp-bubble-text arabic' : 'whatsapp-bubble-text english'}
        whatsapp-message-enter
      `}
      style={{
        // خلفيات دقيقة حسب مواصفات WhatsApp
        backgroundColor: sender === 'outgoing' 
          ? isDark ? '#005C4B' : '#DCF8C6'
          : isDark ? '#262D31' : '#FFFFFF',
        
        // لون النص حسب الوضع
        color: sender === 'outgoing'
          ? '#FFFFFF'
          : isDark ? '#E1E1E1' : '#111111',
        
        // الحشو الدقيق لفقاعات WhatsApp
        padding: '10px 14px',
        
        // الزوايا المدورة الدقيقة
        borderRadius: sender === 'outgoing' 
          ? '8px 8px 0px 8px' 
          : '8px 8px 8px 0px',
        
        // الظل للرسائل الواردة في الوضع النهاري فقط
        boxShadow: sender === 'incoming' && !isDark
          ? '0 1px 0.5px rgba(0, 0, 0, 0.13)'
          : 'none',
        
        // خصائص التخطيط
        wordWrap: 'break-word',
        position: 'relative',
        transition: 'all 0.15s ease',
        maxWidth: '65%',
        minWidth: '48px',
        alignSelf: sender === 'outgoing' ? 'flex-end' : 'flex-start',
        marginBottom: '8px'
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* محتوى الرسالة بالخطوط المحسنة */}
      <WhatsAppMessageText 
        language={language}
        style={{
          margin: '0',
          padding: '0',
          textAlign: language === 'ar' ? 'right' : 'left',
          direction: language === 'ar' ? 'rtl' : 'ltr',
          color: 'inherit',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          // تطبيق الخطوط المحسنة
          fontFamily: language === 'ar' 
            ? '"Segoe UI", "Helvetica Neue", "Noto Naskh Arabic", sans-serif'
            : '"Segoe UI", "Helvetica Neue", sans-serif',
          fontSize: '15px',
          fontWeight: '400',
          lineHeight: '20px',
          letterSpacing: '0.01em'
        }}
      >
        {content}
      </WhatsAppMessageText>

      {/* معلومات الرسالة مع الخطوط المحسنة */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
          marginTop: '4px'
        }}
      >
        <WhatsAppTimestamp 
          language={language}
          style={{
            color: sender === 'outgoing' 
              ? 'rgba(255, 255, 255, 0.8)'
              : isDark 
                ? 'rgba(255, 255, 255, 0.6)' 
                : 'rgba(0, 0, 0, 0.6)',
            opacity: 0.9,
            // تطبيق الخطوط المحسنة للوقت
            fontFamily: language === 'ar' 
              ? '"Segoe UI", "Helvetica Neue", "Noto Naskh Arabic", sans-serif'
              : '"Segoe UI", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '14px',
            letterSpacing: '0.005em'
          }}
        >
          {timestamp}
        </WhatsAppTimestamp>
        
        {/* أيقونة حالة الرسالة للرسائل الصادرة فقط */}
        {sender === 'outgoing' && (
          <div 
            style={{ 
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {getStatusIcon()}
          </div>
        )}
      </div>
    </div>
  );
};