import React from 'react';

interface WhatsAppTypographyProps {
  type: 'message' | 'contact-name' | 'timestamp' | 'preview';
  children: React.ReactNode;
  language?: 'ar' | 'en';
  className?: string;
  style?: React.CSSProperties;
}

export const WhatsAppTypography: React.FC<WhatsAppTypographyProps> = ({
  type,
  children,
  language = 'ar',
  className = '',
  style = {}
}) => {
  // WhatsApp Web الخطوط الدقيقة
  const whatsappFontFamily = language === 'ar' 
    ? '"Segoe UI", "Helvetica Neue", "Noto Naskh Arabic", sans-serif'
    : '"Segoe UI", "Helvetica Neue", sans-serif';

  // أحجام الخطوط حسب مواصفات WhatsApp Web الدقيقة
  const getTypographyStyles = () => {
    switch (type) {
      case 'message':
        return {
          fontSize: '15px', // الحجم الدقيق لنص الرسالة في WhatsApp Web
          fontWeight: 400,
          lineHeight: '20px', // Line height محددة بـ px للدقة
          fontFamily: whatsappFontFamily,
          letterSpacing: '0.01em', // تحسين المسافة بين الأحرف
        };
      
      case 'contact-name':
        return {
          fontSize: '17px', // اسم جهة الاتصال
          fontWeight: 600, // Semi-Bold
          lineHeight: '20px',
          fontFamily: whatsappFontFamily,
          letterSpacing: '-0.01em', // تحسين الوزن البصري
        };
      
      case 'timestamp':
        return {
          fontSize: '12px', // حجم الوقت الدقيق
          fontWeight: 400, // Normal weight في WhatsApp Web
          lineHeight: '14px',
          fontFamily: whatsappFontFamily,
          letterSpacing: '0.005em',
        };
      
      case 'preview':
        return {
          fontSize: '14px', // معاينة الرسالة
          fontWeight: 400,
          lineHeight: '18px',
          fontFamily: whatsappFontFamily,
          letterSpacing: '0.01em',
        };
      
      default:
        return {
          fontFamily: whatsappFontFamily,
        };
    }
  };

  const typographyStyles = getTypographyStyles();
  const combinedStyles = { ...typographyStyles, ...style };

  return (
    <span 
      className={`whatsapp-typography whatsapp-typography-${type} ${className}`}
      style={combinedStyles}
    >
      {children}
    </span>
  );
};

// مكونات محددة لسهولة الاستخدام
export const WhatsAppMessageText: React.FC<Omit<WhatsAppTypographyProps, 'type'>> = (props) => (
  <WhatsAppTypography type="message" {...props} />
);

export const WhatsAppContactName: React.FC<Omit<WhatsAppTypographyProps, 'type'>> = (props) => (
  <WhatsAppTypography type="contact-name" {...props} />
);

export const WhatsAppTimestamp: React.FC<Omit<WhatsAppTypographyProps, 'type'>> = (props) => (
  <WhatsAppTypography type="timestamp" {...props} />
);

export const WhatsAppPreview: React.FC<Omit<WhatsAppTypographyProps, 'type'>> = (props) => (
  <WhatsAppTypography type="preview" {...props} />
);