'use client';

import React from 'react';
import { 
  Search, 
  Download, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Mic
} from 'lucide-react';

interface WhatsAppIconProps {
  size?: 'search' | 'download' | 'send' | 'menu' | 'custom';
  customSize?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

// أيقونة البحث - 24×24px
export const WhatsAppSearchIcon: React.FC<WhatsAppIconProps> = ({ 
  className = '', 
  onClick,
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`whatsapp-desktop-icon search transition-colors cursor-pointer ${className}`}
      style={{
        width: 'var(--whatsapp-icon-search)',
        height: 'var(--whatsapp-icon-search)',
        color: 'var(--whatsapp-secondary-text)',
        background: 'transparent',
        border: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--whatsapp-primary-text)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--whatsapp-secondary-text)'}
      aria-label="بحث"
    >
      <Search size={24} />
    </button>
  );
};

// أيقونة التنزيل - 16×16px داخل زر 36×24px مع خلفية خضراء
export const WhatsAppDownloadIcon: React.FC<WhatsAppIconProps & { 
  fileName?: string;
  isLoading?: boolean;
}> = ({ 
  className = '', 
  onClick,
  disabled = false,
  fileName,
  isLoading = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`transition-all duration-200 hover:bg-green-600 disabled:opacity-50 ${className}`}
      style={{
        width: '60px',
        height: '32px',
        backgroundColor: 'var(--whatsapp-accent-green)',
        color: 'var(--whatsapp-primary-text)',
        border: 'none',
        borderRadius: 'var(--whatsapp-radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 'var(--whatsapp-font-base)',
        fontWeight: 'var(--whatsapp-font-weight-regular)'
      }}
      aria-label={`تحميل ${fileName || 'الملف'}`}
    >
      {isLoading ? (
        <div 
          className="animate-spin border-2 border-white border-t-transparent rounded-full"
          style={{ width: '14px', height: '14px' }}
        />
      ) : (
        <Download size={14} />
      )}
    </button>
  );
};

// أيقونة الإرسال - 24×24px داخل زر 48×48px مستدير
export const WhatsAppSendIcon: React.FC<WhatsAppIconProps & {
  isPulsing?: boolean;
  messageText?: string;
}> = ({ 
  className = '', 
  onClick,
  disabled = false,
  isPulsing = false,
  messageText = ''
}) => {
  const hasText = messageText.trim().length > 0;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`whatsapp-desktop-icon send transition-all duration-200 ${isPulsing ? 'animate-pulse' : ''} ${className}`}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: hasText ? 'var(--whatsapp-accent-green)' : 'transparent',
        color: hasText ? 'white' : 'var(--whatsapp-secondary-text)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: isPulsing ? 'scale(1.1)' : 'scale(1)',
        opacity: disabled ? 0.5 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled && hasText) {
          e.currentTarget.style.backgroundColor = '#1ea856';
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && hasText) {
          e.currentTarget.style.backgroundColor = 'var(--whatsapp-accent-green)';
          e.currentTarget.style.transform = isPulsing ? 'scale(1.1)' : 'scale(1)';
        }
      }}
      aria-label="إرسال الرسالة"
    >
      {hasText ? <Send size={24} /> : <Mic size={24} />}
    </button>
  );
};

// أيقونات القائمة الجانبية - 24×24px mono-tone أبيض
export const WhatsAppMenuIcon: React.FC<WhatsAppIconProps & {
  type: 'phone' | 'video' | 'menu' | 'attachment' | 'emoji';
}> = ({ 
  type,
  className = '', 
  onClick,
  disabled = false,
  isActive = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'phone':
        return <Phone size={24} />;
      case 'video':
        return <Video size={24} />;
      case 'menu':
        return <MoreVertical size={24} />;
      case 'attachment':
        return <Paperclip size={24} />;
      case 'emoji':
        return <Smile size={24} />;
      default:
        return <MoreVertical size={24} />;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`whatsapp-desktop-icon transition-all duration-200 ${className}`}
      style={{
        width: 'var(--whatsapp-icon-menu)',
        height: 'var(--whatsapp-icon-menu)',
        color: isActive ? 'var(--whatsapp-accent-green)' : 'var(--whatsapp-secondary-text)',
        background: isActive ? 'rgba(37, 211, 102, 0.1)' : 'transparent',
        border: 'none',
        borderRadius: 'var(--whatsapp-radius-sm)',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = 'var(--whatsapp-primary-text)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = isActive ? 'var(--whatsapp-accent-green)' : 'var(--whatsapp-secondary-text)';
          e.currentTarget.style.backgroundColor = isActive ? 'rgba(37, 211, 102, 0.1)' : 'transparent';
        }
      }}
      aria-label={`${type} action`}
    >
      {getIcon()}
    </button>
  );
};

