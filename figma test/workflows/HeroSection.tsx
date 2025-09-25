'use client';

import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  language: 'ar' | 'en';
  onNavigate?: (page: 'home' | 'design-library' | 'automation' | 'workflow-builder' | 'conversation' | 'figma') => void;
}

export function HeroSection({ language, onNavigate }: HeroSectionProps) {
  const isRTL = language === 'ar';
  
  const texts = {
    ar: {
      title1: 'اعمل أقل.',
      title2: 'أتمت أكثر.',
      description: 'تقنيات الذكاء الاصطناعي المتقدمة لأتمتة عملياتك وزيادة كفاءتك. دع الذكاء الاصطناعي يتولى المهام المتكررة بينما تركز على الابتكار.',
      watchDemo: 'شاهد العرض التوضيحي',
      workflowDesigner: 'مصمم سير العمل',
      startConversation: 'ابدأ محادثة',
      figmaImport: 'استيراد Figma',
      getStarted: 'ابدأ مجاناً',
      trustedBy: 'موثوق به من قبل أكثر من 10,000 شركة'
    },
    en: {
      title1: 'WORK LESS.',
      title2: 'AUTOMATE MORE.',
      description: 'Advanced AI technologies to automate your operations and increase efficiency. Let artificial intelligence handle repetitive tasks while you focus on innovation.',
      watchDemo: 'Watch Demo',
      workflowDesigner: 'Workflow Designer',
      startConversation: 'Start Conversation',
      figmaImport: 'Import Figma',
      getStarted: 'Get Started Free',
      trustedBy: 'Trusted by 10,000+ companies'
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      {/* Enhanced Background with multiple gradients */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 gradient-radial gradient-electric" />
      
      {/* Abstract floating shapes */}
      <div className="abstract-shape w-96 h-96 -top-48 -left-48" />
      <div className="abstract-shape w-64 h-64 top-1/4 -right-32 animation-delay-2000" />
      <div className="abstract-shape w-32 h-32 bottom-1/4 left-1/4 animation-delay-4000" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className={`grid lg:grid-cols-12 gap-16 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Left column - Text content */}
          <div className={`lg:col-span-6 space-y-12 ${isRTL ? 'order-2' : 'order-1'}`}>
            <div className="space-y-8">
              <h1 className={`hero-text ${isRTL ? 'font-arabic' : ''}`}>
                <span className="text-foreground">{texts[language].title1}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C]">
                  {texts[language].title2}
                </span>
              </h1>
              <p className="body-large text-muted-foreground max-w-2xl">
                {texts[language].description}
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <button className="btn-primary hover-scale px-8 py-4 rounded-xl text-white font-semibold text-lg">
                {texts[language].getStarted}
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('conversation')}
                className="border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B]/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-scale backdrop-glass flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                {texts[language].startConversation}
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('figma')}
                className="border-2 border-[#F24E1E] text-[#F24E1E] hover:bg-[#F24E1E]/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-scale backdrop-glass flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.667 0C5.197 0 4 1.197 4 2.667v14.666C4 18.803 5.197 20 6.667 20h6.666C14.803 20 16 18.803 16 17.333V2.667C16 1.197 14.803 0 13.333 0H6.667zm0 1.333h6.666c.737 0 1.334.597 1.334 1.334v14.666c0 .737-.597 1.334-1.334 1.334H6.667c-.737 0-1.334-.597-1.334-1.334V2.667c0-.737.597-1.334 1.334-1.334z"/>
                </svg>
                {texts[language].figmaImport}
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('workflow-builder')}
                className="border-2 border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA]/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-scale backdrop-glass flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                {texts[language].workflowDesigner}
              </button>
              <button className="border-2 border-[#4F97FF] text-[#4F97FF] hover:bg-[#4F97FF]/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-scale backdrop-glass">
                {texts[language].watchDemo}
              </button>
            </div>

            {/* Enhanced Trust indicator */}
            <div className="pt-12 space-y-6">
              <p className="text-muted-foreground font-medium tracking-wide">{texts[language].trustedBy}</p>
              <div className="flex items-center gap-12 opacity-70">
                {/* Company logos placeholder with better styling */}
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-20 h-10 bg-muted/50 rounded-lg flex items-center justify-center backdrop-glass">
                    <div className="w-12 h-6 bg-muted-foreground/30 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Enhanced Robot image */}
          <div className={`lg:col-span-6 relative ${isRTL ? 'order-1' : 'order-2'}`}>
            <div className="relative parallax">
              {/* Enhanced multi-layer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F97FF]/20 to-[#1ABC9C]/20 blur-3xl scale-110 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-radial from-[#4F97FF]/10 via-transparent to-[#1ABC9C]/10 blur-2xl" />
              
              {/* Robot image with enhanced styling */}
              <div className="relative rounded-3xl overflow-hidden card-shadow-hover">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBmdXR1cmlzdGljfGVufDF8fHx8MTc1ODE5MDE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="AI Robot"
                  className="w-full h-[700px] object-cover"
                />
                {/* Enhanced overlay with neon lighting effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4F97FF]/10 via-transparent to-[#1ABC9C]/10" />
              </div>

              {/* Enhanced floating stats with circular progress */}
              <div className="absolute top-8 right-8 backdrop-glass bg-card/20 border border-border/30 rounded-2xl p-6 card-shadow hover-scale">
                <div className="flex items-center gap-4">
                  {/* Circular progress for 85% */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4F97FF" />
                          <stop offset="100%" stopColor="#1ABC9C" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#gradient1)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="175.929"
                        strokeDashoffset="26.389"
                        className="animate-progress"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black text-[#4F97FF]">85%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground">
                      {language === 'ar' ? 'كفاءة العمل' : 'Efficiency'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'تحسن الأداء' : 'Performance Boost'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 backdrop-glass bg-card/20 border border-border/30 rounded-2xl p-6 card-shadow hover-scale">
                <div className="flex items-center gap-4">
                  {/* Circular progress for 12% */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <defs>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1ABC9C" />
                          <stop offset="100%" stopColor="#4F97FF" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#gradient2)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="175.929"
                        strokeDashoffset="154.817"
                        className="animate-progress"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black text-[#1ABC9C]">12%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground">
                      {language === 'ar' ? 'وقت أقل' : 'Time Saved'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'من الوقت المطلوب' : 'Weekly Average'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional floating metrics */}
              <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 backdrop-glass bg-card/20 border border-border/30 rounded-2xl p-4 card-shadow hover-scale">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-black text-[#8b5cf6]">AI</div>
                  <div className="text-xs text-muted-foreground uppercase">Powered</div>
                </div>
              </div>

              <div className="absolute top-1/4 -right-6 backdrop-glass bg-card/20 border border-border/30 rounded-2xl p-4 card-shadow hover-scale">
                <div className="text-center space-y-1">
                  <div className="text-xl font-black text-[#f59e0b]">∞</div>
                  <div className="text-xs text-muted-foreground uppercase">Scale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-8 h-12 border-2 border-[#4F97FF]/60 rounded-full flex justify-center backdrop-glass">
            <div className="w-2 h-4 bg-gradient-to-b from-[#4F97FF] to-[#1ABC9C] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {language === 'ar' ? 'اكتشف المزيد' : 'Scroll Down'}
          </span>
        </div>
      </div>
    </section>
  );
}