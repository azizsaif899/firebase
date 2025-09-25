'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hash, 
  Volume2, 
  VolumeX, 
  Users, 
  Phone, 
  Video, 
  Settings, 
  Search, 
  Smile, 
  Plus, 
  Mic, 
  Headphones,
  Send,
  MoreVertical,
  Pin,
  Bell,
  BellOff,
  UserPlus,
  Gift,
  Paperclip,
  Image,
  Crown,
  Shield,
  Star,
  Heart,
  ThumbsUp,
  Zap,
  Fire,
  Eye,
  MessageSquare,
  Clock,
  PlayCircle,
  PauseCircle,
  Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  role?: 'admin' | 'moderator' | 'member';
  isBot?: boolean;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'image' | 'file';
  voiceDuration?: number;
  reactions?: { emoji: string; count: number; users: string[] }[];
  isPlaying?: boolean;
  edited?: boolean;
  pinned?: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unreadCount?: number;
  isPrivate?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'mention' | 'message' | 'system';
  avatar?: string;
}

interface DiscordLikeChatProps {
  language: 'ar' | 'en';
}

export function DiscordLikeChat({ language }: DiscordLikeChatProps) {
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [showUserList, setShowUserList] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRTL = language === 'ar';

  const texts = {
    ar: {
      general: 'عام',
      notifications: 'البريديات',
      onlineUsers: 'المتصلون الآن',
      typeMessage: 'اكتب رسالة...',
      voiceMessage: 'رسالة صوتية',
      searchMessages: 'البحث في الرسائل...',
      pinMessage: 'تثبيت الرسالة',
      addReaction: 'إضافة تفاعل',
      edited: 'معدل',
      online: 'متصل',
      away: 'غائب',
      busy: 'مشغول',
      offline: 'غير متصل',
      admin: 'مدير',
      moderator: 'مشرف',
      member: 'عضو',
      newMessage: 'رسالة جديدة',
      mention: 'إشارة',
      systemNotification: 'إشعار النظام',
      markAllRead: 'تحديد الكل كمقروء',
      userJoined: 'انضم للمحادثة',
      userLeft: 'غادر المحادثة',
      playing: 'يتم التشغيل...',
      recordingVoice: 'تسجيل صوتي...'
    },
    en: {
      general: 'General',
      notifications: 'Notifications',
      onlineUsers: 'Online Users',
      typeMessage: 'Type a message...',
      voiceMessage: 'Voice message',
      searchMessages: 'Search messages...',
      pinMessage: 'Pin message',
      addReaction: 'Add reaction',
      edited: 'edited',
      online: 'Online',
      away: 'Away', 
      busy: 'Busy',
      offline: 'Offline',
      admin: 'Admin',
      moderator: 'Moderator',
      member: 'Member',
      newMessage: 'New message',
      mention: 'Mention',
      systemNotification: 'System notification',
      markAllRead: 'Mark all as read',
      userJoined: 'joined the chat',
      userLeft: 'left the chat',
      playing: 'Playing...',
      recordingVoice: 'Recording voice...'
    }
  };

  const t = texts[language];

  // Mock data
  const channels: Channel[] = [
    { id: 'general', name: t.general, type: 'text', unreadCount: 3 },
    { id: 'voice-1', name: 'Voice Chat', type: 'voice' },
    { id: 'announcements', name: 'إعلانات', type: 'text', unreadCount: 1 },
    { id: 'development', name: 'Development', type: 'text' }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      avatar: '/avatars/01.png',
      status: 'online',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/avatars/02.png',
      status: 'online',
      role: 'moderator'
    },
    {
      id: '3',
      name: 'فاطمة علي',
      avatar: '/avatars/03.png',
      status: 'away',
      role: 'member'
    },
    {
      id: '4',
      name: 'FlowBot',
      avatar: '/avatars/bot.png',
      status: 'online',
      role: 'member',
      isBot: true
    },
    {
      id: '5',
      name: 'محمد السعيد',
      status: 'busy',
      role: 'member'
    },
    {
      id: '6',
      name: 'Lisa Chen',
      avatar: '/avatars/06.png',
      status: 'offline',
      role: 'member'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      userId: '1',
      content: 'مرحباً بالجميع! كيف الحال اليوم؟ 😊',
      timestamp: new Date(Date.now() - 400000),
      type: 'text',
      reactions: [
        { emoji: '👋', count: 3, users: ['2', '3', '4'] },
        { emoji: '❤️', count: 1, users: ['2'] }
      ]
    },
    {
      id: '2',
      userId: '2',
      content: 'Hello everyone! Working on the new features today. The Discord-like interface is looking amazing! 🔥',
      timestamp: new Date(Date.now() - 350000),
      type: 'text',
      reactions: [
        { emoji: '🚀', count: 2, users: ['1', '3'] },
        { emoji: '🔥', count: 1, users: ['4'] }
      ]
    },
    {
      id: '3',
      userId: '3',
      content: '',
      timestamp: new Date(Date.now() - 300000),
      type: 'voice',
      voiceDuration: 45,
      reactions: [
        { emoji: '🎵', count: 1, users: ['1'] },
        { emoji: '👍', count: 2, users: ['2', '4'] }
      ]
    },
    {
      id: '4',
      userId: '4',
      content: '⚡ تم تحديث النظام بنجاح! جميع الميزات الجديدة متاحة الآن:\n\n✅ واجهة Discord الجديدة\n✅ الرسائل الصوتية\n✅ التفاعلات والإيموجي\n✅ الإشعارات المحسنة\n\n🎉 استمتعوا بالتجربة الجديدة!',
      timestamp: new Date(Date.now() - 240000),
      type: 'text',
      pinned: true,
      reactions: [
        { emoji: '🎉', count: 4, users: ['1', '2', '3', '5'] },
        { emoji: '👏', count: 2, users: ['1', '2'] },
        { emoji: '💯', count: 1, users: ['3'] }
      ]
    },
    {
      id: '5',
      userId: '2',
      content: '@أحمد محمد Great job on the UI updates! The notifications panel looks exactly like the design we wanted.',
      timestamp: new Date(Date.now() - 180000),
      type: 'text'
    },
    {
      id: '6',
      userId: '5',
      content: '',
      timestamp: new Date(Date.now() - 150000),
      type: 'voice',
      voiceDuration: 28,
      reactions: [
        { emoji: '🎯', count: 1, users: ['1'] }
      ]
    },
    {
      id: '7',
      userId: '1',
      content: 'شكراً FlowBot! العمل الرائع كالعادة ✨\n\nالواجهة تبدو مثالية الآن مع:\n- البريديات على الجانب\n- المحادثات في المنتصف\n- قائمة المستخدمين\n- الرسائل الصوتية التفاعلية',
      timestamp: new Date(Date.now() - 90000),
      type: 'text',
      edited: true,
      reactions: [
        { emoji: '✨', count: 2, users: ['2', '4'] },
        { emoji: '🎨', count: 1, users: ['3'] }
      ]
    },
    {
      id: '8',
      userId: '3',
      content: 'الوضع الليلي يبدو رائعاً! الألوان متناسقة ومريحة للعين 🌙',
      timestamp: new Date(Date.now() - 45000),
      type: 'text',
      reactions: [
        { emoji: '🌙', count: 3, users: ['1', '2', '5'] }
      ]
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      title: '@أحمد محمد mentioned you',
      message: 'هل يمكنك مراجعة التحديث الجديد؟',
      time: '5 دقائق',
      read: false,
      type: 'mention',
      avatar: '/avatars/01.png'
    },
    {
      id: '2',
      title: 'New message in #development',
      message: 'Sarah Johnson: The API integration is complete',
      time: '10 دقائق',
      read: false,
      type: 'message',
      avatar: '/avatars/02.png'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'تم تحديث النظام إلى الإصدار 2.1.0',
      time: '1 ساعة',
      read: true,
      type: 'system'
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

  const handleReaction = (messageId: string, emoji: string) => {
    // Reaction logic here
  };

  const toggleVoicePlay = (messageId: string) => {
    setPlayingVoice(playingVoice === messageId ? null : messageId);
  };

  const getStatusColor = (status: User['status']) => {
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

  const getRoleIcon = (role?: User['role']) => {
    switch (role) {
      case 'admin':
        return <Crown size={12} className="text-yellow-500" />;
      case 'moderator':
        return <Shield size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const formatVoiceDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getUserById = (id: string) => users.find(u => u.id === id);

  return (
    <div className="flex h-screen bg-[#1e1f22] text-white overflow-hidden discord-container relative">
      
      {/* Notifications Sidebar */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#2b2d31] border-r border-[#3f4147] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-[#3f4147]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{t.notifications}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-[#3f4147] hover:bg-[#3f4147]"
              >
                {t.markAllRead}
              </Button>
            </div>

            <ScrollArea className="flex-1 discord-scroll">
              <div className="p-2">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                      notification.read 
                        ? 'bg-transparent hover:bg-[#3f4147]/50' 
                        : 'bg-[#5865f2]/10 border border-[#5865f2]/20 hover:bg-[#5865f2]/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>{notification.title.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                          <Bell size={14} />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#5865f2] rounded-full mt-1" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-[#313338] border-b border-[#3f4147] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Hash size={20} className="text-gray-400" />
            <h2 className="text-lg font-semibold">
              {channels.find(c => c.id === selectedChannel)?.name}
            </h2>
            {channels.find(c => c.id === selectedChannel)?.unreadCount && (
              <Badge className="bg-[#5865f2] text-white h-5 min-w-[20px]">
                {channels.find(c => c.id === selectedChannel)?.unreadCount}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-400 hover:text-white relative"
            >
              <Bell size={18} />
              {notifications.filter(n => !n.read).length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </div>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowUserList(!showUserList)}
              className={`text-gray-400 hover:text-white ${showUserList ? 'text-white bg-[#404249]' : ''}`}
            >
              <Users size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Search size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings size={18} />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4 discord-scroll">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const user = getUserById(msg.userId);
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group discord-message-hover -mx-4 px-4 py-2 rounded transition-colors"
                    >
                      {msg.pinned && (
                        <div className="flex items-center gap-1 text-xs text-yellow-400 mb-2">
                          <Pin size={12} />
                          <span>Pinned Message</span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-[#5865f2] text-white">
                            {user?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">
                              {user?.name}
                            </span>
                            {getRoleIcon(user?.role)}
                            {user?.isBot && (
                              <Badge className="bg-[#5865f2] text-white text-xs px-1 py-0">
                                BOT
                              </Badge>
                            )}
                            <span className="text-xs text-gray-400">
                              {msg.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            {msg.edited && (
                              <span className="text-xs text-gray-500">
                                ({t.edited})
                              </span>
                            )}
                          </div>

                          {msg.type === 'text' && (
                            <p className="text-gray-200 whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          )}

                          {msg.type === 'voice' && (
                            <div className="bg-[#2b2d31] rounded-lg p-3 max-w-xs">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleVoicePlay(msg.id)}
                                  className="text-[#5865f2] hover:text-white p-0"
                                >
                                  {playingVoice === msg.id ? (
                                    <PauseCircle size={24} />
                                  ) : (
                                    <PlayCircle size={24} />
                                  )}
                                </Button>
                                
                                <div className="flex-1">
                                  <div className="h-8 bg-[#3f4147] rounded flex items-center px-2 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center gap-1 px-2">
                                      {Array.from({ length: 20 }).map((_, i) => (
                                        <div
                                          key={i}
                                          className={`discord-waveform-bar bg-[#5865f2] rounded-full transition-all duration-150 ${
                                            playingVoice === msg.id ? 'opacity-100' : 'opacity-30'
                                          }`}
                                          style={{ 
                                            width: '2px',
                                            height: `${Math.random() * 16 + 4}px`,
                                            animationDelay: `${i * 0.1}s`,
                                            animationPlayState: playingVoice === msg.id ? 'running' : 'paused'
                                          }}
                                        />
                                      ))}
                                    </div>
                                    <div 
                                      className="relative z-10 h-1 bg-white rounded transition-all duration-300" 
                                      style={{ width: playingVoice === msg.id ? '60%' : '0%' }} 
                                    />
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {formatVoiceDuration(msg.voiceDuration || 0)}
                                  </p>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-white p-0"
                                >
                                  <Download size={16} />
                                </Button>
                              </div>
                              
                              {playingVoice === msg.id && (
                                <p className="text-xs text-[#5865f2] mt-2">
                                  {t.playing}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Reactions */}
                          {msg.reactions && msg.reactions.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {msg.reactions.map((reaction, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleReaction(msg.id, reaction.emoji)}
                                  className="bg-[#2b2d31] hover:bg-[#3f4147] h-6 px-2 rounded-full border border-[#3f4147]"
                                >
                                  <span className="text-sm">{reaction.emoji}</span>
                                  <span className="text-xs text-gray-400 ml-1">
                                    {reaction.count}
                                  </span>
                                </Button>
                              ))}
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="bg-[#2b2d31] hover:bg-[#3f4147] h-6 w-6 rounded-full border border-[#3f4147] opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Plus size={12} />
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Message Actions */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                            <Heart size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                            <MoreVertical size={14} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4">
              {isRecording && (
                <div className="mb-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-red-400">{t.recordingVoice}</span>
                  </div>
                </div>
              )}
              
              <div className="bg-[#383a40] rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    <Plus size={20} />
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
                      className="bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white p-0"
                    >
                      <Gift size={18} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white p-0"
                    >
                      <Smile size={18} />
                    </Button>

                    {message.trim() ? (
                      <Button
                        onClick={handleSendMessage}
                        size="sm"
                        className="bg-[#5865f2] hover:bg-[#4752c4] p-0 w-8 h-8"
                      >
                        <Send size={16} />
                      </Button>
                    ) : (
                      <Button
                        onMouseDown={handleVoiceRecord}
                        onMouseUp={handleVoiceRecord}
                        size="sm"
                        className={`p-0 w-8 h-8 ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-[#5865f2] hover:bg-[#4752c4]'
                        }`}
                      >
                        <Mic size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <AnimatePresence>
            {showUserList && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-[#2b2d31] border-l border-[#3f4147] overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    {t.onlineUsers} — {users.filter(u => u.status === 'online').length}
                  </h3>
                  
                  <ScrollArea className="h-[calc(100vh-8rem)] discord-scroll">
                    <div className="space-y-1">
                      {users
                        .sort((a, b) => {
                          const statusOrder = { online: 0, away: 1, busy: 2, offline: 3 };
                          return statusOrder[a.status] - statusOrder[b.status];
                        })
                        .map((user) => (
                          <motion.div
                            key={user.id}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 p-2 rounded hover:bg-[#3f4147] cursor-pointer transition-colors"
                          >
                            <div className="relative">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-[#5865f2] text-white text-xs">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-[#2b2d31]`} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-white truncate">
                                  {user.name}
                                </span>
                                {getRoleIcon(user.role)}
                                {user.isBot && (
                                  <Badge className="bg-[#5865f2] text-white text-xs px-1 py-0">
                                    BOT
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">
                                {t[user.status as keyof typeof t]}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}