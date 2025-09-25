'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface WhatsAppStyleMessageProps {
  message: {
    id: string;
    sender: 'agent' | 'customer';
    content: string;
    timestamp: string;
    attachment?: {
      name: string;
      size: string;
      type: string;
    };
  };
  isDownloading?: boolean;
  onDownload?: (id: string, filename: string) => void;
  onQuickAction?: (action: string, messageId: string) => void;
  hoveredMessage?: string | null;
  setHoveredMessage?: (id: string | null) => void;
}

export const WhatsAppStyleMessage: React.FC<WhatsAppStyleMessageProps> = ({
  message,
  isDownloading,
  onDownload,
  onQuickAction,
  hoveredMessage,
  setHoveredMessage
}) => {
  return (
    <div
      className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'} relative group`}
      style={{ marginBottom: 'var(--whatsapp-margin-between-bubbles)' }}
      onMouseEnter={() => setHoveredMessage?.(message.id)}
      onMouseLeave={() => setHoveredMessage?.(null)}
    >
      <div
        className={`whatsapp-desktop-bubble ${message.sender === 'agent' ? 'outgoing' : 'incoming'} transition-all duration-200 relative`}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = 'var(--whatsapp-shadow-popup)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'var(--whatsapp-shadow-message)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Quick Actions on hover */}
        {hoveredMessage === message.id && (
          <div 
            className="absolute -top-8 right-0 flex items-center gap-1 bg-gray-800 rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ zIndex: 10 }}
          >
            <button
              onClick={() => onQuickAction?.('reply', message.id)}
              className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xs text-white transition-colors"
              title="رد"
              aria-label="رد على الرسالة"
            >
              ↩
            </button>
            <button
              onClick={() => onQuickAction?.('forward', message.id)}
              className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xs text-white transition-colors"
              title="إعادة توجيه"
              aria-label="إعادة توجيه الرسالة"
            >
              ↪
            </button>
            <button
              onClick={() => onQuickAction?.('react', message.id)}
              className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xs text-white transition-colors"
              title="تفاعل"
              aria-label="إضافة تفاعل"
            >
              😊
            </button>
          </div>
        )}

        {/* Message text */}
        <p className="whatsapp-desktop-message-text">
          {message.content}
        </p>

        {/* Attachment */}
        {message.attachment && (
          <div 
            className="mt-2 border rounded flex items-center gap-3 transition-colors hover:bg-opacity-80"
            style={{
              width: '280px',
              padding: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--whatsapp-radius-sm)',
              marginTop: 'var(--whatsapp-margin-between-bubbles)',
              backgroundColor: message.sender === 'agent' ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* File Preview - 64x64px */}
            <div 
              className="bg-red-500 rounded flex items-center justify-center font-bold flex-shrink-0"
              style={{ 
                width: '64px', 
                height: '64px',
                color: 'var(--whatsapp-primary-text)'
              }}
            >
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <p 
                className="font-medium truncate whatsapp-desktop-text-primary"
                style={{
                  fontFamily: 'var(--whatsapp-font-english)',
                  fontSize: 'var(--whatsapp-font-base)',
                  fontWeight: 'var(--whatsapp-font-weight-medium)'
                }}
              >
                {message.attachment.name}
              </p>
              <p 
                className="mt-1 whatsapp-desktop-text-timestamp"
                style={{
                  color: 'var(--whatsapp-secondary-text)'
                }}
              >
                {message.attachment.size}
              </p>
            </div>
            {/* Download Button */}
            <button
              onClick={() => onDownload?.(message.id, message.attachment!.name)}
              disabled={isDownloading}
              className="rounded flex items-center justify-center transition-colors disabled:opacity-50 hover:bg-green-600"
              style={{ 
                width: '60px', 
                height: '32px',
                fontSize: 'var(--whatsapp-font-base)',
                fontWeight: 'var(--whatsapp-font-weight-regular)',
                backgroundColor: 'var(--whatsapp-accent-green)',
                color: 'var(--whatsapp-primary-text)',
                willChange: 'background-color'
              }}
              aria-label={`Download: ${message.attachment.name}`}
            >
              {isDownloading ? (
                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Download size={14} />
              )}
            </button>
          </div>
        )}

        {/* Timestamp */}
        <p className="whatsapp-desktop-message-time mt-1">
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};