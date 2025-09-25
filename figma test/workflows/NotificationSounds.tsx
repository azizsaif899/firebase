'use client';

import { useEffect, useRef } from 'react';

interface NotificationSoundsProps {
  onMessageReceived?: () => void;
  onMessageSent?: () => void;
  onTyping?: () => void;
  enabled?: boolean;
}

export function NotificationSounds({ 
  onMessageReceived, 
  onMessageSent, 
  onTyping, 
  enabled = true 
}: NotificationSoundsProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      // Initialize Web Audio API
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported');
      }
    }
  }, [enabled]);

  const playBeep = (frequency: number, duration: number, volume: number = 0.1) => {
    if (!enabled || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  };

  const playMessageReceived = () => {
    // WhatsApp-like notification sound (two tones)
    playBeep(800, 0.1);
    setTimeout(() => playBeep(600, 0.1), 100);
  };

  const playMessageSent = () => {
    // Single high tone for sent message
    playBeep(1000, 0.08, 0.05);
  };

  const playTypingSound = () => {
    // Soft click for typing
    playBeep(400, 0.05, 0.03);
  };

  useEffect(() => {
    if (onMessageReceived) {
      playMessageReceived();
    }
  }, [onMessageReceived]);

  useEffect(() => {
    if (onMessageSent) {
      playMessageSent();
    }
  }, [onMessageSent]);

  useEffect(() => {
    if (onTyping) {
      playTypingSound();
    }
  }, [onTyping]);

  return null; // This component doesn't render anything
}

// Hook for using notification sounds
export function useNotificationSounds(enabled: boolean = true) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported');
      }
    }
  }, [enabled]);

  const playBeep = (frequency: number, duration: number, volume: number = 0.1) => {
    if (!enabled || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  };

  return {
    playMessageReceived: () => {
      playBeep(800, 0.1);
      setTimeout(() => playBeep(600, 0.1), 100);
    },
    playMessageSent: () => {
      playBeep(1000, 0.08, 0.05);
    },
    playTypingSound: () => {
      playBeep(400, 0.05, 0.03);
    },
    playNotification: () => {
      playBeep(880, 0.15);
    },
    playError: () => {
      playBeep(300, 0.2, 0.08);
    },
    playSuccess: () => {
      playBeep(660, 0.1);
      setTimeout(() => playBeep(880, 0.1), 100);
      setTimeout(() => playBeep(1100, 0.15), 200);
    }
  };
}