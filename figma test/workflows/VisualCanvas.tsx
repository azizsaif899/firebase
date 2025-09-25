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
  Circle, 
  Save, 
  Download, 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Grid,
  MousePointer,
  Move,
  Trash2,
  Copy,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Layers,
  Palette,
  Code,
  Database,
  Mail,
  Zap,
  GitBranch,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

interface Node {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'connector' | 'data' | 'manual';
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

interface VisualCanvasProps {
  language: 'ar' | 'en';
  onClose?: () => void;
}

export function VisualCanvas({ language, onClose }: VisualCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<{ nodeId: string; port: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<'select' | 'pan' | 'connect'>('select');
  const [showGrid, setShowGrid] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'nodes' | 'properties' | 'layers'>('nodes');
  const [canvasBackground, setCanvasBackground] = useState('dots');
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isDraggingFromSidebar, setIsDraggingFromSidebar] = useState(false);
  const [dragPreviewPos, setDragPreviewPos] = useState({ x: 0, y: 0 });

  const text = {
    ar: {
      title: 'لوحة الأتمتة المرئية',
      tools: {
        select: 'تحديد',
        pan: 'تحريك',
        connect: 'ربط',
        zoom: 'تكبير',
        grid: 'الشبكة',
        save: 'حفظ',
        load: 'تحميل',
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
        connector: 'رابط',
        data: 'بيانات',
        manual: 'يدوي'
      },
      properties: {
        label: 'التسمية',
        description: 'الوصف',
        color: 'اللون',
        position: 'الموضع',
        size: 'الحجم',
        locked: 'مقفل',
        visible: 'مرئي'
      },
      actions: {
        duplicate: 'نسخ',
        delete: 'حذف',
        lock: 'قفل',
        hide: 'إخفاء'
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
        load: 'Load',
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
        connector: 'Connector',
        data: 'Data',
        manual: 'Manual'
      },
      properties: {
        label: 'Label',
        description: 'Description',
        color: 'Color',
        position: 'Position',
        size: 'Size',
        locked: 'Locked',
        visible: 'Visible'
      },
      actions: {
        duplicate: 'Duplicate',
        delete: 'Delete',
        lock: 'Lock',
        hide: 'Hide'
      }
    }
  };

  const t = text[language];

  // Node templates
  const nodeTemplates = [
    { 
      type: 'start' as const, 
      icon: Play, 
      color: '#22c55e', 
      width: 120, 
      height: 60,
      shape: 'ellipse'
    },
    { 
      type: 'process' as const, 
      icon: Square, 
      color: '#3b82f6', 
      width: 140, 
      height: 80,
      shape: 'rectangle'
    },
    { 
      type: 'decision' as const, 
      icon: Diamond, 
      color: '#f59e0b', 
      width: 120, 
      height: 100,
      shape: 'diamond'
    },
    { 
      type: 'end' as const, 
      icon: CheckCircle, 
      color: '#ef4444', 
      width: 120, 
      height: 60,
      shape: 'ellipse'
    },
    { 
      type: 'data' as const, 
      icon: Database, 
      color: '#8b5cf6', 
      width: 130, 
      height: 70,
      shape: 'parallelogram'
    },
    { 
      type: 'manual' as const, 
      icon: Users, 
      color: '#06b6d4', 
      width: 140, 
      height: 90,
      shape: 'rectangle'
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          if (selectedNode) {
            deleteNode();
            e.preventDefault();
          }
          break;
        case 'Escape':
          setSelectedNode(null);
          setTool('select');
          e.preventDefault();
          break;
        case 'd':
          if (e.ctrlKey || e.metaKey) {
            if (selectedNode) {
              duplicateNode();
              e.preventDefault();
            }
          }
          break;
        case 'g':
          setShowGrid(!showGrid);
          e.preventDefault();
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            // Save functionality would go here
            e.preventDefault();
          }
          break;
        case '1':
          setTool('select');
          e.preventDefault();
          break;
        case '2':
          setTool('pan');
          e.preventDefault();
          break;
        case '3':
          setTool('connect');
          e.preventDefault();
          break;
        case '0':
          handleReset();
          e.preventDefault();
          break;
        case '+':
        case '=':
          handleZoomIn();
          e.preventDefault();
          break;
        case '-':
          handleZoomOut();
          e.preventDefault();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, showGrid, deleteNode, duplicateNode, handleReset, handleZoomIn, handleZoomOut]);

