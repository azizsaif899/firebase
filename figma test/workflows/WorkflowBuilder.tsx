'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface WorkflowBuilderProps {
  language: 'ar' | 'en';
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  x: number;
  y: number;
  title: string;
  description: string;
  config: any;
  connected: string[];
}

interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  fromPort: string;
  toPort: string;
}

export function WorkflowBuilder({ language }: WorkflowBuilderProps) {
  const isRTL = language === 'ar';
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<WorkflowNode | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<{ nodeId: string, port: string } | null>(null);

  const texts = {
    ar: {
      title: 'مصمم سير العمل المرئي',
      subtitle: 'اسحب وأسقط العناصر لإنشاء سير عمل مخصص',
      nodeLibrary: 'مكتبة العقد',
      canvas: 'منطقة التصميم',
      properties: 'الخصائص',
      triggers: 'المحفزات',
      actions: 'الإجراءات',
      conditions: 'الشروط',
      delays: 'التأخير',
      save: 'حفظ',
      load: 'تحميل',
      clear: 'مسح الكل',
      export: 'تصدير',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      resetZoom: 'إعادة تعيين',
      run: 'تشغيل',
      test: 'اختبار',
      nodeTypes: {
        trigger: {
          emailReceived: 'وصول بريد إلكتروني',
          fileUploaded: 'رفع ملف',
          scheduleTime: 'موعد محدد',
          webhookReceived: 'استقبال Webhook',
          dataChanged: 'تغيير البيانات'
        },
        action: {
          sendEmail: 'إرسال بريد إلكتروني',
          processData: 'معالجة البيانات',
          createReport: 'إنشاء تقرير',
          sendNotification: 'إرسال إشعار',
          updateDatabase: 'تحديث قاعدة البيانات'
        },
        condition: {
          ifThen: 'إذا كان / ثم',
          checkValue: 'فحص القيمة',
          compareData: 'مقارنة البيانات',
          validateInput: 'التحقق من الإدخال'
        },
        delay: {
          wait: 'انتظار',
          schedule: 'جدولة',
          timeout: 'انتهاء المهلة'
        }
      }
    },
    en: {
      title: 'Visual Workflow Builder',
      subtitle: 'Drag and drop elements to create custom workflows',
      nodeLibrary: 'Node Library',
      canvas: 'Design Canvas',
      properties: 'Properties',
      triggers: 'Triggers',
      actions: 'Actions',
      conditions: 'Conditions',
      delays: 'Delays',
      save: 'Save',
      load: 'Load',
      clear: 'Clear All',
      export: 'Export',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetZoom: 'Reset Zoom',
      run: 'Run',
      test: 'Test',
      nodeTypes: {
        trigger: {
          emailReceived: 'Email Received',
          fileUploaded: 'File Uploaded',
          scheduleTime: 'Scheduled Time',
          webhookReceived: 'Webhook Received',
          dataChanged: 'Data Changed'
        },
        action: {
          sendEmail: 'Send Email',
          processData: 'Process Data',
          createReport: 'Create Report',
          sendNotification: 'Send Notification',
          updateDatabase: 'Update Database'
        },
        condition: {
          ifThen: 'If Then',
          checkValue: 'Check Value',
          compareData: 'Compare Data',
          validateInput: 'Validate Input'
        },
        delay: {
          wait: 'Wait',
          schedule: 'Schedule',
          timeout: 'Timeout'
        }
      }
    }
  };

  // Node library data
  const nodeLibrary = [
    // Triggers
    {
      type: 'trigger' as const,
      subtype: 'emailReceived',
      title: texts[language].nodeTypes.trigger.emailReceived,
      description: 'Triggers when a new email is received',
      icon: '📧',
      color: 'bg-blue-500'
    },
    {
      type: 'trigger' as const,
      subtype: 'fileUploaded',
      title: texts[language].nodeTypes.trigger.fileUploaded,
      description: 'Triggers when a file is uploaded',
      icon: '📁',
      color: 'bg-blue-500'
    },
    {
      type: 'trigger' as const,
      subtype: 'scheduleTime',
      title: texts[language].nodeTypes.trigger.scheduleTime,
      description: 'Triggers at a scheduled time',
      icon: '⏰',
      color: 'bg-blue-500'
    },
    // Actions
    {
      type: 'action' as const,
      subtype: 'sendEmail',
      title: texts[language].nodeTypes.action.sendEmail,
      description: 'Sends an email message',
      icon: '✉️',
      color: 'bg-green-500'
    },
    {
      type: 'action' as const,
      subtype: 'processData',
      title: texts[language].nodeTypes.action.processData,
      description: 'Processes incoming data',
      icon: '⚙️',
      color: 'bg-green-500'
    },
    {
      type: 'action' as const,
      subtype: 'sendNotification',
      title: texts[language].nodeTypes.action.sendNotification,
      description: 'Sends a notification',
      icon: '🔔',
      color: 'bg-green-500'
    },
    // Conditions
    {
      type: 'condition' as const,
      subtype: 'ifThen',
      title: texts[language].nodeTypes.condition.ifThen,
      description: 'Conditional logic branch',
      icon: '🔀',
      color: 'bg-yellow-500'
    },
    {
      type: 'condition' as const,
      subtype: 'checkValue',
      title: texts[language].nodeTypes.condition.checkValue,
      description: 'Checks a specific value',
      icon: '✅',
      color: 'bg-yellow-500'
    },
    // Delays
    {
      type: 'delay' as const,
      subtype: 'wait',
      title: texts[language].nodeTypes.delay.wait,
      description: 'Waits for a specified duration',
      icon: '⏳',
      color: 'bg-purple-500'
    }
  ];

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Handle drag start from library
  const handleDragStart = (e: React.DragEvent, nodeTemplate: any) => {
    e.dataTransfer.setData('nodeTemplate', JSON.stringify(nodeTemplate));
  };

  // Handle drop on canvas
  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const nodeTemplate = JSON.parse(e.dataTransfer.getData('nodeTemplate'));
    
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
      const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
      
      const newNode: WorkflowNode = {
        id: generateId(),
        type: nodeTemplate.type,
        x,
        y,
        title: nodeTemplate.title,
        description: nodeTemplate.description,
        config: { subtype: nodeTemplate.subtype, icon: nodeTemplate.icon, color: nodeTemplate.color },
        connected: []
      };
      
      setNodes(prev => [...prev, newNode]);
    }
  };

  // Handle node drag
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
    setIsDragging(true);
    
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDraggedNode(node);
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && draggedNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
      const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
      
      setNodes(prev => prev.map(node => 
        node.id === draggedNode.id 
          ? { ...node, x, y }
          : node
      ));
    }
  }, [isDragging, draggedNode, canvasOffset, zoom]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggedNode(null);
  }, []);

  // Add mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Zoom functions
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  // Clear canvas
  const handleClear = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
  };

  // Get node type color
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-blue-500';
      case 'action': return 'bg-green-500';
      case 'condition': return 'bg-yellow-500';
      case 'delay': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-background via-card to-background border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="hero-text bg-gradient-to-r from-[#4F97FF] to-[#1ABC9C] bg-clip-text text-transparent">
              {texts[language].title}
            </h1>
            <p className="body-large text-muted-foreground mt-4 max-w-2xl mx-auto">
              {texts[language].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[800px]">
          
          {/* Node Library Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 h-full overflow-y-auto">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#4F97FF] rounded-full"></span>
                {texts[language].nodeLibrary}
              </h3>
              
              <Tabs defaultValue="triggers" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="triggers" className="text-xs">{texts[language].triggers}</TabsTrigger>
                  <TabsTrigger value="actions" className="text-xs">{texts[language].actions}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="triggers" className="mt-4">
                  <div className="space-y-2">
                    {nodeLibrary.filter(node => node.type === 'trigger').map((node, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className="p-3 border border-border rounded-lg cursor-grab hover:border-[#4F97FF]/50 transition-colors bg-card hover:bg-card/80"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{node.icon}</span>
                          <span className="font-medium text-sm">{node.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{node.description}</p>
                        <Badge variant="secondary" className="mt-2 text-xs bg-blue-500/10 text-blue-400">
                          {texts[language].triggers}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="actions" className="mt-4">
                  <div className="space-y-2">
                    {nodeLibrary.filter(node => node.type === 'action').map((node, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className="p-3 border border-border rounded-lg cursor-grab hover:border-[#1ABC9C]/50 transition-colors bg-card hover:bg-card/80"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{node.icon}</span>
                          <span className="font-medium text-sm">{node.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{node.description}</p>
                        <Badge variant="secondary" className="mt-2 text-xs bg-green-500/10 text-green-400">
                          {texts[language].actions}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="p-4 h-full relative overflow-hidden">
              {/* Canvas Controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm" onClick={handleResetZoom}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Button>
              </div>

              {/* Canvas */}
              <div
                ref={canvasRef}
                className="w-full h-full bg-muted/20 relative rounded-lg border-2 border-dashed border-border overflow-hidden"
                onDrop={handleCanvasDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(79, 151, 255, 0.1) 1px, transparent 1px)`,
                  backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                  backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
                }}
              >
                {nodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                      <p className="text-lg mb-2">{texts[language].canvas}</p>
                      <p className="text-sm">{texts[language].subtitle}</p>
                    </div>
                  </div>
                )}

                {/* Render Nodes */}
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute cursor-move select-none ${
                      selectedNode === node.id ? 'ring-2 ring-[#4F97FF]' : ''
                    }`}
                    style={{
                      left: node.x * zoom + canvasOffset.x,
                      top: node.y * zoom + canvasOffset.y,
                      transform: `scale(${zoom})`
                    }}
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  >
                    <div className={`
                      w-48 p-4 bg-card border border-border rounded-lg shadow-lg
                      hover:shadow-xl transition-all duration-200
                      ${getNodeColor(node.type)}/10 border-l-4 border-l-${getNodeColor(node.type).replace('bg-', '')}
                    `}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{node.config.icon}</span>
                        <span className="font-semibold text-sm">{node.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{node.description}</p>
                      <Badge variant="secondary" className={`text-xs ${node.config.color}/10`}>
                        {texts[language][node.type as keyof typeof texts[typeof language]]}
                      </Badge>
                      
                      {/* Connection Points */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-border rounded-full border-2 border-background"></div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-border rounded-full border-2 border-background"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Properties Panel */}
          <div className="lg:col-span-1">
            <Card className="p-4 h-full">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#1ABC9C] rounded-full"></span>
                {texts[language].properties}
              </h3>
              
              {selectedNode ? (
                <div className="space-y-4">
                  {(() => {
                    const node = nodes.find(n => n.id === selectedNode);
                    if (!node) return null;
                    
                    return (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{node.config.icon}</span>
                          <div>
                            <h4 className="font-medium">{node.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {texts[language][node.type as keyof typeof texts[typeof language]]}
                            </Badge>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Node ID</label>
                            <p className="text-xs text-muted-foreground font-mono">{node.id}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Position</label>
                            <p className="text-xs text-muted-foreground">
                              X: {Math.round(node.x)}, Y: {Math.round(node.y)}
                            </p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <p className="text-xs text-muted-foreground">{node.description}</p>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Configure
                          </Button>
                          
                          <Button variant="destructive" size="sm" className="w-full" onClick={() => {
                            setNodes(prev => prev.filter(n => n.id !== selectedNode));
                            setSelectedNode(null);
                          }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <p className="text-sm">Select a node to view properties</p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Action Bar */}
        <div className={`flex gap-4 mt-6 ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <Button variant="outline" onClick={handleClear}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {texts[language].clear}
          </Button>
          
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            {texts[language].load}
          </Button>
          
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {texts[language].export}
          </Button>
          
          <Button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {texts[language].test}
          </Button>
          
          <Button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {texts[language].run}
          </Button>
        </div>
      </div>
    </div>
  );
}