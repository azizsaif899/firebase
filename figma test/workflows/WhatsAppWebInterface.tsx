'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Search, 
  Phone, 
  Video, 
  Paperclip, 
  Mic, 
  Send, 
  Smile,
  Plus,
  PlayCircle,
  PauseCircle,
  Check,
  CheckCheck,
  VolumeX,
  Pin,
  Info,
  ArrowLeft,
  X,
  Settings,
  MoreVertical,
  Zap
} from 'lucide-react';
import { WhatsAppInfoPanel } from './WhatsAppInfoPanel';
import { ProfessionalLogo } from './ProfessionalLogo';
import { ChatPerformanceMonitor } from './ChatPerformanceMonitor';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeen?: string;
  isTyping?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'image' | 'file';
  voiceDuration?: number;
  isDelivered?: boolean;
  isRead?: boolean;
  isSent?: boolean;
}

interface WhatsAppWebInterfaceProps {
  language: 'ar' | 'en';
}

export function WhatsAppWebInterface({ language }: WhatsAppWebInterfaceProps) {
  const [selectedContact, setSelectedContact] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'connecting' | 'offline'>('online');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const isRTL = language === 'ar';

  const texts = {
    ar: {
      search: 'ابحث أو ابدأ محادثة جديدة',
      typeMessage: 'اكتب رسالة...',
      online: 'متصل',
      lastSeen: 'آخر ظهور',
      typing: 'يكتب...',
      delivered: 'تم التسليم',
      read: 'تم القراءة',
      now: 'الآن',
      today: 'اليوم',
      yesterday: 'أمس',
      backToChats: 'العودة للمحادثات',
      closeChat: 'إغلاق المحادثة',
      voiceMessage: 'رسالة صوتية',
      recording: 'جاري التسجيل...',
      networkOffline: 'لا يوجد اتصال بالإنترنت',
      reconnecting: 'جاري إعادة الاتصال...',
      connected: 'تم الاتصال',
      brandName: 'FlowCanvas',
      brandSubtitle: 'منصة الذكاء الاصطناعي'
    },
    en: {
      search: 'Search or start new chat',
      typeMessage: 'Type a message...',
      online: 'online',
      lastSeen: 'last seen',
      typing: 'typing...',
      delivered: 'delivered',
      read: 'read',
      now: 'now',
      today: 'today',
      yesterday: 'yesterday',
      backToChats: 'Back to chats',
      closeChat: 'Close chat',
      voiceMessage: 'Voice message',
      recording: 'Recording...',
      networkOffline: 'No internet connection',
      reconnecting: 'Reconnecting...',
      connected: 'Connected',
      brandName: 'FlowCanvas',
      brandSubtitle: 'AI Platform'
    }
  };

  const t = texts[language];

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'علي أحمد',
      avatar: '/avatars/01.png',
      lastMessage: 'مرحباً، كيف حالك اليوم؟',
      timestamp: '12:30 م',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2', 
      name: 'خالد يحيى',
      avatar: '/avatars/02.png',
      lastMessage: '+966 54 879 4332',
      timestamp: '12:29 م',
      isOnline: false,
      lastSeen: 'آخر ظهور قبل 5 دقائق'
    },
    {
      id: '3',
      name: 'مجموعة المطورين',
      avatar: '/avatars/group1.png', 
      lastMessage: 'فيه احد فاضي يعمل',
      timestamp: 'أمس',
      unreadCount: 1,
      isPinned: true
    },
    {
      id: '4',
      name: 'سمير أحمد',
      avatar: '/avatars/04.png',
      lastMessage: 'عندك فكرة وقت تخلص',
      timestamp: 'أمس',
      isOnline: true
    },
    {
      id: '5',
      name: 'مجموعة التصميم',
      avatar: '/avatars/group2.png',
      lastMessage: 'محتاجين نظام تتبع للمستخدمين',
      timestamp: 'أمس',
      unreadCount: 2
    },
    {
      id: '6',
      name: 'محمد علي',
      avatar: '/avatars/06.png',
      lastMessage: 'تم',
      timestamp: 'أمس'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      content: 'مرحباً، كيف حالك؟',
      timestamp: new Date(Date.now() - 600000),
      type: 'text',
      isDelivered: true,
      isRead: true
    },
    {
      id: '2',
      senderId: 'me',
      content: 'الحمد لله بخير، وأنت؟',
      timestamp: new Date(Date.now() - 540000),
      type: 'text',
      isDelivered: true,
      isRead: true
    },
    {
      id: '3',
      senderId: '1',
      content: '',
      timestamp: new Date(Date.now() - 480000),
      type: 'voice',
      voiceDuration: 15,
      isDelivered: true,
      isRead: false
    },
    {
      id: '4',
      senderId: 'me',
      content: 'ممتاز! هذا رائع 👍',
      timestamp: new Date(Date.now() - 420000),
      type: 'text',
      isDelivered: true,
      isRead: false
    },
    {
      id: '5',
      senderId: '1',
      content: '',
      timestamp: new Date(Date.now() - 360000),
      type: 'voice', 
      voiceDuration: 23,
      isDelivered: true,
      isRead: false
    },
    {
      id: '6',
      senderId: '1',
      content: 'هل يمكنك مساعدتي في مشروع جديد؟',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      isDelivered: true,
      isRead: false
    }
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Debounced typing indicator
  const handleInputChange = useCallback((value: string) => {
    setMessage(value);
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    if (value.trim()) {
      setIsTyping(true);
      debounceTimer.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }
  }, []);

  // Smooth scroll to bottom with performance optimization
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      // Performance measurement
      if (window.chatPerformance) {
        window.chatPerformance.markStart('scroll-performance');
      }
      
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
      
      if (window.chatPerformance) {
        window.chatPerformance.markEnd('scroll-performance');
      }
    }
  }, []);

  // Enhanced message sending with validation
  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;
    
    // Here you would typically send the message to your backend
    setMessage('');
    setIsTyping(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
      // Auto-resize textarea
      inputRef.current.style.height = 'auto';
    }
  }, [message]);

  // Voice recording with state management
  const handleVoiceRecord = useCallback(() => {
    setIsRecording(prev => !prev);
    // Here you would typically start/stop audio recording
  }, []);

  // Keyboard shortcuts handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Escape') {
      setMessage('');
      setIsTyping(false);
    }
  }, [handleSendMessage]);

  // Network status monitoring
  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  // Auto-resize textarea
  const handleTextareaResize = useCallback((textarea: HTMLTextAreaElement) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, []);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const toggleVoicePlay = (messageId: string) => {
    setPlayingVoice(playingVoice === messageId ? null : messageId);
  };

  const formatVoiceDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <div 
      className="chat-layout chat-container chat-custom-scrollbar"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Network Status Indicator */}
      {networkStatus !== 'online' && (
        <div className={`chat-network-status visible ${networkStatus === 'offline' ? 'error' : 'warning'}`}>
          {networkStatus === 'offline' ? t.networkOffline : t.reconnecting}
        </div>
      )}

      {/* Professional Header */}
      <div className="chat-header">
        <ProfessionalLogo 
          size="md" 
          variant="default" 
          language={language} 
        />
        
        <div className="chat-header-actions">
          <button className="chat-header-button" title={t.backToChats}>
            <ArrowLeft size={20} />
          </button>
          <button className="chat-header-button">
            <Settings size={20} />
          </button>
          <button className="chat-close-button chat-header-button" title={t.closeChat}>
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {/* Chat Messages Area */}
        <div className="chat-messages chat-custom-scrollbar">
          
          {/* Date Separator */}
          <div className="chat-date-separator">
            <span>{t.today}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* صورة المستخدم */}
            <img
              src={selectedContactData?.avatar || '/avatars/01.png'}
              alt={selectedContactData?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            
            {/* معلومات المستخدم */}
            <div className="flex flex-col">
              <h3 className="font-medium text-foreground">
                {selectedContactData?.name}
              </h3>
              <div className="text-sm text-muted-foreground">
                {selectedContactData?.isTyping 
                  ? (
                    <span className="flex items-center gap-1">
                      {t.typing}
                      <span className="flex gap-0.5 ml-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse inline-block"></span>
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse inline-block" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse inline-block" style={{ animationDelay: '0.4s' }}></span>
                      </span>
                    </span>
                  )
                  : selectedContactData?.isOnline 
                  ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                      {t.online}
                    </span>
                  )
                  : selectedContactData?.lastSeen
                }
              </div>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Phone size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Video size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Search size={20} className="text-muted-foreground" />
            </button>
            <button 
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setShowInfoPanel(!showInfoPanel)}
            >
              <Info size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* منطقة الرسائل */}
        <div className="whatsapp-messages-area whatsapp-messages">
          <div className="p-4 space-y-4 min-h-full flex flex-col justify-end">
            {/* فاصل التاريخ */}
            <div className="flex justify-center">
              <div className="bg-muted px-3 py-1 rounded-lg text-xs text-muted-foreground">
                اليوم
              </div>
            </div>

          {messages.map((msg) => {
            const isOwnMessage = msg.senderId === 'me';
            
            return (
              <div
                key={msg.id}
                className={`chat-message ${isOwnMessage ? 'sent' : 'received'}`}
              >
                {msg.type === 'text' && (
                  <div className={`chat-bubble ${isOwnMessage ? 'sent' : 'received'}`}>
                    <div className="chat-message-content">{msg.content}</div>
                    
                    <div className="chat-message-meta">
                      <span className="chat-message-time">
                        {formatTime(msg.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <div className="chat-message-status">
                          {msg.isRead ? (
                            <CheckCheck size={12} className="text-blue-400" />
                          ) : msg.isDelivered ? (
                            <CheckCheck size={12} />
                          ) : (
                            <Check size={12} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {msg.type === 'voice' && (
                  <div className="chat-voice-message">
                    {/* زر التشغيل */}
                    <button
                      className="chat-voice-play-button"
                      onClick={() => toggleVoicePlay(msg.id)}
                      title={t.voiceMessage}
                    >
                      {playingVoice === msg.id ? (
                        <PauseCircle size={16} />
                      ) : (
                        <PlayCircle size={16} />
                      )}
                    </button>
                    
                    {/* موجة الصوت */}
                    <div className="chat-voice-waveform">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={`chat-voice-bar ${
                            playingVoice === msg.id && i < 12 ? 'active' : ''
                          }`}
                          style={{
                            height: `${Math.random() * 16 + 4}px`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* المدة */}
                    <div className="chat-voice-duration">
                      {formatVoiceDuration(msg.voiceDuration || 0)}
                    </div>
                    
                    {/* الوقت والحالة */}
                    <div className="chat-message-meta">
                      <span className="chat-message-time">
                        {formatTime(msg.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <div className="chat-message-status">
                          {msg.isRead ? (
                            <CheckCheck size={10} className="text-blue-400" />
                          ) : msg.isDelivered ? (
                            <CheckCheck size={10} />
                          ) : (
                            <Check size={10} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-typing-indicator">
              <span>{selectedContactData?.name} {t.typing}</span>
              <div className="chat-typing-dot"></div>
              <div className="chat-typing-dot"></div>
              <div className="chat-typing-dot"></div>
            </div>
          )}
            
          <div ref={messagesEndRef} />
        </div>

        {/* Professional Chat Input */}
        <div className="chat-input">
          {isRecording && (
            <div className="chat-recording-indicator">
              <div className="chat-recording-dot"></div>
              <span>{t.recording}</span>
            </div>
          )}
          
          <div className="chat-input-container">
            {/* زر الإيموجي */}
            <button className="chat-emoji-button" title="إيموجي">
              <Smile size={18} />
            </button>

            {/* حقل النص المحسن */}
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => {
                handleInputChange(e.target.value);
                handleTextareaResize(e.target);
              }}
              placeholder={t.typeMessage}
              onKeyDown={handleKeyDown}
              className="chat-input-field"
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left'
              }}
            />

            {/* زر المرفقات */}
            <button className="chat-emoji-button" title="مرفقات">
              <Paperclip size={18} />
            </button>

            {/* زر الإرسال/التسجيل */}
            {message.trim() ? (
              <button
                className="chat-input-button"
                onClick={handleSendMessage}
                title="إرسال"
              >
                <Send size={18} />
              </button>
            ) : (
              <button
                className={`chat-input-button ${isRecording ? 'chat-recording' : ''}`}
                onClick={handleVoiceRecord}
                title={isRecording ? t.recording : t.voiceMessage}
              >
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>
        </div>

        {/* Professional Contacts Sidebar */}
        <div className="chat-sidebar chat-custom-scrollbar">
          
          {/* Search Header */}
          <div className="chat-search-container">
            <input
              className="chat-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left'
              }}
            />
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts
              .filter(contact => 
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((contact) => (
                <div
                  key={contact.id}
                  className={`chat-contact-item ${
                    selectedContact === contact.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Professional Contact Avatar */}
                    <div className={`chat-contact-avatar ${contact.isOnline ? 'online' : ''}`}>
                      {contact.avatar ? (
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={contact.avatar}
                          alt={contact.name}
                        />
                      ) : (
                        contact.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    
                    {/* Contact Information */}
                    <div className="chat-contact-info">
                      <div className="chat-contact-name">
                        {contact.name}
                      </div>
                      
                      <div className="chat-contact-snippet">
                        {contact.isTyping ? (
                          <span className="flex items-center gap-1">
                            {t.typing}
                            <div className="chat-typing-dot"></div>
                            <div className="chat-typing-dot"></div>
                            <div className="chat-typing-dot"></div>
                          </span>
                        ) : contact.lastMessage}
                      </div>
                    </div>
                    
                    {/* Contact Meta Information */}
                    <div className="chat-contact-meta">
                      <div className="chat-contact-time">
                        {contact.timestamp}
                      </div>
                      
                      {/* Unread Badge */}
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <div className="chat-unread-badge">
                          {contact.unreadCount}
                        </div>
                      )}
                      
                      {/* Status Icons */}
                      {contact.isMuted && (
                        <VolumeX size={12} className="opacity-50" />
                      )}
                      
                      {contact.isPinned && (
                        <Pin size={10} className="text-yellow-400" />
                      )}
                    </div>
                  </div>
                  
                  {/* Notification Dot for Active Chats */}
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <div className="chat-notification-dot"></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Professional Info Panel */}
      {showInfoPanel && (
        <WhatsAppInfoPanel
          language={language}
          contact={{
            id: selectedContactData?.id || '1',
            name: selectedContactData?.name || 'علي أحمد',
            avatar: selectedContactData?.avatar || '/avatars/01.png',
            phone: '+966 50 123 4567',
            about: 'متاح للدردشة',
            isOnline: selectedContactData?.isOnline || false,
            lastSeen: selectedContactData?.lastSeen || 'قبل 5 دقائق',
            isGroup: false
          }}
          isOpen={showInfoPanel}
          onClose={() => setShowInfoPanel(false)}
        />
      )}
      
      {/* Performance Monitor (Development Only) */}
      <ChatPerformanceMonitor 
        enabled={process.env.NODE_ENV === 'development'}
        onMetrics={(metrics) => {
          // Log performance metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Chat Performance Metrics:', metrics);
          }
        }}
      />
    </div>
  );
}