// صور الملف الشخصي - 40×40px دائرية كاملة
export const WhatsAppAvatar: React.FC<{
  src?: string;
  alt?: string;
  size?: 'small' | 'large';
  initials?: string;
  isOnline?: boolean;
  className?: string;
}> = ({
  src,
  alt = 'User Avatar',
  size = 'large',
  initials,
  isOnline = false,
  className = ''
}) => {
  const avatarSize = size === 'large' ? 'whatsapp-desktop-avatar-large' : 'whatsapp-desktop-avatar-small';
  const gradientColors = [
    'from-purple-500 to-blue-600',
    'from-blue-500 to-green-600',
    'from-green-500 to-yellow-600',
    'from-yellow-500 to-red-600',
    'from-red-500 to-purple-600'
  ];
  
  const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];

  return (
    <div className={`${avatarSize} relative ${className}`} style={{ borderRadius: '50%', overflow: 'hidden' }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ borderRadius: '50%' }}
        />
      ) : (
        <div 
          className={`w-full h-full bg-gradient-to-r ${randomGradient} flex items-center justify-center text-white font-medium`}
          style={{
            fontSize: size === 'large' ? '16px' : '14px',
            fontWeight: 600
          }}
        >
          {initials || '👤'}
        </div>
      )}
      
      {/* مؤشر الحالة عبر الإنترنت */}
      {isOnline && (
        <div 
          className="absolute -bottom-1 -right-1 border-2 rounded-full animate-pulse"
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'var(--whatsapp-accent-green)',
            borderColor: 'var(--whatsapp-header-footer-bg)'
          }}
        />
      )}
    </div>
  );
};

// مؤشر الطباعة المتقدم
export const WhatsAppTypingIndicator: React.FC<{
  userName?: string;
  isVisible?: boolean;
}> = ({
  userName = 'المستخدم',
  isVisible = false
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="flex items-center gap-2 px-4 py-2"
      style={{
        color: 'var(--whatsapp-accent-green)',
        fontSize: 'var(--whatsapp-font-sm)',
        fontStyle: 'italic'
      }}
    >
      <span>{userName} يكتب</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full animate-bounce"
            style={{
              backgroundColor: 'var(--whatsapp-accent-green)',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// شريط التمرير الصوتي المتقدم
export const WhatsAppVoiceWaveform: React.FC<{
  duration?: number;
  currentTime?: number;
  isPlaying?: boolean;
  onSeek?: (time: number) => void;
  className?: string;
}> = ({
  duration = 30,
  currentTime = 0,
  isPlaying = false,
  onSeek,
  className = ''
}) => {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const height = Math.random() * 16 + 4; // ارتفاع عشوائي بين 4-20px
    const isActive = (i / 20) <= (currentTime / duration);
    
    return (
      <div
        key={i}
        className="whatsapp-desktop-waveform-bar cursor-pointer transition-all duration-150"
        style={{
          height: `${height}px`,
          backgroundColor: isActive ? 'var(--whatsapp-accent-green)' : 'rgba(255, 255, 255, 0.4)',
          borderRadius: '2px',
          width: '2px'
        }}
        onClick={() => onSeek?.((i / 20) * duration)}
      />
    );
  });

  return (
    <div 
      className={`whatsapp-desktop-waveform flex items-center gap-1 ${className}`}
      style={{ height: '20px' }}
    >
      {bars}
    </div>
  );
};

// نظام الإشعارات المتقدم
export const WhatsAppNotificationBadge: React.FC<{
  count?: number;
  type?: 'unread' | 'mention' | 'call';
  isVisible?: boolean;
  className?: string;
}> = ({
  count = 0,
  type = 'unread',
  isVisible = true,
  className = ''
}) => {
  if (!isVisible || count === 0) return null;

  const getColor = () => {
    switch (type) {
      case 'mention':
        return '#ef4444'; // أحمر للإشارات
      case 'call':
        return '#3b82f6'; // أزرق للمكالمات
      case 'unread':
      default:
        return 'var(--whatsapp-accent-green)'; // أخضر للرسائل غير المقروءة
    }
  };

  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        backgroundColor: getColor(),
        color: 'white',
        fontSize: '11px',
        fontWeight: 600,
        padding: '2px 6px',
        borderRadius: '12px',
        minWidth: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 2px 8px ${getColor()}40`,
        position: 'absolute',
        top: '-2px',
        right: '-2px',
        zIndex: 10
      }}
    >
      {count > 99 ? '99+' : count}
    </div>
  );
};

export default {
  WhatsAppSearchIcon,
  WhatsAppDownloadIcon,
  WhatsAppSendIcon,
  WhatsAppMenuIcon,
  WhatsAppAvatar,
  WhatsAppTypingIndicator,
  WhatsAppVoiceWaveform,
  WhatsAppNotificationBadge
};