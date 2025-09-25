'use client';

import React, { useState, useCallback } from 'react';
import { 
  WhatsAppSearchIcon,
  WhatsAppDownloadIcon,
  WhatsAppSendIcon,
  WhatsAppMenuIcon,
  WhatsAppAvatar,
  WhatsAppTypingIndicator,
  WhatsAppNotificationBadge
} from './WhatsAppIconSystem';

import {
  WhatsAppConnectionStatus,
  WhatsAppVoicePlayer,
  WhatsAppNotificationToast,
  WhatsAppReadStatus
} from './WhatsAppInteractions';

interface WhatsAppIntegratedProps {
  language: 'ar' | 'en';
}

export const WhatsAppIntegrated: React.FC<WhatsAppIntegratedProps> = ({ language }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>>([]);

  // بيانات تجريبية للمحادثات
  const contacts = [
    {
      id: '1',
      name: 'أحمد محمد',
      lastMessage: 'شكراً لك، سأفكر في الأمر',
      timestamp: '10:30 ص',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'فاطمة السالم',
      lastMessage: 'هل يمكنني الحصول على مزيد من التفاصيل؟',
      timestamp: '09:15 ص',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'محمد الأحمد',
      lastMessage: 'تم إكمال الطلب بنجاح',
      timestamp: 'أمس',
      unreadCount: 1,
      isOnline: true
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'customer' as const,
      content: 'مرحباً، كيف يمكنني مساعدتك اليوم؟',
      timestamp: '10:30 ص',
      status: 'read' as const
    },
    {
      id: '2',
      sender: 'agent' as const,
      content: 'أهلاً وسهلاً! أحتاج للاستفسار عن خدماتكم.',
      timestamp: '10:32 ص',
      status: 'delivered' as const
    }
  ];

  const selectedContact = contacts.find(c => c.id === selectedChat);

  const handleSendMessage = useCallback(() => {
    if (messageText.trim()) {
      addNotification('تم إرسال الرسالة', 'success');
      setMessageText('');
    }
  }, [messageText]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="whatsapp-desktop-container whatsapp-gpu-accelerated h-screen flex">
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

      {/* قائمة جهات الاتصال */}
      <div className="whatsapp-desktop-chat-list flex flex-col">
        {/* رأس البحث */}
        <div className="whatsapp-desktop-header">
          <div className="relative w-full">
            <WhatsAppSearchIcon />
            <input
              type="text"
              placeholder="البحث في المحادثات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg pl-10 pr-4 py-2 bg-transparent border-none outline-none"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--whatsapp-primary-text)',
                fontSize: 'var(--whatsapp-font-base)'
              }}
            />
          </div>
        </div>

        {/* قائمة جهات الاتصال */}
        <div className="flex-1 overflow-y-auto whatsapp-desktop-scroll">
          {contacts
            .filter(contact =>
              searchQuery === '' ||
              contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedChat(contact.id)}
                className={`whatsapp-desktop-chat-row whatsapp-hover-lift cursor-pointer
                          ${selectedChat === contact.id ? 'bg-white/5 border-l-2 border-green-500' : ''}`}
              >
                <div className="relative">
                  <WhatsAppAvatar
                    initials={contact.name.charAt(0)}
                    isOnline={contact.isOnline}
                    size="large"
                  />
                  <WhatsAppNotificationBadge
                    count={contact.unreadCount}
                    type="unread"
                    isVisible={contact.unreadCount > 0}
                  />
                </div>

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
            ))}
        </div>
      </div>

      {/* منطقة المحادثة */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--whatsapp-chat-area-bg)' }}>
        {/* رأس المحادثة */}
        <div className="whatsapp-desktop-header">
          <div className="flex items-center gap-3">
            <WhatsAppAvatar
              initials={selectedContact?.name.charAt(0) || 'م'}
              isOnline={selectedContact?.isOnline || false}
              size="large"
            />
            <div className="flex-1">
              <h3 className="whatsapp-desktop-text-contact-name">
                {selectedContact?.name || 'اختر محادثة'}
              </h3>
              <WhatsAppConnectionStatus
                status={selectedContact?.isOnline ? 'online' : 'offline'}
                lastSeen="منذ 5 دقائق"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WhatsAppMenuIcon type="phone" />
            <WhatsAppMenuIcon type="video" />
            <WhatsAppMenuIcon type="menu" />
          </div>
        </div>

        {/* الرسائل */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 whatsapp-desktop-scroll">
          <WhatsAppTypingIndicator
            userName={selectedContact?.name || 'المستخدم'}
            isVisible={messageText.length > 0}
          />

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`whatsapp-desktop-bubble ${message.sender === 'agent' ? 'outgoing' : 'incoming'} 
                          whatsapp-hover-lift whatsapp-message-enter-${message.sender === 'agent' ? 'right' : 'left'}`}
              >
                <p className="whatsapp-desktop-message-text">
                  {message.content}
                </p>
                <WhatsAppReadStatus
                  status={message.status}
                  timestamp={message.timestamp}
                />
              </div>
            </div>
          ))}
        </div>

        {/* شريط الإدخال */}
        <div className="whatsapp-desktop-input">
          <WhatsAppMenuIcon type="emoji" />
          <WhatsAppMenuIcon type="attachment" />

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="اكتب رسالة..."
            className="whatsapp-desktop-input-field whatsapp-focus-enhanced"
          />

          <WhatsAppSendIcon
            messageText={messageText}
            onClick={handleSendMessage}
            className="whatsapp-button-interactive"
          />
        </div>
      </div>
    </div>
  );
};