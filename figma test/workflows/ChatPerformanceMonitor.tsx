'use client';

import React, { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  messageRenderTime: number;
  scrollPerformance: number;
  inputLatency: number;
  memoryUsage: number;
}

interface ChatPerformanceMonitorProps {
  onMetrics?: (metrics: PerformanceMetrics) => void;
  enabled?: boolean;
}

export function ChatPerformanceMonitor({ 
  onMetrics, 
  enabled = false 
}: ChatPerformanceMonitorProps) {
  const performanceRef = useRef<PerformanceMetrics>({
    messageRenderTime: 0,
    scrollPerformance: 0,
    inputLatency: 0,
    memoryUsage: 0
  });

  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Performance Observer for monitoring
    try {
      observerRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            switch (entry.name) {
              case 'message-render':
                performanceRef.current.messageRenderTime = entry.duration;
                break;
              case 'scroll-performance':
                performanceRef.current.scrollPerformance = entry.duration;
                break;
              case 'input-latency':
                performanceRef.current.inputLatency = entry.duration;
                break;
            }
          }
        });

        // Memory usage (if available)
        if ('memory' in performance && (performance as any).memory) {
          const memory = (performance as any).memory;
          performanceRef.current.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
        }

        // Report metrics
        if (onMetrics) {
          onMetrics({ ...performanceRef.current });
        }
      });

      observerRef.current.observe({ 
        entryTypes: ['measure', 'navigation', 'paint'] 
      });

    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, onMetrics]);

  // Performance measurement utilities
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Add global performance markers
    window.chatPerformance = {
      markStart: (name: string) => {
        performance.mark(`${name}-start`);
      },
      markEnd: (name: string) => {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      },
      measureFunction: <T extends any[], R>(
        fn: (...args: T) => R,
        name: string
      ) => {
        return (...args: T): R => {
          performance.mark(`${name}-start`);
          const result = fn(...args);
          performance.mark(`${name}-end`);
          performance.measure(name, `${name}-start`, `${name}-end`);
          return result;
        };
      },
      getMetrics: () => ({ ...performanceRef.current })
    };

    return () => {
      if (window.chatPerformance) {
        delete window.chatPerformance;
      }
    };
  }, [enabled]);

  // Monitor FPS
  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Log low FPS warnings
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}fps`);
        }
      }
      
      requestAnimationFrame(measureFPS);
    }
    
    const rafId = requestAnimationFrame(measureFPS);
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  // Development-only performance panel
  if (enabled && process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 left-4 bg-black/90 text-white p-3 rounded-lg text-xs font-mono z-50">
        <div className="font-bold mb-2">Performance Monitor</div>
        <div>Message Render: {performanceRef.current.messageRenderTime.toFixed(2)}ms</div>
        <div>Scroll: {performanceRef.current.scrollPerformance.toFixed(2)}ms</div>
        <div>Input Latency: {performanceRef.current.inputLatency.toFixed(2)}ms</div>
        <div>Memory: {performanceRef.current.memoryUsage.toFixed(2)}MB</div>
      </div>
    );
  }

  return null;
}

// Global type declaration
declare global {
  interface Window {
    chatPerformance?: {
      markStart: (name: string) => void;
      markEnd: (name: string) => void;
      measureFunction: <T extends any[], R>(
        fn: (...args: T) => R,
        name: string
      ) => (...args: T) => R;
      getMetrics: () => PerformanceMetrics;
    };
  }
}

export type { PerformanceMetrics };