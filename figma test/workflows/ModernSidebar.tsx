'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Settings,
  BookOpen,
  BarChart3,
  Workflow,
  User,
  Bot,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code,
  Database,
  Zap,
  Terminal,
  FileText,
  GitBranch,
  Layers,
  Activity,
  Bell,
  Search,
  Home,
  Plus,
  History,
  Star,
  Tag,
  Filter,
  Menu
} from 'lucide-react';

interface ModernSidebarProps {
  language: 'ar' | 'en';
  onExpandedChange?: (expanded: boolean) => void;
}

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasNotification?: boolean;
  children?: SidebarItem[];
}

export function ModernSidebar({ language, onExpandedChange }: ModernSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('workflows');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['workflows']);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const text = {
    ar: {
      aiAssistant: 'المساعد الذكي',
      workflows: 'سير العمل',
      analytics: 'التحليلات',
      library: 'المكتبة',
      settings: 'الإعدادات',
      recents: 'المستخدم حديثاً',
      favorites: 'المفضلة',
      templates: 'القوالب',
      integrations: 'التكاملات',
      database: 'قاعدة البيانات',
      automation: 'الأتمتة',
      triggers: 'المحفزات',
      actions: 'الإجراءات',
      monitoring: 'المراقبة',
      notifications: 'التنبيهات',
      search: 'البحث',
      home: 'الرئيسية',
      newWorkflow: 'سير عمل جديد',
      history: 'السجل',
      tags: 'العلامات',
      filters: 'المرشحات',
      collapse: 'طي',
      expand: 'توسيع'
    },
    en: {
      aiAssistant: 'AI Assistant',
      workflows: 'Workflows',
      analytics: 'Analytics',
      library: 'Library',
      settings: 'Settings',
      recents: 'Recent',
      favorites: 'Favorites',
      templates: 'Templates',
      integrations: 'Integrations',
      database: 'Database',
      automation: 'Automation',
      triggers: 'Triggers',
      actions: 'Actions',
      monitoring: 'Monitoring',
      notifications: 'Notifications',
      search: 'Search',
      home: 'Home',
      newWorkflow: 'New Workflow',
      history: 'History',
      tags: 'Tags',
      filters: 'Filters',
      collapse: 'Collapse',
      expand: 'Expand'
    }
  };

  const t = text[language];

  const sidebarItems: SidebarItem[] = [
    {
      id: 'home',
      icon: <Home size={20} />,
      label: t.home,
    },
    {
      id: 'search',
      icon: <Search size={20} />,
      label: t.search,
    },
    {
      id: 'workflows',
      icon: <Workflow size={20} />,
      label: t.workflows,
      isActive: true,
      hasNotification: true,
      children: [
        {
          id: 'new-workflow',
          icon: <Plus size={16} />,
          label: t.newWorkflow,
        },
        {
          id: 'recent-workflows',
          icon: <History size={16} />,
          label: t.recents,
        },
        {
          id: 'favorites',
          icon: <Star size={16} />,
          label: t.favorites,
        }
      ]
    },
    {
      id: 'automation',
      icon: <Zap size={20} />,
      label: t.automation,
      children: [
        {
          id: 'triggers',
          icon: <GitBranch size={16} />,
          label: t.triggers,
        },
        {
          id: 'actions',
          icon: <Layers size={16} />,
          label: t.actions,
        }
      ]
    },
    {
      id: 'analytics',
      icon: <BarChart3 size={20} />,
      label: t.analytics,
      hasNotification: true,
    },
    {
      id: 'library',
      icon: <BookOpen size={20} />,
      label: t.library,
      children: [
        {
          id: 'templates',
          icon: <FileText size={16} />,
          label: t.templates,
        },
        {
          id: 'integrations',
          icon: <Database size={16} />,
          label: t.integrations,
        }
      ]
    },
    {
      id: 'monitoring',
      icon: <Activity size={20} />,
      label: t.monitoring,
    },
    {
      id: 'ai-assistant',
      icon: <Bot size={20} />,
      label: t.aiAssistant,
    },
    {
      id: 'settings',
      icon: <Settings size={20} />,
      label: t.settings,
    }
  ];

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderSidebarItem = (item: SidebarItem, depth = 0) => {
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isGroupExpanded = expandedGroups.includes(item.id);

    return (
      <div key={item.id} className="w-full">
        <motion.button
          onClick={() => {
            handleItemClick(item.id);
            if (hasChildren) {
              toggleGroup(item.id);
            }
          }}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
            ${depth > 0 ? 'ml-6' : ''}
            ${isActive 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
            }
          `}
          whileHover={{ x: depth > 0 ? 4 : 2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Icon */}
          <div className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-sidebar-foreground/70'}`}>
            {item.icon}
          </div>

          {/* Label */}
          <AnimatePresence>
            {(isExpanded || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {item.hasNotification && (
            <motion.div
              className="w-2 h-2 bg-chart-2 rounded-full flex-shrink-0 ml-auto notification-pulse"
            />
          )}

          {/* Expand/collapse arrow for groups */}
          {hasChildren && (isExpanded || isMobile) && (
            <motion.div
              className="ml-auto text-sidebar-foreground/50"
              animate={{ rotate: isGroupExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} />
            </motion.div>
          )}

          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute right-0 top-1/2 w-1 h-6 bg-primary-foreground rounded-l-full"
              layoutId="activeIndicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && (isExpanded || isMobile) && isGroupExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1 space-y-1"
            >
              {item.children?.map(child => renderSidebarItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          className="fixed top-4 left-4 z-[60] md:hidden bg-sidebar border border-sidebar-border shadow-lg"
          size="sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={20} />
        </Button>
      )}

      <motion.div
        className={`
          fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 flex flex-col modern-sidebar sidebar-glass
          ${!isMobile && (isExpanded ? 'w-64' : 'w-16')}
          ${isMobile ? 'w-64' : ''}
        `}
        initial={false}
        animate={{ 
          width: isMobile ? 256 : (isExpanded ? 256 : 64),
          x: isMobile ? (mobileOpen ? 0 : -256) : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border sidebar-header-glow">
          <AnimatePresence>
            {(isExpanded || isMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-sidebar-foreground">FlowCanvas</h3>
                  <p className="text-xs text-sidebar-foreground/60">AI Platform</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
              title={isExpanded ? t.collapse : t.expand}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft size={16} className="text-sidebar-foreground" />
              </motion.div>
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-b border-sidebar-border/50">
          <div className={`flex gap-2 ${(isExpanded || isMobile) ? 'flex-row' : 'flex-col'}`}>
            <Button
              size="sm"
              className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
              onClick={() => handleItemClick('new-workflow')}
            >
              <Plus size={16} />
              {(isExpanded || isMobile) && <span className="ml-2">{t.newWorkflow}</span>}
            </Button>
            
            {!isExpanded && !isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 hover:bg-sidebar-accent"
                onClick={() => handleItemClick('search')}
              >
                <Search size={16} />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1 px-3 py-4 ai-scroll">
          <div className="space-y-1">
            {sidebarItems.map(item => renderSidebarItem(item))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            
            <AnimatePresence>
              {(isExpanded || isMobile) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {language === 'ar' ? 'المطور' : 'Developer'}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {language === 'ar' ? 'متصل' : 'Online'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {(isExpanded || isMobile) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-sidebar-accent"
              >
                <Bell size={14} className="text-sidebar-foreground/70" />
              </Button>
            )}
          </div>
        </div>

        {/* AI Assistant Floating Button when collapsed */}
        <AnimatePresence>
          {!isExpanded && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2"
            >
              <Button
                size="sm"
                className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg ai-hover-glow"
                onClick={() => handleItemClick('ai-assistant')}
              >
                <Bot size={20} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}