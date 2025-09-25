'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 text-[#4F97FF] hover:text-[#1ABC9C] transition-all duration-300 hover-scale p-2 rounded-lg hover:bg-[#4F97FF]/10 font-semibold"
    >
      <Globe className="h-4 w-4" />
      {language === 'ar' ? 'EN' : 'ع'}
    </Button>
  );
}