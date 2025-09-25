'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  WhatsAppSearchIcon,
  WhatsAppDownloadIcon,
  WhatsAppSendIcon,
  WhatsAppMenuIcon,
  WhatsAppAvatar,
  WhatsAppTypingIndicator,
  WhatsAppVoiceWaveform,
  WhatsAppNotificationBadge
} from './WhatsAppIconSystem';

import {
  WhatsAppConnectionStatus,
  WhatsAppVoicePlayer,
  WhatsAppQuickReactions,
  WhatsAppVoiceRecording,
  WhatsAppNotificationToast,
  WhatsAppReadStatus
} from './WhatsAppInteractions';

// مدير الحالات المتقدم
export const WhatsAppAdvancedChat: React.FC<{
  language: 'ar' | 'en';
  onSendMessage?: (message: string) => void;
  onVoiceMessage?: (audioBlob: Blob) => void;
  className?: string;
}> = ({
  language,
  onSendMessage,
  onVoiceMessage,
  className = ''
}) => {
  // حالات التطبيق
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'connecting' | 'offline'>('online');
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>>([]);

  // تأثيرات الحالة
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRecordingDuration(0);
    }
  }, [isRecording]);

  // معالجة الرسائل
  const handleSendMessage = useCallback(() => {
    if (messageText.trim()) {
      onSendMessage?.(messageText);
      setMessageText('');
      addNotification('تم إرسال الرسالة', 'success');
    }
  }, [messageText, onSendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // معالجة التسجيل الصوتي
  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    addNotification('بدء التسجيل الصوتي', 'info');
  }, []);

  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
    // هنا يمكن إضافة منطق حفظ التسجيل
    addNotification('تم إرسال الرسالة الصوتية', 'success');
  }, []);

  const handleCancelRecording = useCallback(() => {
    setIsRecording(false);
    addNotification('تم إلغاء التسجيل', 'warning');
  }, []);

  // نظام الإشعارات
  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // مؤشر الطباعة
  useEffect(() => {
    if (messageText.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [messageText]);

  // رسائل تجريبية
  const sampleMessages = [
    {
      id: '1',
      sender: 'customer' as const,
      content: 'مرحباً، كيف يمكنني مساعدتك اليوم؟',
      timestamp: '10:30 ص',
      status: 'read' as const,
      type: 'text' as const
    },
    {
      id: '2',
      sender: 'agent' as const,
      content: 'أهلاً وسهلاً! أحتاج للاستفسار عن خدماتكم.',
      timestamp: '10:32 ص',
      status: 'delivered' as const,
      type: 'text' as const
    },
    {
      id: '3',
      sender: 'customer' as const,
      content: 'بالطبع، يسعدني مساعدتك. ما نوع الخدمة التي تبحث عنها؟',
      timestamp: '10:33 ص',
      status: 'read' as const,
      type: 'voice' as const,
      voiceDuration: 15
    }
  ];

  return (
    <div className={`whatsapp-desktop-container whatsapp-gpu-accelerated ${className}`}>
      {/* الإشعارات */}
      {notifications.map((notification) => (
        <WhatsAppNotificationToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      {/* رأس المحادثة المتقدم */}
      <div className="whatsapp-desktop-header">
        <div className="flex items-center gap-3">
          {/* صورة شخصية متقدمة */}
          <WhatsAppAvatar
            initials="عم"
            isOnline={connectionStatus === 'online'}
            size="large"
            className="whatsapp-hover-scale"
          />
          
          <div className="flex-1">
            <h3 className="whatsapp-desktop-text-contact-name">
              عميل محترم
            </h3>
            <WhatsAppConnectionStatus
              status={connectionStatus}
              lastSeen="منذ 5 دقائق"
            />
          </div>
        </div>

        {/* أيقونات الإجراءات */}
        <div className="flex items-center gap-2">
          <WhatsAppMenuIcon type="phone" />
          <WhatsAppMenuIcon type="video" />
          <WhatsAppMenuIcon type="menu" />
        </div>
      </div>

      {/* منطقة الرسائل المتقدمة */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* مؤشر الطباعة */}
        <WhatsAppTypingIndicator
          userName="العميل"
          isVisible={isTyping}
        />

        {/* الرسائل */}
        <div className="space-y-3">
          {sampleMessages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`whatsapp-desktop-bubble ${message.sender === 'agent' ? 'outgoing' : 'incoming'} 
                          whatsapp-hover-lift relative group max-w-xs`}
                onMouseEnter={() => setShowReactions(message.id)}
                onMouseLeave={() => setShowReactions(null)}
              >
                {message.type === 'voice' ? (
                  <WhatsAppVoicePlayer
                    src="/path/to/audio.mp3"
                    duration={message.voiceDuration || 30}
                    onPlay={() => addNotification('تشغيل الرسالة الصوتية', 'info')}
                  />
                ) : (
                  <>
                    <p className="whatsapp-desktop-message-text">
                      {message.content}
                    </p>
                    <WhatsAppReadStatus
                      status={message.status}
                      timestamp={message.timestamp}
                    />
                  </>
                )}

                {/* ردود فعل سريعة */}
                <WhatsAppQuickReactions
                  isVisible={showReactions === message.id}
                  onReact={(reaction) => addNotification(`تم التفاعل بـ ${reaction}`, 'success')}
                  onClose={() => setShowReactions(null)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* شريط الإدخال المتقدم */}
      <div className="whatsapp-desktop-input">
        {/* إذا كان يسجل صوت */}
        {isRecording ? (
          <WhatsAppVoiceRecording
            isRecording={isRecording}
            duration={recordingDuration}
            onStop={handleStopRecording}
            onCancel={handleCancelRecording}
          />
        ) : (
          <>
            {/* أيقونة الإيموجي */}
            <WhatsAppMenuIcon type="emoji" />
            
            {/* أيقونة المرفقات */}
            <WhatsAppMenuIcon type="attachment" />

            {/* حقل الإدخال */}
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
              className="whatsapp-desktop-input-field whatsapp-focus-enhanced"
            />

            {/* زر الإرسال/التسجيل */}
            <WhatsAppSendIcon
              messageText={messageText}
              onClick={messageText.trim() ? handleSendMessage : handleStartRecording}
              isPulsing={isRecording}
              className="whatsapp-button-interactive"
            />
          </>
        )}
      </div>
    </div>
  );
};

// مكون البحث المتقدم
export const WhatsAppAdvancedSearch: React.FC<{
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}> = ({
  onSearch,
  placeholder = 'البحث...',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 
                   ${isFocused ? 'whatsapp-search-focus' : ''}`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <WhatsAppSearchIcon />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
          style={{
            fontSize: 'var(--whatsapp-font-base)',
            fontFamily: 'var(--whatsapp-font-arabic)'
          }}
        />
      </div>
    </div>
  );
};

// مكون جهة الاتصال المتقدم
export const WhatsAppAdvancedContact: React.FC<{
  contact: {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
    avatar?: string;
  };
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}> = ({
  contact,
  isSelected,
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`whatsapp-desktop-chat-row whatsapp-hover-lift whatsapp-button-interactive cursor-pointer 
                 ${isSelected ? 'bg-white/5' : ''} ${className}`}
      style={{
        borderLeft: isSelected ? '3px solid var(--whatsapp-accent-green)' : '3px solid transparent'
      }}
    >
      {/* صورة شخصية مع إشعارات */}
      <div className="relative">
        <WhatsAppAvatar
          initials={contact.name.charAt(0)}
          isOnline={contact.isOnline}
          src={contact.avatar}
          className="whatsapp-avatar-status-active"
        />
        
        {/* شارة عدد الرسائل غير المقروءة */}
        <WhatsAppNotificationBadge
          count={contact.unreadCount}
          type="unread"
          isVisible={contact.unreadCount > 0}
        />
      </div>

      {/* محتوى جهة الاتصال */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="whatsapp-desktop-text-contact-name truncate">
            {contact.name}
          </h3>
          <span className="whatsapp-desktop-text-timestamp">
            {contact.timestamp}
          </span>
        </div>
        
        <p className="whatsapp-desktop-text-snippet truncate">
          {contact.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default {
  WhatsAppAdvancedChat,
  WhatsAppAdvancedSearch,
  WhatsAppAdvancedContact
};