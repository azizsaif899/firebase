'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

// حالات الاتصال والشبكة
export const WhatsAppConnectionStatus: React.FC<{
  status: 'online' | 'connecting' | 'offline';
  lastSeen?: string;
}> = ({ status, lastSeen }) => {
  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'متصل الآن';
      case 'connecting':
        return 'يتم الاتصال...';
      case 'offline':
        return lastSeen ? `آخر ظهور ${lastSeen}` : 'غير متصل';
      default:
        return 'غير معروف';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'var(--whatsapp-accent-green)';
      case 'connecting':
        return '#f59e0b';
      case 'offline':
        return 'var(--whatsapp-secondary-text)';
      default:
        return 'var(--whatsapp-secondary-text)';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: getStatusColor(),
          animation: status === 'connecting' ? 'pulse 2s infinite' : 'none'
        }}
      />
      <span
        style={{
          color: getStatusColor(),
          fontSize: 'var(--whatsapp-font-sm)',
          fontWeight: 'var(--whatsapp-font-weight-regular)'
        }}
      >
        {getStatusText()}
      </span>
    </div>
  );
};

// مشغل الرسائل الصوتية المتقدم
export const WhatsAppVoicePlayer: React.FC<{
  src: string;
  duration: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}> = ({
  src,
  duration,
  onPlay,
  onPause,
  onEnded,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleLoadedData = () => {
        setIsLoaded(true);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        onEnded?.();
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [onEnded]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // إنشاء الأشكال الموجية
  const waveformBars = Array.from({ length: 30 }, (_, i) => {
    const height = Math.random() * 12 + 4; // ارتفاع عشوائي
    const progress = currentTime / duration;
    const isActive = (i / 30) <= progress;
    
    return (
      <div
        key={i}
        className="cursor-pointer transition-all duration-100"
        style={{
          width: '2px',
          height: `${height}px`,
          backgroundColor: isActive && isPlaying 
            ? 'var(--whatsapp-accent-green)' 
            : 'rgba(255, 255, 255, 0.4)',
          borderRadius: '1px',
          animation: isActive && isPlaying ? `waveAnimation${i % 3} 1s infinite ease-in-out` : 'none'
        }}
        onClick={() => handleSeek((i / 30) * duration)}
      />
    );
  });

  return (
    <div className={`whatsapp-desktop-voice flex items-center gap-3 ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* زر التشغيل/الإيقاف */}
      <button
        onClick={togglePlayPause}
        disabled={!isLoaded}
        className="flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'var(--whatsapp-accent-green)',
          color: 'white',
          border: 'none',
          cursor: isLoaded ? 'pointer' : 'not-allowed',
          opacity: isLoaded ? 1 : 0.5
        }}
        aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* الأشكال الموجية */}
      <div className="flex items-center gap-1 h-4">
        {waveformBars}
      </div>

      {/* مدة التشغيل */}
      <span
        style={{
          fontSize: 'var(--whatsapp-font-sm)',
          color: 'var(--whatsapp-secondary-text)',
          fontWeight: 'var(--whatsapp-font-weight-regular)',
          minWidth: '35px'
        }}
      >
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      {/* أيقونة الصوت */}
      <Volume2 
        size={16} 
        style={{ color: 'var(--whatsapp-secondary-text)' }}
      />
    </div>
  );
};

// نظام ردود الفعل السريعة
export const WhatsAppQuickReactions: React.FC<{
  onReact: (reaction: string) => void;
  isVisible: boolean;
  onClose: () => void;
}> = ({ onReact, isVisible, onClose }) => {
  const reactions = ['❤️', '😂', '😮', '😢', '😡', '👍', '👎', '🙏'];

  if (!isVisible) return null;

  return (
    <div
      className="absolute bg-black/90 backdrop-blur-md rounded-full p-2 flex gap-1 animate-fadeIn z-50"
      style={{
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--whatsapp-shadow-popup)'
      }}
    >
      {reactions.map((reaction) => (
        <button
          key={reaction}
          onClick={() => {
            onReact(reaction);
            onClose();
          }}
          className="w-8 h-8 rounded-full hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-lg hover:scale-125"
          aria-label={`React with ${reaction}`}
        >
          {reaction}
        </button>
      ))}
    </div>
  );
};

// مؤشر تسجيل الصوت
export const WhatsAppVoiceRecording: React.FC<{
  isRecording: boolean;
  duration: number;
  onStop: () => void;
  onCancel: () => void;
}> = ({ isRecording, duration, onStop, onCancel }) => {
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording) return null;

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 rounded-lg animate-slideIn"
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#ef4444'
      }}
    >
      {/* نقطة التسجيل المتحركة */}
      <div
        className="w-3 h-3 rounded-full animate-pulse"
        style={{ backgroundColor: '#ef4444' }}
      />
      
      <span style={{ fontSize: 'var(--whatsapp-font-sm)', fontWeight: 600 }}>
        جاري التسجيل...
      </span>
      
      <span style={{ fontSize: 'var(--whatsapp-font-sm)' }}>
        {formatRecordingTime(duration)}
      </span>
      
      <div className="flex gap-2 ml-auto">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white transition-colors"
          style={{ fontSize: 'var(--whatsapp-font-sm)' }}
        >
          إلغاء
        </button>
        <button
          onClick={onStop}
          className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white transition-colors"
          style={{ fontSize: 'var(--whatsapp-font-sm)' }}
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

// نظام الإشعارات التفاعلية
export const WhatsAppNotificationToast: React.FC<{
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  autoHide?: boolean;
  duration?: number;
}> = ({
  message,
  type,
  isVisible,
  onClose,
  autoHide = true,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHide, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.9)',
          borderColor: '#10b981'
        };
      case 'error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.9)',
          borderColor: '#ef4444'
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.9)',
          borderColor: '#f59e0b'
        };
      case 'info':
      default:
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          borderColor: '#3b82f6'
        };
    }
  };

  return (
    <div
      className="fixed top-20 right-4 z-50 animate-slideInRight"
      style={{
        ...getTypeStyles(),
        color: 'white',
        padding: '12px 16px',
        borderRadius: 'var(--whatsapp-radius-lg)',
        border: `1px solid ${getTypeStyles().borderColor}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: `0 8px 24px ${getTypeStyles().borderColor}40`,
        maxWidth: '320px',
        fontSize: 'var(--whatsapp-font-sm)',
        fontWeight: 'var(--whatsapp-font-weight-medium)'
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="إغلاق الإشعار"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// حالة قراءة الرسائل
export const WhatsAppReadStatus: React.FC<{
  status: 'sending' | 'sent' | 'delivered' | 'read';
  timestamp: string;
}> = ({ status, timestamp }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return '⏱️';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'read':
        return '#34b7f1'; // أزرق للمقروءة
      case 'delivered':
      case 'sent':
        return 'var(--whatsapp-secondary-text)';
      case 'sending':
        return 'rgba(255, 255, 255, 0.4)';
      default:
        return 'var(--whatsapp-secondary-text)';
    }
  };

  return (
    <div className="flex items-center gap-1 justify-end">
      <span
        style={{
          fontSize: '10px',
          color: 'var(--whatsapp-secondary-text)'
        }}
      >
        {timestamp}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: getStatusColor(),
          fontWeight: status === 'read' ? 600 : 400
        }}
      >
        {getStatusIcon()}
      </span>
    </div>
  );
};

export default {
  WhatsAppConnectionStatus,
  WhatsAppVoicePlayer,
  WhatsAppQuickReactions,
  WhatsAppVoiceRecording,
  WhatsAppNotificationToast,
  WhatsAppReadStatus
};