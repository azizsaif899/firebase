'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AutomationNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  language: 'ar' | 'en';
}

export function AutomationNavigation({ currentTab, onTabChange, language }: AutomationNavigationProps) {
  const texts = {
    ar: {
      overview: 'نظرة عامة',
      builder: 'مصمم سير العمل',
      actions: 'مكتبة الإجراءات',
      triggers: 'نظام المحفزات',
      workflows: 'إدارة سير العمل',
      analytics: 'التحليلات الأساسية',
      dashboard: 'لوحة التحليلات المتقدمة',
      alerts: 'التنبيهات الذكية',
      testing: 'اختبارات الجودة',
      performance: 'تحسين الأداء',
      animations: 'معرض الحركات',
      manager: 'مدير الملفات',
      visualWorkflow: 'سير العمل المرئي'
    },
    en: {
      overview: 'Overview',
      builder: 'Workflow Builder',
      actions: 'Action Library',
      triggers: 'Trigger System',
      workflows: 'Workflow Management',
      analytics: 'Basic Analytics',
      dashboard: 'Advanced Analytics Dashboard',
      alerts: 'Smart Alerts',
      testing: 'Quality Testing',
      performance: 'Performance Optimizer',
      animations: 'Animation Showcase',
      manager: 'File Manager',
      visualWorkflow: 'Visual Workflow'
    }
  };

  const navigationItems = [
    { 
      id: 'overview', 
      label: texts[language].overview, 
      icon: '📊', 
      description: 'System overview and quick stats',
      isNew: false,
      isPopular: true
    },
    { 
      id: 'builder', 
      label: texts[language].builder, 
      icon: '🔧', 
      description: 'Visual workflow design canvas',
      isNew: false,
      isPopular: true
    },
    { 
      id: 'actions', 
      label: texts[language].actions, 
      icon: '⚙️', 
      description: 'Customizable action library',
      isNew: false,
      isPopular: false
    },
    { 
      id: 'triggers', 
      label: texts[language].triggers, 
      icon: '⚡', 
      description: 'Interactive trigger system',
      isNew: false,
      isPopular: false
    },
    { 
      id: 'workflows', 
      label: texts[language].workflows, 
      icon: '🔄', 
      description: 'Workflow management and monitoring',
      isNew: false,
      isPopular: true
    },
    { 
      id: 'analytics', 
      label: texts[language].analytics, 
      icon: '📈', 
      description: 'Basic performance analytics',
      isNew: false,
      isPopular: false
    },
    { 
      id: 'dashboard', 
      label: texts[language].dashboard, 
      icon: '📊', 
      description: 'Advanced real-time analytics',
      isNew: true,
      isPopular: true
    },
    { 
      id: 'alerts', 
      label: texts[language].alerts, 
      icon: '🔔', 
      description: 'AI-powered smart alert system',
      isNew: true,
      isPopular: true
    },
    { 
      id: 'testing', 
      label: texts[language].testing, 
      icon: '🧪', 
      description: 'Comprehensive quality testing suite',
      isNew: true,
      isPopular: false
    },
    { 
      id: 'performance', 
      label: texts[language].performance, 
      icon: '⚡', 
      description: 'Advanced performance optimization',
      isNew: true,
      isPopular: false
    },
    { 
      id: 'animations', 
      label: texts[language].animations, 
      icon: '✨', 
      description: 'Interactive animation showcase',
      isNew: true,
      isPopular: false
    },
    { 
      id: 'manager', 
      label: texts[language].manager, 
      icon: '📁', 
      description: 'Advanced workflow file management',
      isNew: true,
      isPopular: true
    },
    { 
      id: 'visual-workflow', 
      label: texts[language].visualWorkflow, 
      icon: '🎨', 
      description: 'Visual workflow designer with drag & drop interface',
      isNew: true,
      isPopular: true
    }
  ];

  return (
    <div className="bg-card/50 backdrop-blur-sm border-b border-border/20 sticky top-[72px] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-thin">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`
                flex items-center gap-2 whitespace-nowrap relative
                ${currentTab === item.id 
                  ? 'bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] text-white shadow-lg' 
                  : 'hover:bg-muted/80'
                }
                transition-all duration-200
              `}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              
              {item.isNew && (
                <Badge 
                  variant="secondary" 
                  className="bg-green-500/20 text-green-600 text-xs px-1 py-0 h-4"
                >
                  NEW
                </Badge>
              )}
              
              {item.isPopular && !item.isNew && (
                <Badge 
                  variant="secondary" 
                  className="bg-orange-500/20 text-orange-600 text-xs px-1 py-0 h-4"
                >
                  ★
                </Badge>
              )}
              
              {currentTab === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></div>
              )}
            </Button>
          ))}
        </div>
        
        {/* Current tab description */}
        <div className="pb-2">
          {navigationItems
            .filter(item => item.id === currentTab)
            .map(item => (
              <p key={item.id} className="text-xs text-muted-foreground">
                {item.description}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
}