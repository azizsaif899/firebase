'use client';

import { Button } from './ui/button';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

type PageType = 'home' | 'design-library' | 'automation' | 'workflow-builder' | 'conversation' | 'figma';

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
  currentPage?: PageType;
  onNavigate?: (page: PageType) => void;
}

export function Header({ language, onLanguageChange, isDark, onThemeChange, currentPage = 'home', onNavigate }: HeaderProps) {
  const isRTL = language === 'ar';
  
  const navItems = {
    ar: ['الرئيسية', 'محادثة', 'المساعد الذكي', 'Design System', 'سير العمل المرئي', 'الأتمتة'],
    en: ['Home', 'Conversation', 'Smart Assistant', 'Design System', 'Visual Workflow', 'Automation']
  };

  const texts = {
    ar: {
      logo: 'QnA',
      getStarted: 'ابدأ مجاناً'
    },
    en: {
      logo: 'QnA',
      getStarted: 'Start Free'
    }
  };

  return (
    <header className="w-full h-20 flex-shrink-0 z-50">
      {/* الهيدر الرئيسي */}
      <div className="backdrop-glass bg-background/30 border-b border-border/20 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className={`flex h-full items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Enhanced Logo */}
            <div 
              className="flex items-center hover-scale cursor-pointer"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#4F97FF] to-[#1ABC9C] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xs">Q&A</span>
              </div>
              <span className={`text-2xl font-black text-foreground ${isRTL ? 'mr-3 ml-0' : 'ml-3'}`}>
                {texts[language].logo}
              </span>
            </div>

            {/* Enhanced Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems[language].map((item, index) => {
                const isDesignLibrary = (language === 'ar' && item === 'Design System') || (language === 'en' && item === 'Design System');
                const isWorkflowBuilder = (language === 'ar' && item === 'سير العمل المرئي') || (language === 'en' && item === 'Visual Workflow');
                const isAutomation = (language === 'ar' && item === 'الأتمتة') || (language === 'en' && item === 'Automation');
                const isHome = (language === 'ar' && item === 'الرئيسية') || (language === 'en' && item === 'Home');
                const isConversation = (language === 'ar' && item === 'محادثة') || (language === 'en' && item === 'Conversation');
                const isFigma = item === 'Figma';
                
                const isActive = (
                  (isHome && currentPage === 'home') ||
                  (isConversation && currentPage === 'conversation') ||
                  (isFigma && currentPage === 'figma') ||
                  (isDesignLibrary && currentPage === 'design-library') ||
                  (isWorkflowBuilder && currentPage === 'workflow-builder') ||
                  (isAutomation && currentPage === 'automation')
                );
                
                const handleClick = () => {
                  if (!onNavigate) return;
                  
                  if (isHome) {
                    onNavigate('home');
                  } else if (isConversation) {
                    onNavigate('conversation');
                  } else if (isFigma) {
                    onNavigate('figma');
                  } else if (isDesignLibrary) {
                    onNavigate('design-library');
                  } else if (isWorkflowBuilder) {
                    onNavigate('workflow-builder');
                  } else if (isAutomation) {
                    onNavigate('automation');
                  }
                };
                
                return (
                  <button
                    key={index}
                    onClick={handleClick}
                    className={`transition-all duration-300 font-medium relative group ${
                      isDesignLibrary || isWorkflowBuilder || isAutomation || isConversation || isFigma ? 'text-base' : 'text-lg'
                    } ${
                      isActive 
                        ? isDesignLibrary 
                          ? 'text-[#1ABC9C]' 
                          : isWorkflowBuilder
                          ? 'text-[#9333EA]'
                          : isConversation
                          ? 'text-[#FF6B6B]'
                          : isFigma
                          ? 'text-[#F24E1E]'
                          : 'text-[#4F97FF]'
                        : 'text-muted-foreground'
                    } ${
                      !isActive && isDesignLibrary ? 'hover:text-[#1ABC9C]' : 
                      !isActive && isWorkflowBuilder ? 'hover:text-[#9333EA]' :
                      !isActive && isAutomation ? 'hover:text-[#4F97FF]' : 
                      !isActive && isConversation ? 'hover:text-[#FF6B6B]' :
                      !isActive && isFigma ? 'hover:text-[#F24E1E]' :
                      !isActive ? 'hover:text-[#4F97FF]' : ''
                    }`}
                  >
                    {isDesignLibrary && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1zM13 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3zm2 2v-1h1v1h-1z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </span>
                    )}
                    {isWorkflowBuilder && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </span>
                    )}
                    {isAutomation && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </span>
                    )}
                    {isConversation && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </span>
                    )}
                    {isFigma && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.667 0C5.197 0 4 1.197 4 2.667v14.666C4 18.803 5.197 20 6.667 20h6.666C14.803 20 16 18.803 16 17.333V2.667C16 1.197 14.803 0 13.333 0H6.667zm0 1.333h6.666c.737 0 1.334.597 1.334 1.334v14.666c0 .737-.597 1.334-1.334 1.334H6.667c-.737 0-1.334-.597-1.334-1.334V2.667c0-.737.597-1.334 1.334-1.334zM8 4a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zM8 8a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z"/>
                        </svg>
                        المساعد الذكي
                      </span>
                    )}
                    {!isDesignLibrary && !isWorkflowBuilder && !isAutomation && !isConversation && !isFigma && item}
                    <span className={`absolute -bottom-1 left-0 transition-all duration-300 h-0.5 bg-gradient-to-r ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    } ${
                      isDesignLibrary ? 'from-[#1ABC9C] to-[#4F97FF]' : 
                      isWorkflowBuilder ? 'from-[#9333EA] to-[#4F97FF]' :
                      isConversation ? 'from-[#FF6B6B] to-[#4F97FF]' :
                      isFigma ? 'from-[#F24E1E] to-[#4F97FF]' :
                      'from-[#4F97FF] to-[#1ABC9C]'
                    }`} />
                  </button>
                );
              })}
            </nav>

            {/* Enhanced Right side controls */}
            <div className={`flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
              <ThemeToggle isDark={isDark} onThemeChange={onThemeChange} />
              <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
              <button className="btn-primary hover-scale px-6 py-3 rounded-xl text-white font-semibold">
                {texts[language].getStarted}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}