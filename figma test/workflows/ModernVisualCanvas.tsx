'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Play, 
  Square, 
  Diamond, 
  Save, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Grid,
  MousePointer,
  Move,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Database,
  CheckCircle,
  XCircle,
  Users,
  GitBranch,
  Maximize,
  Minimize,
  RefreshCw,
  Settings,
  Zap,
  Code,
  Calendar,
  Mail,
  Globe,
  Webhook,
  Bot,
  MessageSquare,
  FileText,
  Image,
  Filter,
  ArrowRight,
  Plus,
  Minus,
  MoreHorizontal,
  Layers,
  Circle,
  AlertTriangle
} from 'lucide-react';

interface Node {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'webhook' | 'schedule' | 'transform' | 'notification' | 'integration';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  description?: string;
  color: string;
  isSelected: boolean;
  isLocked: boolean;
  isVisible: boolean;
  isExecuting: boolean;
  status: 'idle' | 'running' | 'success' | 'error' | 'warning';
  properties: Record<string, any>;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  sourcePort: 'top' | 'right' | 'bottom' | 'left';
  targetPort: 'top' | 'right' | 'bottom' | 'left';
  label?: string;
  color: string;
  style: 'solid' | 'dashed' | 'dotted';
  isAnimated: boolean;
}

interface ModernVisualCanvasProps {
  language: 'ar' | 'en';
  onClose?: () => void;
}

