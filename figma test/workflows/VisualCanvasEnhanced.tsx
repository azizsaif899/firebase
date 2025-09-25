'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
  RefreshCw
} from 'lucide-react';

interface Node {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'data' | 'manual';
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
}

interface VisualCanvasEnhancedProps {
  language: 'ar' | 'en';
  onClose?: () => void;
}

export function VisualCanvasEnhanced({ language, onClose }: VisualCanvasEnhancedProps) {
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
      title: 'كانفا الأتمتة المرئية',
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
        start: 'بداية',
        process: 'معالجة',
        decision: 'قرار',
        end: 'نهاية',
        data: 'بيانات',
        manual: 'يدوي'
      },
      properties: {
        label: 'التسمية',
        description: 'الوصف',
        color: 'اللون',
        locked: 'مقفل',
        visible: 'مرئي'
      },
      actions: {
        duplicate: 'نسخ',
        delete: 'حذف'
      },
      tips: {
        dragNodes: 'اسحب العقد إلى الكانفا لإضافتها',
        keyboardShortcuts: 'اختصارات لوحة المفاتيح متاحة',
        selectNode: 'اختر عقدة لعرض خصائصها'
      }
    },
    en: {
      title: 'Visual Automation Canvas',
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
        start: 'Start',
        process: 'Process',
        decision: 'Decision',
        end: 'End',
        data: 'Data',
        manual: 'Manual'
      },
      properties: {
        label: 'Label',
        description: 'Description',
        color: 'Color',
        locked: 'Locked',
        visible: 'Visible'
      },
      actions: {
        duplicate: 'Duplicate',
        delete: 'Delete'
      },
      tips: {
        dragNodes: 'Drag nodes to canvas to add them',
        keyboardShortcuts: 'Keyboard shortcuts available',
        selectNode: 'Select a node to view properties'
      }
    }
  };

  const t = text[language];

  // Node templates with enhanced designs
  const nodeTemplates = [
    { 
      type: 'start' as const, 
      icon: Play, 
      color: '#22c55e', 
      width: 120, 
      height: 60,
      shape: 'ellipse',
      gradient: 'from-green-400 to-green-600'
    },
    { 
      type: 'process' as const, 
      icon: Square, 
      color: '#3b82f6', 
      width: 140, 
      height: 80,
      shape: 'rectangle',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      type: 'decision' as const, 
      icon: Diamond, 
      color: '#f59e0b', 
      width: 120, 
      height: 100,
      shape: 'diamond',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      type: 'end' as const, 
      icon: CheckCircle, 
      color: '#ef4444', 
      width: 120, 
      height: 60,
      shape: 'ellipse',
      gradient: 'from-red-400 to-red-600'
    },
    { 
      type: 'data' as const, 
      icon: Database, 
      color: '#8b5cf6', 
      width: 130, 
      height: 70,
      shape: 'parallelogram',
      gradient: 'from-purple-400 to-purple-600'
    },
    { 
      type: 'manual' as const, 
      icon: Users, 
      color: '#06b6d4', 
      width: 140, 
      height: 90,
      shape: 'rectangle',
      gradient: 'from-cyan-400 to-cyan-600'
    }
  ];

  // Snap to grid function
  const snapToGridFn = useCallback((value: number, gridSize: number = 20) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  // Create new node
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
      properties: {}
    };

    setNodes(prev => [...prev, newNode]);
  }, [t.nodeTypes, snapToGridFn]);

  // Handle drag and drop from sidebar
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

  // Enhanced node rendering with better visuals
  const renderNode = (node: Node) => {
    const template = nodeTemplates.find(t => t.type === node.type);
    if (!template || !node.isVisible) return null;

    const Icon = template.icon;
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-300 group ${
          node.isSelected ? 'ring-2 ring-primary shadow-2xl scale-105' : ''
        } ${node.isLocked ? 'opacity-70' : 'hover:shadow-xl hover:scale-105'}`}
        style={{
          left: node.x,
          top: node.y,
          width: node.width,
          height: node.height,
          zIndex: node.isSelected ? 10 : 1
        }}
        onMouseDown={(e) => handleNodeMouseDown(e, node)}
      >
        {/* Enhanced node shapes with gradients */}
        {template.shape === 'ellipse' && (
          <div
            className={`w-full h-full rounded-full border-2 flex items-center justify-center bg-gradient-to-br ${template.gradient} shadow-lg`}
            style={{ 
              borderColor: node.color,
              boxShadow: `0 8px 32px ${node.color}25`
            }}
          >
            <div className="text-center text-white">
              <Icon className="w-5 h-5 mx-auto mb-1 drop-shadow-sm" />
              <div className="text-xs font-bold truncate px-2 drop-shadow-sm">{node.label}</div>
            </div>
          </div>
        )}
        
        {template.shape === 'rectangle' && (
          <div
            className={`w-full h-full rounded-xl border-2 flex items-center justify-center bg-gradient-to-br ${template.gradient} shadow-lg p-2`}
            style={{ 
              borderColor: node.color,
              boxShadow: `0 8px 32px ${node.color}25`
            }}
          >
            <div className="text-center text-white">
              <Icon className="w-5 h-5 mx-auto mb-1 drop-shadow-sm" />
              <div className="text-xs font-bold truncate drop-shadow-sm">{node.label}</div>
            </div>
          </div>
        )}
        
        {template.shape === 'diamond' && (
          <div
            className={`w-full h-full border-2 flex items-center justify-center bg-gradient-to-br ${template.gradient} shadow-lg`}
            style={{ 
              borderColor: node.color,
              transform: 'rotate(45deg)',
              borderRadius: '20%',
              boxShadow: `0 8px 32px ${node.color}25`
            }}
          >
            <div className="text-center text-white" style={{ transform: 'rotate(-45deg)' }}>
              <Icon className="w-4 h-4 mx-auto mb-1 drop-shadow-sm" />
              <div className="text-xs font-bold drop-shadow-sm">{node.label}</div>
            </div>
          </div>
        )}
        
        {template.shape === 'parallelogram' && (
          <div
            className={`w-full h-full border-2 flex items-center justify-center bg-gradient-to-br ${template.gradient} shadow-lg`}
            style={{ 
              borderColor: node.color,
              transform: 'skew(-15deg)',
              borderRadius: '8px',
              boxShadow: `0 8px 32px ${node.color}25`
            }}
          >
            <div className="text-center text-white" style={{ transform: 'skew(15deg)' }}>
              <Icon className="w-5 h-5 mx-auto mb-1 drop-shadow-sm" />
              <div className="text-xs font-bold truncate px-2 drop-shadow-sm">{node.label}</div>
            </div>
          </div>
        )}
        
        {/* Enhanced connection ports */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg" />
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg" />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg" />
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg" />
        
        {/* Enhanced indicators */}
        {node.isLocked && (
          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
            <Lock className="w-2 h-2 text-white" />
          </div>
        )}
        
        {!node.isVisible && (
          <div className="absolute -top-1 -left-1 bg-gray-500 rounded-full p-1">
            <EyeOff className="w-2 h-2 text-white" />
          </div>
        )}
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

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} flex h-screen bg-background`}>
      {/* Enhanced Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.title}
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={t.tools.fullscreen}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <XCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Enhanced sidebar tabs */}
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            {(['nodes', 'properties', 'layers'] as const).map((tab) => (
              <Button
                key={tab}
                variant={sidebarTab === tab ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 text-xs transition-all duration-200"
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
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  {t.sidebar.nodes}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {nodeTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={template.type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, template.type)}
                        className="p-3 border border-border rounded-xl cursor-grab hover:border-primary/50 transition-all duration-200 active:cursor-grabbing hover:scale-105 hover:shadow-lg group"
                        title={t.nodeTypes[template.type]}
                      >
                        <div className="text-center">
                          <div 
                            className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center bg-gradient-to-br ${template.gradient} shadow-md group-hover:shadow-lg transition-all duration-200`}
                          >
                            <Icon className="w-5 h-5 text-white drop-shadow-sm" />
                          </div>
                          <div className="text-xs font-medium">{t.nodeTypes[template.type]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Enhanced tip */}
              <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <div className="text-xs text-primary font-medium mb-1">💡 {language === 'ar' ? 'نصيحة' : 'Tip'}</div>
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
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: selectedNode.color }}
                      />
                      <span className="font-medium text-sm">{selectedNode.type.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium">{t.properties.label}</Label>
                    <Input
                      value={selectedNode.label}
                      onChange={(e) => updateNodeProperty('label', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium">{t.properties.description}</Label>
                    <Textarea
                      value={selectedNode.description || ''}
                      onChange={(e) => updateNodeProperty('description', e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder={language === 'ar' ? 'أدخل الوصف...' : 'Enter description...'}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium">{t.properties.color}</Label>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {nodeTemplates.map((template) => (
                        <button
                          key={template.color}
                          className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                            selectedNode.color === template.color ? 'border-foreground scale-110' : 'border-border hover:scale-105'
                          }`}
                          style={{ backgroundColor: template.color }}
                          onClick={() => updateNodeProperty('color', template.color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
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
                  <Square className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
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
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedNode?.id === node.id 
                        ? 'bg-primary/10 border-primary shadow-md' 
                        : 'border-border hover:bg-muted/50 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: node.color }}
                        />
                        <div>
                          <span className="text-sm font-medium">{node.label}</span>
                          <div className="text-xs text-muted-foreground">{node.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!node.isVisible && <EyeOff className="w-3 h-3 text-muted-foreground" />}
                        {node.isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Square className="w-8 h-8 mx-auto text-muted-foreground mb-2 opacity-50" />
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
        {/* Enhanced toolbar */}
        <div className="bg-card border-b border-border p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Tool selection */}
              <div className="flex gap-1 bg-muted p-1 rounded-lg">
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
                    className="transition-all duration-200"
                  >
                    <toolItem.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Zoom controls */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs w-16 text-center font-mono">{Math.round(zoom * 100)}%</span>
                <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* View options */}
              <div className="flex gap-1">
                <Button
                  variant={showGrid ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  title={t.tools.grid}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                
                <Button
                  variant={snapToGrid ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSnapToGrid(!snapToGrid)}
                  title={t.tools.snap}
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
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-1" />
                {t.tools.reset}
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-1" />
                {t.tools.save}
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                {t.tools.export}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced canvas */}
        <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-background to-muted/20">
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
            {/* Enhanced grid background */}
            {showGrid && (
              <>
                {/* Major grid lines */}
                <div 
                  className="absolute inset-0 opacity-20"
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
              </>
            )}

            {/* Render nodes */}
            {nodes.map(renderNode)}
            
            {/* Enhanced drag preview */}
            {isDraggingFromSidebar && (
              <div
                className="absolute pointer-events-none border-2 border-dashed border-primary/60 bg-primary/10 rounded-xl backdrop-blur-sm"
                style={{
                  left: dragPreviewPos.x - 60,
                  top: dragPreviewPos.y - 40,
                  width: 120,
                  height: 80,
                  zIndex: 1000
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-primary/70 font-bold text-lg mb-1">+</div>
                    <div className="text-xs text-primary/70 font-medium">
                      {language === 'ar' ? 'إفلات هنا' : 'Drop here'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced status bar */}
        <div className="bg-card border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Square className="w-3 h-3" />
                {language === 'ar' ? 'العقد:' : 'Nodes:'} 
                <Badge variant="secondary" className="text-xs">{nodes.length}</Badge>
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                {language === 'ar' ? 'الاتصالات:' : 'Connections:'} 
                <Badge variant="secondary" className="text-xs">{connections.length}</Badge>
              </span>
              {selectedNode && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {language === 'ar' ? 'المحدد:' : 'Selected:'} 
                  <Badge variant="outline" className="text-xs">{selectedNode.label}</Badge>
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>{language === 'ar' ? 'التكبير:' : 'Zoom:'} {Math.round(zoom * 100)}%</span>
              <span>{language === 'ar' ? 'الأداة:' : 'Tool:'} <Badge variant="outline" className="text-xs">{tool}</Badge></span>
              {snapToGrid && <Badge variant="secondary" className="text-xs">Snap</Badge>}
              {showGrid && <Badge variant="secondary" className="text-xs">Grid</Badge>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}