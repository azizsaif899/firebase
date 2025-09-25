import React, { useState, useMemo, useCallback, useRef } from 'react';
import { DesignProvider } from './design-system/DesignProvider';
import { ChatDesignLibrary } from './design-system/ChatDesignLibrary';
import { WhatsAppBubble } from './WhatsAppBubble';
import { WhatsAppContactName, WhatsAppMessageText, WhatsAppTimestamp, WhatsAppPreview } from './WhatsAppTypography';
import { 
  Search,
  Bell,
  User,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  Mic,
  Download,
  Menu,
  X,
  Pin,
  Volume2,
  CheckCheck,
  Clock,
  Settings,
  Globe,
  Sun,
  Moon,
  Palette,
  Zap,
  Filter
} from 'lucide-react';

interface ConversationPageProps {
  language: 'ar' | 'en';
  onBackToHome: () => void;
  onLanguageChange?: (language: 'ar' | 'en') => void;
  isDark?: boolean;
  onThemeChange?: (isDark: boolean) => void;
}

export const ConversationPage: React.FC<ConversationPageProps> = ({ 
  language, 
  onBackToHome, 
  onLanguageChange, 
  isDark = true, 
  onThemeChange 
}) => {
  const isRTL = language === 'ar';
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [isDesignLibraryOpen, setIsDesignLibraryOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // النصوص المحلية
  const texts = useMemo(() => ({
    ar: {
      search: 'البحث أو بدء محادثة جديدة',
      typeMessage: 'اكتب رسالة...',
      backToHome: 'العودة للصفحة الرئيسية',
      online: 'متصل',
      typing: 'يكتب...',
      today: 'اليوم',
      yesterday: 'أمس',
      globalSearch: 'البحث العام...',
      advancedSearch: 'البحث المتقدم',
      lightMode: 'الوضع النهاري',
      darkMode: 'الوضع الليلي',
      designLibrary: 'مكتبة التصميم',
      notifications: 'الإشعارات'
    },
    en: {
      search: 'Search or start new chat',
      typeMessage: 'Type a message...',
      backToHome: 'Back to Home',
      online: 'online',
      typing: 'typing...',
      today: 'Today',
      yesterday: 'Yesterday',
      globalSearch: 'Global search...',
      advancedSearch: 'Advanced Search',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      designLibrary: 'Design Library',
      notifications: 'Notifications'
    }
  }), []);

  const t = texts[language];

  // بيانات المحادثات الوهمية
  const chats = useMemo(() => [
    {
      id: '1',
      name: 'ليحاء 27',
      lastMessage: 'وشوف إذا بإمكانك ترسل لي التفاصيل وأي معلومات إضافية محتاجها',
      timestamp: '10:42 PM',
      unreadCount: 0,
      isOnline: true,
      isPinned: false,
      isMuted: false,
      avatar: '👤',
      status: 'read'
    },
    {
      id: '2',
      name: 'أحمد محمد',
      lastMessage: 'شكراً على المساعدة، تم التسليم بنجاح',
      timestamp: '10:30 PM',
      unreadCount: 2,
      isOnline: false,
      isPinned: true,
      isMuted: false,
      avatar: '👨',
      status: 'delivered'
    },
    {
      id: '3',
      name: 'فاطمة السالم',
      lastMessage: 'الله يحفظك، شكراً لك على كل شيء',
      timestamp: '9:15 PM',
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: true,
      avatar: '👩',
      status: 'read'
    },
    {
      id: '4',
      name: 'محمد الراشد',
      lastMessage: 'تمام، سأراجع الموضوع وأرد عليك',
      timestamp: '8:30 PM',
      unreadCount: 1,
      isOnline: true,
      isPinned: false,
      isMuted: false,
      avatar: '👔',
      status: 'sent'
    },
    {
      id: '5',
      name: 'سارة أحمد',
      lastMessage: 'أرسلت لك الملف المطلوب',
      timestamp: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: false,
      avatar: '👩‍💼',
      status: 'read',
      hasAttachment: true
    }
  ], []);

  // بيانات الرسائل الوهمية
  const messages = useMemo(() => [
    {
      id: '1',
      sender: 'incoming',
      content: 'السلام عليكم ورحمة الله وبركاته',
      timestamp: '10:30',
      date: 'اليوم',
      status: 'read'
    },
    {
      id: '2',
      sender: 'outgoing',
      content: 'وعليكم السلام ورحمة الله وبركاته، أهلاً وسهلاً',
      timestamp: '10:31',
      date: 'اليوم',
      status: 'read'
    },
    {
      id: '3',
      sender: 'incoming',
      content: 'أريد الاستفسار عن الخدمة الجديدة',
      timestamp: '10:32',
      date: 'اليوم',
      status: 'read'
    },
    {
      id: '4',
      sender: 'outgoing',
      content: 'بكل سرور! يمكنني مساعدتك في ذلك',
      timestamp: '10:33',
      date: 'اليوم',
      status: 'read'
    },
    {
      id: '5',
      sender: 'incoming',
      content: 'وشوف إذا بإمكانك ترسل لي التفاصيل وأي معلومات إضافية محتاجها',
      timestamp: '10:42',
      date: 'اليوم',
      status: 'delivered'
    }
  ], []);

  // معالجات الأحداث
  const handleSendMessage = useCallback(() => {
    if (messageText.trim()) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 200);
      setMessageText('');
      inputRef.current?.focus();
    }
  }, [messageText]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  }, []);

  const handleDownload = useCallback(async (messageId: string, fileName: string) => {
    setIsDownloading(messageId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(null);
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCheck size={12} className="whatsapp-status-sent" style={{ color: 'var(--whatsapp-text-secondary)' }} />;
      case 'delivered':
        return <CheckCheck size={12} className="whatsapp-status-delivered" style={{ color: 'var(--whatsapp-text-secondary)' }} />;
      case 'read':
        return <CheckCheck size={12} className="whatsapp-status-read" style={{ color: 'var(--whatsapp-icon-active)' }} />;
      default:
        return <Clock size={12} className="whatsapp-status-sending" style={{ color: 'var(--whatsapp-text-secondary)' }} />;
    }
  }, [isDark]);

  return (
    <DesignProvider>
      <div 
        className="h-screen w-full flex flex-col overflow-hidden"
        data-theme={isDark ? 'dark' : 'light'}
        style={{
          fontFamily: language === 'ar' 
            ? '"Segoe UI", "Helvetica Neue", "Noto Naskh Arabic", sans-serif' 
            : '"Segoe UI", "Helvetica Neue", sans-serif',
          backgroundColor: isDark ? '#111B21' : '#ECE5DD',
          color: 'var(--whatsapp-text-primary)',
          direction: isRTL ? 'rtl' : 'ltr'
        }}
      >
        {/* Header العلوي الجديد */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{
            height: '64px',
            backgroundColor: '#202020',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderColor: 'var(--whatsapp-border-color)',
            boxShadow: isDark 
              ? '0 1px 2px rgba(0, 0, 0, 0.4)' 
              : '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* الجانب الأيسر - الشعار والعنوان */}
          <div className="flex items-center gap-4">
            {/* زر العودة */}
            <button
              onClick={onBackToHome}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative overflow-hidden shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #b91c1c, #991b1b)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
              }}
              title={t.backToHome}
            >
              <X size={20} />
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg" />
            </button>

            {/* الشعار والعنوان */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" 
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                F
              </div>
              <div>
                <div 
                  className="font-semibold text-lg"
                  style={{ color: isDark ? '#ffffff' : '#ffffff' }}
                >
                  FlowCanvasAI
                </div>
                <div 
                  className="text-xs"
                  style={{ color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)' }}
                >
                  {language === 'ar' ? 'منصة المحادثات الذكية' : 'Smart Chat Platform'}
                </div>
              </div>
            </div>
          </div>



          {/* الجانب الأيمن - أزرار التحكم */}
          <div className="flex items-center gap-3">
            {/* زر البحث المتقدم */}
            <button
              onClick={() => setShowGlobalSearch(!showGlobalSearch)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
              style={{ 
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)'}`,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                boxShadow: isDark 
                  ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 8px 25px rgba(59,130,246,0.25), 0 0 0 1px rgba(59,130,246,0.2)'
                  : '0 4px 16px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
              }}
              title={t.advancedSearch}
            >
              <Filter size={16} className="transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:to-blue-600/10 transition-all duration-300 rounded-xl" />
            </button>

            {/* زر تبديل اللغة */}
            {onLanguageChange && (
              <button
                onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
                style={{ 
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)'}`,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                  boxShadow: isDark 
                    ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                  e.currentTarget.style.boxShadow = isDark 
                    ? '0 8px 25px rgba(34,197,94,0.25), 0 0 0 1px rgba(34,197,94,0.2)'
                    : '0 4px 16px rgba(34,197,94,0.15), 0 0 0 1px rgba(34,197,94,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = isDark 
                    ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
                }}
                title={language === 'ar' ? 'English' : 'العربية'}
              >
                <Globe size={16} className="transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/10 group-hover:to-green-600/10 transition-all duration-300 rounded-xl" />
              </button>
            )}

            {/* زر تبديل الثيم */}
            {onThemeChange && (
              <button
                onClick={() => onThemeChange(!isDark)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
                style={{ 
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)'}`,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                  boxShadow: isDark 
                    ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                  e.currentTarget.style.boxShadow = isDark 
                    ? '0 8px 25px rgba(245,158,11,0.25), 0 0 0 1px rgba(245,158,11,0.2)'
                    : '0 4px 16px rgba(245,158,11,0.15), 0 0 0 1px rgba(245,158,11,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = isDark 
                    ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
                }}
                title={isDark ? t.lightMode : t.darkMode}
              >
                {isDark ? (
                  <Sun size={16} className="transition-transform group-hover:rotate-45" />
                ) : (
                  <Moon size={16} className="transition-transform group-hover:-rotate-12" />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-600/0 group-hover:from-amber-400/10 group-hover:to-amber-600/10 transition-all duration-300 rounded-xl" />
              </button>
            )}

            {/* زر مكتبة التصميم */}
            <button
              onClick={() => setIsDesignLibraryOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
              style={{ 
                background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.5)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed, #9333ea)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6, #a855f7)';
              }}
              title={t.designLibrary}
            >
              <Palette size={16} className="transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/20 group-hover:to-pink-400/20 transition-all duration-300 rounded-xl" />
            </button>

            {/* الإشعارات */}
            <button 
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
              style={{ 
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)'}`,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                boxShadow: isDark 
                  ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 8px 25px rgba(239,68,68,0.25), 0 0 0 1px rgba(239,68,68,0.2)'
                  : '0 4px 16px rgba(239,68,68,0.15), 0 0 0 1px rgba(239,68,68,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
              }}
              title={t.notifications}
            >
              <Bell size={16} className="transition-transform group-hover:rotate-12" />
              <div 
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ 
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-600/0 group-hover:from-red-400/10 group-hover:to-red-600/10 transition-all duration-300 rounded-xl" />
            </button>

            {/* ملف المستخدم */}
            <button 
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.5)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1e40af)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
              }}
              title={language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            >
              <User size={16} className="transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/20 group-hover:to-blue-600/20 transition-all duration-300 rounded-xl" />
            </button>
          </div>
        </div>

        {/* منطقة المحادثة الرئيسية */}
        <div 
          className="flex-1 overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px'
          }}
        >
          {/* منطقة المحادثة (اليسار) */}
          <div 
            className="flex flex-col"
            style={{
              backgroundColor: 'var(--whatsapp-conversation-bg)'
            }}
          >
            {selectedChat ? (
              <>


                {/* هيدر معلومات العميل الليدز */}
                <div 
                  className="flex items-center justify-between border-b px-4"
                  style={{ 
                    height: '72px',
                    minHeight: '72px',
                    maxHeight: '72px',
                    backgroundColor: '#2c2c2c',
                    borderColor: isDark ? '#2A3A3F' : 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  {/* معلومات العميل الأساسية */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* أ��قونة العميل */}
                    <div className="relative">
                      <div 
                        className="rounded-lg flex items-center justify-center text-white font-semibold"
                        style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg, #667eea, #764ba2)'
                        }}
                      >
                        <User size={24} />
                      </div>
                      {/* مؤشر الأولوية */}
                      <div 
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{
                          backgroundColor: '#ef4444',
                          borderColor: isDark ? '#202C33' : '#f0f2f5',
                          fontSize: '8px',
                          color: 'white',
                          fontWeight: '600'
                        }}
                      >
                        !
                      </div>
                    </div>

                    {/* تفاصيل العميل */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <WhatsAppContactName 
                          language={language}
                          style={{
                            color: isDark ? '#E1E1E1' : '#111827'
                          }}
                        >
                          أحمد محمد السالم
                        </WhatsAppContactName>
                        <span 
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
                            color: isDark ? '#4ade80' : '#16a34a'
                          }}
                        >
                          عميل جديد
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span 
                          style={{
                            color: isDark ? '#8A8D91' : '#6b7280'
                          }}
                        >
                          📧 ahmed.salem@email.com
                        </span>
                        <span 
                          style={{
                            color: isDark ? '#8A8D91' : '#6b7280'
                          }}
                        >
                          📞 +966 50 123 4567
                        </span>
                        <span 
                          style={{
                            color: isDark ? '#8A8D91' : '#6b7280'
                          }}
                        >
                          🏢 شركة التقنية المتقدمة
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* معلومات إضافية ومقاييس */}
                  <div className="flex items-center gap-6">
                    {/* إحصا��يات سريعة */}
                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-center">
                        <div 
                          style={{
                            color: isDark ? '#E1E1E1' : '#111827',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}
                        >
                          12
                        </div>
                        <div 
                          style={{
                            color: isDark ? '#8A8D91' : '#6b7280',
                            fontSize: '10px'
                          }}
                        >
                          رسالة
                        </div>
                      </div>
                      <div className="text-center">
                        <div 
                          style={{
                            color: isDark ? '#E1E1E1' : '#111827',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}
                        >
                          3د
                        </div>
                        <div 
                          style={{
                            color: isDark ? '#8A8D91' : '#6b7280',
                            fontSize: '10px'
                          }}
                        >
                          متوسط الرد
                        </div>
                      </div>
                      <div className="text-center">
                        <div 
                          style={{
                            color: isDark ? '#25D366' : '#059669',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}
                        >
                          95%
                        </div>
                        <div 
                          style={{
                            color: isDark ? '#8A8D91' : '#6b7280',
                            fontSize: '10px'
                          }}
                        >
                          رضا
                        </div>
                      </div>
                    </div>

                    {/* حالة العميل */}
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: '#22c55e'
                        }}
                      />
                      <span 
                        style={{
                          fontSize: '12px',
                          color: isDark ? '#8A8D91' : '#6b7280',
                          fontWeight: '500'
                        }}
                      >
                        نشط الآن
                      </span>
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                          color: isDark ? '#60a5fa' : '#3b82f6'
                        }}
                        title="ملف العميل"
                      >
                        <User size={16} />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: isDark ? '#fbbf24' : '#d97706'
                        }}
                        title="تاريخ المحادثات"
                      >
                        <Clock size={16} />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                          color: isDark ? '#a78bfa' : '#8b5cf6'
                        }}
                        title="الملاحظات"
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                          color: isDark ? '#4ade80' : '#16a34a'
                        }}
                        title="إجراءات سريعة"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* منطقة الرسائل */}
                <div 
                  className="flex-1 overflow-y-auto flex flex-col justify-end whatsapp-desktop-scroll"
                  style={{
                    backgroundColor: '#2c2c2c',
                    minHeight: '0',
                    padding: '16px',
                    scrollBehavior: 'smooth'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                        onMouseEnter={() => setHoveredMessage(message.id)}
                        onMouseLeave={() => setHoveredMessage(null)}
                        style={{ marginBottom: '4px' }}
                      >
                        <div 
                          className="relative group"
                          style={{ 
                            maxWidth: '65%',
                            minWidth: '48px'
                          }}
                        >
                          <div
                            className="relative whatsapp-desktop-bubble"
                            style={{
                              backgroundColor: message.sender === 'outgoing' 
                                ? (isDark ? '#005C4B' : '#DCF8C6')
                                : (isDark ? '#363636' : '#FFFFFF'),
                              color: isDark ? '#E1E1E1' : (message.sender === 'outgoing' ? '#111111' : '#111111'),
                              padding: '10px 14px',
                              borderRadius: message.sender === 'outgoing' 
                                ? '8px 8px 0px 8px' 
                                : '8px 8px 8px 0px',
                              boxShadow: message.sender === 'incoming' && !isDark
                                ? '0 1px 0.5px rgba(0, 0, 0, 0.13)'
                                : 'none',
                              wordWrap: 'break-word',
                              position: 'relative',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {/* محتوى الرسالة */}
                            <div 
                              className={`whatsapp-bubble-text ${language === 'ar' ? 'arabic' : 'english'} whatsapp-enhanced-text`}
                              style={{
                                fontSize: '15px',
                                lineHeight: '20px',
                                margin: '0',
                                textAlign: language === 'ar' ? 'right' : 'left',
                                direction: language === 'ar' ? 'rtl' : 'ltr',
                                fontFamily: language === 'ar' 
                                  ? '"Segoe UI", "Helvetica Neue", "Noto Naskh Arabic", sans-serif'
                                  : '"Segoe UI", "Helvetica Neue", sans-serif'
                              }}
                            >
                              {message.content}
                            </div>

                            {/* معلومات الرسالة */}
                            <div 
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '4px',
                                marginTop: '4px'
                              }}
                            >
                              <span 
                                style={{
                                  fontSize: '10px',
                                  color: message.sender === 'outgoing' 
                                    ? (isDark ? '#8A8D91' : '#999999')
                                    : (isDark ? '#8A8D91' : '#999999'),
                                  lineHeight: '12px',
                                  fontWeight: '400'
                                }}
                              >
                                {message.timestamp}
                              </span>
                              {message.sender === 'outgoing' && (
                                <div style={{ marginLeft: '4px' }}>
                                  {getStatusIcon(message.status)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* أزرار سريعة عند التمرير */}
                          {hoveredMessage === message.id && (
                            <div 
                              className="absolute -top-8 flex gap-1 rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{
                                left: message.sender === 'outgoing' ? '0' : 'auto',
                                right: message.sender === 'incoming' ? '0' : 'auto',
                                backgroundColor: isDark ? '#2F3136' : '#ffffff',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
                                zIndex: 10
                              }}
                            >
                              <button 
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-opacity-80 text-xs transition-colors"
                                style={{ 
                                  color: isDark ? '#8A8D91' : 'rgba(0, 0, 0, 0.8)',
                                  backgroundColor: 'transparent'
                                }}
                                title="رد"
                              >
                                ↩
                              </button>
                              <button 
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-opacity-80 text-xs transition-colors"
                                style={{ 
                                  color: isDark ? '#8A8D91' : 'rgba(0, 0, 0, 0.8)',
                                  backgroundColor: 'transparent'
                                }}
                                title="إعادة توجيه"
                              >
                                ↪
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* مؤشر الكتابة */}
                    {isTyping && (
                      <div className="flex justify-start" style={{ marginBottom: '4px' }}>
                        <div 
                          style={{
                            backgroundColor: isDark ? '#262D31' : '#FFFFFF',
                            padding: '10px 14px',
                            borderRadius: '8px 8px 8px 0px',
                            boxShadow: isDark ? 'none' : '0 1px 0.5px rgba(0, 0, 0, 0.13)',
                            maxWidth: '65%',
                            minWidth: '48px'
                          }}
                        >
                          <div className="flex gap-1 items-center">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ 
                                backgroundColor: isDark ? '#8A8D91' : 'rgba(0, 0, 0, 0.6)',
                                animation: 'whatsappTyping 1.4s infinite ease-in-out',
                                animationDelay: '0ms' 
                              }}
                            />
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ 
                                backgroundColor: isDark ? '#8A8D91' : 'rgba(0, 0, 0, 0.6)',
                                animation: 'whatsappTyping 1.4s infinite ease-in-out',
                                animationDelay: '160ms' 
                              }}
                            />
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ 
                                backgroundColor: isDark ? '#8A8D91' : 'rgba(0, 0, 0, 0.6)',
                                animation: 'whatsappTyping 1.4s infinite ease-in-out',
                                animationDelay: '320ms' 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* شريط الإدخال */}
                <div 
                  className="border-t flex items-center gap-3 px-4 py-3"
                  style={{
                    height: '54px',
                    minHeight: '54px',
                    maxHeight: '54px',
                    backgroundColor: '#2c2c2c',
                    borderColor: isDark ? '#2A3A3F' : 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                  }}
                >
                  {/* زر المرفقات */}
                  <button 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-opacity-80"
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    <Paperclip size={18} />
                  </button>

                  {/* حقل النص */}
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={messageText}
                      onChange={handleInputChange}
                      placeholder={t.typeMessage}
                      className={`w-full rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        isRTL ? 'pr-12 text-right' : 'pl-4 pr-12 text-left'
                      }`}
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                        color: isDark ? '#ffffff' : '#111827'
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      className={`absolute top-1/2 transform -translate-y-1/2 transition-colors hover:opacity-80 ${
                        isRTL ? 'left-3' : 'right-3'
                      }`}
                      style={{
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      <Smile size={18} />
                    </button>
                  </div>

                  {/* زر الإرسال/الميكروفون */}
                  <button 
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: messageText.trim() 
                        ? '#3b82f6' 
                        : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                      color: messageText.trim() 
                        ? '#ffffff' 
                        : (isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'),
                      cursor: messageText.trim() ? 'pointer' : 'default'
                    }}
                    disabled={!messageText.trim()}
                  >
                    {messageText.trim() ? <Send size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </>
            ) : (
              /* شاشة الترحيب */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ 
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Search size={40} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: isDark ? '#ffffff' : '#111827',
                      marginBottom: '8px'
                    }}
                  >
                    {language === 'ar' ? 'اختر محادثة' : 'Select a Chat'}
                  </h3>
                  <p 
                    style={{
                      fontSize: '14px',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.7)'
                    }}
                  >
                    {language === 'ar' 
                      ? 'اختر محادثة من القائمة لبدء المحادثة' 
                      : 'Select a conversation from the list to start chatting'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* قائمة المحادثات الجانبية (اليمين) */}
          <div 
            className="flex flex-col border-l"
            style={{
              width: '360px',
              minWidth: '360px',
              maxWidth: '360px',
              backgroundColor: isDark ? '#202C33' : '#ffffff',
              borderColor: isDark ? '#2A3A3F' : 'rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* رأس البحث */}
            <div 
              className="border-b flex items-center px-4 py-3"
              style={{ 
                height: '72px',
                minHeight: '72px',
                maxHeight: '72px',
                backgroundColor: '#2c2c2c',
                borderColor: isDark ? '#2A3A3F' : 'rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <div className="relative w-full">
                <Search 
                  size={16} 
                  className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`}
                  style={{ 
                    color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
                  }} 
                />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
                  }`}
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#ffffff' : '#111827'
                  }}
                />
              </div>
            </div>

            {/* قائمة المحادثات */}
            <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#2c2c2c' }}>
              {chats
                .filter(chat => 
                  searchQuery === '' || 
                  chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className="cursor-pointer transition-all duration-200 border-b"
                  style={{
                    height: '72px',
                    minHeight: '72px',
                    maxHeight: '72px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: selectedChat === chat.id 
                      ? (isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)') 
                      : 'transparent',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedChat !== chat.id) {
                      e.currentTarget.style.backgroundColor = isDark 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedChat !== chat.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {/* الأفاتار */}
                  <div className="relative">
                    <div 
                      className="rounded-full flex items-center justify-center text-white font-semibold"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        marginLeft: isRTL ? '0' : '12px',
                        marginRight: isRTL ? '12px' : '0'
                      }}
                    >
                      {chat.avatar}
                    </div>
                    {chat.isOnline && (
                      <div 
                        className="absolute rounded-full border-2"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderColor: isDark ? '#1f2937' : '#ffffff',
                          bottom: '0',
                          right: isRTL ? 'auto' : '0',
                          left: isRTL ? '0' : 'auto'
                        }}
                      />
                    )}
                  </div>

                  {/* محتوى المحادثة */}
                  <div className="flex-1 min-w-0 relative">
                    <div className="flex items-center justify-between mb-1">
                      {/* اسم المحادثة */}
                      <h3 
                        className="truncate"
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          color: isDark ? '#ffffff' : '#111827',
                          lineHeight: '20px',
                          textAlign: 'right'
                        }}
                      >
                        {chat.name}
                      </h3>
                      
                      {/* الوقت */}
                      <span 
                        className="absolute"
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: isRTL ? 'auto' : '0',
                          left: isRTL ? '0' : 'auto',
                          fontSize: '12px',
                          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                          lineHeight: '16px'
                        }}
                      >
                        {chat.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* آخر رسالة */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {chat.hasAttachment && (
                          <Paperclip 
                            size={14} 
                            style={{ color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }} 
                          />
                        )}
                        <p 
                          className="truncate"
                          style={{
                            fontSize: '14px',
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.7)',
                            lineHeight: '18px',
                            textAlign: 'right'
                          }}
                        >
                          {chat.lastMessage}
                        </p>
                      </div>

                      {/* عداد الرسائل ��ير المقروءة */}
                      {chat.unreadCount > 0 && (
                        <div 
                          className="absolute"
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            right: isRTL ? 'auto' : '0',
                            left: isRTL ? '0' : 'auto',
                            background: '#3b82f6',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: '12px',
                            minWidth: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                          }}
                        >
                          {chat.unreadCount}
                        </div>
                      )}

                      {/* أيقونات الحالة */}
                      {chat.isMuted && (
                        <Volume2 
                          size={14} 
                          className="absolute"
                          style={{
                            bottom: '0',
                            right: isRTL ? 'auto' : '20px',
                            left: isRTL ? '20px' : 'auto',
                            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
                          }} 
                        />
                      )}
                      
                      {chat.isPinned && (
                        <Pin 
                          size={12} 
                          className="absolute"
                          style={{
                            top: '0',
                            left: isRTL ? 'auto' : '0',
                            right: isRTL ? '0' : 'auto',
                            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
                          }} 
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* مكتبة تخصيص التصميم */}
        {isDesignLibraryOpen && (
          <ChatDesignLibrary
            language={language}
            onClose={() => setIsDesignLibraryOpen(false)}
          />
        )}
      </div>
    </DesignProvider>
  );
};