export function ModernVisualCanvas({ language, onClose }: ModernVisualCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<'select' | 'pan' | 'connect'>('select');
  const [showGrid, setShowGrid] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'nodes' | 'properties' | 'layers'>('nodes');
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isDraggingFromSidebar, setIsDraggingFromSidebar] = useState(false);
  const [dragPreviewPos, setDragPreviewPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const text = {
    ar: {
      title: 'مصمم الأتمتة الحديث',
      tools: {
        select: 'تحديد',
        pan: 'تحريك',
        connect: 'ربط',
        zoom: 'تكبير',
        grid: 'الشبكة',
        save: 'حفظ',
        export: 'تصدير',
        reset: 'إعادة تعيين',
        fullscreen: 'ملء الشاشة',
        snap: 'محاذاة للشبكة'
      },
      sidebar: {
        nodes: 'العقد',
        properties: 'الخصائص',
        layers: 'الطبقات'
      },
      nodeTypes: {
        trigger: 'محفز',
        action: 'إجراء',
        condition: 'شرط',
        webhook: 'ويب هوك',
        schedule: 'جدولة',
        transform: 'تحويل',
        notification: 'إشعار',
        integration: 'تكامل'
      },
      properties: {
        label: 'التسمية',
        description: 'الوصف',
        color: 'اللون',
        status: 'الحالة'
      },
      actions: {
        duplicate: 'نسخ',
        delete: 'حذف',
        configure: 'تكوين',
        test: 'اختبار'
      },
      tips: {
        dragNodes: 'اسحب العقد إلى الكانفا لإضافتها',
        selectNode: 'اختر عقدة لعرض خصائصها'
      }
    },
    en: {
      title: 'Modern Automation Designer',
      tools: {
        select: 'Select',
        pan: 'Pan',
        connect: 'Connect',
        zoom: 'Zoom',
        grid: 'Grid',
        save: 'Save',
        export: 'Export',
        reset: 'Reset',
        fullscreen: 'Fullscreen',
        snap: 'Snap to Grid'
      },
      sidebar: {
        nodes: 'Nodes',
        properties: 'Properties',
        layers: 'Layers'
      },
      nodeTypes: {
        trigger: 'Trigger',
        action: 'Action',
        condition: 'Condition',
        webhook: 'Webhook',
        schedule: 'Schedule',
        transform: 'Transform',
        notification: 'Notification',
        integration: 'Integration'
      },
      properties: {
        label: 'Label',
        description: 'Description',
        color: 'Color',
        status: 'Status'
      },
      actions: {
        duplicate: 'Duplicate',
        delete: 'Delete',
        configure: 'Configure',
        test: 'Test'
      },
      tips: {
        dragNodes: 'Drag nodes to canvas to add them',
        selectNode: 'Select a node to view properties'
      }
    }
  };

  const t = text[language];

  // Modern node templates with beautiful designs
  const nodeTemplates = [
    { 
      type: 'trigger' as const, 
      icon: Zap, 
      color: '#00D9FF',
      accentColor: '#0EA5E9',
      bgGradient: 'from-cyan-500/20 via-sky-500/10 to-blue-500/20',
      borderGradient: 'from-cyan-400 to-blue-500',
      width: 160, 
      height: 80,
      category: 'triggers'
    },
    { 
      type: 'action' as const, 
      icon: Settings, 
      color: '#7C3AED',
      accentColor: '#8B5CF6',
      bgGradient: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
      borderGradient: 'from-purple-400 to-indigo-500',
      width: 160, 
      height: 80,
      category: 'actions'
    },
    { 
      type: 'condition' as const, 
      icon: GitBranch, 
      color: '#F59E0B',
      accentColor: '#F97316',
      bgGradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
      borderGradient: 'from-amber-400 to-orange-500',
      width: 140, 
      height: 100,
      category: 'logic'
    },
    { 
      type: 'webhook' as const, 
      icon: Webhook, 
      color: '#10B981',
      accentColor: '#059669',
      bgGradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20',
      borderGradient: 'from-emerald-400 to-teal-500',
      width: 160, 
      height: 80,
      category: 'integrations'
    },
    { 
      type: 'schedule' as const, 
      icon: Calendar, 
      color: '#EC4899',
      accentColor: '#DB2777',
      bgGradient: 'from-pink-500/20 via-rose-500/10 to-red-500/20',
      borderGradient: 'from-pink-400 to-rose-500',
      width: 160, 
      height: 80,
      category: 'triggers'
    },
    { 
      type: 'transform' as const, 
      icon: Code, 
      color: '#6366F1',
      accentColor: '#4F46E5',
      bgGradient: 'from-indigo-500/20 via-blue-500/10 to-purple-500/20',
      borderGradient: 'from-indigo-400 to-purple-500',
      width: 160, 
      height: 80,
      category: 'data'
    },
    { 
      type: 'notification' as const, 
      icon: MessageSquare, 
      color: '#EF4444',
      accentColor: '#DC2626',
      bgGradient: 'from-red-500/20 via-rose-500/10 to-pink-500/20',
      borderGradient: 'from-red-400 to-pink-500',
      width: 160, 
      height: 80,
      category: 'communication'
    },
    { 
      type: 'integration' as const, 
      icon: Globe, 
      color: '#06B6D4',
      accentColor: '#0891B2',
      bgGradient: 'from-cyan-500/20 via-teal-500/10 to-blue-500/20',
      borderGradient: 'from-cyan-400 to-blue-500',
      width: 160, 
      height: 80,
      category: 'integrations'
    }
  ];

  // Snap to grid function
  const snapToGridFn = useCallback((value: number, gridSize: number = 20) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  // Create new node with modern design
  const createNode = useCallback((type: Node['type'], x: number, y: number) => {
    const template = nodeTemplates.find(t => t.type === type);
    if (!template) return;

    const snappedX = snapToGridFn(x - template.width / 2);
    const snappedY = snapToGridFn(y - template.height / 2);

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      x: snappedX,
      y: snappedY,
      width: template.width,
      height: template.height,
      label: t.nodeTypes[type],
      description: '',
      color: template.color,
      isSelected: false,
      isLocked: false,
      isVisible: true,
      isExecuting: false,
      status: 'idle',
      properties: {}
    };

    setNodes(prev => [...prev, newNode]);
  }, [t.nodeTypes, snapToGridFn]);

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, nodeType: Node['type']) => {
    e.dataTransfer.setData('nodeType', nodeType);
    setIsDraggingFromSidebar(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType') as Node['type'];
    if (!nodeType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
    const y = (e.clientY - rect.top - canvasOffset.y) / zoom;

    createNode(nodeType, x, y);
    setIsDraggingFromSidebar(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (isDraggingFromSidebar && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
      const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
      
      setDragPreviewPos({ 
        x: snapToGridFn(x), 
        y: snapToGridFn(y) 
      });
    }
  };

  const handleDragLeave = () => {
    setIsDraggingFromSidebar(false);
  };

  // Node interaction handlers
  const handleNodeMouseDown = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    
    if (tool === 'select' && !node.isLocked) {
      setSelectedNode(node);
      setDraggedNode(node);
      
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggedNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left - dragOffset.x - canvasOffset.x) / zoom;
      const rawY = (e.clientY - rect.top - dragOffset.y - canvasOffset.y) / zoom;
      
      const x = snapToGridFn(rawX);
      const y = snapToGridFn(rawY);

      setNodes(prev => prev.map(node => 
        node.id === draggedNode.id ? { ...node, x, y } : node
      ));
    }
  }, [draggedNode, dragOffset, canvasOffset, zoom, snapToGridFn]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
  }, []);

  useEffect(() => {
    if (draggedNode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedNode, handleMouseMove, handleMouseUp]);

  // Get status color
  const getStatusColor = (status: Node['status']) => {
    switch (status) {
      case 'running': return '#3B82F6';
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  // Get status icon
  const getStatusIcon = (status: Node['status']) => {
    switch (status) {
      case 'running': return RefreshCw;
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Circle;
    }
  };

  // Modern node rendering with advanced design
  const renderNode = (node: Node) => {
    const template = nodeTemplates.find(t => t.type === node.type);
    if (!template || !node.isVisible) return null;

    const Icon = template.icon;
    const StatusIcon = getStatusIcon(node.status);
    const statusColor = getStatusColor(node.status);
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-300 group select-none ${
          node.isSelected ? 'scale-105 z-20' : 'z-10'
        } ${node.isLocked ? 'opacity-70' : 'hover:scale-105'}`}
        style={{
          left: node.x,
          top: node.y,
          width: node.width,
          height: node.height
        }}
        onMouseDown={(e) => handleNodeMouseDown(e, node)}
      >
        <div className="relative w-full h-full">
          {/* Main node container with modern glass effect */}
          <div
            className={`
              relative w-full h-full rounded-2xl border-2 backdrop-blur-xl
              bg-gradient-to-br ${template.bgGradient}
              shadow-lg group-hover:shadow-2xl transition-all duration-300
              ${node.isSelected ? 'ring-4 ring-offset-2 ring-offset-background' : ''}
            `}
            style={{
              borderImage: `linear-gradient(135deg, ${template.color}, ${template.accentColor}) 1`,
              borderColor: node.isSelected ? template.color : 'transparent',
              boxShadow: node.isSelected 
                ? `0 20px 40px -12px ${template.color}40, 0 0 0 4px ${template.color}20`
                : `0 8px 32px -8px ${template.color}30`
            }}
          >
            {/* Background glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${template.color}40, transparent 70%)`
              }}
            />
            
            {/* Content container */}
            <div className="relative h-full flex flex-col p-4">
              {/* Header with icon and status */}
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${template.color}, ${template.accentColor})`,
                  }}
                >
                  <Icon className="w-5 h-5 text-white drop-shadow-sm" />
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center gap-2">
                  {node.isExecuting && (
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  )}
                  <StatusIcon 
                    className={`w-4 h-4 ${node.status === 'running' ? 'animate-spin' : ''}`}
                    style={{ color: statusColor }}
                  />
                </div>
              </div>
              
              {/* Node label */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-sm text-foreground mb-1 truncate">
                  {node.label}
                </h3>
                {node.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {node.description}
                  </p>
                )}
              </div>
              
              {/* Type badge */}
              <div className="mt-2">
                <Badge 
                  variant="secondary" 
                  className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm"
                  style={{ color: template.color }}
                >
                  {t.nodeTypes[node.type]}
                </Badge>
              </div>
            </div>
            
            {/* Connection ports with modern design */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-white shadow-lg border-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
            </div>
            
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-white shadow-lg border-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-gray-600" />
              </div>
            </div>
            
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-white shadow-lg border-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
            </div>
            
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-white shadow-lg border-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Node controls overlay (visible on hover) */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
            {node.isLocked && (
              <div className="w-6 h-6 rounded-full bg-yellow-500 shadow-lg flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            )}
            
            <div className="w-6 h-6 rounded-full bg-gray-700 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-600">
              <MoreHorizontal className="w-3 h-3 text-white" />
            </div>
          </div>
          
          {/* Execution progress indicator */}
          {node.isExecuting && (
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-pulse">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-t-2xl animate-pulse" />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Canvas controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleReset = () => {
    setZoom(1);
    setCanvasOffset({ x: 0, y: 0 });
  };

  // Node actions
  const duplicateNode = () => {
    if (!selectedNode) return;
    
    const newNode: Node = {
      ...selectedNode,
      id: `node-${Date.now()}`,
      x: selectedNode.x + 20,
      y: selectedNode.y + 20,
      isSelected: false
    };
    
    setNodes(prev => [...prev, newNode]);
  };

  const deleteNode = () => {
    if (!selectedNode) return;
    
    setNodes(prev => prev.filter(node => node.id !== selectedNode.id));
    setConnections(prev => prev.filter(conn => 
      conn.sourceId !== selectedNode.id && conn.targetId !== selectedNode.id
    ));
    setSelectedNode(null);
  };

  const updateNodeProperty = (property: string, value: any) => {
    if (!selectedNode) return;
    
    setNodes(prev => prev.map(node => 
      node.id === selectedNode.id 
        ? { ...node, [property]: value }
        : node
    ));
    setSelectedNode(prev => prev ? { ...prev, [property]: value } : null);
  };

  // Group node templates by category
  const groupedTemplates = nodeTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof nodeTemplates>);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} flex h-screen bg-gradient-to-br from-background via-background to-muted/10`}>
      {/* Enhanced Modern Sidebar */}
      <div className="w-80 bg-card/95 backdrop-blur-xl border-r border-border/50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t.title}
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hover:bg-primary/10"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-destructive/10">
                  <XCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Modern sidebar tabs */}
          <div className="flex gap-1 bg-muted/50 p-1 rounded-xl backdrop-blur-sm">
            {(['nodes', 'properties', 'layers'] as const).map((tab) => (
              <Button
                key={tab}
                variant={sidebarTab === tab ? 'default' : 'ghost'}
                size="sm"
                className={`flex-1 text-xs transition-all duration-300 ${
                  sidebarTab === tab 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => setSidebarTab(tab)}
              >
                {t.sidebar[tab]}
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced sidebar content */}
        <ScrollArea className="flex-1">
          {sidebarTab === 'nodes' && (
            <div className="p-4 space-y-6">
              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {templates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={template.type}
                          draggable
                          onDragStart={(e) => handleDragStart(e, template.type)}
                          className="p-4 border border-border/50 rounded-xl cursor-grab hover:border-primary/50 transition-all duration-300 active:cursor-grabbing hover:scale-105 hover:shadow-xl group backdrop-blur-sm bg-gradient-to-br from-card to-muted/20"
                          title={t.nodeTypes[template.type]}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${template.color}, ${template.accentColor})`,
                              }}
                            >
                              <Icon className="w-6 h-6 text-white drop-shadow-sm" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{t.nodeTypes[template.type]}</div>
                              <div className="text-xs text-muted-foreground capitalize">{category}</div>
                            </div>
                            <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {/* Enhanced tip */}
              <div className="p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-xl border border-primary/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-xs font-semibold text-primary">
                    {language === 'ar' ? 'نصيحة سريعة' : 'Quick Tip'}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.tips.dragNodes}
                </div>
              </div>
            </div>
          )}

          {sidebarTab === 'properties' && (
            <div className="p-4 space-y-4">
              {selectedNode ? (
                <>
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                        style={{ backgroundColor: selectedNode.color }}
                      >
                        <div className="w-3 h-3 rounded bg-white/90" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{selectedNode.type.toUpperCase()}</div>
                        <div className="text-xs text-muted-foreground">Node Properties</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 block">{t.properties.label}</Label>
                      <Input
                        value={selectedNode.label}
                        onChange={(e) => updateNodeProperty('label', e.target.value)}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium mb-2 block">{t.properties.description}</Label>
                      <Textarea
                        value={selectedNode.description || ''}
                        onChange={(e) => updateNodeProperty('description', e.target.value)}
                        className="bg-background/50 backdrop-blur-sm"
                        rows={3}
                        placeholder={language === 'ar' ? 'أدخل الوصف...' : 'Enter description...'}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium mb-2 block">{t.properties.status}</Label>
                      <div className="flex gap-2 flex-wrap">
                        {['idle', 'running', 'success', 'error', 'warning'].map((status) => (
                          <Button
                            key={status}
                            variant={selectedNode.status === status ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateNodeProperty('status', status)}
                            className="text-xs capitalize"
                          >
                            {status}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-border/50" />
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={duplicateNode}
                      className="w-full justify-start hover:bg-primary/5"
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {t.actions.duplicate}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start hover:bg-blue/5"
                    >
                      <Settings className="w-3 h-3 mr-2" />
                      {t.actions.configure}
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deleteNode}
                      className="w-full justify-start"
                    >
                      <Trash2 className="w-3 h-3 mr-2" />
                      {t.actions.delete}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <Settings className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">{t.tips.selectNode}</p>
                </div>
              )}
            </div>
          )}

          {sidebarTab === 'layers' && (
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t.sidebar.layers}
              </h3>
              {nodes.length > 0 ? (
                nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                      selectedNode?.id === node.id 
                        ? 'bg-primary/10 border-primary shadow-lg scale-105' 
                        : 'border-border/50 hover:bg-muted/50 hover:shadow-md hover:scale-102'
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-lg border-2 border-white shadow-sm flex items-center justify-center"
                          style={{ backgroundColor: node.color }}
                        >
                          <div className="w-2 h-2 rounded bg-white/90" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{node.label}</span>
                          <div className="text-xs text-muted-foreground capitalize">{node.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!node.isVisible && <EyeOff className="w-3 h-3 text-muted-foreground" />}
                        {node.isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getStatusColor(node.status) }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'لا توجد عقد' : 'No nodes yet'}
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced modern toolbar */}
        <div className="bg-card/95 backdrop-blur-xl border-b border-border/50 p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Tool selection */}
              <div className="flex gap-1 bg-muted/50 p-1 rounded-xl backdrop-blur-sm">
                {[
                  { id: 'select', icon: MousePointer, label: t.tools.select },
                  { id: 'pan', icon: Move, label: t.tools.pan },
                  { id: 'connect', icon: GitBranch, label: t.tools.connect }
                ].map((toolItem) => (
                  <Button
                    key={toolItem.id}
                    variant={tool === toolItem.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTool(toolItem.id as typeof tool)}
                    title={toolItem.label}
                    className={`transition-all duration-300 ${
                      tool === toolItem.id 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <toolItem.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>

              <Separator orientation="vertical" className="h-6 bg-border/50" />

              {/* Zoom controls */}
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl backdrop-blur-sm">
                <Button variant="ghost" size="sm" onClick={handleZoomOut} className="hover:bg-muted">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs w-16 text-center font-mono bg-background/50 px-2 py-1 rounded-lg">
                  {Math.round(zoom * 100)}%
                </span>
                <Button variant="ghost" size="sm" onClick={handleZoomIn} className="hover:bg-muted">
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6 bg-border/50" />

              {/* View options */}
              <div className="flex gap-1">
                <Button
                  variant={showGrid ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  title={t.tools.grid}
                  className={showGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                
                <Button
                  variant={snapToGrid ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSnapToGrid(!snapToGrid)}
                  title={t.tools.snap}
                  className={snapToGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                >
                  <div className="w-4 h-4 relative">
                    <div className="absolute inset-0 grid grid-cols-2 gap-px">
                      <div className="bg-current opacity-60 rounded-sm"></div>
                      <div className="bg-current opacity-60 rounded-sm"></div>
                      <div className="bg-current opacity-60 rounded-sm"></div>
                      <div className="bg-current opacity-60 rounded-sm"></div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset} className="hover:bg-muted">
                <RefreshCw className="w-4 h-4 mr-1" />
                {t.tools.reset}
              </Button>
              
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              
              <Button variant="outline" size="sm" className="hover:bg-primary/5">
                <Save className="w-4 h-4 mr-1" />
                {t.tools.save}
              </Button>
              
              <Button variant="outline" size="sm" className="hover:bg-primary/5">
                <Download className="w-4 h-4 mr-1" />
                {t.tools.export}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced modern canvas */}
        <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-background via-muted/5 to-primary/5">
          <div
            ref={canvasRef}
            className="w-full h-full relative cursor-default"
            style={{
              transform: `scale(${zoom}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
              transformOrigin: 'top left'
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => setSelectedNode(null)}
          >
            {/* Enhanced modern grid background */}
            {showGrid && (
              <>
                {/* Major grid lines */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--primary) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px'
                  }}
                />
                {/* Minor grid lines */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--border) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--border) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
                {/* Grid dots for modern look */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </>
            )}

            {/* Render modern nodes */}
            {nodes.map(renderNode)}
            
            {/* Enhanced modern drag preview */}
            {isDraggingFromSidebar && (
              <div
                className="absolute pointer-events-none border-2 border-dashed border-primary/60 bg-primary/10 rounded-2xl backdrop-blur-sm"
                style={{
                  left: dragPreviewPos.x - 80,
                  top: dragPreviewPos.y - 40,
                  width: 160,
                  height: 80,
                  zIndex: 1000
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {language === 'ar' ? 'إفلات هنا' : 'Drop here'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced modern status bar */}
        <div className="bg-card/95 backdrop-blur-xl border-t border-border/50 px-4 py-2 text-xs text-muted-foreground shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary/20 flex items-center justify-center">
                  <Square className="w-2 h-2 text-primary" />
                </div>
                {language === 'ar' ? 'العقد:' : 'Nodes:'} 
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {nodes.length}
                </Badge>
              </span>
              <span className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-primary" />
                {language === 'ar' ? 'الاتصالات:' : 'Connections:'} 
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {connections.length}
                </Badge>
              </span>
              {selectedNode && (
                <span className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-primary" />
                  {language === 'ar' ? 'المحدد:' : 'Selected:'} 
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    {selectedNode.label}
                  </Badge>
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3 h-3" />
                {Math.round(zoom * 100)}%
              </span>
              <span className="flex items-center gap-1">
                <MousePointer className="w-3 h-3" />
                <Badge variant="outline" className="text-xs">{tool}</Badge>
              </span>
              {snapToGrid && <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">Snap</Badge>}
              {showGrid && <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-600">Grid</Badge>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}