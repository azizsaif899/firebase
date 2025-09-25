'use client';

import { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, Key, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface ChatSecurityProps {
  language: 'ar' | 'en';
  onSecurityChange?: (settings: SecuritySettings) => void;
}

interface SecuritySettings {
  endToEndEncryption: boolean;
  messageAutoDelete: boolean;
  readReceipts: boolean;
  onlineStatus: boolean;
  lastSeen: boolean;
  mediaAutoDownload: boolean;
  backupEnabled: boolean;
  twoFactorAuth: boolean;
}

export function ChatSecurity({ language, onSecurityChange }: ChatSecurityProps) {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    endToEndEncryption: true,
    messageAutoDelete: false,
    readReceipts: true,
    onlineStatus: true,
    lastSeen: true,
    mediaAutoDownload: false,
    backupEnabled: true,
    twoFactorAuth: false
  });

  const [encryptionStatus, setEncryptionStatus] = useState<'secure' | 'warning' | 'error'>('secure');

  const texts = {
    ar: {
      title: 'إعدادات الأمان والخصوصية',
      description: 'إدارة إعدادات الأمان والخصوصية للمحادثات',
      encryption: 'التشفير من النهاية إلى النهاية',
      encryptionDesc: 'حماية رسائلك بتشفير قوي',
      autoDelete: 'حذف الرسائل التلقائي',
      autoDeleteDesc: 'حذف الرسائل بعد مدة محددة',
      readReceipts: 'إشعارات القراءة',
      readReceiptsDesc: 'إظهار علامات قراءة الرسائل',
      onlineStatus: 'حالة الاتصال',
      onlineStatusDesc: 'إظهار حالة متصل/غير متصل',
      lastSeen: 'آخر ظهور',
      lastSeenDesc: 'إظهار وقت آخر ظهور',
      mediaDownload: 'تحميل الوسائط التلقائي',
      mediaDownloadDesc: 'تحميل الصور والملفات تلقائياً',
      backup: 'النسخ الاحتياطي',
      backupDesc: 'حفظ نسخة احتياطية من المحادثات',
      twoFactor: 'المصادقة الثنائية',
      twoFactorDesc: 'حماية إضافية للحساب',
      securityLevel: 'مستوى الأمان',
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض',
      encryptionActive: 'التشفير نشط',
      encryptionWarning: 'تحذير أمني',
      encryptionError: 'خطأ في التشفير'
    },
    en: {
      title: 'Security & Privacy Settings',
      description: 'Manage security and privacy settings for conversations',
      encryption: 'End-to-End Encryption',
      encryptionDesc: 'Protect your messages with strong encryption',
      autoDelete: 'Auto-Delete Messages',
      autoDeleteDesc: 'Automatically delete messages after a set time',
      readReceipts: 'Read Receipts',
      readReceiptsDesc: 'Show message read status',
      onlineStatus: 'Online Status',
      onlineStatusDesc: 'Show online/offline status',
      lastSeen: 'Last Seen',
      lastSeenDesc: 'Show last seen timestamp',
      mediaDownload: 'Auto-Download Media',
      mediaDownloadDesc: 'Automatically download images and files',
      backup: 'Backup',
      backupDesc: 'Save backup copy of conversations',
      twoFactor: 'Two-Factor Authentication',
      twoFactorDesc: 'Additional account protection',
      securityLevel: 'Security Level',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      encryptionActive: 'Encryption Active',
      encryptionWarning: 'Security Warning',
      encryptionError: 'Encryption Error'
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Calculate security level based on settings
    const securityScore = Object.values(securitySettings).filter(Boolean).length;
    if (securityScore >= 6) {
      setEncryptionStatus('secure');
    } else if (securityScore >= 4) {
      setEncryptionStatus('warning');
    } else {
      setEncryptionStatus('error');
    }
  }, [securitySettings]);

  useEffect(() => {
    onSecurityChange?.(securitySettings);
  }, [securitySettings, onSecurityChange]);

  const updateSetting = (key: keyof SecuritySettings, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSecurityLevel = () => {
    const score = Object.values(securitySettings).filter(Boolean).length;
    if (score >= 6) return { level: t.high, color: 'bg-green-500' };
    if (score >= 4) return { level: t.medium, color: 'bg-yellow-500' };
    return { level: t.low, color: 'bg-red-500' };
  };

  const getEncryptionStatusIcon = () => {
    switch (encryptionStatus) {
      case 'secure':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'error':
        return <AlertTriangle size={16} className="text-red-500" />;
    }
  };

  const getEncryptionStatusText = () => {
    switch (encryptionStatus) {
      case 'secure':
        return t.encryptionActive;
      case 'warning':
        return t.encryptionWarning;
      case 'error':
        return t.encryptionError;
    }
  };

  const securityLevel = getSecurityLevel();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield size={20} className="text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{t.title}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${securityLevel.color}`} />
              {t.securityLevel}: {securityLevel.level}
            </Badge>
          </div>
        </div>

        {/* Encryption Status */}
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          {getEncryptionStatusIcon()}
          <span className="text-sm font-medium">{getEncryptionStatusText()}</span>
          <Lock size={12} className="text-muted-foreground ml-auto" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* End-to-End Encryption */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key size={16} className="text-primary" />
            <div>
              <Label className="text-sm font-medium">{t.encryption}</Label>
              <p className="text-xs text-muted-foreground">{t.encryptionDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.endToEndEncryption}
            onCheckedChange={(value) => updateSetting('endToEndEncryption', value)}
          />
        </div>

        {/* Auto-Delete Messages */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye size={16} className="text-chart-2" />
            <div>
              <Label className="text-sm font-medium">{t.autoDelete}</Label>
              <p className="text-xs text-muted-foreground">{t.autoDeleteDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.messageAutoDelete}
            onCheckedChange={(value) => updateSetting('messageAutoDelete', value)}
          />
        </div>

        {/* Read Receipts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-chart-3" />
            <div>
              <Label className="text-sm font-medium">{t.readReceipts}</Label>
              <p className="text-xs text-muted-foreground">{t.readReceiptsDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.readReceipts}
            onCheckedChange={(value) => updateSetting('readReceipts', value)}
          />
        </div>

        {/* Online Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <div>
              <Label className="text-sm font-medium">{t.onlineStatus}</Label>
              <p className="text-xs text-muted-foreground">{t.onlineStatusDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.onlineStatus}
            onCheckedChange={(value) => updateSetting('onlineStatus', value)}
          />
        </div>

        {/* Last Seen */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EyeOff size={16} className="text-muted-foreground" />
            <div>
              <Label className="text-sm font-medium">{t.lastSeen}</Label>
              <p className="text-xs text-muted-foreground">{t.lastSeenDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.lastSeen}
            onCheckedChange={(value) => updateSetting('lastSeen', value)}
          />
        </div>

        {/* Media Auto-Download */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-chart-4 rounded" />
            <div>
              <Label className="text-sm font-medium">{t.mediaDownload}</Label>
              <p className="text-xs text-muted-foreground">{t.mediaDownloadDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.mediaAutoDownload}
            onCheckedChange={(value) => updateSetting('mediaAutoDownload', value)}
          />
        </div>

        {/* Backup */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-chart-1" />
            <div>
              <Label className="text-sm font-medium">{t.backup}</Label>
              <p className="text-xs text-muted-foreground">{t.backupDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.backupEnabled}
            onCheckedChange={(value) => updateSetting('backupEnabled', value)}
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={16} className="text-red-500" />
            <div>
              <Label className="text-sm font-medium">{t.twoFactor}</Label>
              <p className="text-xs text-muted-foreground">{t.twoFactorDesc}</p>
            </div>
          </div>
          <Switch
            checked={securitySettings.twoFactorAuth}
            onCheckedChange={(value) => updateSetting('twoFactorAuth', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}