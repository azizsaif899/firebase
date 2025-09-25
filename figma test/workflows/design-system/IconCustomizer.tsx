'use client';

import React, { useState } from 'react';
import { useDesign } from './DesignProvider';
import { 
  Settings, 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic,
  Sliders,
  Palette,
  RotateCcw
} from 'lucide-react';

interface IconCustomizerProps {
  onIconChange: (icons: any) => void;
  language: 'ar' | 'en';
}

export const IconCustomizer: React.FC<IconCustomizerProps> = ({ 
  onIconChange, 
  language 
}) => {
  const { currentTheme } = useDesign();
  const [activeIcon, setActiveIcon] = useState<string>('search');

  const texts = {
    ar: {
      title: 'تخصيص الأيقونات',
      subtitle: 'تخصيص حجم ولون ونمط كل أيقونة',
      icons: {
        search: 'أيقونة البحث',
        send: 'أيقونة الإرسال',
        phone: 'أيقونة الهاتف',
        video: 'أيقونة الفيديو',
        menu: 'أيقونة القائمة',
        attachment: 'أيقونة المرفقات',
        emoji: 'أيقونة الإيموجي',
        microphone: 'أيقونة المايكروفون'
      },
      properties: {
        size: 'الحجم',
        color: 'اللون',
        style: 'النمط'
      },
      styles: {
        outline: 'مفرغ',
        filled: 'مملوء',
        solid: 'صلب',
        duotone: 'لونين'
      },
      actions: {
        reset: 'إعادة تعيين',
        presets: 'قوالب جاهزة',
        preview: 'معاينة'
      },
      presets: {
        minimal: 'بسيط',
        rounded: 'مدور',
        sharp: 'حاد',
        modern: 'عصري'
      }
    },
    en: {
      title: 'Icon Customization',
      subtitle: 'Customize size, color and style of each icon',
      icons: {
        search: 'Search Icon',
        send: 'Send Icon',
        phone: 'Phone Icon',
        video: 'Video Icon',
        menu: 'Menu Icon',
        attachment: 'Attachment Icon',
        emoji: 'Emoji Icon',
        microphone: 'Microphone Icon'
      },
      properties: {
        size: 'Size',
        color: 'Color',
        style: 'Style'
      },
      styles: {
        outline: 'Outline',
        filled: 'Filled',
        solid: 'Solid',
        duotone: 'Duotone'
      },
      actions: {
        reset: 'Reset',
        presets: 'Presets',
        preview: 'Preview'
      },
      presets: {
        minimal: 'Minimal',
        rounded: 'Rounded',
        sharp: 'Sharp',
        modern: 'Modern'
      }
    }
  };

  const t = texts[language];

  const iconComponents = {
    search: Search,
    send: Send,
    phone: Phone,
    video: Video,
    menu: MoreVertical,
    attachment: Paperclip,
    emoji: Smile,
    microphone: Mic
  };

  const iconPresets = {
    minimal: {
      search: { size: 20, color: '#9ca3af', style: 'outline' },
      send: { size: 20, color: '#10b981', style: 'outline' },
      phone: { size: 20, color: '#9ca3af', style: 'outline' },
      video: { size: 20, color: '#9ca3af', style: 'outline' },
      menu: { size: 20, color: '#9ca3af', style: 'outline' },
      attachment: { size: 20, color: '#9ca3af', style: 'outline' },
      emoji: { size: 20, color: '#9ca3af', style: 'outline' },
      microphone: { size: 20, color: '#10b981', style: 'outline' }
    },
    rounded: {
      search: { size: 24, color: '#6366f1', style: 'filled' },
      send: { size: 24, color: '#06b6d4', style: 'filled' },
      phone: { size: 24, color: '#6366f1', style: 'filled' },
      video: { size: 24, color: '#6366f1', style: 'filled' },
      menu: { size: 24, color: '#6366f1', style: 'filled' },
      attachment: { size: 24, color: '#6366f1', style: 'filled' },
      emoji: { size: 24, color: '#6366f1', style: 'filled' },
      microphone: { size: 24, color: '#06b6d4', style: 'filled' }
    },
    sharp: {
      search: { size: 26, color: '#ef4444', style: 'solid' },
      send: { size: 26, color: '#f59e0b', style: 'solid' },
      phone: { size: 26, color: '#ef4444', style: 'solid' },
      video: { size: 26, color: '#ef4444', style: 'solid' },
      menu: { size: 26, color: '#ef4444', style: 'solid' },
      attachment: { size: 26, color: '#ef4444', style: 'solid' },
      emoji: { size: 26, color: '#ef4444', style: 'solid' },
      microphone: { size: 26, color: '#f59e0b', style: 'solid' }
    },
    modern: {
      search: { size: 22, color: '#8b5cf6', style: 'duotone' },
      send: { size: 22, color: '#06b6d4', style: 'duotone' },
      phone: { size: 22, color: '#8b5cf6', style: 'duotone' },
      video: { size: 22, color: '#8b5cf6', style: 'duotone' },
      menu: { size: 22, color: '#8b5cf6', style: 'duotone' },
      attachment: { size: 22, color: '#8b5cf6', style: 'duotone' },
      emoji: { size: 22, color: '#8b5cf6', style: 'duotone' },
      microphone: { size: 22, color: '#06b6d4', style: 'duotone' }
    }
  };

  const handleIconChange = (iconKey: string, property: string, value: any) => {
    const updatedIcons = {
      ...currentTheme.icons,
      [iconKey]: {
        ...currentTheme.icons[iconKey as keyof typeof currentTheme.icons],
        [property]: value
      }
    };
    onIconChange({ icons: updatedIcons });
  };

  const applyIconPreset = (presetKey: string) => {
    const preset = iconPresets[presetKey as keyof typeof iconPresets];
    onIconChange({ icons: preset });
  };

  const currentIconData = currentTheme.icons[activeIcon as keyof typeof currentTheme.icons];
  const IconComponent = iconComponents[activeIcon as keyof typeof iconComponents];

  return (
    <div className="space-y-6">
      {/* العنوان والوصف */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">{t.title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{t.subtitle}</p>
      </div>

      {/* قوالب الأيقونات */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">{t.actions.presets}</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(iconPresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyIconPreset(key)}
              className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 border border-slate-600/30 group"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Search size={preset.search.size} color={preset.search.color} />
                <Send size={preset.send.size} color={preset.send.color} />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                {t.presets[key as keyof typeof t.presets]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* اختيار الأيقونة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(currentTheme.icons).map(([iconKey, iconData]) => {
          const IconComp = iconComponents[iconKey as keyof typeof iconComponents];
          return (
            <button
              key={iconKey}
              onClick={() => setActiveIcon(iconKey)}
              className={`
                p-4 rounded-xl transition-all duration-200 border
                ${activeIcon === iconKey 
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                  : 'bg-slate-800/30 border-slate-600/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
                }
              `}
            >
              <div className="flex flex-col items-center gap-2">
                <IconComp 
                  size={iconData.size} 
                  color={iconData.color}
                  className={activeIcon === iconKey ? 'animate-pulse' : ''}
                />
                <span className="text-xs font-medium">
                  {t.icons[iconKey as keyof typeof t.icons]}
                </span>
                <span className="text-xs opacity-60">
                  {iconData.size}px
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* تخصيص الأيقونة المحددة */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
        <div className="flex items-center gap-3 mb-4">
          <IconComponent size={32} color={currentIconData.color} />
          <div>
            <h4 className="text-lg font-semibold text-white">
              {t.icons[activeIcon as keyof typeof t.icons]}
            </h4>
            <p className="text-sm text-slate-400">تخصيص متقدم للأيقونة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* الحجم */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t.properties.size}
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="12"
                max="48"
                value={currentIconData.size}
                onChange={(e) => handleIconChange(activeIcon, 'size', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>12px</span>
                <span className="text-white font-medium">{currentIconData.size}px</span>
                <span>48px</span>
              </div>
            </div>
          </div>

          {/* اللون */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t.properties.color}
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={currentIconData.color}
                  onChange={(e) => handleIconChange(activeIcon, 'color', e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-slate-600/50 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentIconData.color}
                  onChange={(e) => handleIconChange(activeIcon, 'color', e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm font-mono focus:border-blue-500/50 focus:outline-none"
                />
              </div>
              
              {/* ألوان سريعة */}
              <div className="flex gap-2 flex-wrap">
                {['#FFFFFF', '#AAAAAA', '#25D366', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4'].map(color => (
                  <button
                    key={color}
                    onClick={() => handleIconChange(activeIcon, 'color', color)}
                    className="w-8 h-8 rounded-lg border-2 border-slate-600/50 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* النمط */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t.properties.style}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(t.styles).map(([styleKey, styleLabel]) => (
                <button
                  key={styleKey}
                  onClick={() => handleIconChange(activeIcon, 'style', styleKey)}
                  className={`
                    px-3 py-2 text-sm rounded-lg transition-all duration-200
                    ${currentIconData.style === styleKey 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
                    }
                  `}
                >
                  {styleLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* معاينة الأيقونة الكبيرة */}
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600/30">
          <div className="flex items-center justify-center">
            <div className="p-8 bg-slate-800/50 rounded-2xl">
              <IconComponent 
                size={currentIconData.size * 2} 
                color={currentIconData.color}
                className={`transition-all duration-300 ${currentIconData.style === 'filled' ? 'fill-current' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* إعدادات الأيقونات العامة */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">إعدادات عامة</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* حجم عام لجميع الأيقونات */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">حجم عام</label>
            <button
              onClick={() => {
                const newSize = prompt('الحجم الجديد لجميع الأيقونات (12-48):', '24');
                if (newSize && parseInt(newSize) >= 12 && parseInt(newSize) <= 48) {
                  const updatedIcons = { ...currentTheme.icons };
                  Object.keys(updatedIcons).forEach(key => {
                    updatedIcons[key as keyof typeof updatedIcons].size = parseInt(newSize);
                  });
                  onIconChange({ icons: updatedIcons });
                }
              }}
              className="w-full px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
            >
              <Sliders className="w-4 h-4 inline mr-2" />
              تطبيق حجم موحد
            </button>
          </div>

          {/* لون عام */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">لون عام</label>
            <button
              onClick={() => {
                const newColor = prompt('اللون الجديد لجميع الأيقونات:', '#AAAAAA');
                if (newColor) {
                  const updatedIcons = { ...currentTheme.icons };
                  Object.keys(updatedIcons).forEach(key => {
                    if (key !== 'send' && key !== 'microphone') { // الاحتفاظ بألوان أيقونات خاصة
                      updatedIcons[key as keyof typeof updatedIcons].color = newColor;
                    }
                  });
                  onIconChange({ icons: updatedIcons });
                }
              }}
              className="w-full px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
            >
              <Palette className="w-4 h-4 inline mr-2" />
              تطبيق لون موحد
            </button>
          </div>

          {/* إعادة تعيين */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">إعادة تعيين</label>
            <button
              onClick={() => {
                const defaultIcons = defaultThemes[0].icons;
                onIconChange({ icons: defaultIcons });
              }}
              className="w-full px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              {t.actions.reset}
            </button>
          </div>
        </div>
      </div>

      {/* جدول جميع الأيقونات */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">جميع الأيقونات</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600/30">
                <th className="text-right py-2 text-slate-400">الأيقونة</th>
                <th className="text-right py-2 text-slate-400">الحجم</th>
                <th className="text-right py-2 text-slate-400">اللون</th>
                <th className="text-right py-2 text-slate-400">النمط</th>
                <th className="text-right py-2 text-slate-400">معاينة</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(currentTheme.icons).map(([iconKey, iconData]) => {
                const IconComp = iconComponents[iconKey as keyof typeof iconComponents];
                return (
                  <tr 
                    key={iconKey}
                    className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors cursor-pointer"
                    onClick={() => setActiveIcon(iconKey)}
                  >
                    <td className="py-3 text-slate-300">
                      {t.icons[iconKey as keyof typeof t.icons]}
                    </td>
                    <td className="py-3 text-slate-400">{iconData.size}px</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border border-slate-500/30"
                          style={{ backgroundColor: iconData.color }}
                        />
                        <span className="text-slate-400 font-mono text-xs">
                          {iconData.color}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-400">
                      {t.styles[iconData.style as keyof typeof t.styles]}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-center">
                        <IconComp 
                          size={iconData.size} 
                          color={iconData.color}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IconCustomizer;