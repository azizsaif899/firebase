'use client';

import { useState } from 'react';
import { MinimalistCanvas } from './MinimalistCanvasFixed3';
import { ChatSidebar } from './ChatSidebar';

interface VisualWorkflowPageProps {
  language: 'ar' | 'en';
  onClose?: () => void;
}

export function VisualWorkflowPage({ language, onClose }: VisualWorkflowPageProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Navigate back to home if no onClose provided
      window.history.back();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <ChatSidebar language={language} />
      <div className="h-screen w-full">
        <MinimalistCanvas language={language} onClose={handleClose} />
      </div>
    </div>
  );
}