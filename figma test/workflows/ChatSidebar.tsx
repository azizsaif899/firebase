'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Sparkles,
  User,
  Bot,
  Copy,
  Check,
  Workflow,
  BarChart3,
  BookOpen,
  Settings,
  Lightbulb,
  Zap,
  ChevronLeft,
  ChevronRight,
  GripVertical
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isCode?: boolean;
}

interface ChatSidebarProps {
  language: 'ar' | 'en';
}

export function ChatSidebar({ language }: ChatSidebarProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const text = {
    ar: {
      placeholder: 'اسأل FlowCanvasAI عن أي شيء...',
      send: 'إرسال',
      examples: [
        'كيف أبدأ في إنشاء مخطط جديد؟',
        'ما هي أنواع العقد المتاحة؟',
        'كيف أربط العقد ببعضها البعض؟',
        'كيف أحفظ مشروعي؟'
      ],
      typing: 'المساعد يكتب...',
      copy: 'نسخ',
      copied: 'تم النسخ',
      quickActions: 'إجراءات سريعة',
      createWorkflow: 'إنشاء سير عمل',
      viewAnalytics: 'عرض التحليلات',
      openLibrary: 'فتح المكتبة',
      settings: 'الإعدادات',
      welcomeMessage: 'مرحباً! أنا مساعدك الذكي في تصميم المخططات'
    },
    en: {
      placeholder: 'Ask FlowCanvasAI anything...',
      send: 'Send',
      examples: [
        'How do I start creating a new diagram?',
        'What types of nodes are available?',
        'How do I connect nodes together?',
        'How do I save my project?'
      ],
      typing: 'Assistant is typing...',
      copy: 'Copy',
      copied: 'Copied',
      quickActions: 'Quick Actions',
      createWorkflow: 'Create Workflow',
      viewAnalytics: 'View Analytics',
      openLibrary: 'Open Library',
      settings: 'Settings',
      welcomeMessage: 'Hello! I\'m your AI assistant for diagram design'
    }
  };

  const t = text[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load saved preferences
  useEffect(() => {
    const savedWidth = localStorage.getItem('chatSidebarWidth');
    const savedCollapsed = localStorage.getItem('chatSidebarCollapsed');
    
    if (savedWidth) {
      setSidebarWidth(Number(savedWidth));
    }
    if (savedCollapsed) {
      setIsCollapsed(savedCollapsed === 'true');
    }
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('chatSidebarWidth', sidebarWidth.toString());
  }, [sidebarWidth]);

  useEffect(() => {
    localStorage.setItem('chatSidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

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
      if (lowerInput.includes('مخطط') || lowerInput.includes('إنشاء') || lowerInput.includes('ابدأ') || lowerInput.includes('جديد')) {
        return '🎨 **لإنشاء مخطط جديد:**\\n\\n1. **اختر العقد من القائمة الجانبية**\\n   - محفز (Trigger): نقطة البداية\\n   - إجراء (Action): المهام والعمليات\\n   - شرط (Condition): القرارات والتفرعات\\n\\n2. **اسحب العقد إلى المساحة**\\n   - استخدم السحب والإفلات\\n   - العقد ستنتظم تلقائياً\\n\\n3. **اربط العقد**\\n   - اختر أداة الربط\\n   - اضغط على العقدة الأولى ثم الثانية\\n\\nهل تريد المساعدة في خطوة معينة؟';
      }
      
      if (lowerInput.includes('عقد') || lowerInput.includes('أنواع') || lowerInput.includes('nodes')) {
        return '🔧 **أنواع العقد المتاحة:**\\n\\n**🚀 محفز (Trigger)**\\n- نقطة بداية العملية\\n- مثل: وقت محدد، حدث معين\\n\\n**⚙️ إجراء (Action)**\\n- المهام الأساسية\\n- مثل: إرسال بريد، معالجة بيانات\\n\\n**🔀 شرط (Condition)**\\n- القرارات والتفرعات\\n- مثل: إذا كان، وإلا\\n\\n**📊 بيانات (Data)**\\n- تخزين ومعالجة المعلومات\\n\\n**📅 جدولة (Schedule)**\\n- تنظيم الأوقات\\n\\n**🌐 تكامل (Integration)**\\n- ربط الأنظمة الخارجية\\n\\nأي نوع تريد معرفة المزيد عنه؟';
      }
      
      if (lowerInput.includes('ربط') || lowerInput.includes('اتصال') || lowerInput.includes('connect')) {
        return '🔗 **ربط العقد:**\\n\\n1. **اختر أداة الربط** من شريط الأدوات\\n2. **اضغط على العقدة الأولى** (المصدر)\\n3. **اضغط على العقدة الثانية** (الهدف)\\n\\n💡 **نصائح مفيدة:**\\n- يمكنك ربط عقدة بأكثر من عقدة\\n- الخط يتغير لونه حسب نوع الاتصال\\n- اضغط على الخط لحذفه\\n\\nهل تريد معرفة المزيد حول أنواع الاتصالات؟';
      }
      
      if (lowerInput.includes('حفظ') || lowerInput.includes('save') || lowerInput.includes('تصدير')) {
        return '💾 **حفظ وتصدير المشروع:**\\n\\n**حفظ المشروع:**\\n- اضغط على أيقونة الحفظ في شريط الأدوات\\n- سيتم حفظه تلقائياً في متصفحك\\n\\n**تصدير المشروع:**\\n- اختر "Export" من القائمة\\n- متاح بصيغ: JSON, PNG, SVG\\n\\n**المشاريع الحديثة:**\\n- تظهر في الصفحة الرئيسية\\n- يمكن إعادة فتحها بسهولة\\n\\nهل تريد معرفة المزيد عن خيارات التصدير؟';
      }
      
      if (lowerInput.includes('أدوات') || lowerInput.includes('tools') || lowerInput.includes('شريط')) {
        return '🛠️ **شريط الأدوات:**\\n\\n**🎯 تحديد (Select)**\\n- تحديد وتحرير العقد\\n- النقر المزدوج لتوسيع العقدة\\n\\n**✋ تحريك (Pan)**\\n- تحريك الكانفا\\n- مفيد للتنقل في المشاريع الكبيرة\\n\\n**🔗 ربط (Connect)**\\n- ربط العقد ببعضها\\n- إنشاء تدفق العمليات\\n\\n**🔍 تكبير/تصغير**\\n- استخدم عجلة الماوس\\n- أو أزرار التكبير\\n\\nأي أداة تريد معرفة المزيد عنها؟';
      }
      
      return 'مرحباً! أنا هنا لمساعدتك في إنشاء مخططات سير العمل. يمكنني مساعدتك في:\\n\\n🎨 إنشاء مخططات جديدة\\n🔧 استخدام أنواع العقد المختلفة\\n🔗 ربط العقد وإنشاء التدفقات\\n💾 حفظ وتصدير المشاريع\\n🛠️ استخدام الأدوات المتقدمة\\n\\nما الذي تحتاج مساعدة فيه؟';
    } else {
      if (lowerInput.includes('diagram') || lowerInput.includes('create') || lowerInput.includes('start') || lowerInput.includes('new')) {
        return '🎨 **To create a new diagram:**\\n\\n1. **Choose nodes from the sidebar**\\n   - Trigger: Starting point\\n   - Action: Tasks and operations\\n   - Condition: Decisions and branches\\n\\n2. **Drag nodes to the workspace**\\n   - Use drag and drop\\n   - Nodes will auto-align\\n\\n3. **Connect the nodes**\\n   - Select the connect tool\\n   - Click first node, then second node\\n\\nDo you need help with any specific step?';
      }
      
      if (lowerInput.includes('nodes') || lowerInput.includes('types') || lowerInput.includes('available')) {
        return '🔧 **Available Node Types:**\\n\\n**🚀 Trigger**\\n- Starting point of process\\n- Like: scheduled time, specific event\\n\\n**⚙️ Action**\\n- Core tasks\\n- Like: send email, process data\\n\\n**🔀 Condition**\\n- Decisions and branches\\n- Like: if/else statements\\n\\n**📊 Data**\\n- Store and process information\\n\\n**📅 Schedule**\\n- Time management\\n\\n**🌐 Integration**\\n- Connect external systems\\n\\nWhich type would you like to know more about?';
      }
      
      if (lowerInput.includes('connect') || lowerInput.includes('link') || lowerInput.includes('join')) {
        return '🔗 **Connecting Nodes:**\\n\\n1. **Select the connect tool** from toolbar\\n2. **Click the first node** (source)\\n3. **Click the second node** (target)\\n\\n💡 **Helpful tips:**\\n- You can connect one node to multiple nodes\\n- Line color changes based on connection type\\n- Click on line to delete it\\n\\nWould you like to know more about connection types?';
      }
      
      if (lowerInput.includes('save') || lowerInput.includes('export') || lowerInput.includes('download')) {
        return '💾 **Save and Export Project:**\\n\\n**Save Project:**\\n- Click save icon in toolbar\\n- Auto-saved in your browser\\n\\n**Export Project:**\\n- Choose "Export" from menu\\n- Available formats: JSON, PNG, SVG\\n\\n**Recent Projects:**\\n- Show on homepage\\n- Easy to reopen\\n\\nWant to know more about export options?';
      }
      
      if (lowerInput.includes('tools') || lowerInput.includes('toolbar') || lowerInput.includes('controls')) {
        return '🛠️ **Toolbar Guide:**\\n\\n**🎯 Select Tool**\\n- Select and edit nodes\\n- Double-click to expand nodes\\n\\n**✋ Pan Tool**\\n- Move the canvas\\n- Useful for large projects\\n\\n**🔗 Connect Tool**\\n- Link nodes together\\n- Create workflow paths\\n\\n**🔍 Zoom In/Out**\\n- Use mouse wheel\\n- Or zoom buttons\\n\\nWhich tool would you like to learn more about?';
      }
      
      return 'Hello! I\'m here to help you create workflow diagrams. I can assist you with:\\n\\n🎨 Creating new diagrams\\n🔧 Using different node types\\n🔗 Connecting nodes and creating flows\\n💾 Saving and exporting projects\\n🛠️ Using advanced tools\\n\\nWhat do you need help with?';
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

  // Toggle collapse function
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Resize functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = language === 'ar' ? startX - e.clientX : e.clientX - startX;
      const newWidth = Math.min(Math.max(280, startWidth + deltaX), 500);
      setSidebarWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [language, sidebarWidth]);

  return (
    <>
      {/* Collapse Toggle Button - Always Visible */}
      <motion.button
        onClick={toggleCollapse}
        className={`fixed ${language === 'ar' ? 'right-[-16px]' : 'left-[-16px]'} top-1/2 -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-primary to-chart-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 z-[10000] flex items-center justify-center group overflow-hidden chat-collapse-button hidden md:flex`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          x: isCollapsed ? 0 : (language === 'ar' ? -sidebarWidth : sidebarWidth)
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 opacity-100 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Arrow icon */}
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : (language === 'ar' ? -180 : 180) }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          {language === 'ar' ? (
            <ChevronLeft size={16} className="text-white drop-shadow-sm" />
          ) : (
            <ChevronRight size={16} className="text-white drop-shadow-sm" />
          )}
        </motion.div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      {/* Sidebar Container */}
      <motion.div 
        ref={sidebarRef}
        initial={false}
        animate={{ 
          width: isCollapsed ? 0 : sidebarWidth,
          opacity: isCollapsed ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed ${language === 'ar' ? 'right-0' : 'left-0'} top-0 h-screen chat-sidebar-backdrop chat-sidebar-fullscreen chat-sidebar-overlay chat-frosted-glass chat-depth-layer chat-ambient-glow ${language === 'ar' ? 'border-l' : 'border-r'} border-border z-[9999] flex flex-col hidden md:flex overflow-hidden`}
        style={{ width: isCollapsed ? 0 : sidebarWidth, height: '100vh' }}
      >
        {/* Resize Handle */}
        {!isCollapsed && (
          <div
            ref={resizeRef}
            onMouseDown={handleMouseDown}
            className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-0 bottom-0 w-1 bg-transparent hover:bg-primary/20 cursor-col-resize transition-colors duration-200 z-50 group`}
          >
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-12 bg-gradient-to-r from-primary/50 to-chart-2/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2 flex items-center justify-center">
              <GripVertical size={12} className="text-white" />
            </div>
          </div>
        )}

      {/* Main Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-h-0 chat-sidebar-content"
          >
            {/* Chat Area - Takes full height minus input */}
            <div className="flex-1 flex flex-col min-h-0 chat-frosted-glass backdrop-blur-sm">
              <ScrollArea className="flex-1 p-4 chat-scroll chat-scroll-glass backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5 rounded-lg shadow-lg">
                {messages.length === 0 ? (
                  <div className="space-y-6">
                    {/* Welcome Message */}
                    <div className="text-center py-8 chat-welcome chat-floating-element chat-depth-animation">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 chat-gradient-border">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">FlowCanvasAI</h3>
                      <p className="text-muted-foreground text-sm">
                        {t.welcomeMessage}
                      </p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">{t.quickActions}:</p>
                      <div className="grid grid-cols-1 gap-2">
                        <button className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm border border-primary/20 text-left chat-quick-action">
                          <Workflow size={16} className="text-primary" />
                          {t.createWorkflow}
                        </button>
                        <button className="flex items-center gap-3 p-3 rounded-lg bg-chart-2/10 hover:bg-chart-2/20 transition-colors text-sm border border-chart-2/20 text-left chat-quick-action">
                          <BarChart3 size={16} className="text-chart-2" />
                          {t.viewAnalytics}
                        </button>
                        <button className="flex items-center gap-3 p-3 rounded-lg bg-chart-3/10 hover:bg-chart-3/20 transition-colors text-sm border border-chart-3/20 text-left chat-quick-action">
                          <BookOpen size={16} className="text-chart-3" />
                          {t.openLibrary}
                        </button>
                        <button className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm border border-border/50 text-left chat-quick-action">
                          <Settings size={16} className="text-muted-foreground" />
                          {t.settings}
                        </button>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">
                        {language === 'ar' ? 'أمثلة للبدء:' : 'Get started with:'}
                      </p>
                      {t.examples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleClick(example)}
                          className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 text-sm border border-border/50 hover:border-primary/50"
                        >
                          <Lightbulb size={14} className={`inline-block ${language === 'ar' ? 'ml-2' : 'mr-2'} text-primary/70`} />
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} chat-message-fade-in`}
                      >
                        <div
                          className={`flex gap-3 max-w-[85%] ${
                            msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-chart-2 text-white'
                            }`}
                          >
                            {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </div>
                          
                          <div
                            className={`relative group rounded-2xl p-3 chat-message-bubble ${
                              msg.type === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-muted rounded-bl-md'
                            }`}
                          >
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                              {msg.content}
                            </div>
                            
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
                          <div className="w-8 h-8 rounded-full bg-chart-2 text-white flex items-center justify-center">
                            <Bot size={16} />
                          </div>
                          <div className="bg-muted rounded-2xl rounded-bl-md p-3 chat-message-bubble">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-primary rounded-full chat-typing-dot"></div>
                                <div className="w-2 h-2 bg-primary rounded-full chat-typing-dot"></div>
                                <div className="w-2 h-2 bg-primary rounded-full chat-typing-dot"></div>
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
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="p-4 border-t border-border chat-glass chat-floating-element">
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
                    className={`${language === 'ar' ? 'pr-10' : 'pl-10'} bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50`}
                  />
                  <Zap 
                    size={16} 
                    className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground`} 
                  />
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
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
}