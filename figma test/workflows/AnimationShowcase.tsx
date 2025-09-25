'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  MousePointer, 
  Eye,
  Zap,
  Heart,
  Star,
  Sun,
  Moon,
  Wind,
  Waves,
  Flame
} from 'lucide-react';

interface AnimationConfig {
  duration: number;
  delay: number;
  ease: string;
  scale: number;
  rotate: number;
  opacity: number;
}

interface AnimationShowcaseProps {
  language: 'ar' | 'en';
}

export function AnimationShowcase({ language }: AnimationShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('entrance');
  const [animationConfig, setAnimationConfig] = useState<AnimationConfig>({
    duration: 0.6,
    delay: 0,
    ease: 'easeOut',
    scale: 1.1,
    rotate: 0,
    opacity: 1
  });
  const [particleCount, setParticleCount] = useState(20);
  const [showParticles, setShowParticles] = useState(true);

  const text = {
    ar: {
      title: 'معرض الحركات التفاعلية',
      description: 'تجربة تفاعلية لأحدث الحركات والتأثيرات البصرية',
      controls: 'أدوات التحكم',
      playAnimations: 'تشغيل الحركات',
      resetAnimations: 'إعادة تعيين',
      animationTabs: {
        entrance: 'حركات الدخول',
        hover: 'تفاعل الماوس',
        micro: 'حركات دقيقة',
        loading: 'حركات التحميل',
        particles: 'الجسيمات'
      },
      settings: {
        duration: 'المدة (ثانية)',
        delay: 'التأخير (ثانية)',
        scale: 'التكبير',
        rotate: 'الدوران (درجة)',
        particles: 'عدد الجسيمات',
        showParticles: 'إظهار الجسيمات'
      },
      animations: {
        fadeInUp: 'ظهور من الأسفل',
        slideInLeft: 'انزلاق من اليسار',
        bounceIn: 'ارتداد',
        zoomIn: 'تكبير',
        rotateIn: 'دوران',
        pulse: 'نبضة',
        glow: 'توهج',
        shake: 'اهتزاز'
      }
    },
    en: {
      title: 'Interactive Animation Showcase',
      description: 'Interactive experience for the latest animations and visual effects',
      controls: 'Controls',
      playAnimations: 'Play Animations',
      resetAnimations: 'Reset',
      animationTabs: {
        entrance: 'Entrance',
        hover: 'Hover Effects',
        micro: 'Micro Interactions',
        loading: 'Loading Animations',
        particles: 'Particles'
      },
      settings: {
        duration: 'Duration (seconds)',
        delay: 'Delay (seconds)',
        scale: 'Scale',
        rotate: 'Rotate (degrees)',
        particles: 'Particle Count',
        showParticles: 'Show Particles'
      },
      animations: {
        fadeInUp: 'Fade In Up',
        slideInLeft: 'Slide In Left',
        bounceIn: 'Bounce In',
        zoomIn: 'Zoom In',
        rotateIn: 'Rotate In',
        pulse: 'Pulse',
        glow: 'Glow',
        shake: 'Shake'
      }
    }
  };

  const t = text[language];

  // Particle component
  const Particle = ({ index }: { index: number }) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = Math.random() * 3 + 2;
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    
    return (
      <motion.div
        className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
        initial={{ x: randomX, y: randomY, opacity: 0, scale: 0 }}
        animate={{
          x: [randomX, randomX + Math.random() * 200 - 100],
          y: [randomY, randomY + Math.random() * 200 - 100],
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: randomDuration,
          delay: randomDelay,
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
    );
  };

  // Enhanced hover animations
  const HoverCard = ({ children, type }: { children: React.ReactNode; type: string }) => {
    const hoverAnimations = {
      lift: {
        whileHover: { y: -10, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }
      },
      tilt: {
        whileHover: { rotateX: 5, rotateY: 5, scale: 1.05 }
      },
      glow: {
        whileHover: { 
          boxShadow: '0 0 30px rgba(79, 151, 255, 0.5)',
          borderColor: 'rgba(79, 151, 255, 0.8)'
        }
      },
      bounce: {
        whileHover: { y: -5 },
        whileTap: { y: 0, scale: 0.95 }
      }
    };

    return (
      <motion.div
        className="cursor-pointer"
        {...hoverAnimations[type as keyof typeof hoverAnimations]}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    );
  };

  // Micro interaction components
  const MicroButton = ({ icon: Icon, onClick }: { icon: any; onClick: () => void }) => (
    <motion.button
      className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon size={20} />
      </motion.div>
    </motion.button>
  );

  // Loading animations
  const LoadingDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map(index => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-blue-500 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );

  const SpinningLoader = () => (
    <motion.div
      className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  const PulseLoader = () => (
    <motion.div
      className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  );

  // Entrance animation variants
  const entranceVariants = {
    fadeInUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 }
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 25
        }
      }
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180, scale: 0 },
      animate: { opacity: 1, rotate: 0, scale: 1 }
    }
  };

  const AnimatedCard = ({ animation, title, delay = 0 }: { 
    animation: keyof typeof entranceVariants; 
    title: string; 
    delay?: number;
  }) => (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          variants={entranceVariants[animation]}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={{
            duration: animationConfig.duration,
            delay: delay + animationConfig.delay,
            ease: animationConfig.ease
          }}
        >
          <Card className="p-6 text-center">
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg" />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const resetAnimations = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Particle Background */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: particleCount }).map((_, index) => (
            <Particle key={index} index={index} />
          ))}
        </div>
      )}

      {/* Header */}
      <motion.div
        className="text-center space-y-4 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-muted-foreground">{t.description}</p>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {t.controls}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.settings.duration}</label>
                <Slider
                  value={[animationConfig.duration]}
                  onValueChange={([value]) => 
                    setAnimationConfig(prev => ({ ...prev, duration: value }))
                  }
                  min={0.1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">
                  {animationConfig.duration}s
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.settings.delay}</label>
                <Slider
                  value={[animationConfig.delay]}
                  onValueChange={([value]) => 
                    setAnimationConfig(prev => ({ ...prev, delay: value }))
                  }
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">
                  {animationConfig.delay}s
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.settings.particles}</label>
                <Slider
                  value={[particleCount]}
                  onValueChange={([value]) => setParticleCount(value)}
                  min={0}
                  max={50}
                  step={5}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">
                  {particleCount}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.settings.showParticles}</label>
                <Switch
                  checked={showParticles}
                  onCheckedChange={setShowParticles}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {t.playAnimations}
              </Button>
              <Button variant="outline" onClick={resetAnimations}>
                <RotateCcw className="h-4 w-4 mr-2" />
                {t.resetAnimations}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animation Tabs */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            {Object.entries(t.animationTabs).map(([key, label]) => (
              <TabsTrigger key={key} value={key}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Entrance Animations */}
          <TabsContent value="entrance" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatedCard animation="fadeInUp" title={t.animations.fadeInUp} delay={0} />
              <AnimatedCard animation="slideInLeft" title={t.animations.slideInLeft} delay={0.1} />
              <AnimatedCard animation="bounceIn" title={t.animations.bounceIn} delay={0.2} />
              <AnimatedCard animation="zoomIn" title={t.animations.zoomIn} delay={0.3} />
              <AnimatedCard animation="rotateIn" title={t.animations.rotateIn} delay={0.4} />
            </div>
          </TabsContent>

          {/* Hover Effects */}
          <TabsContent value="hover" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <HoverCard type="lift">
                <Card className="p-6 text-center">
                  <MousePointer className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">Lift Effect</h3>
                </Card>
              </HoverCard>

              <HoverCard type="tilt">
                <Card className="p-6 text-center">
                  <Eye className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">3D Tilt</h3>
                </Card>
              </HoverCard>

              <HoverCard type="glow">
                <Card className="p-6 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">Glow Effect</h3>
                </Card>
              </HoverCard>

              <HoverCard type="bounce">
                <Card className="p-6 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">Bounce</h3>
                </Card>
              </HoverCard>
            </div>
          </TabsContent>

          {/* Micro Interactions */}
          <TabsContent value="micro" className="space-y-6 mt-6">
            <div className="flex justify-center gap-8">
              <div className="text-center space-y-4">
                <MicroButton icon={Heart} onClick={() => console.log('Like!')} />
                <p className="text-sm font-medium">Like Button</p>
              </div>

              <div className="text-center space-y-4">
                <MicroButton icon={Star} onClick={() => console.log('Favorite!')} />
                <p className="text-sm font-medium">Favorite</p>
              </div>

              <div className="text-center space-y-4">
                <MicroButton icon={Sun} onClick={() => console.log('Theme!')} />
                <p className="text-sm font-medium">Theme Toggle</p>
              </div>
            </div>
          </TabsContent>

          {/* Loading Animations */}
          <TabsContent value="loading" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <LoadingDots />
                </div>
                <p className="font-medium">Bouncing Dots</p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <SpinningLoader />
                </div>
                <p className="font-medium">Spinning Circle</p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <PulseLoader />
                </div>
                <p className="font-medium">Pulse Effect</p>
              </div>
            </div>
          </TabsContent>

          {/* Particles */}
          <TabsContent value="particles" className="space-y-6 mt-6">
            <Card className="p-8 text-center relative overflow-hidden" style={{ height: '300px' }}>
              <h3 className="text-xl font-semibold mb-4">Particle System</h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `يتم عرض ${particleCount} جسيمة متحركة في الخلفية`
                  : `Displaying ${particleCount} animated particles in the background`
                }
              </p>
              
              {/* Local particles for this tab */}
              {Array.from({ length: 10 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%', 
                    scale: 0 
                  }}
                  animate={{
                    y: ['-10%', '110%'],
                    scale: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}