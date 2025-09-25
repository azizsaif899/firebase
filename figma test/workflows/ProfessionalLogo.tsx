'use client';

import React from 'react';
import { Zap, Sparkles } from 'lucide-react';

interface ProfessionalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'icon-only';
  language?: 'ar' | 'en';
}

export function ProfessionalLogo({ 
  size = 'md', 
  variant = 'default',
  language = 'ar' 
}: ProfessionalLogoProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 28
  };

  const texts = {
    ar: {
      name: 'FlowCanvas',
      subtitle: 'منصة الذكاء الاصطناعي',
      slogan: 'حيث تلتقي الأفكار بالابتكار'
    },
    en: {
      name: 'FlowCanvas',
      subtitle: 'AI Platform',
      slogan: 'Where Ideas Meet Innovation'
    }
  };

  const t = texts[language];

  if (variant === 'icon-only') {
    return (
      <div className="relative">
        <div className="chat-brand-icon relative overflow-hidden">
          <Zap size={iconSizes[size]} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
        </div>
        <div className="absolute -top-1 -right-1 text-yellow-400">
          <Sparkles size={8} className="animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2">
        <div className="chat-brand-icon">
          <Zap size={iconSizes[size]} />
        </div>
        <span className={`font-bold text-white ${sizeClasses[size]}`}>
          {t.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="chat-brand-icon relative overflow-hidden">
          <Zap size={iconSizes[size]} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
        </div>
        <div className="absolute -top-1 -right-1 text-yellow-400">
          <Sparkles size={6} className="animate-pulse" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className={`font-bold text-white ${sizeClasses[size]} tracking-tight`}>
          {t.name}
          <span className="text-blue-400">AI</span>
        </div>
        {size !== 'sm' && (
          <div className="text-xs text-white/60 font-medium">
            {t.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}