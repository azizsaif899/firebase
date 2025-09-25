'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Sparkles,
  X,
  User,
  Bot,
  Code,
  Lightbulb,
  Zap,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  RefreshCw,
  Settings,
  BookOpen,
  BarChart3,
  Workflow
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isCode?: boolean;
}

interface AISidebarProps {
  language: 'ar' | 'en';
}

export function AISidebar({ language }: AISidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const text = {
    ar: {
      aiAssistant: 'المساعد الذكي',
      placeholder: 'اسأل FlowCanvasAI عن أي شيء...',
      send: 'إرسال',
      examples: [
        'كيف يمكنني إنشاء workflow جديد؟',
        'ما هي أفضل الممارسات للأتمتة؟',
        'اشرح لي مكونات النظام'
      ],
      typing: 'المساعد يكتب...',
      copy: 'نسخ',
      copied: 'تم النسخ',
      newChat: 'محادثة جديدة',
      minimize: 'تصغير',
      maximize: 'تكبير',
      close: 'إغلاق',
      quickActions: 'إجراءات سريعة',
      createWorkflow: 'إنشاء سير عمل',
      viewAnalytics: 'عرض التحليلات',
      openLibrary: 'فتح المكتبة',
      settings: 'الإعدادات'
    },
    en: {
      aiAssistant: 'AI Assistant',
      placeholder: 'Ask FlowCanvasAI anything...',
      send: 'Send',
      examples: [
        'How can I create a new workflow?',
        'What are the best automation practices?',
        'Explain the system components to me'
      ],
      typing: 'Assistant is typing...',
      copy: 'Copy',
      copied: 'Copied',
      newChat: 'New Chat',
      minimize: 'Minimize',
      maximize: 'Maximize',
      close: 'Close',
      quickActions: 'Quick Actions',
      createWorkflow: 'Create Workflow',
      viewAnalytics: 'View Analytics',
      openLibrary: 'Open Library',
      settings: 'Settings'
    }
  };

  const t = text[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
        isCode: userMessage.content.toLowerCase().includes('code') || userMessage.content.toLowerCase().includes('كود')
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Smart response generation based on user input
    if (language === 'ar') {
      if (lowerInput.includes('workflow') || lowerInput.includes('سير عمل') || lowerInput.includes('عملية')) {
        return 'يمكنني مساعدتك في إنشاء سير عمل متقدم. أولاً، حدد نوع العملية التي تريد أتمتتها:\n\n📊 **عمليات البيانات**: لمعالجة وتحليل البيانات\n🔔 **التنبيهات**: لإرسال إشعارات ذكية\n📧 **التسويق**: للحملات الآلية\n🔄 **التكامل**: لربط الأنظمة المختلفة\n\nما نوع العملية التي تهتم بها؟';
      }
      
      if (lowerInput.includes('أتمتة') || lowerInput.includes('automation') || lowerInput.includes('ممارسات')) {
        return '✨ **أفضل ممارسات الأتمتة:**\n\n1. **ابدأ بسيط**: اختر عملية واحدة وأتمتها جيداً\n2. **اختبر كثيراً**: تأكد من عمل كل خطوة بشكل صحيح\n3. **راقب الأداء**: استخدم لوحة التحليلات لمتابعة النتائج\n4. **حسّن باستمرار**: عدّل العمليات بناءً على البيانات\n\nهل تريد المزيد من التفاصيل حول أي من هذه النقاط؟';
      }
      
      if (lowerInput.includes('مكونات') || lowerInput.includes('components') || lowerInput.includes('نظام')) {
        return '🏗️ **مكونات FlowCanvasAI:**\n\n**1. محرك العمليات** 🚀\n- تشغيل العمليات الآلية\n- إدارة التدفقات المعقدة\n\n**2. مكتبة الإجراءات** 📚\n- إجراءات جاهزة للاستخدام\n- إمكانية إنشاء إجراءات مخصصة\n\n**3. نظام المحفزات** ⚡\n- محفزات زمنية\n- محفزات الأحداث\n- محفزات البيانات\n\n**4. لوحة التحليلات** 📊\n- متابعة الأداء\n- تقارير مفصلة\n\nأي مكون تريد معرفة المزيد عنه؟';
      }
      
      return 'مرحباً! أنا هنا لمساعدتك في استخدام FlowCanvasAI بأفضل طريقة ممكنة. يمكنني مساعدتك في:\n\n🔧 إنشاء workflows جديدة\n📈 تحسين العمليات الحالية\n🎯 اختيار أفضل المحفزات\n📊 تحليل البيانات والأداء\n\nما الذي تحتاج مساعدة فيه؟';
    } else {
      if (lowerInput.includes('workflow') || lowerInput.includes('process') || lowerInput.includes('create')) {
        return 'I can help you create an advanced workflow. First, specify the type of process you want to automate:\n\n📊 **Data Processing**: For data analysis and manipulation\n🔔 **Notifications**: For smart alerts and messaging\n📧 **Marketing**: For automated campaigns\n🔄 **Integration**: To connect different systems\n\nWhich type of process interests you?';
      }
      
      if (lowerInput.includes('automation') || lowerInput.includes('best') || lowerInput.includes('practices')) {
        return '✨ **Best Automation Practices:**\n\n1. **Start Simple**: Choose one process and automate it well\n2. **Test Extensively**: Ensure each step works correctly\n3. **Monitor Performance**: Use analytics dashboard to track results\n4. **Continuously Improve**: Adjust processes based on data\n\nWould you like more details about any of these points?';
      }
      
      if (lowerInput.includes('components') || lowerInput.includes('system') || lowerInput.includes('explain')) {
        return '🏗️ **FlowCanvasAI Components:**\n\n**1. Process Engine** 🚀\n- Runs automated processes\n- Manages complex workflows\n\n**2. Action Library** 📚\n- Ready-to-use actions\n- Custom action creation\n\n**3. Trigger System** ⚡\n- Time-based triggers\n- Event triggers\n- Data triggers\n\n**4. Analytics Dashboard** 📊\n- Performance tracking\n- Detailed reports\n\nWhich component would you like to know more about?';
      }
      
      return 'Hello! I\'m here to help you use FlowCanvasAI in the best possible way. I can assist you with:\n\n🔧 Creating new workflows\n📈 Optimizing current processes\n🎯 Choosing the best triggers\n📊 Analyzing data and performance\n\nWhat do you need help with?';
    }
  };

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const handleExampleClick = (example: string) => {
    setMessage(example);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[100]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={toggleSidebar}
          className="w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-xl flex items-center justify-center relative overflow-hidden group ai-hover-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <MessageSquare size={24} className="relative z-10" />
          
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* AI Sparkles */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-chart-2 rounded-full flex items-center justify-center ai-sparkle"
          >
            <Sparkles size={8} className="text-white" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* AI Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 right-6 z-[99] w-96 max-w-[calc(100vw-2rem)] md:w-96 sm:right-4 sm:w-[calc(100vw-2rem)]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: isMinimized ? "calc(100% - 60px)" : 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="bg-card/95 border border-border rounded-t-2xl shadow-2xl overflow-hidden ai-glass">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border ai-glass">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{t.aiAssistant}</h3>
                    <p className="text-xs text-muted-foreground">FlowCanvasAI</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewChat}
                    className="h-8 w-8 p-0"
                    title={t.newChat}
                  >
                    <RefreshCw size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0"
                    title={isMinimized ? t.maximize : t.minimize}
                  >
                    {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                    title={t.close}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <div className="h-96">
                  {/* Messages Area */}
                  <ScrollArea className="h-72 p-4 ai-scroll">
                    {messages.length === 0 ? (
                      <div className="space-y-4">
                        <div className="text-center text-muted-foreground text-sm mb-6">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary/50" />
                          مرحباً! كيف يمكنني مساعدتك اليوم؟
                        </div>
                        
                        <div className="space-y-4">
                          {/* Quick Actions */}
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">{t.quickActions}:</p>
                            <div className="grid grid-cols-2 gap-2">
                              <button className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-xs border border-primary/20">
                                <Workflow size={14} className="text-primary" />
                                {t.createWorkflow}
                              </button>
                              <button className="flex items-center gap-2 p-2 rounded-lg bg-chart-2/10 hover:bg-chart-2/20 transition-colors text-xs border border-chart-2/20">
                                <BarChart3 size={14} className="text-chart-2" />
                                {t.viewAnalytics}
                              </button>
                              <button className="flex items-center gap-2 p-2 rounded-lg bg-chart-3/10 hover:bg-chart-3/20 transition-colors text-xs border border-chart-3/20">
                                <BookOpen size={14} className="text-chart-3" />
                                {t.openLibrary}
                              </button>
                              <button className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-xs border border-border/50">
                                <Settings size={14} className="text-muted-foreground" />
                                {t.settings}
                              </button>
                            </div>
                          </div>

                          {/* Examples */}
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">
                              {language === 'ar' ? 'أمثلة للبدء:' : 'Get started with:'}
                            </p>
                            {t.examples.map((example, index) => (
                              <button
                                key={index}
                                onClick={() => handleExampleClick(example)}
                                className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 text-sm border border-border/50 hover:border-primary/50"
                              >
                                <Lightbulb size={14} className="inline-block mr-2 text-primary/70" />
                                {example}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} ai-message-fade-in`}
                          >
                            <div
                              className={`flex gap-3 max-w-[80%] ${
                                msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                              }`}
                            >
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  msg.type === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-chart-2 text-white'
                                }`}
                              >
                                {msg.type === 'user' ? <User size={14} /> : <Bot size={14} />}
                              </div>
                              
                              <div
                                className={`relative group ai-message-bubble ${
                                  msg.type === 'user'
                                    ? 'bg-primary text-primary-foreground user'
                                    : 'bg-muted ai'
                                } rounded-2xl p-3 ${
                                  msg.type === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                                }`}
                              >
                                {msg.isCode && (
                                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/20">
                                    <Code size={12} />
                                    <span className="text-xs font-medium">Code</span>
                                  </div>
                                )}
                                
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                                  <span className="text-xs opacity-70">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopy(msg.content, msg.id)}
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    {copiedId === msg.id ? (
                                      <Check size={12} className="text-green-500" />
                                    ) : (
                                      <Copy size={12} />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="flex gap-3">
                              <div className="w-7 h-7 rounded-full bg-chart-2 text-white flex items-center justify-center">
                                <Bot size={14} />
                              </div>
                              <div className="bg-muted rounded-2xl rounded-bl-md p-3 ai-message-bubble ai">
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-primary rounded-full ai-typing-dot"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full ai-typing-dot"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full ai-typing-dot"></div>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{t.typing}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t border-border ai-glass">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          ref={inputRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t.placeholder}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                        />
                        <Zap size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isTyping}
                        className="h-10 w-10 p-0 bg-primary hover:bg-primary/90"
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}