// This file has been replaced by ConversationPage.tsx - Delete this file
import { DesignProvider } from './design-system/DesignProvider';
import { ChatDesignLibrary } from './design-system/ChatDesignLibrary';
import { 
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  GitBranch,
  FileText,
  BarChart3,
  Settings,
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
  ChevronLeft,
  ChevronRight,
  Download,
  Menu,
  X
} from 'lucide-react';

interface ConversationPageProps {
  language: 'ar' | 'en';
}

// نظام الطباعة والخطوط المحدد
const typography = {
  // عناوين رئيسية - Cairo 18px Bold 1.4
  mainTitle: {
    fontFamily: 'Cairo, Inter, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 1.4
  },
  // أسماء المحادثات - Cairo 16px Medium 1.4
  chatName: {
    fontFamily: 'Cairo, Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.4
  },
  // معاينات الرسائل - Cairo 14px Regular 1.4
  messagePreview: {
    fontFamily: 'Cairo, Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.4
  },
  // الطوابع الزمنية - Inter 12px Regular 1.2
  timestamp: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.2
  },
  // رابط المرفقات - Inter 14px Medium 1.4
  attachment: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.4
  },
  // نص الرسائل - Cairo 15px Regular 1.5
  messageText: {
    fontFamily: 'Cairo, Inter, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.5
  }
};