  // Node rendering
  const renderNode = (node: Node) => {
    const template = nodeTemplates.find(t => t.type === node.type);
    if (!template || !node.isVisible) return null;

    const Icon = template.icon;
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-200 ${
          node.isSelected ? 'ring-2 ring-primary shadow-lg' : ''
        } ${node.isLocked ? 'opacity-70' : 'hover:shadow-md'}`}
        style={{
          left: node.x,
          top: node.y,
          width: node.width,
          height: node.height,
          zIndex: node.isSelected ? 10 : 1
        }}
        onMouseDown={(e) => handleNodeMouseDown(e, node)}
      >
        {/* Node shape based on type */}
        {template.shape === 'ellipse' && (
          <div
            className="w-full h-full rounded-full border-2 flex items-center justify-center"
            style={{ 
              backgroundColor: node.color + '20',
              borderColor: node.color
            }}
          >
            <div className="text-center">
              <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: node.color }} />
              <div className="text-xs font-medium truncate px-2">{node.label}</div>
            </div>
          </div>
        )}
        
        {template.shape === 'rectangle' && (
          <div
            className="w-full h-full rounded-lg border-2 flex items-center justify-center p-2"
            style={{ 
              backgroundColor: node.color + '20',
              borderColor: node.color
            }}
          >
            <div className="text-center">
              <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: node.color }} />
              <div className="text-xs font-medium truncate">{node.label}</div>
            </div>
          </div>
        )}
        
        {template.shape === 'diamond' && (
          <div
            className="w-full h-full border-2 flex items-center justify-center"
            style={{ 
              backgroundColor: node.color + '20',
              borderColor: node.color,
              transform: 'rotate(45deg)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          >
            <div className="text-center" style={{ transform: 'rotate(-45deg)' }}>
              <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: node.color }} />
              <div className="text-xs font-medium">{node.label}</div>
            </div>
          </div>
        )}
        
        {template.shape === 'parallelogram' && (
          <div
            className="w-full h-full border-2 flex items-center justify-center"
            style={{ 
              backgroundColor: node.color + '20',
              borderColor: node.color,
              transform: 'skew(-20deg)'
            }}
          >
            <div className="text-center" style={{ transform: 'skew(20deg)' }}>
              <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: node.color }} />
              <div className="text-xs font-medium truncate px-2">{node.label}</div>
            </div>
          </div>
        )}
        
        {/* Connection ports */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        
        {/* Lock indicator */}
        {node.isLocked && (
          <div className="absolute -top-2 -right-2">
            <Lock className="w-3 h-3 text-gray-500" />
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

  const toggleNodeLock = () => {
    if (!selectedNode) return;
    
    setNodes(prev => prev.map(node => 
      node.id === selectedNode.id 
        ? { ...node, isLocked: !node.isLocked }
        : node
    ));
    setSelectedNode(prev => prev ? { ...prev, isLocked: !prev.isLocked } : null);
  };

  const toggleNodeVisibility = () => {
    if (!selectedNode) return;
    
    setNodes(prev => prev.map(node => 
      node.id === selectedNode.id 
        ? { ...node, isVisible: !node.isVisible }
        : node
    ));
    setSelectedNode(prev => prev ? { ...prev, isVisible: !prev.isVisible } : null);
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.title}</h2>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Sidebar tabs */}
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            {(['nodes', 'properties', 'layers'] as const).map((tab) => (
              <Button
                key={tab}
                variant={sidebarTab === tab ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setSidebarTab(tab)}
              >
                {t.sidebar[tab]}
              </Button>
            ))}
          </div>
        </div>

        {/* Sidebar content */}
        <ScrollArea className="flex-1">
          {sidebarTab === 'nodes' && (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">{t.sidebar.nodes}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {nodeTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={template.type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, template.type)}
                        className="p-3 border border-border rounded-lg cursor-grab hover:bg-muted/50 transition-colors active:cursor-grabbing"
                      >
                        <div className="text-center">
                          <div 
                            className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: template.color + '20' }}
                          >
                            <Icon className="w-4 h-4" style={{ color: template.color }} />
                          </div>
                          <div className="text-xs font-medium">{t.nodeTypes[template.type]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {sidebarTab === 'properties' && (
            <div className="p-4 space-y-4">
              {selectedNode ? (
                <>
                  <div>
                    <Label className="text-xs">{t.properties.label}</Label>
                    <Input
                      value={selectedNode.label}
                      onChange={(e) => updateNodeProperty('label', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">{t.properties.description}</Label>
                    <Textarea
                      value={selectedNode.description || ''}
                      onChange={(e) => updateNodeProperty('description', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">{t.properties.color}</Label>
                    <div className="flex gap-2 mt-1">
                      {['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'].map((color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded border-2 ${
                            selectedNode.color === color ? 'border-foreground' : 'border-border'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => updateNodeProperty('color', color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">{t.properties.locked}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleNodeLock}
                        className="h-6 px-2"
                      >
                        {selectedNode.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">{t.properties.visible}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleNodeVisibility}
                        className="h-6 px-2"
                      >
                        {selectedNode.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={duplicateNode}
                      className="w-full justify-start"
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
                <div className="text-center text-muted-foreground text-sm py-8">
                  {language === 'ar' ? 'اختر عقدة لعرض خصائصها' : 'Select a node to view properties'}
                </div>
              )}
            </div>
          )}

          {sidebarTab === 'layers' && (
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium mb-3">{t.sidebar.layers}</h3>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-2 rounded border cursor-pointer transition-colors ${
                    selectedNode?.id === node.id ? 'bg-primary/10 border-primary' : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="text-xs font-medium truncate">{node.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {!node.isVisible && <EyeOff className="w-3 h-3 text-muted-foreground" />}
                      {node.isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-card border-b border-border p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
                  >
                    <toolItem.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
                <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* View options */}
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
                    <div className="bg-current opacity-60"></div>
                    <div className="bg-current opacity-60"></div>
                    <div className="bg-current opacity-60"></div>
                    <div className="bg-current opacity-60"></div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                {t.tools.reset}
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="ghost" size="sm">
                <Save className="w-4 h-4 mr-1" />
                {t.tools.save}
              </Button>
              
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-1" />
                {t.tools.export}
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-hidden relative">
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
            {/* Grid background */}
            {showGrid && (
              <>
                {/* Major grid lines */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--border) 2px, transparent 2px),
                      linear-gradient(to bottom, var(--border) 2px, transparent 2px)
                    `,
                    backgroundSize: '100px 100px'
                  }}
                />
                {/* Minor grid lines */}
                <div 
                  className="absolute inset-0 opacity-5"
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

            {/* Render connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map(connection => {
                const sourceNode = nodes.find(n => n.id === connection.sourceId);
                const targetNode = nodes.find(n => n.id === connection.targetId);
                
                if (!sourceNode || !targetNode) return null;
                
                const startX = sourceNode.x + sourceNode.width / 2;
                const startY = sourceNode.y + sourceNode.height / 2;
                const endX = targetNode.x + targetNode.width / 2;
                const endY = targetNode.y + targetNode.height / 2;
                
                return (
                  <line
                    key={connection.id}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={connection.color}
                    strokeWidth="2"
                    strokeDasharray={connection.style === 'dashed' ? '5,5' : 'none'}
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
              
              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="currentColor"
                  />
                </marker>
              </defs>
            </svg>

            {/* Render nodes */}
            {nodes.map(renderNode)}
            
            {/* Drag preview */}
            {isDraggingFromSidebar && (
              <div
                className="absolute pointer-events-none border-2 border-dashed border-primary/50 bg-primary/10 rounded-lg"
                style={{
                  left: dragPreviewPos.x - 60,
                  top: dragPreviewPos.y - 40,
                  width: 120,
                  height: 80,
                  zIndex: 1000
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-xs text-primary/70 font-medium">
                    {language === 'ar' ? 'إفلات هنا' : 'Drop here'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Status bar */}
        <div className="bg-card border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>{language === 'ar' ? 'العقد:' : 'Nodes:'} {nodes.length}</span>
              <span>{language === 'ar' ? 'الاتصالات:' : 'Connections:'} {connections.length}</span>
              <span>{language === 'ar' ? 'المحدد:' : 'Selected:'} {selectedNode?.label || 'None'}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{language === 'ar' ? 'التكبير:' : 'Zoom:'} {Math.round(zoom * 100)}%</span>
              <span>{language === 'ar' ? 'الأداة:' : 'Tool:'} {tool}</span>
              {snapToGrid && <Badge variant="secondary" className="text-xs">Snap</Badge>}
              {showGrid && <Badge variant="secondary" className="text-xs">Grid</Badge>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}