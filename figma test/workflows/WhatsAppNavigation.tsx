'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Users, 
  Radio,
  Hash,
  Sparkles,
  Settings,
  Search,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

interface WhatsAppNavigationProps {
  language: 'ar' | 'en';
  activeTab?: 'chats' | 'status' | 'channels' | 'communities' | 'ai';
  onTabChange?: (tab: string) => void;
}

export const WhatsAppNavigation: React.FC<WhatsAppNavigationProps> = ({ 
  language,
  activeTab = 'chats',
  onTabChange
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const isRTL = language === 'ar';

  const texts = {
    ar: {
      chats: 'المحادثات',
      status: 'الحالات', 
      channels: 'القنوات',
      communities: 'المجتمعات',
      ai: 'مساعد ذكي',
      settings: 'الإعدادات',
      search: 'البحث',
      newChat: 'محادثة جديدة',
      more: 'المزيد'
    },
    en: {
      chats: 'Chats',
      status: 'Status',
      channels: 'Channels', 
      communities: 'Communities',
      ai: 'Meta AI',
      settings: 'Settings',
      search: 'Search',
      newChat: 'New Chat',
      more: 'More'
    }
  };

  const t = texts[language];

  const navigationItems = [
    {
      id: 'chats',
      label: t.chats,
      icon: MessageCircle,
      unreadCount: 99,
      active: activeTab === 'chats'
    },
    {
      id: 'status',
      label: t.status,
      icon: Radio,
      hasUpdates: true,
      active: activeTab === 'status'
    },
    {
      id: 'channels',
      label: t.channels,
      icon: Hash,
      active: activeTab === 'channels'
    },
    {
      id: 'communities',
      label: t.communities,
      icon: Users,
      active: activeTab === 'communities'
    }
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange?.(tabId);
  };

  return (
    <header className="whatsapp-chat-header">
      <div className="flex items-center justify-between w-full px-4 py-2">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;
            const isHovered = hoveredTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                className={`
                  relative flex items-center space-x-2 rtl:space-x-reverse 
                  px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-primary/15 text-primary shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                onClick={() => handleTabClick(item.id)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={isActive}
                aria-label={item.label}
              >
                
                {/* Icon with Animation */}
                <motion.div
                  animate={{
                    rotate: isHovered ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={20} className={isActive ? 'text-primary' : ''} />
                </motion.div>
                
                {/* Label */}
                <span className={`font-medium text-sm ${isActive ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
                
                {/* Unread Badge for Chats */}
                {item.unreadCount && (
                  <motion.span
                    className="bg-green-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.unreadCount > 99 ? '99+' : item.unreadCount}
                  </motion.span>
                )}
                
                {/* Update Indicator for Status */}
                {item.hasUpdates && (
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
              </motion.button>
            );
          })}
        </div>
        
        {/* Separator */}
        <div className="h-6 w-px bg-border mx-4" />
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          
          {/* AI Assistant Button */}
          <motion.button
            className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(79, 151, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            aria-label={t.ai}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span className="text-sm font-medium">{t.ai}</span>
          </motion.button>
          
          {/* Search Button */}
          <motion.button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t.search}
          >
            <Search size={18} />
          </motion.button>
          
          {/* New Chat Button */}
          <motion.button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t.newChat}
          >
            <Plus size={18} />
          </motion.button>
          
          {/* Settings Button */}
          <motion.button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label={t.settings}
          >
            <Settings size={18} />
          </motion.button>
          
          {/* More Options */}
          <motion.button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t.more}
          >
            <MoreHorizontal size={18} />
          </motion.button>
          
        </div>
        
      </div>
    </header>
  );
};