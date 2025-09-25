'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Phone, 
  Video, 
  Search,
  Star,
  Bell,
  BellOff,
  Shield,
  Trash2,
  Download,
  Share2,
  MoreVertical,
  Image,
  FileText,
  Link,
  Calendar,
  MapPin,
  Users,
  Settings,
  Archive,
  Ban
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  about: string;
  isOnline: boolean;
  lastSeen: string;
  isGroup?: boolean;
  participants?: Array<{
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'member';
  }>;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  name: string;
  size?: string;
  date: string;
}

interface WhatsAppInfoPanelProps {
  language: 'ar' | 'en';
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppInfoPanel: React.FC<WhatsAppInfoPanelProps> = ({
  language,
  contact,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'media' | 'docs' | 'links'>('media');
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const isRTL = language === 'ar';

  const texts = {
    ar: {
      contactInfo: 'معلومات جهة الاتصال',
      groupInfo: 'معلومات المجموعة',
      about: 'نبذة',
      phone: 'الهاتف',
      media: 'الوسائط',
      docs: 'المستندات',
      links: 'الروابط',
      participants: 'المشاركون',
      addParticipant: 'إضافة مشارك',
      muteNotifications: 'كتم الإشعارات',
      starredMessages: 'الرسائل المميزة',
      encryptionInfo: 'معلومات التشفير',
      blockContact: 'حظر جهة الاتصال',
      deleteChat: 'حذف المحادثة',
      exportChat: 'تصدير المحادثة',
      reportContact: 'الإبلاغ عن جهة الاتصال',
      viewInAddressBook: 'عرض في دفتر العناوين',
      shareContact: 'مشاركة جهة الاتصال',
      online: 'متصل',
      lastSeen: 'آخر ظهور',
      admin: 'مشرف',
      member: 'عضو',
      you: 'أنت',
      viewAll: 'عرض الكل',
      showLess: 'عرض أقل'
    },
    en: {
      contactInfo: 'Contact Info',
      groupInfo: 'Group Info', 
      about: 'About',
      phone: 'Phone',
      media: 'Media',
      docs: 'Docs',
      links: 'Links',
      participants: 'Participants',
      addParticipant: 'Add participant',
      muteNotifications: 'Mute notifications',
      starredMessages: 'Starred messages',
      encryptionInfo: 'Encryption info',
      blockContact: 'Block contact',
      deleteChat: 'Delete chat',
      exportChat: 'Export chat',
      reportContact: 'Report contact',
      viewInAddressBook: 'View in address book',
      shareContact: 'Share contact',
      online: 'Online',
      lastSeen: 'Last seen',
      admin: 'Admin',
      member: 'Member',
      you: 'You',
      viewAll: 'View all',
      showLess: 'Show less'
    }
  };

  const t = texts[language];

  // Mock media data
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      type: 'image',
      url: '/avatars/media1.jpg',
      name: 'IMG_001.jpg',
      date: '2024-01-15'
    },
    {
      id: '2', 
      type: 'video',
      url: '/avatars/video1.mp4',
      name: 'VID_002.mp4',
      size: '12.5 MB',
      date: '2024-01-14'
    },
    {
      id: '3',
      type: 'document',
      url: '/docs/report.pdf',
      name: 'Monthly Report.pdf',
      size: '2.1 MB',
      date: '2024-01-13'
    }
  ]);

  const filteredMedia = mediaItems.filter(item => {
    switch (activeTab) {
      case 'media':
        return item.type === 'image' || item.type === 'video';
      case 'docs':
        return item.type === 'document';
      case 'links':
        return item.type === 'link';
      default:
        return false;
    }
  });

  const renderMediaGrid = () => {
    if (filteredMedia.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            {activeTab === 'media' && <Image size={24} className="text-muted-foreground" />}
            {activeTab === 'docs' && <FileText size={24} className="text-muted-foreground" />}
            {activeTab === 'links' && <Link size={24} className="text-muted-foreground" />}
          </div>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? `لا توجد ${activeTab === 'media' ? 'وسائط' : activeTab === 'docs' ? 'مستندات' : 'روابط'} حتى الآن`
              : `No ${activeTab} yet`
            }
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {filteredMedia.map((item) => (
          <motion.div
            key={item.id}
            className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.type === 'image' && (
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
            )}
            {item.type === 'video' && (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Video size={24} className="text-white" />
              </div>
            )}
            {item.type === 'document' && (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <FileText size={24} className="text-blue-600" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderParticipants = () => {
    if (!contact.isGroup || !contact.participants) return null;

    const displayParticipants = showAllParticipants 
      ? contact.participants 
      : contact.participants.slice(0, 5);

    return (
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">{t.participants}</h3>
          <span className="text-sm text-muted-foreground">
            {contact.participants.length}
          </span>
        </div>

        <div className="space-y-3">
          {displayParticipants.map((participant) => (
            <motion.div
              key={participant.id}
              className="flex items-center space-x-3 rtl:space-x-reverse p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
              whileHover={{ x: isRTL ? -2 : 2 }}
            >
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{participant.name}</p>
                <p className="text-sm text-muted-foreground">
                  {participant.role === 'admin' ? t.admin : t.member}
                </p>
              </div>
              {participant.role === 'admin' && (
                <Star size={14} className="text-yellow-500" />
              )}
            </motion.div>
          ))}

          {contact.participants.length > 5 && (
            <motion.button
              className="w-full py-2 text-center text-primary hover:bg-muted/50 rounded-lg transition-colors"
              onClick={() => setShowAllParticipants(!showAllParticipants)}
              whileTap={{ scale: 0.98 }}
            >
              {showAllParticipants ? t.showLess : t.viewAll}
            </motion.button>
          )}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`whatsapp-info-panel-backdrop ${isOpen ? 'visible' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={`whatsapp-info-panel ${isOpen ? 'open' : ''}`}
            initial={{ x: isRTL ? -400 : 400 }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? -400 : 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <h2 className="font-semibold">
                {contact.isGroup ? t.groupInfo : t.contactInfo}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              
              {/* Contact Header */}
              <div className="p-6 text-center border-b border-border">
                <motion.img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-muted"
                  whileHover={{ scale: 1.05 }}
                />
                <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {contact.isOnline ? t.online : `${t.lastSeen} ${contact.lastSeen}`}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  <motion.button
                    className="p-3 rounded-full bg-green-500 text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Phone size={20} />
                  </motion.button>
                  <motion.button
                    className="p-3 rounded-full bg-blue-500 text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Video size={20} />
                  </motion.button>
                  <motion.button
                    className="p-3 rounded-full bg-muted text-foreground shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="p-4 space-y-4 border-b border-border">
                <div>
                  <label className="text-sm text-muted-foreground">{t.about}</label>
                  <p className="mt-1">{contact.about}</p>
                </div>
                {!contact.isGroup && (
                  <div>
                    <label className="text-sm text-muted-foreground">{t.phone}</label>
                    <p className="mt-1 font-mono">{contact.phone}</p>
                  </div>
                )}
              </div>

              {/* Media Tabs */}
              <div className="border-b border-border">
                <div className="flex">
                  {['media', 'docs', 'links'].map((tab) => (
                    <motion.button
                      key={tab}
                      className={`
                        flex-1 py-3 text-center transition-colors relative
                        ${activeTab === tab 
                          ? 'text-primary bg-primary/5' 
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                      onClick={() => setActiveTab(tab as any)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t[tab as keyof typeof t]}
                      {activeTab === tab && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="activeMediaTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Media Content */}
              {renderMediaGrid()}

              {/* Participants (for groups) */}
              {renderParticipants()}

              {/* Actions */}
              <div className="p-4 space-y-2 border-t border-border">
                
                <motion.button
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
                  whileHover={{ x: isRTL ? -4 : 4 }}
                >
                  <BellOff size={20} className="text-muted-foreground" />
                  <span>{t.muteNotifications}</span>
                </motion.button>

                <motion.button
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
                  whileHover={{ x: isRTL ? -4 : 4 }}
                >
                  <Star size={20} className="text-muted-foreground" />
                  <span>{t.starredMessages}</span>
                </motion.button>

                <motion.button
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
                  whileHover={{ x: isRTL ? -4 : 4 }}
                >
                  <Download size={20} className="text-muted-foreground" />
                  <span>{t.exportChat}</span>
                </motion.button>

                {!contact.isGroup && (
                  <motion.button
                    className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-red-500/10 rounded-lg transition-colors text-left text-red-500"
                    whileHover={{ x: isRTL ? -4 : 4 }}
                  >
                    <Ban size={20} />
                    <span>{t.blockContact}</span>
                  </motion.button>
                )}

                <motion.button
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-red-500/10 rounded-lg transition-colors text-left text-red-500"
                  whileHover={{ x: isRTL ? -4 : 4 }}
                >
                  <Trash2 size={20} />
                  <span>{t.deleteChat}</span>
                </motion.button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};