'use client';

import React from 'react';
import { useDesign } from './DesignProvider';
import { Zap, Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface AnimationCustomizerProps {
  onAnimationChange: (animations: any) => void;
  language: 'ar' | 'en';
}

export const AnimationCustomizer: React.FC<AnimationCustomizerProps> = ({ 
  onAnimationChange, 
  language 
}) => {
  const { currentTheme } = useDesign();

  const texts = {
    ar: {
      title: 'تخصيص الحركات',
      subtitle: 'تحكم في جميع الرسوم المتحركة والتفاعلات',
      categories: {
        entrance: 'حركات الدخول',
        interaction: 'تفاعلات المستخدم',
        feedback: 'ملاحظات بصرية',
        performance: 'إعدادات الأداء'
      },
      animations: {
        messageEnter: 'دخول الرسائل',
        typingSpeed: 'سرعة مؤشر الكتابة',
        hoverEffects: 'تأثيرات التمرير',
        pulseEffects: 'تأثيرات النبضة',
        slideEffects: 'تأثيرات الانزلاق',
        fadeEffects: 'تأثيرات التلاشي'
      },
      enterTypes: {
        slideIn: 'انزلاق داخلي',
        fadeIn: 'تلاشي داخلي',
        bounceIn: 'ارتداد داخلي',
        scaleIn: 'تكبير داخلي',
        rotateIn: 'دوران داخلي',
        none: 'بدون حركة'
      },
      speeds: {
        slow: 'بطيء (1500ms)',
        normal: 'عادي (1000ms)',
        fast: 'سريع (500ms)',
        instant: 'فوري (100ms)'
      },
      presets: {
        smooth: 'سلس',
        energetic: 'نشيط',
        subtle: 'خفيف',
        disabled: 'معطل'
      },
      actions: {
        test: 'اختبار',
        reset: 'إعادة تعيين',
        disable: 'تعطيل الكل',
        enable: 'تفعيل الكل'
      }
    },
    en: {
      title: 'Animation Customization',
      subtitle: 'Control all animations and interactions',
      categories: {
        entrance: 'Entrance Animations',
        interaction: 'User Interactions',
        feedback: 'Visual Feedback',
        performance: 'Performance Settings'
      },
      animations: {
        messageEnter: 'Message Entrance',
        typingSpeed: 'Typing Indicator Speed',
        hoverEffects: 'Hover Effects',
        pulseEffects: 'Pulse Effects',
        slideEffects: 'Slide Effects',
        fadeEffects: 'Fade Effects'
      },
      enterTypes: {
        slideIn: 'Slide In',
        fadeIn: 'Fade In',
        bounceIn: 'Bounce In',
        scaleIn: 'Scale In',
        rotateIn: 'Rotate In',
        none: 'No Animation'
      },
      speeds: {
        slow: 'Slow (1500ms)',
        normal: 'Normal (1000ms)',
        fast: 'Fast (500ms)',
        instant: 'Instant (100ms)'
      },
      presets: {
        smooth: 'Smooth',
        energetic: 'Energetic',
        subtle: 'Subtle',
        disabled: 'Disabled'
      },
      actions: {
        test: 'Test',
        reset: 'Reset',
        disable: 'Disable All',
        enable: 'Enable All'
      }
    }
  };

  const t = texts[language];

  const animationPresets = {
    smooth: {
      messageEnter: 'fadeIn',
      typingSpeed: 1000,
      hoverEffects: true,
      pulseEffects: false,
      slideEffects: true,
      fadeEffects: true
    },
    energetic: {
      messageEnter: 'bounceIn',
      typingSpeed: 600,
      hoverEffects: true,
      pulseEffects: true,
      slideEffects: true,
      fadeEffects: true
    },
    subtle: {
      messageEnter: 'scaleIn',
      typingSpeed: 1200,
      hoverEffects: false,
      pulseEffects: false,
      slideEffects: false,
      fadeEffects: true
    },
    disabled: {
      messageEnter: 'none',
      typingSpeed: 0,
      hoverEffects: false,
      pulseEffects: false,
      slideEffects: false,
      fadeEffects: false
    }
  };

  const handleAnimationChange = (property: string, value: any) => {
    const updatedAnimations = {
      ...currentTheme.animations,
      [property]: value
    };
    onAnimationChange({ animations: updatedAnimations });
  };

  const applyPreset = (presetKey: string) => {
    const preset = animationPresets[presetKey as keyof typeof animationPresets];
    onAnimationChange({ animations: preset });
  };

  const testAnimation = (animationType: string) => {
    // إنشاء عنصر اختبار مؤقت
    const testElement = document.createElement('div');
    testElement.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            w-32 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white 
                            font-semibold z-50 animate-${animationType}`;
    testElement.textContent = 'اختبار';
    
    document.body.appendChild(testElement);
    
    setTimeout(() => {
      document.body.removeChild(testElement);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">{t.title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{t.subtitle}</p>
      </div>

      {/* قوالب الحركات */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">قوالب الحركات</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(animationPresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 border border-slate-600/30 group"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  {key === 'disabled' ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {t.presets[key as keyof typeof t.presets]}
                </span>
                <div className="text-xs text-slate-500">
                  {preset.messageEnter}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* تخصيص دخول الرسائل */}
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-slate-300">{t.animations.messageEnter}</h4>
          <button
            onClick={() => testAnimation(currentTheme.animations.messageEnter)}
            className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-xs"
          >
            <Play className="w-3 h-3 inline mr-1" />
            {t.actions.test}
          </button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(t.enterTypes).map(([enterKey, enterLabel]) => (
            <button
              key={enterKey}
              onClick={() => handleAnimationChange('messageEnter', enterKey)}
              className={`
                px-3 py-2 text-sm rounded-lg transition-all duration-200
                ${currentTheme.animations.messageEnter === enterKey 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
                }
              `}
            >
              {enterLabel}
            </button>
          ))}
        </div>
      </div>

      {/* سرعة مؤشر الكتابة */}
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-slate-300">{t.animations.typingSpeed}</h4>
          <span className="text-sm text-slate-400">{currentTheme.animations.typingSpeed}ms</span>
        </div>
        
        <div className="space-y-4">
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={currentTheme.animations.typingSpeed}
            onChange={(e) => handleAnimationChange('typingSpeed', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-slate-500">
            <span>سريع جداً (100ms)</span>
            <span>بطيء جداً (2000ms)</span>
          </div>

          {/* أزرار السرعة السريعة */}
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(t.speeds).map(([speedKey, speedLabel]) => {
              const speeds = { slow: 1500, normal: 1000, fast: 500, instant: 100 };
              return (
                <button
                  key={speedKey}
                  onClick={() => handleAnimationChange('typingSpeed', speeds[speedKey as keyof typeof speeds])}
                  className={`
                    px-2 py-1 text-xs rounded-lg transition-all duration-200
                    ${currentTheme.animations.typingSpeed === speeds[speedKey as keyof typeof speeds]
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
                    }
                  `}
                >
                  {speedLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* مفاتيح التأثيرات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { key: 'hoverEffects', label: t.animations.hoverEffects, icon: '🎯' },
          { key: 'pulseEffects', label: t.animations.pulseEffects, icon: '💓' },
          { key: 'slideEffects', label: t.animations.slideEffects, icon: '➡️' },
          { key: 'fadeEffects', label: t.animations.fadeEffects, icon: '👻' }
        ].map((effect) => (
          <div key={effect.key} className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">{effect.icon}</span>
                <span className="text-sm font-medium text-slate-300">{effect.label}</span>
              </div>
              
              <button
                onClick={() => handleAnimationChange(effect.key, !currentTheme.animations[effect.key as keyof typeof currentTheme.animations])}
                className={`
                  w-12 h-6 rounded-full transition-all duration-200 relative
                  ${currentTheme.animations[effect.key as keyof typeof currentTheme.animations]
                    ? 'bg-green-500/30 border border-green-500/50' 
                    : 'bg-slate-600/50 border border-slate-500/50'
                  }
                `}
              >
                <div 
                  className={`
                    absolute top-1 w-4 h-4 rounded-full transition-all duration-200
                    ${currentTheme.animations[effect.key as keyof typeof currentTheme.animations]
                      ? 'right-1 bg-green-400' 
                      : 'left-1 bg-slate-400'
                    }
                  `}
                />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              {currentTheme.animations[effect.key as keyof typeof currentTheme.animations] ? 'مفعل' : 'معطل'}
            </div>
          </div>
        ))}
      </div>

      {/* معاينة الحركات */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">معاينة الحركات</h4>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* اختبار دخول الرسائل */}
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h5 className="text-xs text-slate-400 mb-3">دخول الرسائل</h5>
            <button
              onClick={() => testAnimation(currentTheme.animations.messageEnter)}
              className="w-full h-12 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              اختبار
            </button>
          </div>

          {/* مؤشر الكتابة */}
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h5 className="text-xs text-slate-400 mb-3">مؤشر الكتابة</h5>
            <div className="flex items-center justify-center h-12">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{
                      animationDelay: `${i * (currentTheme.animations.typingSpeed / 3000)}s`,
                      animationDuration: `${currentTheme.animations.typingSpeed}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* تأثيرات النبضة */}
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h5 className="text-xs text-slate-400 mb-3">تأثير النبضة</h5>
            <div className="flex items-center justify-center h-12">
              <div 
                className={`w-8 h-8 bg-green-500 rounded-full ${currentTheme.animations.pulseEffects ? 'animate-pulse' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* أدوات الاختبار */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <button
            onClick={() => {
              // تشغيل جميع التأثيرات لمدة 3 ثواني
              const allEffects = ['slideIn', 'fadeIn', 'bounceIn', 'scaleIn'];
              allEffects.forEach((effect, index) => {
                setTimeout(() => testAnimation(effect), index * 500);
              });
            }}
            className="px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
          >
            <Play className="w-4 h-4 inline mr-1" />
            اختبار شامل
          </button>
          
          <button
            onClick={() => {
              // تفعيل جميع التأثيرات
              const allEnabled = {
                ...currentTheme.animations,
                hoverEffects: true,
                pulseEffects: true,
                slideEffects: true,
                fadeEffects: true
              };
              onAnimationChange({ animations: allEnabled });
            }}
            className="px-3 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
          >
            <Settings className="w-4 h-4 inline mr-1" />
            {t.actions.enable}
          </button>
          
          <button
            onClick={() => {
              // تعطيل جميع التأثيرات
              const allDisabled = {
                ...currentTheme.animations,
                hoverEffects: false,
                pulseEffects: false,
                slideEffects: false,
                fadeEffects: false
              };
              onAnimationChange({ animations: allDisabled });
            }}
            className="px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
          >
            <Pause className="w-4 h-4 inline mr-1" />
            {t.actions.disable}
          </button>

          <button
            onClick={() => {
              const defaultAnimations = {
                messageEnter: 'slideIn',
                typingSpeed: 1000,
                hoverEffects: true,
                pulseEffects: true,
                slideEffects: true,
                fadeEffects: true
              };
              onAnimationChange({ animations: defaultAnimations });
            }}
            className="px-3 py-2 bg-slate-600/50 text-slate-300 border border-slate-500/30 rounded-lg hover:bg-slate-500/50 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4 inline mr-1" />
            {t.actions.reset}
          </button>
        </div>
      </div>

      {/* إعدادات متقدمة للأداء */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">إعدادات الأداء</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block text-xs text-slate-400">تسريع GPU</label>
            <button
              onClick={() => {
                // تطبيق تسريع GPU لجميع العناصر المتحركة
                document.documentElement.style.setProperty('--chat-gpu-acceleration', 'translateZ(0)');
              }}
              className="w-full px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
            >
              تفعيل تسريع GPU
            </button>
          </div>
          
          <div className="space-y-3">
            <label className="block text-xs text-slate-400">تحسين الذاكرة</label>
            <button
              onClick={() => {
                // تطبيق contain للعناصر
                document.documentElement.style.setProperty('--chat-containment', 'layout style paint');
              }}
              className="w-full px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
            >
              تحسين الذاكرة
            </button>
          </div>
        </div>
      </div>

      {/* إحصائيات الحركات */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">إحصائيات الحركات</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {Object.values(currentTheme.animations).filter(val => val === true).length}
            </div>
            <div className="text-xs text-slate-400">تأثيرات مفعلة</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {currentTheme.animations.typingSpeed}
            </div>
            <div className="text-xs text-slate-400">سرعة الكتابة (ms)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {currentTheme.animations.messageEnter === 'none' ? '0' : '1'}
            </div>
            <div className="text-xs text-slate-400">حركات الدخول</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              Object.values(currentTheme.animations).filter(val => val === true).length > 3 
                ? 'text-green-400' 
                : Object.values(currentTheme.animations).filter(val => val === true).length > 1 
                  ? 'text-yellow-400' 
                  : 'text-red-400'
            }`}>
              {Object.values(currentTheme.animations).filter(val => val === true).length > 3 
                ? 'عالي' 
                : Object.values(currentTheme.animations).filter(val => val === true).length > 1 
                  ? 'متوسط' 
                  : 'منخفض'
              }
            </div>
            <div className="text-xs text-slate-400">مستوى التفاعل</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationCustomizer;