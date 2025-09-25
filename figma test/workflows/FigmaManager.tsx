'use client';

import React from 'react';
import { ChatSidebar } from './ChatSidebar';

interface SmartChatPageProps {
  language: 'ar' | 'en';
  userId?: string;
}

export function FigmaManager({ language }: SmartChatPageProps) {
  const text = {
    ar: {
      title: 'المحادثة الذكية',
      subtitle: 'شات المساعد - FlowCanvasAI',
      description: 'تفاعل مع مساعدك الذكي لتصميم المخططات وإدارة المشاريع'
    },
    en: {
      title: 'Smart Conversation',
      subtitle: 'AI Assistant Chat - FlowCanvasAI', 
      description: 'Interact with your AI assistant for diagram design and project management'
    }
  };

  const t = text[language];

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col overflow-hidden">
      {/* Page Header */}


      {/* Chat Area - Full width with centered content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-chart-2/5 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* ChatSidebar - Full Screen Mode */}
        <div className="w-full h-full relative z-10">
          <div className="max-w-6xl mx-auto h-full flex">
            {/* Main Chat Container */}

            
            {/* Right Panel - Welcome/Info */}

          </div>
        </div>
      </div>
    </div>
  );
}