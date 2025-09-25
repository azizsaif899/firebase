'use client';

import React, { useState } from 'react';
import { useDesign, defaultThemes } from './DesignProvider';
import { ColorCustomizer } from './ColorCustomizer';
import { IconCustomizer } from './IconCustomizer';
import { LayoutCustomizer } from './LayoutCustomizer';
import { AnimationCustomizer } from './AnimationCustomizer';
import { ThemePresets } from './ThemePresets';
import { 
  Palette, 
  Settings, 
  Layout, 
  Zap, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  X, 
  Maximize2,
  Minimize2,
  Eye,
  EyeOff
} from 'lucide-react';

interface ChatDesignLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
}

export const ChatDesignLibrary: React.FC<ChatDesignLibraryProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const { 
    currentTheme, 
    updateTheme, 
    saveCustomTheme, 
    resetToDefault, 
    exportTheme, 
    importTheme 
  } = useDesign();

  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'icons' | 'layout' | 'animations'>('presets');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const texts = {
    ar: {
      title: 'مكتبة تخصيص التصميم',
      subtitle: 'تخصيص كامل لواجهة المحادثة',
      tabs: {
        presets: 'القوالب',
        colors: 'الألوان',
        icons: 'الأيقونات',
        layout: 'التخطيط',
        animations: 'الحركات'
      },
      actions: {
        save: 'حفظ الثيم',
        export: 'تصدير',
        import: 'استيراد',
        reset: 'إعادة تعيين',
        preview: 'معاينة',
        minimize: 'تصغير',
        maximize: 'توسيع',
        close: 'إغلاق'
      },
      status: {
        saved: 'تم الحفظ',
        unsaved: 'تغييرات غير محفوظة',
        exported: 'تم التصدير',
        imported: 'تم الاستيراد',
        error: 'حدث خطأ'
      }
    },
    en: {
      title: 'Design Customization Library',
      subtitle: 'Complete chat interface customization',
      tabs: {
        presets: 'Presets',
        colors: 'Colors',
        icons: 'Icons',
        layout: 'Layout',
        animations: 'Animations'
      },
      actions: {
        save: 'Save Theme',
        export: 'Export',
        import: 'Import',
        reset: 'Reset',
        preview: 'Preview',
        minimize: 'Minimize',
        maximize: 'Maximize',
        close: 'Close'
      },
      status: {
        saved: 'Saved',
        unsaved: 'Unsaved changes',
        exported: 'Exported',
        imported: 'Imported',
        error: 'Error occurred'
      }
    }
  };

  const t = texts[language];

  const handleSaveTheme = () => {
    const customThemeName = prompt(language === 'ar' ? 'اسم الثيم المخصص:' : 'Custom theme name:');
    if (customThemeName) {
      const customTheme = {
        ...currentTheme,
        name: customThemeName
      };
      saveCustomTheme(customTheme);
      setUnsavedChanges(false);
    }
  };

  const handleExportTheme = () => {
    const themeJson = exportTheme();
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTheme.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const themeJson = event.target?.result as string;
          if (importTheme(themeJson)) {
            setUnsavedChanges(false);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleThemeChange = (updates: any) => {
    updateTheme(updates);
    setUnsavedChanges(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'presets':
        return <ThemePresets onThemeChange={handleThemeChange} language={language} />;
      case 'colors':
        return <ColorCustomizer onColorChange={handleThemeChange} language={language} />;
      case 'icons':
        return <IconCustomizer onIconChange={handleThemeChange} language={language} />;
      case 'layout':
        return <LayoutCustomizer onLayoutChange={handleThemeChange} language={language} />;
      case 'animations':
        return <AnimationCustomizer onAnimationChange={handleThemeChange} language={language} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className={`
          bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 
          ${isMinimized ? 'w-80 h-20' : 'w-[90vw] h-[90vh] max-w-7xl max-h-[800px]'}
          rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden
        `}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* الرأس */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            
            {!isMinimized && (
              <div>
                <h2 className="text-xl font-bold text-white">{t.title}</h2>
                <p className="text-sm text-slate-400">{t.subtitle}</p>
              </div>
            )}

            {unsavedChanges && (
              <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                <span className="text-xs text-yellow-400">{t.status.unsaved}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isMinimized && (
              <>
                {/* معاينة */}
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`p-2 rounded-lg transition-colors ${
                    showPreview 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                  }`}
                  title={t.actions.preview}
                >
                  {showPreview ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>

                {/* حفظ */}
                <button
                  onClick={handleSaveTheme}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  title={t.actions.save}
                >
                  <Save className="w-5 h-5" />
                </button>

                {/* تصدير */}
                <button
                  onClick={handleExportTheme}
                  className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 transition-colors"
                  title={t.actions.export}
                >
                  <Download className="w-5 h-5" />
                </button>

                {/* استيراد */}
                <button
                  onClick={handleImportTheme}
                  className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 transition-colors"
                  title={t.actions.import}
                >
                  <Upload className="w-5 h-5" />
                </button>

                {/* إعادة تعيين */}
                <button
                  onClick={resetToDefault}
                  className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 transition-colors"
                  title={t.actions.reset}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </>
            )}

            {/* تصغير/توسيع */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 transition-colors"
              title={isMinimized ? t.actions.maximize : t.actions.minimize}
            >
              {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
            </button>

            {/* إغلاق */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
              title={t.actions.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* المحتوى */}
        {!isMinimized && (
          <div className="flex h-full">
            {/* قائمة التبويب الجانبية */}
            <div className="w-64 border-r border-slate-700/50 bg-slate-800/50">
              <div className="p-4 space-y-2">
                {Object.entries(t.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`
                      w-full text-right px-4 py-3 rounded-xl transition-all duration-200
                      flex items-center gap-3
                      ${activeTab === key 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }
                    `}
                  >
                    {key === 'presets' && <Layout className="w-5 h-5" />}
                    {key === 'colors' && <Palette className="w-5 h-5" />}
                    {key === 'icons' && <Settings className="w-5 h-5" />}
                    {key === 'layout' && <Layout className="w-5 h-5" />}
                    {key === 'animations' && <Zap className="w-5 h-5" />}
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {/* معلومات الثيم الحالي */}
              <div className="p-4 mt-4 border-t border-slate-700/50">
                <h3 className="text-sm font-semibold text-white mb-2">الثيم الحالي</h3>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <p className="text-sm text-slate-300 font-medium">{currentTheme.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentTheme.isCustom ? 'مخصص' : 'افتراضي'}
                  </p>
                </div>
              </div>
            </div>

            {/* منطقة المحتوى */}
            <div className="flex-1 flex">
              {/* لوحة التخصيص */}
              <div className={`${showPreview ? 'w-1/2' : 'w-full'} p-6 overflow-y-auto`}>
                {renderTabContent()}
              </div>

              {/* معاينة مباشرة */}
              {showPreview && (
                <div className="w-1/2 border-l border-slate-700/50 bg-slate-800/30">
                  <div className="p-4 border-b border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-1">معاينة مباشرة</h3>
                    <p className="text-sm text-slate-400">شاهد التغييرات فورياً</p>
                  </div>
                  
                  <div className="p-4">
                    <div 
                      className="rounded-xl overflow-hidden border border-slate-600/50"
                      style={{
                        backgroundColor: currentTheme.colors.chatAreaBg,
                        height: '400px'
                      }}
                    >
                      {/* معاينة مصغرة للواجهة */}
                      <div 
                        className="h-12 px-4 flex items-center justify-between border-b"
                        style={{ 
                          backgroundColor: currentTheme.colors.headerBg,
                          borderColor: currentTheme.colors.borderColor
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="rounded-full"
                            style={{ 
                              width: currentTheme.layout.avatarSize * 0.7,
                              height: currentTheme.layout.avatarSize * 0.7,
                              backgroundColor: currentTheme.colors.accentGreen 
                            }}
                          />
                          <div>
                            <p 
                              className="text-sm font-medium"
                              style={{ color: currentTheme.colors.primaryText }}
                            >
                              محادثة تجريبية
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 h-full overflow-y-auto">
                        {/* رسائل تجريبية */}
                        <div className="flex justify-end">
                          <div 
                            className="px-3 py-2 max-w-xs text-sm"
                            style={{
                              backgroundColor: currentTheme.colors.outgoingBubble,
                              color: currentTheme.colors.primaryText,
                              borderRadius: currentTheme.layout.bubbleRadius,
                              fontSize: currentTheme.layout.fontSize * 0.8
                            }}
                          >
                            هذه رسالة تجريبية للمعاينة
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div 
                            className="px-3 py-2 max-w-xs text-sm"
                            style={{
                              backgroundColor: currentTheme.colors.incomingBubble,
                              color: currentTheme.colors.primaryText,
                              borderRadius: currentTheme.layout.bubbleRadius,
                              fontSize: currentTheme.layout.fontSize * 0.8
                            }}
                          >
                            رسالة واردة للمعاينة
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDesignLibrary;