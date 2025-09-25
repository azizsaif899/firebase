'use client';

import React from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

interface WhatsAppInputBarProps {
  messageText: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isPulsing?: boolean;
  isSendDisabled?: boolean;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const WhatsAppInputBar: React.FC<WhatsAppInputBarProps> = ({
  messageText,
  onMessageChange,
  onSendMessage,
  onKeyPress,
  isPulsing,
  isSendDisabled,
  placeholder = 'اكتب رسالة...',
  inputRef
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // Handle file drop logic here
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="whatsapp-desktop-input flex items-center gap-4"
      style={{
        height: 'var(--whatsapp-input-height)',
        backgroundColor: 'var(--whatsapp-header-footer-bg)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 'var(--whatsapp-padding-input-vertical) var(--whatsapp-padding-input-horizontal)'
      }}
    >
      {/* Emoji Button */}
      <button 
        className="whatsapp-desktop-icon cursor-pointer transition-colors"
        aria-label="إضافة رموز تعبير"
      >
        <Smile size={24} />
      </button>

      {/* Attachment Button */}
      <button 
        className="whatsapp-desktop-icon cursor-pointer transition-colors"
        aria-label="إرفاق ملف"
      >
        <Paperclip size={24} />
      </button>

      {/* Input Field */}
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="whatsapp-desktop-input-field w-full"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: 'var(--whatsapp-radius-lg)',
            padding: '0 16px',
            height: '40px',
            color: 'var(--whatsapp-primary-text)',
            fontSize: 'var(--whatsapp-font-base)',
            fontFamily: 'var(--whatsapp-font-arabic)',
            outline: 'none'
          }}
          aria-label={placeholder}
        />
      </div>

      {/* Voice/Send Button */}
      {messageText.trim() ? (
        <button 
          onClick={onSendMessage}
          disabled={isSendDisabled}
          className={`whatsapp-desktop-icon send cursor-pointer transition-all duration-200 ${isPulsing ? 'animate-pulse' : ''}`}
          style={{ 
            opacity: isSendDisabled ? 0.5 : 1,
            willChange: 'opacity, color, transform',
            transform: isPulsing ? 'scale(1.1)' : 'scale(1)',
            color: 'var(--whatsapp-accent-green)'
          }}
          aria-label="إرسال الرسالة"
          onKeyDown={(e) => e.key === 'Enter' && !isSendDisabled && onSendMessage()}
          tabIndex={0}
        >
          <Send size={24} />
        </button>
      ) : (
        <button 
          className="whatsapp-desktop-icon cursor-pointer transition-colors"
          aria-label="تسجيل رسالة صوتية"
        >
          <Mic size={24} />
        </button>
      )}
    </div>
  );
};