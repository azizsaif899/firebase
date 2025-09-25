'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Send, 
  Paperclip, 
  Smile, 
  Mic,
  ArrowLeft,
  Star,
  Archive,
  Pin,
  Trash2,
  Check,
  CheckCheck,
  Clock,
  MessageCircle,
  User,
  Bot,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Languages,
  Tag,
  UserCheck,
  Settings,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  mockContacts, 
  mockMessages, 
  getContactById, 
  getMessagesByContactId, 
  generateAIResponse, 
  generateSmartReplies,
  analyzeSentiment,
  type Contact,
  type Message,
  type SmartReply
} from '../lib/mock-chat-data';
import { useNotificationSounds } from './NotificationSounds';

interface AIFeatures {
  smartReplies: SmartReply[];
  conversationSummary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  suggestedTags: string[];
  translationLanguage: string | null;
  aiRoutingSuggestion?: string;
}

interface WhatsAppChatProps {
  language: 'ar' | 'en';
}

export function WhatsAppChat({ language }: WhatsAppChatProps) {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [aiFeatures, setAIFeatures] = useState<AIFeatures>({
    smartReplies: [],
    conversationSummary: '',
    sentiment: 'neutral',
    suggestedTags: [],
    translationLanguage: null
  });
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const soundEffects = useNotificationSounds(true);

  const isRTL = language === 'ar';

  const texts = {
    ar: {
      chats: 'المحادثات',
      search: 'البحث في المحادثات...',
      typing: 'يكتب...',
      online: 'متصل',
      lastSeen: 'آخر ظهور',
      messageInput: 'اكتب رسالة...',
      send: 'إرسال',
      smartReplies: 'ردود ذكية',
      summary: 'ملخص المحادثة',
      sentiment: 'تحليل المشاعر',
      translate: 'ترجمة',
      aiRouting: 'توزيع ذكي',
      tags: 'الوسوم',
      positive: 'إيجابي',
      neutral: 'محايد',
      negative: 'سلبي',
      aiAssistant: 'المساعد الذكي',
      conversationAnalysis: 'تحليل المحادثة',
      suggestedActions: 'إجراءات مقترحة'
    },
    en: {
      chats: 'Chats',
      search: 'Search conversations...',
      typing: 'typing...',
      online: 'online',
      lastSeen: 'last seen',
      messageInput: 'Type a message...',
      send: 'Send',
      smartReplies: 'Smart Replies',
      summary: 'Conversation Summary',
      sentiment: 'Sentiment Analysis',
      translate: 'Translate',
      aiRouting: 'AI Routing',
      tags: 'Tags',
      positive: 'Positive',
      neutral: 'Neutral',
      negative: 'Negative',
      aiAssistant: 'AI Assistant',
      conversationAnalysis: 'Conversation Analysis',
      suggestedActions: 'Suggested Actions'
    }
  };

  const t = texts[language];



  useEffect(() => {
    if (selectedContact) {
      const contactMessages = getMessagesByContactId(selectedContact);
      setMessages(contactMessages);
      generateAIFeatures(contactMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIFeatures = (messageHistory: Message[]) => {
    if (messageHistory.length === 0) return;

    const lastMessage = messageHistory[messageHistory.length - 1];
    const smartReplies = generateSmartReplies(lastMessage.content, language);
    
    // Analyze overall conversation sentiment
    const sentiments = messageHistory
      .filter(msg => !msg.isUser && msg.sentiment)
      .map(msg => msg.sentiment!);
    
    const overallSentiment = sentiments.length > 0 
      ? sentiments[sentiments.length - 1] 
      : 'neutral';

    // Generate conversation summary
    const summary = language === 'ar' 
      ? 'تحليل المحادثة: العميل يطلب المساعدة في استخدام المنصة. تم تقديم الدعم المناسب.'
      : 'Conversation Analysis: Customer requesting help with platform usage. Appropriate support provided.';

    // Suggest tags based on message content
    const suggestedTags = language === 'ar' 
      ? ['دعم فني', 'استفسار', 'مساعدة']
      : ['technical support', 'inquiry', 'assistance'];

    setAIFeatures({
      smartReplies,
      conversationSummary: summary,
      sentiment: overallSentiment as 'positive' | 'neutral' | 'negative',
      suggestedTags,
      translationLanguage: null,
      aiRoutingSuggestion: language === 'ar' 
        ? 'توصية: توجيه إلى خبير المنتج'
        : 'Recommendation: Route to product specialist'
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      contactId: selectedContact,
      content: message,
      timestamp: new Date(),
      isUser: true,
      status: 'sending',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);
    soundEffects.playMessageSent();

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    // Simulate AI response
    setTimeout(() => {
      const aiResponseContent = generateAIResponse(message, language);
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        contactId: selectedContact,
        content: aiResponseContent,
        timestamp: new Date(),
        isUser: false,
        status: 'read',
        type: 'text',
        isAI: true,
        sentiment: analyzeSentiment(aiResponseContent)
      };
      
      setMessages(prev => {
        const updatedMessages = [...prev, aiResponse];
        generateAIFeatures(updatedMessages);
        return updatedMessages;
      });
      setIsTyping(false);
      soundEffects.playMessageReceived();
    }, 2000);
  };

  const handleSmartReply = (reply: SmartReply) => {
    setMessage(reply.text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getSelectedContact = () => {
    return getContactById(selectedContact || '');
  };

  const getMessageStatus = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock size={12} className="text-muted-foreground" />;
      case 'sent':
        return <Check size={12} className="text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-muted-foreground" />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp size={12} className="text-green-500" />;
      case 'negative':
        return <TrendingDown size={12} className="text-red-500" />;
      default:
        return <Minus size={12} className="text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-background whatsapp-container">
      {/* Chat List Sidebar */}
      <div className={`w-80 bg-card border-r border-border flex flex-col whatsapp-sidebar ${isRTL ? 'border-l border-r-0' : ''}`}>
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.chats}</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAIPanel(!showAIPanel)}>
                <Bot size={16} className="text-primary" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search size={16} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground`} />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${isRTL ? 'pr-10' : 'pl-10'} bg-background/50`}
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {contacts
              .filter(contact => 
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                    selectedContact === contact.id 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {contact.isGroup ? (
                            <MessageCircle size={16} />
                          ) : (
                            contact.name.charAt(0)
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <div className="flex items-center gap-1">
                          {contact.sentiment && getSentimentIcon(contact.sentiment)}
                          <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {contact.isTyping ? (
                            <span className="text-primary flex items-center gap-1">
                              <div className="flex gap-1">
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                              {t.typing}
                            </span>
                          ) : (
                            contact.lastMessage
                          )}
                        </p>
                        
                        <div className="flex items-center gap-2 ml-2">
                          {contact.unreadCount > 0 && (
                            <Badge variant="default" className="bg-primary text-primary-foreground h-5 min-w-[20px] text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {contact.tags && contact.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {contact.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-0 px-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <ArrowLeft size={16} />
                  </Button>
                  
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={getSelectedContact()?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getSelectedContact()?.isGroup ? (
                          <MessageCircle size={16} />
                        ) : (
                          getSelectedContact()?.name.charAt(0)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {getSelectedContact()?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{getSelectedContact()?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {getSelectedContact()?.isOnline ? (
                        t.online
                      ) : (
                        `${t.lastSeen} ${getSelectedContact()?.lastSeen || '1 hour ago'}`
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getSelectedContact()?.sentiment && (
                    <Badge className={getSentimentColor(getSelectedContact()!.sentiment!)}>
                      {getSentimentIcon(getSelectedContact()!.sentiment!)}
                      <span className="ml-1 text-xs">
                        {t[getSelectedContact()!.sentiment! as keyof typeof t]}
                      </span>
                    </Badge>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 whatsapp-messages">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 relative group ${
                        msg.isUser
                          ? 'bg-primary text-primary-foreground rounded-br-md whatsapp-message-sent'
                          : 'bg-muted rounded-bl-md whatsapp-message-received'
                      }`}
                    >
                      {msg.isAI && (
                        <div className="flex items-center gap-1 mb-1">
                          <Bot size={12} className="text-chart-2" />
                          <span className="text-xs text-muted-foreground">AI Assistant</span>
                        </div>
                      )}
                      
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <div className="flex items-center gap-1">
                          {msg.sentiment && (
                            <div className="flex items-center gap-1">
                              {getSentimentIcon(msg.sentiment)}
                            </div>
                          )}
                          
                          {msg.translation && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 p-0 text-xs opacity-70 hover:opacity-100"
                            >
                              <Languages size={10} />
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <span className="text-xs opacity-70">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.isUser && getMessageStatus(msg.status)}
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
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{t.typing}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Smart Replies */}
            {aiFeatures.smartReplies.length > 0 && (
              <div className="px-4 py-2 border-t border-border bg-card/30">
                <div className="flex gap-2 overflow-x-auto">
                  {aiFeatures.smartReplies.map((reply) => (
                    <Button
                      key={reply.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSmartReply(reply)}
                      className="whitespace-nowrap text-xs bg-primary/5 hover:bg-primary/10 border-primary/20"
                    >
                      <Lightbulb size={12} className="mr-1" />
                      {reply.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messageInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>
                
                <Button variant="ghost" size="sm">
                  <Smile size={16} />
                </Button>
                
                {message.trim() ? (
                  <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary/90">
                    <Send size={16} />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm">
                    <Mic size={16} />
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Panel */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-card border-l border-border overflow-hidden whatsapp-ai-panel"
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Bot size={16} className="text-primary" />
                  {t.aiAssistant}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAIPanel(false)}>
                  <ArrowLeft size={16} />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {/* Conversation Summary */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <MessageCircle size={14} />
                    {t.summary}
                  </h4>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    {aiFeatures.conversationSummary}
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    {getSentimentIcon(aiFeatures.sentiment)}
                    {t.sentiment}
                  </h4>
                  <Badge className={getSentimentColor(aiFeatures.sentiment)}>
                    {t[aiFeatures.sentiment as keyof typeof t]}
                  </Badge>
                </div>

                {/* Suggested Tags */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Tag size={14} />
                    {t.tags}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {aiFeatures.suggestedTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* AI Routing */}
                {aiFeatures.aiRoutingSuggestion && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <UserCheck size={14} />
                      {t.aiRouting}
                    </h4>
                    <div className="p-3 bg-chart-2/10 border border-chart-2/20 rounded-lg text-sm">
                      {aiFeatures.aiRoutingSuggestion}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Zap size={14} />
                    {t.suggestedActions}
                  </h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Languages size={12} className="mr-2" />
                      {t.translate}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Star size={12} className="mr-2" />
                      Star Conversation
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Archive size={12} className="mr-2" />
                      Archive Chat
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}