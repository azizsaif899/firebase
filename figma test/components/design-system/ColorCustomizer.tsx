'use client';

import React, { useState } from 'react';
import { useDesign } from './DesignProvider';
import { Palette, Pipette, RefreshCw, Copy, Check } from 'lucide-react';

interface ColorCustomizerProps {
  onColorChange: (colors: any) => void;
  language: 'ar' | 'en';
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({ 
  onColorChange, 
  language 
}) => {
  const { currentTheme } = useDesign();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('backgrounds');

  const texts = {
    ar: {
      title: 'تخصيص الألوان',
      sections: {
        backgrounds: 'الخلفيات',
        messages: 'فقاعات الرسائل',
        text: 'النصوص',
        accents: 'التفاصيل والحدود'
      },
      colors: {
        sidebarBg: 'خلفية الشريط الجانبي',
        headerBg: 'خلفية الرأس',
        chatAreaBg: 'خلفية منطقة المحادثة',
        inputAreaBg: 'خلفية منطقة الإدخال',
        incomingBubble: 'فقاعات الرسائل الواردة',
        outgoingBubble: 'فقاعات الرسائل الصادرة',
        primaryText: 'النص الأساسي',
        secondaryText: 'النص الثانوي',
        accentGreen: 'اللون المميز',
        borderColor: 'لون الحدود',
        shadowColor: 'لون الظلال',
        hoverColor: 'لون التمرير'
      },
      actions: {
        copy: 'نسخ',
        copied: 'تم النسخ',
        reset: 'إعادة تعيين',
        eyeDropper: 'أداة اللون'
      },
      presets: {
        dark: 'داكن',
        light: 'فاتح',
        blue: 'أزرق',
        green: 'أخضر',
        purple: 'بنفسجي',
        orange: 'برتقالي'
      }
    },
    en: {
      title: 'Color Customization',
      sections: {
        backgrounds: 'Backgrounds',
        messages: 'Message Bubbles',
        text: 'Text Colors',
        accents: 'Accents & Borders'
      },
      colors: {
        sidebarBg: 'Sidebar Background',
        headerBg: 'Header Background',
        chatAreaBg: 'Chat Area Background',
        inputAreaBg: 'Input Area Background',
        incomingBubble: 'Incoming Message Bubble',
        outgoingBubble: 'Outgoing Message Bubble',
        primaryText: 'Primary Text',
        secondaryText: 'Secondary Text',
        accentGreen: 'Accent Color',
        borderColor: 'Border Color',
        shadowColor: 'Shadow Color',
        hoverColor: 'Hover Color'
      },
      actions: {
        copy: 'Copy',
        copied: 'Copied',
        reset: 'Reset',
        eyeDropper: 'Color Picker'
      },
      presets: {
        dark: 'Dark',
        light: 'Light',
        blue: 'Blue',
        green: 'Green',
        purple: 'Purple',
        orange: 'Orange'
      }
    }
  };

  const t = texts[language];

  const colorSections = {
    backgrounds: ['sidebarBg', 'headerBg', 'chatAreaBg', 'inputAreaBg'],
    messages: ['incomingBubble', 'outgoingBubble'],
    text: ['primaryText', 'secondaryText'],
    accents: ['accentGreen', 'borderColor', 'shadowColor', 'hoverColor']
  };

  // قوالب ألوان جاهزة
  const colorPresets = {
    dark: {
      sidebarBg: '#111B21',
      headerBg: '#202526',
      chatAreaBg: '#000000',
      inputAreaBg: '#202526',
      incomingBubble: '#262D31',
      outgoingBubble: '#005C4B',
      primaryText: '#EDEDED',
      secondaryText: '#AAAAAA',
      accentGreen: '#25D366',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      hoverColor: 'rgba(255, 255, 255, 0.05)'
    },
    light: {
      sidebarBg: '#f8f9fa',
      headerBg: '#ffffff',
      chatAreaBg: '#f0f2f5',
      inputAreaBg: '#ffffff',
      incomingBubble: '#ffffff',
      outgoingBubble: '#dcf8c6',
      primaryText: '#111827',
      secondaryText: '#6b7280',
      accentGreen: '#22c55e',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      hoverColor: 'rgba(0, 0, 0, 0.05)'
    },
    blue: {
      sidebarBg: '#1e293b',
      headerBg: '#334155',
      chatAreaBg: '#0f172a',
      inputAreaBg: '#334155',
      incomingBubble: '#475569',
      outgoingBubble: '#3b82f6',
      primaryText: '#f1f5f9',
      secondaryText: '#94a3b8',
      accentGreen: '#06b6d4',
      borderColor: 'rgba(59, 130, 246, 0.2)',
      shadowColor: 'rgba(59, 130, 246, 0.1)',
      hoverColor: 'rgba(59, 130, 246, 0.05)'
    },
    green: {
      sidebarBg: '#064e3b',
      headerBg: '#047857',
      chatAreaBg: '#022c22',
      inputAreaBg: '#047857',
      incomingBubble: '#059669',
      outgoingBubble: '#10b981',
      primaryText: '#ecfdf5',
      secondaryText: '#a7f3d0',
      accentGreen: '#34d399',
      borderColor: 'rgba(52, 211, 153, 0.2)',
      shadowColor: 'rgba(16, 185, 129, 0.15)',
      hoverColor: 'rgba(52, 211, 153, 0.08)'
    },
    purple: {
      sidebarBg: '#1a1625',
      headerBg: '#2d1b69',
      chatAreaBg: '#0f0d1a',
      inputAreaBg: '#2d1b69',
      incomingBubble: '#3730a3',
      outgoingBubble: '#7c3aed',
      primaryText: '#f3e8ff',
      secondaryText: '#c4b5fd',
      accentGreen: '#a855f7',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      shadowColor: 'rgba(124, 58, 237, 0.2)',
      hoverColor: 'rgba(168, 85, 247, 0.1)'
    },
    orange: {
      sidebarBg: '#451a03',
      headerBg: '#9a3412',
      chatAreaBg: '#1c0701',
      inputAreaBg: '#9a3412',
      incomingBubble: '#c2410c',
      outgoingBubble: '#ea580c',
      primaryText: '#fff7ed',
      secondaryText: '#fed7aa',
      accentGreen: '#f97316',
      borderColor: 'rgba(249, 115, 22, 0.2)',
      shadowColor: 'rgba(234, 88, 12, 0.15)',
      hoverColor: 'rgba(249, 115, 22, 0.08)'
    }
  };

  const handleColorChange = (colorKey: string, value: string) => {
    const updatedColors = {
      ...currentTheme.colors,
      [colorKey]: value
    };
    onColorChange({ colors: updatedColors });
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const applyPreset = (presetKey: string) => {
    const preset = colorPresets[presetKey as keyof typeof colorPresets];
    onColorChange({ colors: preset });
  };

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
    const lightness = Math.floor(Math.random() * 40) + 20; // 20-60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const ColorInput: React.FC<{
    label: string;
    colorKey: string;
    value: string;
  }> = ({ label, colorKey, value }) => (
    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(value)}
            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors group"
            title={t.actions.copy}
          >
            {copiedColor === value ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
            )}
          </button>
          <button
            onClick={() => handleColorChange(colorKey, generateRandomColor())}
            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors group"
            title="لون عشوائي"
          >
            <RefreshCw className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="color"
            value={value.startsWith('rgba') || value.startsWith('hsl') ? '#000000' : value}
            onChange={(e) => handleColorChange(colorKey, e.target.value)}
            className="w-full h-12 rounded-lg border-2 border-slate-600/50 bg-transparent cursor-pointer"
            style={{ 
              backgroundColor: value.startsWith('#') ? value : 'transparent'
            }}
          />
          <div 
            className="absolute inset-2 rounded-lg pointer-events-none"
            style={{ backgroundColor: value }}
          />
        </div>
        
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => handleColorChange(colorKey, e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm font-mono focus:border-blue-500/50 focus:outline-none"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* العنوان والقوالب السريعة */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">{t.title}</h3>
        </div>

        {/* قوالب الألوان السريعة */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">قوالب سريعة</h4>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(colorPresets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 group border border-slate-600/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div 
                      className="w-3 h-3 rounded-full border border-slate-500/30"
                      style={{ backgroundColor: preset.sidebarBg }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-slate-500/30"
                      style={{ backgroundColor: preset.outgoingBubble }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-slate-500/30"
                      style={{ backgroundColor: preset.accentGreen }}
                    />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {t.presets[key as keyof typeof t.presets]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* أقسام الألوان */}
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(t.sections).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`
                px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200
                ${activeSection === key 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ألوان القسم المحدد */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {colorSections[activeSection as keyof typeof colorSections].map((colorKey) => (
            <ColorInput
              key={colorKey}
              label={t.colors[colorKey as keyof typeof t.colors]}
              colorKey={colorKey}
              value={currentTheme.colors[colorKey as keyof typeof currentTheme.colors]}
            />
          ))}
        </div>
      </div>

      {/* أدوات إضافية */}
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">أدوات إضافية</h4>
        <div className="flex gap-3">
          <button
            onClick={() => {
              // إنشاء تدرج عشوائي
              const colors = Object.keys(currentTheme.colors);
              colors.forEach(key => {
                handleColorChange(key, generateRandomColor());
              });
            }}
            className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            تدرج عشوائي
          </button>
          
          <button
            onClick={() => {
              // تطبيق تدرج من لونين
              const baseColor = currentTheme.colors.accentGreen;
              // منطق إنشاء تدرج متناغم
            }}
            className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            <Palette className="w-4 h-4 inline mr-2" />
            تناغم تلقائي
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;