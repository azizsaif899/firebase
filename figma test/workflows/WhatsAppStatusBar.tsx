'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  WifiOff, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Signal,
  Battery,
  Volume2,
  VolumeX
} from 'lucide-react';

interface WhatsAppStatusBarProps {
  language: 'ar' | 'en';
}

export const WhatsAppStatusBar: React.FC<WhatsAppStatusBarProps> = ({ language }) => {
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'connecting'>('online');
  const [lastSeen, setLastSeen] = useState<Date>(new Date());
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>>([]);

  const texts = {
    ar: {
      online: 'متصل',
      offline: 'غير متصل',
      connecting: 'جاري الاتصال...',
      lastSeen: 'آخر ظهور',
      reconnecting: 'إعادة الاتصال...',
      connected: 'تم الاتصال',
      disconnected: 'انقطع الاتصال',
      messagesSent: 'تم إرسال الرسائل',
      messagesReceived: 'تم استلام رسائل جديدة',
      now: 'الآن',
      justNow: 'منذ لحظات',
      minutesAgo: 'منذ {minutes} دقائق',
      hoursAgo: 'منذ {hours} ساعات'
    },
    en: {
      online: 'Online',
      offline: 'Offline', 
      connecting: 'Connecting...',
      lastSeen: 'Last seen',
      reconnecting: 'Reconnecting...',
      connected: 'Connected',
      disconnected: 'Disconnected',
      messagesSent: 'Messages sent',
      messagesReceived: 'New messages received',
      now: 'now',
      justNow: 'just now',
      minutesAgo: '{minutes} minutes ago',
      hoursAgo: '{hours} hours ago'
    }
  };

  const t = texts[language];

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      if (random < 0.05) { // 5% chance to simulate connection issues
        setConnectionStatus('connecting');
        setTimeout(() => setConnectionStatus('online'), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update last seen time
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSeen(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 1) return t.now;
    if (diffMinutes < 5) return t.justNow;
    if (diffMinutes < 60) return t.minutesAgo.replace('{minutes}', diffMinutes.toString());
    if (diffHours < 24) return t.hoursAgo.replace('{hours}', diffHours.toString());
    
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
  };

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 2)]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'online':
        return <Wifi size={14} className="text-green-500" />;
      case 'offline':
        return <WifiOff size={14} className="text-red-500" />;
      case 'connecting':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Signal size={14} className="text-yellow-500" />
          </motion.div>
        );
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'online':
        return t.online;
      case 'offline':
        return t.offline;
      case 'connecting':
        return t.connecting;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      default:
        return <Clock size={16} className="text-blue-500" />;
    }
  };

  return (
    <>
      {/* Status Bar */}
      <div className="whatsapp-network-status fixed top-0 left-0 right-0 z-50 transition-transform duration-300">
        <div className="flex items-center justify-between px-4 py-2 bg-card/95 backdrop-blur border-b border-border">
          
          {/* Connection Status */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {getConnectionIcon()}
            <span className="text-sm font-medium">
              {getConnectionText()}
            </span>
            
            {/* Last Seen */}
            {connectionStatus === 'online' && (
              <span className="text-xs text-muted-foreground">
                • {t.lastSeen} {formatLastSeen(lastSeen)}
              </span>
            )}
          </div>

          {/* System Info */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse text-muted-foreground">
            
            {/* Signal Strength */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <div className="flex space-x-0.5 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`w-1 bg-current rounded-full transition-all duration-300 ${
                      connectionStatus === 'online' 
                        ? 'opacity-100' 
                        : bar <= 2 ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{ height: `${bar * 3 + 2}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Sound Status */}
            <button 
              className="p-1 hover:bg-muted rounded transition-colors"
              onClick={() => {
                // Toggle sound
                addNotification('info', 'Sound settings updated');
              }}
            >
              <Volume2 size={12} />
            </button>

            {/* Current Time */}
            <span className="text-xs font-mono">
              {new Date().toLocaleTimeString(
                language === 'ar' ? 'ar-SA' : 'en-US',
                { hour: '2-digit', minute: '2-digit' }
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-16 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              className="whatsapp-toast"
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp.toLocaleTimeString(
                      language === 'ar' ? 'ar-SA' : 'en-US',
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </p>
                </div>
                <button
                  className="p-1 hover:bg-muted rounded transition-colors"
                  onClick={() => {
                    setNotifications(prev => prev.filter(n => n.id !== notification.id));
                  }}
                >
                  <XCircle size={14} className="text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Connection Status Overlay */}
      <AnimatePresence>
        {connectionStatus === 'connecting' && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-lg p-6 shadow-lg border border-border max-w-sm mx-4"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Signal size={24} className="text-yellow-500" />
                </motion.div>
                <div>
                  <h3 className="font-medium">{t.reconnecting}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'جاري إعادة الاتصال بالخادم...' 
                      : 'Reconnecting to server...'
                    }
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};