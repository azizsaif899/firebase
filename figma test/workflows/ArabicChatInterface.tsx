'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Mic, 
  Send, 
  Smile,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  Copy,
  PlayCircle,
  PauseCircle,
  Download,
  Clock,
  Check,
  CheckCheck,
  Zap,
  Shield,
  Bell,
  Settings,
  Plus,
  Edit3,
  MessageSquare,
  Users,
  Hash,
  Pin,
  Headphones,
  VolumeX,
  Volume2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline?: boolean;
  isTyping?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
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
  reactions?: string[];
  replyTo?: string;
  isForwarded?: boolean;
  isStarred?: boolean;
  isEdited?: boolean;
}

interface Notification {
  id: string;
  type: 'message' | 'mention' | 'system' | 'call' | 'update';
  title: string;
  message: string;
  time: string;
  avatar?: string;
  isRead: boolean;
  contactId?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface ArabicChatInterfaceProps {
  language: 'ar' | 'en';
}

export function ArabicChatInterface({ language }: ArabicChatInterfaceProps) {
  const [selectedContact, setSelectedContact] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRTL = language === 'ar';

  const texts = {
    ar: {
      notifications: 'البريديات',
      allNotifications: 'جميع الإشعارات',
      unreadNotifications: 'غير المقروءة',
      mentions: 'الإشارات',
      search: 'البحث',
      typeMessage: 'اكتب رسالة...',
      online: 'متصل الآن',
      lastSeen: 'آخر ظهور',
      typing: 'يكتب...',
      deliveredTime: 'تم التسليم',
      readTime: 'تم القراءة',
      minutes: 'دقائق',
      hours: 'ساعات',
      yesterday: 'أمس',
      today: 'اليوم',
      now: 'الآن',
      voiceMessage: 'رسالة صوتية',
      playing: 'يتم التشغيل',
      newMessages: 'رسائل جديدة',
      pin: 'تثبيت',
      archive: 'أرشفة',
      delete: 'حذف',
      reply: 'رد',
      forward: 'إعادة توجيه',
      copy: 'نسخ',
      star: 'إضافة نجمة',
      markAsRead: 'تحديد كمقروء',
      clearAll: 'مسح الكل',
      settings: 'الإعدادات'
    },
    en: {
      notifications: 'Notifications',
      allNotifications: 'All Notifications',
      unreadNotifications: 'Unread',
      mentions: 'Mentions',
      search: 'Search',
      typeMessage: 'Type a message...',
      online: 'online',
      lastSeen: 'last seen',
      typing: 'typing...',
      deliveredTime: 'delivered',
      readTime: 'read',
      minutes: 'minutes',
      hours: 'hours',
      yesterday: 'yesterday',
      today: 'today',
      now: 'now',
      voiceMessage: 'Voice message',
      playing: 'playing',
      newMessages: 'new messages',
      pin: 'Pin',
      archive: 'Archive',
      delete: 'Delete',
      reply: 'Reply',
      forward: 'Forward',
      copy: 'Copy',
      star: 'Star',
      markAsRead: 'Mark as read',
      clearAll: 'Clear all',
      settings: 'Settings'
    }
  };

  const t = texts[language];

  // Mock data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      avatar: '/avatars/01.png',
      status: 'online',
      isOnline: true,
      unreadCount: 3,
      lastMessage: 'مرحباً، كيف حالك؟',
      lastMessageTime: '12:30 م',
      isPinned: true
    },
    {
      id: '2',
      name: 'فاطمة علي',
      avatar: '/avatars/02.png',
      status: 'away',
      lastSeen: 'منذ 5 دقائق',
      unreadCount: 1,
      lastMessage: 'شكراً لك على المساعدة',
      lastMessageTime: '11:45 ص'
    },
    {
      id: '3',
      name: 'محمد السعيد',
      avatar: '/avatars/03.png',
      status: 'online',
      isOnline: true,
      isTyping: true,
      lastMessage: 'رسالة صوتية',
      lastMessageTime: '10:30 ص'
    },
    {
      id: '4',
      name: 'سارة أحمد',
      avatar: '/avatars/04.png',
      status: 'offline',
      lastSeen: 'منذ ساعة',
      lastMessage: 'تم إرسال ملف',
      lastMessageTime: 'أمس',
      isMuted: true
    },
    {
      id: '5',
      name: 'علي حسن',
      avatar: '/avatars/05.png',
      status: 'busy',
      lastSeen: 'منذ 30 دقيقة',
      unreadCount: 2,
      lastMessage: 'موافق، سأراجعه',
      lastMessageTime: 'أمس'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      content: 'مرحباً! كيف يمكنني مساعدتك اليوم؟ 😊',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      isDelivered: true,
      isRead: true
    },
    {
      id: '2',
      senderId: 'me',
      content: 'أحتاج مساعدة في تصميم واجهة المستخدم الجديدة',
      timestamp: new Date(Date.now() - 240000),
      type: 'text',
      isDelivered: true,
      isRead: true
    },
    {
      id: '3',
      senderId: '1',
      content: '',
      timestamp: new Date(Date.now() - 180000),
      type: 'voice',
      voiceDuration: 45,
      isDelivered: true,
      isRead: false
    },
    {
      id: '4',
      senderId: 'me',
      content: 'ممتاز! شكراً لك على التوضيح المفصل 👍',
      timestamp: new Date(Date.now() - 120000),
      type: 'text',
      isDelivered: true,
      isRead: false,
      reactions: ['👍', '❤️']
    },
    {
      id: '5',
      senderId: '1',
      content: 'يسعدني أن أساعدك. هل تحتاج أي شيء آخر؟',
      timestamp: new Date(Date.now() - 60000),
      type: 'text',
      isDelivered: true,
      isRead: false,
      isStarred: true
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'message',
      title: 'رسالة جديدة من أحمد محمد',
      message: 'مرحباً، هل يمكنك مراجعة المشروع؟',
      time: 'منذ 5 دقائق',
      avatar: '/avatars/01.png',
      isRead: false,
      contactId: '1',
      priority: 'high',
      category: 'رسائل'
    },
    {
      id: '2',
      type: 'mention',
      title: 'تم ذكرك في مجموعة التطوير',
      message: '@علي_المطور يرجى مراجعة الكود الجديد',
      time: 'منذ 10 دقائق',
      avatar: '/avatars/group.png',
      isRead: false,
      priority: 'high',
      category: 'إشارات'
    },
    {
      id: '3',
      type: 'call',
      title: 'مكالمة فائتة من فاطمة علي',
      message: 'مكالمة صوتية - 2:30 دقيقة',
      time: 'منذ 15 دقيقة',
      avatar: '/avatars/02.png',
      isRead: false,
      priority: 'medium',
      category: 'مكالمات'
    },
    {
      id: '4',
      type: 'system',
      title: 'تحديث الأمان',
      message: 'تم تحديث إعدادات الأمان بنجاح',
      time: 'منذ 30 دقيقة',
      isRead: true,
      priority: 'low',
      category: 'النظام'
    },
    {
      id: '5',
      type: 'update',
      title: 'ميزة جديدة: الرسائل الصوتية المحسنة',
      message: 'استمتع بجودة صوت أفضل ومرشحات جديدة',
      time: 'منذ ساعة',
      isRead: true,
      priority: 'medium',
      category: 'تحديثات'
    },
    {
      id: '6',
      type: 'message',
      title: 'رسالة من محمد السعيد',
      message: 'تم الانتهاء من المراجعة ✅',
      time: 'منذ ساعتين',
      avatar: '/avatars/03.png',
      isRead: true,
      priority: 'medium',
      category: 'رسائل'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add message logic here
    setMessage('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Voice recording logic here
  };

  const toggleVoicePlay = (messageId: string) => {
    setPlayingVoice(playingVoice === messageId ? null : messageId);
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-400';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t.now;
    if (diffMins < 60) return `منذ ${diffMins} ${t.minutes}`;
    if (diffHours < 24) return `منذ ${diffHours} ${t.hours}`;
    if (diffDays === 1) return t.yesterday;
    
    return timestamp.toLocaleDateString('ar-SA', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatVoiceDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={16} className="text-blue-500" />;
      case 'mention':
        return <Hash size={16} className="text-orange-500" />;
      case 'call':
        return <Phone size={16} className="text-green-500" />;
      case 'system':
        return <Settings size={16} className="text-gray-500" />;
      case 'update':
        return <Zap size={16} className="text-purple-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.isRead;
    if (activeTab === 'mentions') return notification.type === 'mention';
    return true;
  });

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden arabic-chat-container" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Notifications Panel - Right Side */}
      <div className="w-80 bg-[#2d2d2d] border-l border-[#404040] flex flex-col">
        {/* Notifications Header */}
        <div className="p-4 border-b border-[#404040] bg-[#333333]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell size={20} className="text-blue-400" />
              {t.notifications}
            </h2>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Settings size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <MoreVertical size={16} />
              </Button>
            </div>
          </div>

          {/* Notification Tabs */}
          <div className="flex bg-[#2d2d2d] rounded-lg p-1">
            {(['all', 'unread', 'mentions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#404040]'
                }`}
              >
                {tab === 'all' && t.allNotifications}
                {tab === 'unread' && t.unreadNotifications}
                {tab === 'mentions' && t.mentions}
                {tab === 'unread' && notifications.filter(n => !n.isRead).length > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white text-xs h-4 min-w-4">
                    {notifications.filter(n => !n.isRead).length}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                  notification.isRead 
                    ? 'bg-transparent hover:bg-[#404040]/50' 
                    : 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {notification.avatar ? (
                    <Avatar className="h-10 w-10 border-2 border-gray-600">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {notification.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white truncate">
                        {notification.title}
                      </p>
                      {notification.priority === 'high' && (
                        <Star size={12} className="text-yellow-400 fill-current" />
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-1 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {notification.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Clear All Button */}
        <div className="p-3 border-t border-[#404040]">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-transparent border-gray-600 hover:bg-gray-700 text-gray-300"
          >
            {t.markAsRead}
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1a1a1a]">
        {/* Chat Header */}
        <div className="h-16 bg-[#2d2d2d] border-b border-[#404040] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-gray-600">
              <AvatarImage src={contacts.find(c => c.id === selectedContact)?.avatar} />
              <AvatarFallback className="bg-blue-500 text-white">
                {contacts.find(c => c.id === selectedContact)?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col">
              <h2 className="font-semibold text-white">
                {contacts.find(c => c.id === selectedContact)?.name}
              </h2>
              <div className="flex items-center gap-2">
                {contacts.find(c => c.id === selectedContact)?.isOnline && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
                <span className="text-xs text-gray-400">
                  {contacts.find(c => c.id === selectedContact)?.isTyping 
                    ? t.typing
                    : contacts.find(c => c.id === selectedContact)?.isOnline 
                    ? t.online
                    : contacts.find(c => c.id === selectedContact)?.lastSeen
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Search size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 bg-[#1a1a1a]">
          <div className="space-y-4">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === 'me';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                    
                    {msg.type === 'text' && (
                      <div
                        className={`px-4 py-3 rounded-2xl relative ${
                          isOwnMessage
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-[#2d2d2d] text-white rounded-bl-md border border-[#404040]'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        
                        {/* Message Footer */}
                        <div className={`flex items-center gap-1 mt-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-xs ${isOwnMessage ? 'text-blue-100' : 'text-gray-400'}`}>
                            {msg.timestamp.toLocaleTimeString('ar-SA', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          
                          {isOwnMessage && (
                            <div className="flex">
                              {msg.isRead ? (
                                <CheckCheck size={14} className="text-blue-200" />
                              ) : msg.isDelivered ? (
                                <CheckCheck size={14} className="text-blue-300" />
                              ) : (
                                <Check size={14} className="text-blue-300" />
                              )}
                            </div>
                          )}
                          
                          {msg.isStarred && (
                            <Star size={12} className="text-yellow-400 fill-current" />
                          )}
                        </div>
                        
                        {/* Reactions */}
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {msg.reactions.map((reaction, index) => (
                              <span key={index} className="text-lg">
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {msg.type === 'voice' && (
                      <div
                        className={`p-3 rounded-2xl relative ${
                          isOwnMessage
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-[#2d2d2d] text-white rounded-bl-md border border-[#404040]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleVoicePlay(msg.id)}
                            className={`p-2 rounded-full ${
                              isOwnMessage ? 'text-white hover:bg-blue-600' : 'text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {playingVoice === msg.id ? (
                              <PauseCircle size={20} />
                            ) : (
                              <PlayCircle size={20} />
                            )}
                          </Button>
                          
                          <div className="flex-1">
                            {/* Voice Waveform */}
                            <div className="flex items-center gap-1 h-8">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 rounded-full transition-all duration-150 ${
                                    isOwnMessage ? 'bg-white' : 'bg-gray-400'
                                  } ${
                                    playingVoice === msg.id ? 'animate-pulse' : ''
                                  }`}
                                  style={{ 
                                    height: `${Math.random() * 20 + 8}px`,
                                    opacity: playingVoice === msg.id && i < 12 ? 1 : 0.6
                                  }}
                                />
                              ))}
                            </div>
                            
                            <div className={`flex items-center justify-between mt-1 text-xs ${
                              isOwnMessage ? 'text-blue-100' : 'text-gray-400'
                            }`}>
                              <span>{formatVoiceDuration(msg.voiceDuration || 0)}</span>
                              <div className="flex items-center gap-1">
                                <span>
                                  {msg.timestamp.toLocaleTimeString('ar-SA', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                                
                                {isOwnMessage && (
                                  <div className="flex">
                                    {msg.isRead ? (
                                      <CheckCheck size={14} className="text-blue-200" />
                                    ) : msg.isDelivered ? (
                                      <CheckCheck size={14} className="text-blue-300" />
                                    ) : (
                                      <Check size={14} className="text-blue-300" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-1 ${
                              isOwnMessage ? 'text-white hover:bg-blue-600' : 'text-gray-400 hover:bg-gray-600'
                            }`}
                          >
                            <Download size={14} />
                          </Button>
                        </div>
                        
                        {playingVoice === msg.id && (
                          <p className={`text-xs mt-2 ${
                            isOwnMessage ? 'text-blue-100' : 'text-gray-400'
                          }`}>
                            {t.playing}...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-[#2d2d2d] border-t border-[#404040]">
          {isRecording && (
            <div className="mb-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-red-400">جاري التسجيل...</span>
                <div className="flex-1" />
                <Button
                  onClick={handleVoiceRecord}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                >
                  إيقاف
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 bg-[#3d3d3d] rounded-full px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white p-2"
            >
              <Paperclip size={20} />
            </Button>

            <div className="flex-1">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.typeMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0 text-right"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-2"
              >
                <Smile size={18} />
              </Button>

              {message.trim() ? (
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                >
                  <Send size={16} />
                </Button>
              ) : (
                <Button
                  onMouseDown={handleVoiceRecord}
                  onMouseUp={() => !isRecording && handleVoiceRecord()}
                  size="sm"
                  className={`p-2 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <Mic size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List - Left Side */}
      <div className="w-80 bg-[#2d2d2d] border-r border-[#404040] flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-[#404040]">
          <div className="relative">
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="bg-[#3d3d3d] border-gray-600 text-white placeholder-gray-400 pr-10 text-right"
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedContact(contact.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                  selectedContact === contact.id 
                    ? 'bg-blue-500/20 border border-blue-500/30' 
                    : 'hover:bg-[#404040]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-gray-600">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {contact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2d2d2d]" />
                    )}
                    
                    {contact.isMuted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                        <VolumeX size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white truncate">
                        {contact.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        {contact.isPinned && (
                          <Pin size={12} className="text-gray-400" />
                        )}
                        <span className="text-xs text-gray-400">
                          {contact.lastMessageTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">
                        {contact.isTyping ? (
                          <span className="text-blue-400 italic">{t.typing}</span>
                        ) : (
                          contact.lastMessage
                        )}
                      </p>
                      
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white h-5 min-w-5 text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {contact.isTyping && (
                  <div className="flex gap-1 mt-2 mr-12">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}