// نظام المسافات والحواف المحدد
const spacing = {
  // Header: Padding أفقي 16px، عمودي 12px
  header: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  // قائمة المحادثات: ارتفاع 60px، padding أفقي 16px، بين الصورة والنص 12px، margin سفلي للفاصل 4px
  chatRow: {
    height: '60px',
    paddingLeft: '16px',
    paddingRight: '16px',
    gap: '12px', // المسافة بين الصورة والنص
    marginBottom: '4px' // للفاصل
  },
  // نافذة المحادثة: padding عام 16px، مسافة رأسية بين فقاعتين 8px
  messagesArea: {
    padding: '16px',
    messageGap: '8px'
  },
  // فقاعة الرسالة: padding 12px، border-radius 8px، box-shadow خفيف
  messageBubble: {
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  // بطاقة المرفق: عرض 240px، padding 12px، border، border-radius 6px، margin علوي 8px
  attachment: {
    width: '240px',
    padding: '12px',
    border: '1px solid #22262B',
    borderRadius: '6px',
    marginTop: '8px'
  },
  // Composer: padding 12px 16px، border-top، أيقونات 24px مع margin 16px بينها
  composer: {
    padding: '12px 16px',
    borderTop: '1px solid #22262B',
    iconSize: 24,
    iconMargin: '16px'
  }
};

export const ConversationPage: React.FC<ConversationPageProps> = ({ language }) => {
  const isRTL = language === 'ar';
  const [activeNav, setActiveNav] = useState('campaigns');
  const [activeTab, setActiveTab] = useState('chats');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState<string | null>(null);

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>('1');
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [isDesignLibraryOpen, setIsDesignLibraryOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Memoized texts for performance
  const texts = useMemo(() => ({
    ar: {
      // Navigation
      dashboard: 'لوحة التحكم',
      campaigns: 'الحملات',
      contacts: 'جهات الاتصال والمحادثات',
      botFlows: 'سير عمل البوت',
      templates: 'القوالب',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      
      // Campaigns & Contacts
      campaignsTab: 'الحملات',
      chatsTab: 'المحادثات',
      newCampaign: '+ إنشاء حملة جديدة',
      
      // Workbench
      chatWindow: 'نافذة المحادثة',
      
      // Status
      active: 'نشطة',
      scheduled: 'مجدولة',
      completed: 'مكتملة',
      new: 'جديدة',
      inProgress: 'جارية',
      
      // Actions
      typeMessage: 'اكتب رسالة...',
      search: 'بحث...',
      menuButton: 'قائمة',
      downloadFile: 'تحميل الملف',
      sendMessage: 'إرسال الرسالة',
      searchChats: 'البحث في المحادثات',
      
      // Brand
      brandName: 'erf',
      brandSubtitle: 'منصة إدارة الحملات'
    },
    en: {
      // Navigation
      dashboard: 'Dashboard',
      campaigns: 'Campaigns',
      contacts: 'Contacts & Chats',
      botFlows: 'Bot Flows',
      templates: 'Templates',
      analytics: 'Analytics',
      settings: 'Settings',
      
      // Campaigns & Contacts
      campaignsTab: 'Campaigns',
      chatsTab: 'Chats',
      newCampaign: '+ Create New Campaign',
      
      // Workbench
      chatWindow: 'Chat Window',
      
      // Status
      active: 'Active',
      scheduled: 'Scheduled',
      completed: 'Completed',
      new: 'New',
      inProgress: 'In Progress',
      
      // Actions
      typeMessage: 'Type a message...',
      search: 'Search...',
      menuButton: 'Menu',
      downloadFile: 'Download File',
      sendMessage: 'Send Message',
      searchChats: 'Search Chats',
      
      // Brand
      brandName: 'erf',
      brandSubtitle: 'Campaign Management Platform'
    }
  }), []);

  const t = texts[language];

  // Navigation Items
  const navigationItems = useMemo(() => [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'campaigns', label: t.campaigns, icon: Megaphone },
    { id: 'contacts', label: t.contacts, icon: MessageSquare },
    { id: 'botFlows', label: t.botFlows, icon: GitBranch },
    { id: 'templates', label: t.templates, icon: FileText },
    { id: 'analytics', label: t.analytics, icon: BarChart3 },
    { id: 'settings', label: t.settings, icon: Settings }
  ], [t]);

  // Mock Campaign Data
  const campaigns = useMemo(() => [
    {
      id: '1',
      name: 'حملة العروض الصيفية',
      status: 'active',
      audience: 1250,
      sent: 980,
      opened: 650,
      clicked: 120
    },
    {
      id: '2',
      name: 'حملة المنتجات الجديدة',
      status: 'scheduled',
      audience: 2100,
      sent: 0,
      opened: 0,
      clicked: 0
    },
    {
      id: '3',
      name: 'حملة استطلاع الرأي',
      status: 'completed',
      audience: 850,
      sent: 850,
      opened: 420,
      clicked: 85
    }
  ], []);

  // Mock Chat Data with lazy loading
  const chats = useMemo(() => [
    {
      id: '1',
      customerName: 'أحمد محمد',
      lastMessage: 'شكراً لك، سأفكر في الأمر',
      timestamp: '10:30 ص',
      status: 'new',
      unread: 2,
      avatar: '👤'
    },
    {
      id: '2',
      customerName: 'فاطمة السالم',
      lastMessage: 'هل يمكنني الحصول على مزيد من التفاصيل؟',
      timestamp: '09:15 ص',
      status: 'inProgress',
      unread: 0,
      avatar: '👩'
    },
    {
      id: '3',
      customerName: 'محمد الأحمد',
      lastMessage: 'تم إكمال الطلب بنجاح',
      timestamp: 'أمس',
      status: 'completed',
      unread: 0,
      avatar: '👨'
    }
  ], []);

  // Mock Messages for Chat with attachments
  const messages = useMemo(() => [
    {
      id: '1',
      sender: 'customer',
      content: 'مرحباً، أريد الاستفسار عن المنتج الجديد',
      timestamp: '09:00 ص',
      type: 'text',
      date: '2024-01-15'
    },
    {
      id: '2',
      sender: 'agent',
      content: 'أهلاً وسهلاً! سأكون سعيداً لمساعدتك. عن أي منتج تود الاستفسار؟',
      timestamp: '09:02 ص',
      type: 'text',
      date: '2024-01-15'
    },
    {
      id: '3',
      sender: 'customer',
      content: 'المنتج الذي تم الإعلان عنه في الحملة الأخيرة',
      timestamp: '09:05 ص',
      type: 'text',
      date: '2024-01-15'
    },
    {
      id: '4',
      sender: 'agent',
      content: 'بالطبع! يمكنني مساعدتك في ذلك. إليك كتالوج المنتج:',
      timestamp: '09:07 ص',
      type: 'text',
      date: '2024-01-15',
      attachment: {
        name: 'Product_Catalog.pdf',
        size: '2.5 MB',
        type: 'pdf'
      }
    },
    {
      id: '5',
      sender: 'customer',
      content: 'ما هي الأسعار المتاحة؟',
      timestamp: '09:10 ص',
      type: 'text',
      date: '2024-01-16'
    },
    {
      id: '6',
      sender: 'customer',
      content: 'أريد أيضاً معرفة إمكانية الشحن للمنطقة الشرقية',
      timestamp: '09:12 ص',
      type: 'text',
      date: '2024-01-16'
    }
  ], []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'completed':
        return 'bg-[#2F3439]/50 text-[#CCCCCC] border border-[#22262B]';
      case 'new':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'inProgress':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-[#2F3439]/50 text-[#CCCCCC] border border-[#22262B]';
    }
  }, []);

  // Handle send message with pulse animation
  const handleSendMessage = useCallback(() => {
    if (messageText.trim()) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 200);
      // Handle message sending logic here
      setMessageText('');
      inputRef.current?.focus();
    }
  }, [messageText]);

  // Handle typing simulation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  }, []);

  // Quick Actions for messages
  const handleQuickAction = useCallback((action: string, messageId: string) => {
    console.log(`${action} message ${messageId}`);
    setShowQuickActions(null);
  }, []);

  // Date separator helper
  const getDateSeparator = useCallback((date: string) => {
    const today = new Date();
    const messageDate = new Date(date);
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'أمس';
    return messageDate.toLocaleDateString('ar-SA');
  }, []);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { [key: string]: typeof messages } = {};
    messages.forEach(message => {
      const date = message.date || '2024-01-15';
      if (!groups[date]) groups[date] = [];
      groups[date].push(message);
    });
    return groups;
  }, [messages]);

  // Handle download with loading state
  const handleDownload = useCallback(async (attachmentId: string, fileName: string) => {
    setIsDownloading(attachmentId);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle actual download logic here
      console.log(`Downloading ${fileName}`);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(null);
    }
  }, []);

  // Check if send button should be disabled
  const isSendDisabled = !messageText.trim();

  return (
    <DesignProvider>
      <div 
        className={`whatsapp-desktop-container ${language === 'ar' ? 'arabic' : ''} h-screen w-full flex flex-col overflow-hidden`}
        style={{ 
          backgroundColor: 'var(--chat-area-bg, var(--whatsapp-chat-area-bg))', 
          color: 'var(--chat-primary-text, var(--whatsapp-primary-text))',
          willChange: 'transform' 
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
      {/* Header موحد - يمتد عبر كامل عرض الصفحة، بارتفاع 64px */}
      <div 
        className="whatsapp-desktop-header w-full flex items-center justify-between border-b"
        style={{ 
          backgroundColor: 'var(--whatsapp-header-footer-bg)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          height: 'var(--whatsapp-header-height)'
        }}
      >
        {/* الجانب الأيسر - الشعار واسم التطبيق */}
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" 
            style={{ backgroundColor: 'var(--whatsapp-accent-green)' }}
          >
            erf
          </div>
          <div>
            <div 
              className="whatsapp-desktop-text-contact-name"
              style={{
                fontFamily: language === 'ar' ? 'var(--whatsapp-font-arabic)' : 'var(--whatsapp-font-english)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--whatsapp-primary-text)'
              }}
            >
              FlowCanvasAI
            </div>
            <div 
              className="whatsapp-desktop-text-secondary"
              style={{
                fontFamily: 'var(--whatsapp-font-english)',
                fontSize: 'var(--whatsapp-font-sm)',
                fontWeight: 'var(--whatsapp-font-weight-regular)',
                color: 'var(--whatsapp-secondary-text)'
              }}
            >
              Business Chat Platform
            </div>
          </div>
        </div>

        {/* الوسط - البحث */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#CCCCCC' }} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'البحث في المحادثات...' : 'Search conversations...'}
              className="w-full rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--whatsapp-primary-text)',
                fontFamily: language === 'ar' ? 'var(--whatsapp-font-arabic)' : 'var(--whatsapp-font-english)',
                fontSize: 'var(--whatsapp-font-base)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--whatsapp-accent-green)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>
        </div>

        {/* الجانب الأيمن - الإشعارات وملف المستخدم */}
        <div className="flex items-center gap-4">
          {/* زر مكتبة التخصيص */}
          <button
            onClick={() => setIsDesignLibraryOpen(true)}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
            title="مكتبة تخصيص التصميم"
          >
            <span className="text-lg">🎨</span>
            
            {/* تأثير التوهج */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
          </button>

          {/* إشعارات */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative"
              style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
            >
              <Bell size={20} />
              {/* نقطة الإشعار */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ backgroundColor: '#25D366' }}></div>
            </button>
          </div>

          {/* ملف المستخدم */}
          <button
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center transition-transform"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <User size={20} style={{ color: '#FFFFFF' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
          style={{ 
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            willChange: 'transform' 
          }}
          aria-label={t.menuButton}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
          style={{ willChange: 'opacity' }}
        />
      )}

      {/* Body - المساحة الرئيسية */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* العمود الأوسط - Campaigns & Contacts - Desktop & Tablet */}
        <div 
          className={`
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 
            whatsapp-desktop-chat-list 
            flex flex-col border-r 
            fixed lg:relative 
            h-full z-50 lg:z-auto
            transition-transform duration-300 ease-in-out
          `}
          style={{ 
            backgroundColor: 'var(--whatsapp-sidebar-bg)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            willChange: 'transform'
          }}
        >
          {/* Header with Search */}
          <div 
            className="border-b flex items-center" 
            style={{ 
              borderColor: '#22262B',
              ...spacing.header
            }}
          >
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#CCCCCC' }} />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: '#2F3439', 
                  border: '1px solid #22262B',
                  color: '#FFFFFF',
                  ...typography.messagePreview
                }}
                onFocus={(e) => e.target.style.borderColor = '#25D366'}
                onBlur={(e) => e.target.style.borderColor = '#22262B'}
                aria-label={t.searchChats}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b" style={{ borderColor: '#22262B' }}>
            <div className="flex">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`flex-1 px-4 py-3 border-b-2 transition-colors`}
                style={{
                  ...typography.messagePreview,
                  borderBottomColor: activeTab === 'campaigns' ? '#25D366' : 'transparent',
                  color: activeTab === 'campaigns' ? '#25D366' : '#CCCCCC'
                }}
                aria-label={`${t.campaignsTab} tab`}
              >
                📢 {t.campaignsTab}
              </button>
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 px-4 py-3 border-b-2 transition-colors`}
                style={{
                  ...typography.messagePreview,
                  borderBottomColor: activeTab === 'chats' ? '#25D366' : 'transparent',
                  color: activeTab === 'chats' ? '#25D366' : '#CCCCCC'
                }}
                aria-label={`${t.chatsTab} tab`}
              >
                💬 {t.chatsTab}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'campaigns' && (
              <div className="p-4 space-y-3">
                {/* New Campaign Button */}
                <button 
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors hover:opacity-90"
                  style={{ 
                    backgroundColor: '#25D366',
                    color: '#FFFFFF'
                  }}
                >
                  <Plus size={16} />
                  <span style={typography.messagePreview}>
                    {t.newCampaign}
                  </span>
                </button>

                {/* Campaigns List */}
                <div className="space-y-2">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      onClick={() => setSelectedCampaign(campaign.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200`}
                      style={{ 
                        backgroundColor: selectedCampaign === campaign.id ? '#272F34' : '#2F3439',
                        borderColor: selectedCampaign === campaign.id ? '#25D366' : '#22262B',
                        willChange: 'background-color, transform'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCampaign !== campaign.id) {
                          e.currentTarget.style.backgroundColor = '#1F2A33';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCampaign !== campaign.id) {
                          e.currentTarget.style.backgroundColor = '#2F3439';
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 
                          style={{
                            ...typography.mainTitle,
                            color: '#FFFFFF',
                            fontWeight: selectedCampaign === campaign.id ? 700 : 500
                          }}
                          className="truncate"
                        >
                          {campaign.name}
                        </h3>
                        <span 
                          className={`px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}
                          style={typography.timestamp}
                        >
                          {t[campaign.status as keyof typeof t]}
                        </span>
                      </div>
                      <div 
                        className="grid grid-cols-2 gap-2"
                        style={{
                          ...typography.messagePreview,
                          color: '#CCCCCC'
                        }}
                      >
                        <div>الجمهور: {campaign.audience}</div>
                        <div>تم الإرسال: {campaign.sent}</div>
                        <div>تم الفتح: {campaign.opened}</div>
                        <div>تم النقر: {campaign.clicked}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chats' && (
              <div className="p-2">
                {chats
                  .filter(chat => 
                    searchQuery === '' || 
                    chat.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setSelectedChat(chat.id);
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer transition-all duration-200 rounded-lg relative group"
                    style={{
                      height: spacing.chatRow.height,
                      paddingLeft: spacing.chatRow.paddingLeft,
                      paddingRight: spacing.chatRow.paddingRight,
                      marginBottom: '8px', // مسافة بين الصفوف: 8px
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.chatRow.gap,
                      backgroundColor: selectedChat === chat.id ? '#272F34' : 'transparent',
                      willChange: 'background-color, transform'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedChat !== chat.id) {
                        e.currentTarget.style.backgroundColor = '#1F2A33'; // Hover: #1F2A33
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedChat !== chat.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {/* Avatar - 40×40 pixels */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ 
                        backgroundColor: '#25D366',
                        fontSize: '16px',
                        flexShrink: 0
                      }}
                    >
                      {chat.avatar}
                    </div>

                    {/* Content - اسم العميل وآخر رسالة */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div 
                          style={{
                            ...typography.chatName,
                            color: '#FFFFFF'
                          }}
                          className="truncate"
                        >
                          {chat.customerName}
                        </div>
                        <div 
                          style={{
                            ...typography.timestamp,
                            color: '#CCCCCC'
                          }}
                        >
                          {chat.timestamp}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div 
                          style={{
                            ...typography.messagePreview,
                            color: '#CCCCCC'
                          }}
                          className="truncate flex-1"
                        >
                          {chat.lastMessage}
                        </div>
                        
                        {/* Unread Badge */}
                        {chat.unread > 0 && (
                          <div 
                            className="ml-2 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: '#25D366',
                              color: '#FFFFFF',
                              minWidth: '20px',
                              height: '20px',
                              fontSize: '11px',
                              fontWeight: '600'
                            }}
                          >
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        
          {/* العمود الأيمن - Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div 
                  className="border-b flex items-center justify-between" 
                  style={{ 
                    backgroundColor: 'var(--whatsapp-header-footer-bg)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    height: 'var(--whatsapp-header-height)',
                    padding: '0 16px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      {chats.find(c => c.id === selectedChat)?.avatar}
                    </div>
                    <div>
                      <div style={{ ...typography.chatName, color: 'var(--whatsapp-primary-text)' }}>
                        {chats.find(c => c.id === selectedChat)?.customerName}
                      </div>
                      <div style={{ ...typography.timestamp, color: 'var(--whatsapp-secondary-text)' }}>
                        {isTyping ? 'يكتب...' : 'متصل'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
                    >
                      <Phone size={20} />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
                    >
                      <Video size={20} />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
                    >
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto flex flex-col justify-end"
                  style={{ 
                    backgroundColor: 'var(--whatsapp-chat-area-bg)',
                    padding: spacing.messagesArea.padding
                  }}
                >
                  <div className="space-y-4">
                    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                      <div key={date}>
                        {/* Date Separator */}
                        <div className="flex items-center justify-center my-4">
                          <div 
                            className="px-3 py-1 rounded-lg"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'var(--whatsapp-secondary-text)',
                              fontSize: '12px'
                            }}
                          >
                            {getDateSeparator(date)}
                          </div>
                        </div>
                        
                        {/* Messages */}
                        <div className="space-y-2">
                          {dateMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                              onMouseEnter={() => setHoveredMessage(message.id)}
                              onMouseLeave={() => setHoveredMessage(null)}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md relative group`}
                                style={{
                                  ...spacing.messageBubble,
                                  backgroundColor: message.sender === 'agent' 
                                    ? 'var(--whatsapp-outgoing-bubble)' 
                                    : 'var(--whatsapp-incoming-bubble)',
                                  color: 'var(--whatsapp-primary-text)',
                                  borderRadius: message.sender === 'agent' 
                                    ? '16px 16px 4px 16px' 
                                    : '16px 16px 16px 4px'
                                }}
                              >
                                <div style={typography.messageText}>
                                  {message.content}
                                </div>
                                
                                {/* Attachment */}
                                {message.attachment && (
                                  <div 
                                    className="flex items-center gap-2 mt-2 p-2 rounded cursor-pointer transition-colors"
                                    style={{
                                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                      border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                    onClick={() => handleDownload(message.id, message.attachment!.name)}
                                  >
                                    {isDownloading === message.id ? (
                                      <div className="animate-spin">
                                        <Download size={16} />
                                      </div>
                                    ) : (
                                      <Download size={16} />
                                    )}
                                    <div>
                                      <div style={{ ...typography.attachment, color: 'var(--whatsapp-primary-text)' }}>
                                        {message.attachment.name}
                                      </div>
                                      <div style={{ ...typography.timestamp, color: 'var(--whatsapp-secondary-text)' }}>
                                        {message.attachment.size}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Message Footer */}
                                <div className="flex items-center justify-end gap-1 mt-1">
                                  <span style={{ ...typography.timestamp, color: 'var(--whatsapp-secondary-text)' }}>
                                    {message.timestamp}
                                  </span>
                                  {message.sender === 'agent' && (
                                    <div className="text-blue-400">
                                      ✓✓
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div 
                  className="border-t flex items-center gap-3"
                  style={{ 
                    backgroundColor: 'var(--whatsapp-header-footer-bg)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    padding: spacing.composer.padding
                  }}
                >
                  <button 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
                  >
                    <Paperclip size={20} />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={t.typeMessage}
                      value={messageText}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !isSendDisabled) {
                          handleSendMessage();
                        }
                      }}
                      className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all duration-200"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--whatsapp-primary-text)',
                        ...typography.messageText
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--whatsapp-accent-green)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <button 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
                  >
                    <Smile size={20} />
                  </button>
                  
                  {messageText.trim() ? (
                    <button
                      onClick={handleSendMessage}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${isPulsing ? 'scale-95' : ''}`}
                      style={{ 
                        backgroundColor: 'var(--whatsapp-accent-green)',
                        color: '#FFFFFF'
                      }}
                      disabled={isSendDisabled}
                    >
                      <Send size={20} />
                    </button>
                  ) : (
                    <button 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: '#262D31', color: '#CCCCCC' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2F3439'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262D31'}
                    >
                      <Mic size={20} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Welcome Screen */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--whatsapp-accent-green)' }}
                  >
                    <MessageSquare size={32} color="#FFFFFF" />
                  </div>
                  <h3 style={{ ...typography.mainTitle, color: 'var(--whatsapp-primary-text)' }}>
                    {t.chatWindow}
                  </h3>
                  <p style={{ ...typography.messagePreview, color: 'var(--whatsapp-secondary-text)' }}>
                    اختر محادثة لبدء التواصل
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* مكتبة التخصيص */}
        {isDesignLibraryOpen && (
          <ChatDesignLibrary 
            isOpen={isDesignLibraryOpen}
            onClose={() => setIsDesignLibraryOpen(false)}
            language={language}
          />
        )}
      </div>
    </DesignProvider>
  );
};