'use client';

import React, { useState } from 'react';
import { useDesign, defaultThemes } from './DesignProvider';
import { 
  Palette, 
  Star, 
  Download, 
  Trash2, 
  Plus, 
  Eye, 
  Copy,
  Check,
  Crown,
  Sparkles,
  Zap
} from 'lucide-react';

interface ThemePresetsProps {
  onThemeChange: (theme: any) => void;
  language: 'ar' | 'en';
}

export const ThemePresets: React.FC<ThemePresetsProps> = ({ 
  onThemeChange, 
  language 
}) => {
  const { currentTheme, customThemes, setCurrentTheme, deleteCustomTheme } = useDesign();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id);
  const [copiedTheme, setCopiedTheme] = useState<string | null>(null);

  const texts = {
    ar: {
      title: 'قوالب التصميم',
      subtitle: 'اختر من القوالب الجاهزة أو أنشئ قالباً مخصصاً',
      sections: {
        default: 'القوالب الافتراضية',
        custom: 'القوالب المخصصة',
        featured: 'قوالب مميزة'
      },
      actions: {
        apply: 'تطبيق',
        preview: 'معاينة',
        copy: 'نسخ',
        copied: 'تم النسخ',
        delete: 'حذف',
        create: 'إنشاء قالب',
        download: 'تحميل'
      },
      status: {
        active: 'نشط',
        default: 'افتراضي',
        custom: 'مخصص',
        featured: 'مميز'
      },
      empty: {
        custom: 'لا توجد قوالب مخصصة',
        customDesc: 'قم بتخصيص التصميم ثم احفظه كقالب جديد'
      }
    },
    en: {
      title: 'Design Presets',
      subtitle: 'Choose from ready-made templates or create custom ones',
      sections: {
        default: 'Default Presets',
        custom: 'Custom Presets',
        featured: 'Featured Presets'
      },
      actions: {
        apply: 'Apply',
        preview: 'Preview',
        copy: 'Copy',
        copied: 'Copied',
        delete: 'Delete',
        create: 'Create Template',
        download: 'Download'
      },
      status: {
        active: 'Active',
        default: 'Default',
        custom: 'Custom',
        featured: 'Featured'
      },
      empty: {
        custom: 'No custom presets',
        customDesc: 'Customize the design and save it as a new preset'
      }
    }
  };

  const t = texts[language];

  // قوالب مميزة إضافية
  const featuredThemes = [
    {
      id: 'discord-dark',
      name: 'Discord الداكن',
      colors: {
        sidebarBg: '#2f3136',
        headerBg: '#36393f',
        chatAreaBg: '#36393f',
        inputAreaBg: '#40444b',
        incomingBubble: '#40444b',
        outgoingBubble: '#5865f2',
        primaryText: '#dcddde',
        secondaryText: '#b9bbbe',
        accentGreen: '#5865f2',
        borderColor: 'rgba(114, 118, 125, 0.3)',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        hoverColor: 'rgba(79, 84, 92, 0.16)'
      },
      featured: true
    },
    {
      id: 'telegram-blue',
      name: 'Telegram الأزرق',
      colors: {
        sidebarBg: '#17212b',
        headerBg: '#242f3d',
        chatAreaBg: '#0e1621',
        inputAreaBg: '#242f3d',
        incomingBubble: '#182533',
        outgoingBubble: '#2481cc',
        primaryText: '#ffffff',
        secondaryText: '#a2acb4',
        accentGreen: '#64a9dc',
        borderColor: 'rgba(36, 129, 204, 0.2)',
        shadowColor: 'rgba(36, 129, 204, 0.1)',
        hoverColor: 'rgba(36, 129, 204, 0.05)'
      },
      featured: true
    },
    {
      id: 'slack-modern',
      name: 'Slack العصري',
      colors: {
        sidebarBg: '#3f0e40',
        headerBg: '#350d36',
        chatAreaBg: '#1a1d21',
        inputAreaBg: '#350d36',
        incomingBubble: '#2c2d30',
        outgoingBubble: '#007a5a',
        primaryText: '#d1d2d3',
        secondaryText: '#b7b8ba',
        accentGreen: '#1fb886',
        borderColor: 'rgba(31, 184, 134, 0.2)',
        shadowColor: 'rgba(0, 122, 90, 0.1)',
        hoverColor: 'rgba(31, 184, 134, 0.05)'
      },
      featured: true
    }
  ];

  const allThemes = [...defaultThemes, ...featuredThemes, ...customThemes];

  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme.id);
    setCurrentTheme(theme);
  };

  const copyThemeId = (themeId: string) => {
    navigator.clipboard.writeText(themeId);
    setCopiedTheme(themeId);
    setTimeout(() => setCopiedTheme(null), 2000);
  };

  const ThemeCard: React.FC<{ theme: any; section: string }> = ({ theme, section }) => {
    const isActive = theme.id === selectedTheme;
    const isFeatured = theme.featured || section === 'featured';
    const isCustom = theme.isCustom;

    return (
      <div 
        className={`
          relative rounded-xl p-4 border transition-all duration-200 cursor-pointer group
          ${isActive 
            ? 'border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
            : 'border-slate-600/30 bg-slate-800/30 hover:border-slate-500/50 hover:bg-slate-700/50'
          }
        `}
        onClick={() => handleThemeSelect(theme)}
      >
        {/* شارة الحالة */}
        {isActive && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}

        {/* شارة مميز */}
        {isFeatured && !isCustom && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Crown className="w-3 h-3 text-white" />
          </div>
        )}

        {/* شارة مخصص */}
        {isCustom && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        )}

        {/* معاينة الألوان */}
        <div className="flex gap-1 mb-3">
          <div 
            className="w-4 h-4 rounded border border-slate-500/30"
            style={{ backgroundColor: theme.colors.sidebarBg }}
          />
          <div 
            className="w-4 h-4 rounded border border-slate-500/30"
            style={{ backgroundColor: theme.colors.outgoingBubble }}
          />
          <div 
            className="w-4 h-4 rounded border border-slate-500/30"
            style={{ backgroundColor: theme.colors.accentGreen }}
          />
          <div 
            className="w-4 h-4 rounded border border-slate-500/30"
            style={{ backgroundColor: theme.colors.incomingBubble }}
          />
        </div>

        {/* اسم القالب */}
        <h5 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
          {theme.name}
        </h5>

        {/* معلومات القالب */}
        <div className="text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>الشريط الجانبي: {theme.layout?.sidebarWidth || 300}px</span>
            <span className={`px-2 py-1 rounded-full text-xs
              ${isActive ? 'bg-blue-500/20 text-blue-400' : 
                isFeatured ? 'bg-yellow-500/20 text-yellow-400' :
                isCustom ? 'bg-purple-500/20 text-purple-400' :
                'bg-slate-600/20 text-slate-400'}
            `}>
              {isActive ? t.status.active : 
               isFeatured ? t.status.featured :
               isCustom ? t.status.custom : 
               t.status.default}
            </span>
          </div>
          <div>الخط: {theme.layout?.fontSize || 14}px</div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-1">
            {!isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleThemeSelect(theme);
                }}
                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                title={t.actions.apply}
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyThemeId(theme.id);
              }}
              className="p-2 bg-slate-600/50 text-slate-400 rounded-lg hover:bg-slate-500/50 transition-colors"
              title={t.actions.copy}
            >
              {copiedTheme === theme.id ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {isCustom && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('هل تريد حذف هذا القالب المخصص؟')) {
                  deleteCustomTheme(theme.id);
                }
              }}
              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">{t.title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{t.subtitle}</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-600/30">
          <div className="text-2xl font-bold text-white">{defaultThemes.length}</div>
          <div className="text-xs text-slate-400">قوالب افتراضية</div>
        </div>
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-600/30">
          <div className="text-2xl font-bold text-white">{customThemes.length}</div>
          <div className="text-xs text-slate-400">قوالب مخصصة</div>
        </div>
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-600/30">
          <div className="text-2xl font-bold text-white">{featuredThemes.length}</div>
          <div className="text-xs text-slate-400">قوالب مميزة</div>
        </div>
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-600/30">
          <div className="text-2xl font-bold text-blue-400">{allThemes.length}</div>
          <div className="text-xs text-slate-400">إجمالي القوالب</div>
        </div>
      </div>

      {/* القوالب الافتراضية */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">{t.sections.default}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} section="default" />
          ))}
        </div>
      </div>

      {/* القوالب المميزة */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-yellow-400" />
          <h4 className="text-lg font-semibold text-white">{t.sections.featured}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} section="featured" />
          ))}
        </div>
      </div>

      {/* القوالب المخصصة */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h4 className="text-lg font-semibold text-white">{t.sections.custom}</h4>
          </div>
          
          <button
            onClick={() => {
              const customName = prompt(language === 'ar' ? 'اسم القالب المخصص:' : 'Custom template name:');
              if (customName) {
                const newCustomTheme = {
                  ...currentTheme,
                  id: `custom-${Date.now()}`,
                  name: customName,
                  isCustom: true
                };
                // سيتم حفظه عبر saveCustomTheme في المكون الرئيسي
                onThemeChange(newCustomTheme);
              }
            }}
            className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            {t.actions.create}
          </button>
        </div>

        {customThemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} section="custom" />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-600/30 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <h5 className="text-lg font-medium text-slate-300 mb-2">{t.empty.custom}</h5>
            <p className="text-sm text-slate-500 mb-4">{t.empty.customDesc}</p>
            <button
              onClick={() => {
                const customName = prompt(language === 'ar' ? 'اسم القالب الجديد:' : 'New template name:');
                if (customName) {
                  const newCustomTheme = {
                    ...currentTheme,
                    id: `custom-${Date.now()}`,
                    name: customName,
                    isCustom: true
                  };
                  onThemeChange(newCustomTheme);
                }
              }}
              className="px-6 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors font-medium"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              إنشاء أول قالب مخصص
            </button>
          </div>
        )}
      </div>

      {/* أدوات إضافية */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">أدوات إضافية</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => {
              // تصدير جميع القوالب المخصصة
              const allCustomThemes = JSON.stringify(customThemes, null, 2);
              const blob = new Blob([allCustomThemes], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'custom-themes-backup.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="p-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
            disabled={customThemes.length === 0}
          >
            <Download className="w-4 h-4 inline mr-1" />
            تصدير الكل
          </button>
          
          <button
            onClick={() => {
              // إنشاء قالب عشوائي
              const randomTheme = {
                id: `random-${Date.now()}`,
                name: `قالب عشوائي ${Date.now().toString().slice(-4)}`,
                colors: {
                  sidebarBg: `hsl(${Math.random() * 360}, 70%, 15%)`,
                  headerBg: `hsl(${Math.random() * 360}, 70%, 20%)`,
                  chatAreaBg: `hsl(${Math.random() * 360}, 70%, 5%)`,
                  inputAreaBg: `hsl(${Math.random() * 360}, 70%, 20%)`,
                  incomingBubble: `hsl(${Math.random() * 360}, 70%, 25%)`,
                  outgoingBubble: `hsl(${Math.random() * 360}, 70%, 35%)`,
                  primaryText: '#ffffff',
                  secondaryText: '#a0a0a0',
                  accentGreen: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  hoverColor: 'rgba(255, 255, 255, 0.05)'
                },
                layout: currentTheme.layout,
                icons: currentTheme.icons,
                animations: currentTheme.animations,
                isCustom: true
              };
              handleThemeSelect(randomTheme);
            }}
            className="p-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
          >
            <Zap className="w-4 h-4 inline mr-1" />
            قالب عشوائي
          </button>
          
          <button
            onClick={() => {
              if (confirm('هل تريد حذف جميع القوالب المخصصة؟')) {
                customThemes.forEach(theme => deleteCustomTheme(theme.id));
              }
            }}
            className="p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
            disabled={customThemes.length === 0}
          >
            <Trash2 className="w-4 h-4 inline mr-1" />
            حذف الكل
          </button>
          
          <button
            onClick={() => {
              // إعادة تعيين للقالب الافتراضي
              handleThemeSelect(defaultThemes[0]);
            }}
            className="p-3 bg-slate-600/50 text-slate-300 border border-slate-500/30 rounded-lg hover:bg-slate-500/50 transition-colors text-sm"
          >
            <Star className="w-4 h-4 inline mr-1" />
            افتراضي
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemePresets;