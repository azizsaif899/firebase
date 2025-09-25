'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  VolumeX, 
  Pin, 
  Check,
  CheckCheck,
  Phone,
  Video,
  Archive,
  Trash2,
  Star,
  Circle
} from 'lucide-react';


interface Chat {
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
  isArchived?: boolean;
  messageStatus?: 'sent' | 'delivered' | 'read';
  isGroup?: boolean;
  participants?: string[];
}

interface WhatsAppChatListProps {
  language: 'ar' | 'en';
  selectedChatId?: string;
  onChatSelect?: (chatId: string) => void;
  onSearchChange?: (query: string) => void;
}

export const WhatsAppChatList: React.FC<WhatsAppChatListProps> = ({
  language,
  selectedChatId,
  onChatSelect,
  onSearchChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ chatId: string; x: number; y: number } | null>(null);
  
  const isRTL = language === 'ar';

  const texts = {
    ar: {
      search: 'ابحث أو ابدأ محادثة جديدة',
      typing: 'يكتب...',
      online: 'متصل',
      lastSeen: 'آخر ظهور',
      you: 'أنت: ',
      draft: 'مسودة: ',
      pinChat: 'تثبيت المحادثة',
      muteChat: 'كتم المحادثة',
      archiveChat: 'أرشفة المحادثة',
      deleteChat: 'حذف المحادثة',
      markAsRead: 'تحديد كمقروء',
      audioCall: 'مكالمة صوتية',
      videoCall: 'مكالمة مرئية'
    },
    en: {
      search: 'Search or start new chat',
      typing: 'typing...',
      online: 'online',
      lastSeen: 'last seen',
      you: 'You: ',
      draft: 'Draft: ',
      pinChat: 'Pin chat',
      muteChat: 'Mute chat', 
      archiveChat: 'Archive chat',
      deleteChat: 'Delete chat',
      markAsRead: 'Mark as read',
      audioCall: 'Audio call',
      videoCall: 'Video call'
    }
  };

  const t = texts[language];

  // Mock data - في التطبيق الحقيقي ستأتي من API
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'علي أحمد',
      avatar: '/avatars/01.png',
      lastMessage: 'مرحباً، كيف يمكنني مساعدتك اليوم؟',
      timestamp: '12:30 م',
      unreadCount: 3,
      isOnline: true,
      isPinned: true
    },
    {
      id: '2', 
      name: 'خالد يحيى',
      avatar: '/avatars/02.png',
      lastMessage: 'شكراً لك، كان الاجتماع مفيداً جداً',
      timestamp: '12:15 م',
      isOnline: false,
      lastSeen: 'آخر ظهور قبل 5 دقائق',
      messageStatus: 'read'
    },
    {
      id: '3',
      name: 'مجموعة المطورين',
      avatar: '/avatars/group1.png',
      lastMessage: 'فريق التطوير: تم رفع النسخة الجديدة',
      timestamp: 'أمس',
      unreadCount: 12,
      isGroup: true,
      participants: ['أحمد', 'سارة', 'محمد', '+5']
    },
    {
      id: '4',
      name: 'سمير أحمد',
      avatar: '/avatars/04.png',
      lastMessage: 'متى يمكننا مناقشة المشروع الجديد؟',
      timestamp: 'أمس',
      isOnline: true,
      isTyping: true
    },
    {
      id: '5',
      name: 'مجموعة التصميم',
      avatar: '/avatars/group2.png',
      lastMessage: 'تم تحديث دليل العلامة التجارية',
      timestamp: 'الأربعاء',
      unreadCount: 5,
      isGroup: true,
      isMuted: true
    },
    {
      id: '6',
      name: 'فاطمة محمد',
      avatar: '/avatars/06.png',
      lastMessage: 'أنت: تم إرسال الملفات المطلوبة',
      timestamp: 'الثلاثاء',
      messageStatus: 'delivered'
    }
  ]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleChatClick = (chatId: string) => {
    onChatSelect?.(chatId);
  };

  const handleContextMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    setContextMenu({
      chatId,
      x: e.clientX,
      y: e.clientY
    });
  };

  const formatTime = (timestamp: string) => {
    // في التطبيق الحقيقي، ستقوم بتحويل timestamp لتنسيق مناسب
    return timestamp;
  };

  const renderMessageStatus = (status?: 'sent' | 'delivered' | 'read') => {
    if (!status) return null;
    
    const iconClass = status === 'read' ? 'text-blue-500' : 'text-gray-400';
    
    return (
      <div className={`${iconClass} ml-1`}>
        {status === 'sent' && <Check size={12} />}
        {(status === 'delivered' || status === 'read') && <CheckCheck size={12} />}
      </div>
    );
  };

  return (
    <div className="whatsapp-sidebar">
      {/* Search Header */}
      <div className="whatsapp-search-header">
        <div className="relative flex-1">
          <Search 
            size={16} 
            className="whatsapp-search-icon"
          />
          <input
            className="whatsapp-search-input-exact"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <button className="whatsapp-new-chat-btn">
          <Search size={24} />
        </button>
      </div>

      {/* Chat List */}
      {/* قائمة الإعدادات ولوحة التحكم */}
      <div className="flex-1 overflow-y-auto arabic-scroll">
        
        {/* لوحة التحكم الرئيسية */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Circle size={20} className="text-primary" />
            {language === 'ar' ? 'لوحة التحكم الرئيسية' : 'Main Dashboard'}
          </h2>
          
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-card/50 backdrop-blur-sm p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'المحادثات النشطة' : 'Active Chats'}
                  </p>
                  <p className="text-xl font-semibold text-primary">247</p>
                </div>
                <Circle size={16} className="text-green-500" />
              </div>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'المستخدمين المتصلين' : 'Online Users'}
                  </p>
                  <p className="text-xl font-semibold text-primary">1,423</p>
                </div>
                <Circle size={16} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* قسم إعدادات المظهر */}


        {/* قسم الأمان والخصوصية */}
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Archive size={18} className="text-red-500" />
            {language === 'ar' ? 'الأمان والخصوصية' : 'Security & Privacy'}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <VolumeX size={16} className="text-red-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'التشفير الشامل' : 'End-to-End Encryption'}
                </span>
              </div>
              <Circle size={12} className="text-green-500" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Check size={16} className="text-orange-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Auth'}
                </span>
              </div>
              <Circle size={12} className="text-primary" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Trash2 size={16} className="text-purple-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'حذف الرسائل التلقائي' : 'Auto Delete Messages'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">7 أيام</span>
            </div>
          </div>
        </div>

        {/* قسم الإشعارات */}
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Phone size={18} className="text-blue-500" />
            {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Video size={16} className="text-green-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'الأصوات' : 'Sounds'}
                </span>
              </div>
              <Circle size={12} className="text-primary" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <CheckCheck size={16} className="text-yellow-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'الاهتزاز' : 'Vibration'}
                </span>
              </div>
              <Circle size={12} className="text-primary" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Circle size={16} className="text-red-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'عدم الإزعاج' : 'Do Not Disturb'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">10 مساءً - 7 صباحاً</span>
            </div>
          </div>
        </div>

        {/* قسم إدارة النظام */}
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Star size={18} className="text-purple-500" />
            {language === 'ar' ? 'إدارة النظام' : 'System Management'}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Archive size={16} className="text-blue-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'النسخ الاحتياطي' : 'Backup Data'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">تلقائي</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Trash2 size={16} className="text-red-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'تنظيف التخزين' : 'Storage Cleanup'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">4.2 GB</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Search size={16} className="text-green-500" />
                <span className="text-sm">
                  {language === 'ar' ? 'فحص التحديثات' : 'Check Updates'}
                </span>
              </div>
              <Circle size={12} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* قسم الإحصائيات المفصلة */}
        <div className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Pin size={18} className="text-indigo-500" />
            {language === 'ar' ? 'الإحصائيات المفصلة' : 'Detailed Analytics'}
          </h3>
          
          <div className="space-y-4">
            {/* معدل الاستخدام */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'معدل الاستخدام اليومي' : 'Daily Usage Rate'}
                </span>
                <span className="text-sm text-primary font-semibold">87%</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            {/* استهلاك البيانات */}
            <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'استهلاك البيانات' : 'Data Consumption'}
                </span>
                <span className="text-sm text-primary font-semibold">2.8 GB</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            {/* أداء النظام */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'أداء النظام' : 'System Performance'}
                </span>
                <span className="text-sm text-primary font-semibold">94%</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            {/* أزرار سريعة للإجراءات */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-all duration-200 flex items-center justify-center gap-2">
                <Check size={14} className="text-primary" />
                <span className="text-xs font-medium">
                  {language === 'ar' ? 'تصدير' : 'Export'}
                </span>
              </button>
              
              <button className="p-2 bg-destructive/10 hover:bg-destructive/20 rounded-lg border border-destructive/20 transition-all duration-200 flex items-center justify-center gap-2">
                <Trash2 size={14} className="text-destructive" />
                <span className="text-xs font-medium">
                  {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};