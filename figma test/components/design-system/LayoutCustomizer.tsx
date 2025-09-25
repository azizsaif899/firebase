'use client';

import React from 'react';
import { useDesign } from './DesignProvider';
import { Layout, Smartphone, Monitor, Tablet, RotateCcw } from 'lucide-react';

interface LayoutCustomizerProps {
  onLayoutChange: (layout: any) => void;
  language: 'ar' | 'en';
}

export const LayoutCustomizer: React.FC<LayoutCustomizerProps> = ({ 
  onLayoutChange, 
  language 
}) => {
  const { currentTheme } = useDesign();

  const texts = {
    ar: {
      title: 'تخصيص التخطيط',
      subtitle: 'تحكم في أبعاد ومقاييس الواجهة',
      dimensions: {
        sidebarWidth: 'عرض الشريط الجانبي',
        headerHeight: 'ارتفاع الرأس',
        inputHeight: 'ارتفاع منطقة الإدخال',
        bubbleRadius: 'انحناء فقاعات الرسائل',
        avatarSize: 'حجم الصور الشخصية',
        fontSize: 'حجم الخط',
        messageSpacing: 'التباعد بين الرسائل'
      },
      presets: {
        compact: 'مدمج',
        comfortable: 'مريح',
        spacious: 'واسع',
        mobile: 'موبايل',
        desktop: 'سطح المكتب',
        widescreen: 'شاشة عريضة'
      },
      actions: {
        reset: 'إعادة تعيين',
        apply: 'تطبيق'
      }
    },
    en: {
      title: 'Layout Customization',
      subtitle: 'Control interface dimensions and scales',
      dimensions: {
        sidebarWidth: 'Sidebar Width',
        headerHeight: 'Header Height',
        inputHeight: 'Input Area Height',
        bubbleRadius: 'Message Bubble Radius',
        avatarSize: 'Avatar Size',
        fontSize: 'Font Size',
        messageSpacing: 'Message Spacing'
      },
      presets: {
        compact: 'Compact',
        comfortable: 'Comfortable',
        spacious: 'Spacious',
        mobile: 'Mobile',
        desktop: 'Desktop',
        widescreen: 'Widescreen'
      },
      actions: {
        reset: 'Reset',
        apply: 'Apply'
      }
    }
  };

  const t = texts[language];

  const layoutPresets = {
    compact: {
      sidebarWidth: 250,
      headerHeight: 50,
      inputHeight: 50,
      bubbleRadius: 6,
      avatarSize: 32,
      fontSize: 13,
      messageSpacing: 6
    },
    comfortable: {
      sidebarWidth: 300,
      headerHeight: 64,
      inputHeight: 64,
      bubbleRadius: 8,
      avatarSize: 40,
      fontSize: 14,
      messageSpacing: 8
    },
    spacious: {
      sidebarWidth: 350,
      headerHeight: 76,
      inputHeight: 76,
      bubbleRadius: 12,
      avatarSize: 48,
      fontSize: 16,
      messageSpacing: 12
    },
    mobile: {
      sidebarWidth: 280,
      headerHeight: 56,
      inputHeight: 60,
      bubbleRadius: 16,
      avatarSize: 36,
      fontSize: 15,
      messageSpacing: 8
    },
    desktop: {
      sidebarWidth: 320,
      headerHeight: 68,
      inputHeight: 68,
      bubbleRadius: 10,
      avatarSize: 42,
      fontSize: 14,
      messageSpacing: 10
    },
    widescreen: {
      sidebarWidth: 400,
      headerHeight: 80,
      inputHeight: 80,
      bubbleRadius: 14,
      avatarSize: 52,
      fontSize: 16,
      messageSpacing: 14
    }
  };

  const handleLayoutChange = (property: string, value: number) => {
    const updatedLayout = {
      ...currentTheme.layout,
      [property]: value
    };
    onLayoutChange({ layout: updatedLayout });
  };

  const applyPreset = (presetKey: string) => {
    const preset = layoutPresets[presetKey as keyof typeof layoutPresets];
    onLayoutChange({ layout: preset });
  };

  const dimensionControls = [
    {
      key: 'sidebarWidth',
      min: 200,
      max: 500,
      step: 10,
      unit: 'px'
    },
    {
      key: 'headerHeight',
      min: 40,
      max: 100,
      step: 4,
      unit: 'px'
    },
    {
      key: 'inputHeight',
      min: 40,
      max: 120,
      step: 4,
      unit: 'px'
    },
    {
      key: 'bubbleRadius',
      min: 0,
      max: 24,
      step: 2,
      unit: 'px'
    },
    {
      key: 'avatarSize',
      min: 24,
      max: 64,
      step: 2,
      unit: 'px'
    },
    {
      key: 'fontSize',
      min: 10,
      max: 20,
      step: 1,
      unit: 'px'
    },
    {
      key: 'messageSpacing',
      min: 4,
      max: 20,
      step: 2,
      unit: 'px'
    }
  ];

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Layout className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">{t.title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{t.subtitle}</p>
      </div>

      {/* قوالب التخطيط */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">قوالب التخطيط</h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(layoutPresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 border border-slate-600/30 group"
            >
              <div className="flex flex-col items-center gap-2">
                {/* أيقونة القالب */}
                {key.includes('mobile') && <Smartphone className="w-8 h-8 text-slate-400 group-hover:text-white" />}
                {key.includes('desktop') && <Monitor className="w-8 h-8 text-slate-400 group-hover:text-white" />}
                {key.includes('widescreen') && <Monitor className="w-8 h-8 text-slate-400 group-hover:text-white transform scale-125" />}
                {!key.includes('mobile') && !key.includes('desktop') && !key.includes('widescreen') && (
                  <Tablet className="w-8 h-8 text-slate-400 group-hover:text-white" />
                )}
                
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {t.presets[key as keyof typeof t.presets]}
                </span>
                
                <div className="text-xs text-slate-500 text-center">
                  <div>{preset.sidebarWidth}px sidebar</div>
                  <div>{preset.fontSize}px font</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* تحكم دقيق في الأبعاد */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dimensionControls.map((control) => (
          <div key={control.key} className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-300">
                {t.dimensions[control.key as keyof typeof t.dimensions]}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-slate-400">
                  {currentTheme.layout[control.key as keyof typeof currentTheme.layout]}{control.unit}
                </span>
                <button
                  onClick={() => handleLayoutChange(control.key, layoutPresets.comfortable[control.key as keyof typeof layoutPresets.comfortable])}
                  className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
                  title="القيمة الافتراضية"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={currentTheme.layout[control.key as keyof typeof currentTheme.layout]}
                onChange={(e) => handleLayoutChange(control.key, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              
              <div className="flex justify-between text-xs text-slate-500">
                <span>{control.min}{control.unit}</span>
                <span>{control.max}{control.unit}</span>
              </div>

              {/* إدخال مباشر */}
              <input
                type="number"
                min={control.min}
                max={control.max}
                step={control.step}
                value={currentTheme.layout[control.key as keyof typeof currentTheme.layout]}
                onChange={(e) => handleLayoutChange(control.key, parseInt(e.target.value) || control.min)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm text-center focus:border-blue-500/50 focus:outline-none"
              />
            </div>

            {/* شريط التقدم البصري */}
            <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{ 
                  width: `${((currentTheme.layout[control.key as keyof typeof currentTheme.layout] - control.min) / (control.max - control.min)) * 100}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* معاينة الأبعاد */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">معاينة الأبعاد</h4>
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {Object.entries(currentTheme.layout).map(([key, value]) => (
              <div key={key} className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                <div className="text-xs text-slate-400 mb-1">
                  {t.dimensions[key as keyof typeof t.dimensions]}
                </div>
                <div className="text-lg font-bold text-white">
                  {value}{['fontSize', 'messageSpacing', 'bubbleRadius', 'avatarSize'].includes(key) ? 'px' : 'px'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* أدوات التخطيط المتقدمة */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">أدوات متقدمة</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              // نسق ذهبي - نسبة 1.618
              const baseWidth = 300;
              const goldenRatio = 1.618;
              handleLayoutChange('sidebarWidth', Math.round(baseWidth * goldenRatio));
              handleLayoutChange('headerHeight', Math.round(baseWidth / goldenRatio / 4));
            }}
            className="p-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition-colors"
          >
            <Layout className="w-5 h-5 inline mr-2" />
            نسبة ذهبية
          </button>
          
          <button
            onClick={() => {
              // نسق متناسق - مضاعفات 8
              const base = 8;
              handleLayoutChange('sidebarWidth', base * 37.5); // 300px
              handleLayoutChange('headerHeight', base * 8); // 64px
              handleLayoutChange('inputHeight', base * 8); // 64px
              handleLayoutChange('bubbleRadius', base); // 8px
              handleLayoutChange('avatarSize', base * 5); // 40px
              handleLayoutChange('messageSpacing', base); // 8px
            }}
            className="p-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Monitor className="w-5 h-5 inline mr-2" />
            شبكة 8px
          </button>
          
          <button
            onClick={() => {
              // تحسين للموبايل
              handleLayoutChange('sidebarWidth', 280);
              handleLayoutChange('headerHeight', 56);
              handleLayoutChange('inputHeight', 60);
              handleLayoutChange('bubbleRadius', 16);
              handleLayoutChange('avatarSize', 36);
              handleLayoutChange('fontSize', 15);
              handleLayoutChange('messageSpacing', 8);
            }}
            className="p-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            <Smartphone className="w-5 h-5 inline mr-2" />
            محسن للموبايل
          </button>
        </div>
      </div>

      {/* معلومات التوافق */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">معلومات التوافق</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400">موبايل</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>الحد الأدنى: 280px</div>
              <div>الحد الأقصى: 320px</div>
              <div className={currentTheme.layout.sidebarWidth >= 280 && currentTheme.layout.sidebarWidth <= 320 ? 'text-green-400' : 'text-red-400'}>
                {currentTheme.layout.sidebarWidth >= 280 && currentTheme.layout.sidebarWidth <= 320 ? '✓ متوافق' : '✗ غير متوافق'}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Tablet className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400">تابلت</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>الحد الأدنى: 300px</div>
              <div>الحد الأقصى: 360px</div>
              <div className={currentTheme.layout.sidebarWidth >= 300 && currentTheme.layout.sidebarWidth <= 360 ? 'text-green-400' : 'text-red-400'}>
                {currentTheme.layout.sidebarWidth >= 300 && currentTheme.layout.sidebarWidth <= 360 ? '✓ متوافق' : '✗ غير متوافق'}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400">سطح المكتب</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>الحد الأدنى: 300px</div>
              <div>الحد الأقصى: 450px</div>
              <div className={currentTheme.layout.sidebarWidth >= 300 && currentTheme.layout.sidebarWidth <= 450 ? 'text-green-400' : 'text-red-400'}>
                {currentTheme.layout.sidebarWidth >= 300 && currentTheme.layout.sidebarWidth <= 450 ? '✓ متوافق' : '✗ غير متوافق'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutCustomizer;