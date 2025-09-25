'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { 
  Play, 
  Settings, 
  GitBranch, 
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
  Calendar,
  Globe,
  Code,
  MessageSquare,
  Zap,
  Maximize,
  Minimize,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Layers,
  Circle,
  AlertTriangle,
  ArrowRight,
  Focus,
  Navigation
} from 'lucide-react';

interface Node {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'data' | 'schedule' | 'integration' | 'output';
  x: number;
  y: number;
  size: number;
  label: string;
  description?: string;
  isSelected: boolean;
  isExpanded: boolean;
  isLocked: boolean;
  isVisible: boolean;
  isExecuting: boolean;
  isAutoMoved: boolean;
  status: 'idle' | 'running' | 'success' | 'error' | 'warning';
  properties: Record<string, any>;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  color: string;
  isAnimated: boolean;
}

interface MinimalistCanvasProps {
  language: 'ar' | 'en';
  onClose?: () => void;
}

export function MinimalistCanvas({ language, onClose }: MinimalistCanvasProps) {
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<Node | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [nodeToConfig, setNodeToConfig] = useState<Node | null>(null);
  const [dragPreviewCollision, setDragPreviewCollision] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const text = {
    ar: {
      title: 'مصمم العمليات',
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
        snap: 'محاذاة',
        zoomIn: 'تكبير',
        zoomOut: 'تصغير',
        fitToScreen: 'ملء الشاشة',
        center: 'توسيط'
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
        data: 'بيانات',
        schedule: 'جدولة',
        integration: 'تكامل',
        output: 'مخرجات'
      },
      properties: {
        label: 'التسمية',
        description: 'الوصف',
        status: 'الحالة'
      },
      actions: {
        duplicate: 'نسخ',
        delete: 'حذف',
        configure: 'تكوين'
      },
      tips: {
        dragNodes: 'اسحب العقد إلى المساحة',
        selectNode: 'اختر عقدة لعرض خصائصها',
        mouseWheelZoom: 'استخدم عجلة الماوس للتكبير والتصغير',
        middleClickPan: 'اضغط الزر الأوسط أو Ctrl+اسحب للتحريك',
        panTool: 'أداة التحريك نشطة - اسحب لتحريك الكانفا'
      }
    },
    en: {
      title: 'Flow Designer',
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
        snap: 'Snap',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        fitToScreen: 'Fit to Screen',
        center: 'Center View'
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
        data: 'Data',
        schedule: 'Schedule',
        integration: 'Integration',
        output: 'Output'
      },
      properties: {
        label: 'Label',
        description: 'Description',
        status: 'Status'
      },
      actions: {
        duplicate: 'Duplicate',
        delete: 'Delete',
        configure: 'Configure'
      },
      tips: {
        dragNodes: 'Drag nodes to workspace',
        selectNode: 'Select a node to view properties',
        mouseWheelZoom: 'Use mouse wheel to zoom in/out',
        middleClickPan: 'Middle-click or Ctrl+drag to pan',
        panTool: 'Pan tool active - drag to move canvas'
      }
    }
  };

  const t = text[language];

  // Node templates
  const nodeTemplates = [
    { type: 'trigger' as const, icon: Play, size: 60, category: 'start' },
    { type: 'action' as const, icon: Settings, size: 60, category: 'process' },
    { type: 'condition' as const, icon: GitBranch, size: 60, category: 'decision' },
    { type: 'data' as const, icon: Database, size: 60, category: 'process' },
    { type: 'schedule' as const, icon: Calendar, size: 60, category: 'time' },
    { type: 'integration' as const, icon: Globe, size: 60, category: 'external' },
    { type: 'output' as const, icon: MessageSquare, size: 60, category: 'end' }
  ];

  // Grid and collision detection
  const snapToGridFn = useCallback((value: number, gridSize: number = 220) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  const snapToVerticalGrid = useCallback((value: number, gridSize: number = 120) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  const checkCollision = useCallback((x: number, y: number, excludeNodeId?: string) => {
    const nodeWidth = 200;
    const nodeHeight = 100;
    const padding = 10;
    
    return nodes.some(node => {
      if (excludeNodeId && node.id === excludeNodeId) return false;
      
      const existingLeft = node.x - padding;
      const existingRight = node.x + nodeWidth + padding;
      const existingTop = node.y - padding;
      const existingBottom = node.y + nodeHeight + padding;
      
      const newLeft = x;
      const newRight = x + nodeWidth;
      const newTop = y;
      const newBottom = y + nodeHeight;
      
      return !(newRight <= existingLeft || 
               newLeft >= existingRight || 
               newBottom <= existingTop || 
               newTop >= existingBottom);
    });
  }, [nodes]);

  const findAvailablePosition = useCallback((preferredX: number, preferredY: number, excludeNodeId?: string) => {
    const gridX = 220;
    const gridY = 120;
    
    let x = snapToGridFn(preferredX);
    let y = snapToVerticalGrid(preferredY);
    
    if (!checkCollision(x, y, excludeNodeId)) {
      return { x, y };
    }
    
    // Search pattern for available position
    for (let offset = 1; offset <= 10; offset++) {
      const rightX = x + (offset * gridX);
      if (rightX >= 0 && rightX < 2000 && !checkCollision(rightX, y, excludeNodeId)) {
        return { x: rightX, y };
      }
    }
    
    for (let offset = 1; offset <= 10; offset++) {
      const downY = y + (offset * gridY);
      if (downY >= 0 && downY < 2000 && !checkCollision(x, downY, excludeNodeId)) {
        return { x, y: downY };
      }
    }
    
    return { x: (nodes.length + 1) * gridX, y };
  }, [snapToGridFn, snapToVerticalGrid, checkCollision, nodes]);

  // Enhanced Canvas controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.2));
  const handleReset = () => {
    setZoom(1);
    setCanvasOffset({ x: 0, y: 0 });
  };

  const handleFitToScreen = () => {
    if (nodes.length === 0) return;
    
    const padding = 100;
    const minX = Math.min(...nodes.map(n => n.x)) - padding;
    const maxX = Math.max(...nodes.map(n => n.x + 200)) + padding;
    const minY = Math.min(...nodes.map(n => n.y)) - padding;
    const maxY = Math.max(...nodes.map(n => n.y + 100)) + padding;
    
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    
    if (!canvasRef.current) return;
    
    const containerWidth = canvasRef.current.clientWidth;
    const containerHeight = canvasRef.current.clientHeight;
    
    const zoomX = containerWidth / contentWidth;
    const zoomY = containerHeight / contentHeight;
    const newZoom = Math.min(zoomX, zoomY, 1);
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const offsetX = containerWidth / 2 - centerX * newZoom;
    const offsetY = containerHeight / 2 - centerY * newZoom;
    
    setZoom(newZoom);
    setCanvasOffset({ x: offsetX, y: offsetY });
  };

  const handleCenterView = () => {
    if (nodes.length === 0) {
      setCanvasOffset({ x: 0, y: 0 });
      return;
    }
    
    const centerX = nodes.reduce((sum, n) => sum + n.x + 100, 0) / nodes.length;
    const centerY = nodes.reduce((sum, n) => sum + n.y + 50, 0) / nodes.length;
    
    if (!canvasRef.current) return;
    
    const containerWidth = canvasRef.current.clientWidth;
    const containerHeight = canvasRef.current.clientHeight;
    
    const offsetX = containerWidth / 2 - centerX * zoom;
    const offsetY = containerHeight / 2 - centerY * zoom;
    
    setCanvasOffset({ x: offsetX, y: offsetY });
  };

  // Mouse and canvas interaction
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!canvasRef.current) return;
    e.preventDefault();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.2), 3);
    
    const zoomRatio = newZoom / zoom;
    const newOffsetX = mouseX - (mouseX - canvasOffset.x) * zoomRatio;
    const newOffsetY = mouseY - (mouseY - canvasOffset.y) * zoomRatio;
    
    setZoom(newZoom);
    setCanvasOffset({ x: newOffsetX, y: newOffsetY });
  }, [zoom, canvasOffset]);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const isPanClick = e.button === 1 || (e.button === 0 && (e.ctrlKey || tool === 'pan'));
    
    if (isPanClick) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
    }
  };

  const handleCanvasPan = useCallback((e: MouseEvent) => {
    if (isPanning) {
      const newOffsetX = e.clientX - panStart.x;
      const newOffsetY = e.clientY - panStart.y;
      setCanvasOffset({ x: newOffsetX, y: newOffsetY });
    }
  }, [isPanning, panStart]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    if (isPanning) {
      document.addEventListener('mousemove', handleCanvasPan);
      document.addEventListener('mouseup', handleCanvasMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleCanvasPan);
        document.removeEventListener('mouseup', handleCanvasMouseUp);
      };
    }
  }, [isPanning, handleCanvasPan, handleCanvasMouseUp]);

  // Node creation and interaction
  const createNode = useCallback((type: Node['type'], x: number, y: number) => {
    const template = nodeTemplates.find(t => t.type === type);
    if (!template) return;

    const preferredX = x - 100;
    const preferredY = y - 50;
    const { x: availableX, y: availableY } = findAvailablePosition(preferredX, preferredY);
    
    const wasAutoMoved = (availableX !== snapToGridFn(preferredX)) || (availableY !== snapToVerticalGrid(preferredY));

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      x: availableX,
      y: availableY,
      size: template.size,
      label: t.nodeTypes[type],
      description: '',
      isSelected: false,
      isExpanded: false,
      isLocked: false,
      isVisible: true,
      isExecuting: false,
      isAutoMoved: wasAutoMoved,
      status: 'idle',
      properties: {}
    };

    setNodes(prev => [...prev, newNode]);
    
    if (wasAutoMoved) {
      setTimeout(() => {
        setNodes(current => current.map(n => 
          n.id === newNode.id ? { ...n, isAutoMoved: false } : n
        ));
      }, 2000);
    }
  }, [t.nodeTypes, findAvailablePosition, snapToGridFn, snapToVerticalGrid]);

  // Get node color
  const getNodeColor = (status: Node['status'], isSelected: boolean) => {
    if (isSelected) return '#4F97FF';
    
    switch (status) {
      case 'running': return '#4F97FF';
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} flex h-screen bg-background`}>
      {/* Sidebar */}
      <div className="w-80 bg-card border-r flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">{t.title}</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={t.tools.fullscreen}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </Button>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <XCircle size={16} />
                </Button>
              )}
            </div>
          </div>
          
          {/* Tool Selection */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {([
              { id: 'select', icon: MousePointer, label: t.tools.select },
              { id: 'pan', icon: Move, label: t.tools.pan },
              { id: 'connect', icon: GitBranch, label: t.tools.connect }
            ] as const).map((toolItem) => (
              <Button
                key={toolItem.id}
                variant={tool === toolItem.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTool(toolItem.id)}
                className="flex-1"
                title={toolItem.label}
              >
                <toolItem.icon size={14} className="mr-1" />
                {toolItem.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                {t.tips.dragNodes}
              </div>
              
              {/* Node Templates */}
              <div className="grid grid-cols-2 gap-3">
                {nodeTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.type}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('nodeType', template.type)}
                      className="group p-4 bg-card border-2 border-dashed border-border hover:border-primary/50 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-muted/50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <span className="text-xs text-center font-medium">
                          {t.nodeTypes[template.type]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-card border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.2}
                  title={t.tools.zoomOut}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut size={16} />
                </Button>
                
                <div className="px-3 py-1 text-sm font-mono min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  title={t.tools.zoomIn}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn size={16} />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* View Controls */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  title={t.tools.reset}
                  className="h-8"
                >
                  <RotateCcw size={16} className="mr-1" />
                  {t.tools.reset}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFitToScreen}
                  title={t.tools.fitToScreen}
                  className="h-8"
                  disabled={nodes.length === 0}
                >
                  <Focus size={16} className="mr-1" />
                  {t.tools.fitToScreen}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCenterView}
                  title={t.tools.center}
                  className="h-8"
                  disabled={nodes.length === 0}
                >
                  <Navigation size={16} className="mr-1" />
                  {t.tools.center}
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Grid Toggle */}
              <Button
                variant={showGrid ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
                title={t.tools.grid}
                className="h-8"
              >
                <Grid size={16} className="mr-1" />
                {t.tools.grid}
              </Button>

              {/* Snap Toggle */}
              <Button
                variant={snapToGrid ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSnapToGrid(!snapToGrid)}
                title={t.tools.snap}
                className="h-8"
              >
                <CheckCircle size={16} className="mr-1" />
                {t.tools.snap}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save size={16} className="mr-1" />
                {t.tools.save}
              </Button>
              
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-1" />
                {t.tools.export}
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <div
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onDrop={(e) => {
              e.preventDefault();
              const nodeType = e.dataTransfer.getData('nodeType') as Node['type'];
              if (!nodeType || !canvasRef.current) return;

              const rect = canvasRef.current.getBoundingClientRect();
              const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
              const y = (e.clientY - rect.top - canvasOffset.y) / zoom;

              createNode(nodeType, x, y);
            }}
            onDragOver={(e) => e.preventDefault()}
            className={`
              w-full h-full bg-background relative overflow-hidden
              ${tool === 'pan' || isPanning ? 'cursor-grab' : 'cursor-default'}
              ${isPanning ? 'cursor-grabbing' : ''}
            `}
            style={{
              backgroundImage: showGrid
                ? `radial-gradient(circle, rgba(79, 151, 255, 0.1) 1px, transparent 1px)`
                : 'none',
              backgroundSize: showGrid ? '20px 20px' : 'auto',
              backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
            }}
          >
            {/* Canvas Content */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              {/* Enhanced Grid */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(79, 151, 255, 0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(79, 151, 255, 0.15) 1px, transparent 1px)
                      `,
                      backgroundSize: '220px 120px'
                    }}
                  />
                </div>
              )}

              {/* Empty state */}
              {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                      <Plus size={32} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg mb-2">
                      {language === 'ar' ? 'ابدأ بإضافة العقد' : 'Start by adding nodes'}
                    </p>
                    <p className="text-muted-foreground/70 text-sm">
                      {t.tips.dragNodes}
                    </p>
                  </div>
                </div>
              )}

              {/* Render nodes */}
              {nodes.map((node) => {
                const template = nodeTemplates.find(t => t.type === node.type);
                if (!template || !node.isVisible) return null;
                
                const Icon = template.icon;
                const nodeColor = getNodeColor(node.status, node.isSelected);
                
                return (
                  <div
                    key={node.id}
                    className={`absolute cursor-pointer transition-all duration-300 group select-none ${
                      node.isSelected ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      left: node.x,
                      top: node.y,
                      width: node.size,
                      height: node.size
                    }}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div
                      className={`
                        relative w-full h-full rounded-full
                        border-2 backdrop-blur-sm bg-primary/10
                        transition-all duration-300
                        ${node.isSelected ? 'scale-110 border-primary' : 'border-primary/30 group-hover:scale-105'}
                        ${node.status === 'running' ? 'animate-pulse' : ''}
                        ${node.isAutoMoved ? 'shadow-lg shadow-orange-500/50' : ''}
                      `}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon 
                          className="transition-all duration-300 text-primary"
                          size={node.size * 0.4}
                        />
                      </div>
                      
                      {node.status !== 'idle' && (
                        <div 
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                            node.status === 'running' ? 'animate-pulse bg-blue-500' : 
                            node.status === 'success' ? 'bg-green-500' :
                            node.status === 'error' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}
                        />
                      )}

                      {/* Auto-moved indicator - visual only */}
                      {node.isAutoMoved && (
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-background animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-card border-t px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{Math.round(zoom * 100)}%</span>
            <span className="capitalize">{tool}</span>
            {showGrid && (
              <span>
                {language === 'ar' ? 'شبكة: 220×120' : 'Grid: 220×120'}
              </span>
            )}
            <span>
              {language === 'ar' ? `عدد العقد: ${nodes.length}` : `Nodes: ${nodes.length}`}
            </span>
            {snapToGrid && (
              <span className="text-green-500">
                {language === 'ar' ? 'منع التراكب: مفعل' : 'Anti-collision: ON'}
              </span>
            )}
          </div>
          
          <div className="text-muted-foreground">
            {tool === 'pan' && (
              <span className="text-blue-500">{t.tips.panTool}</span>
            )}
            {tool === 'select' && (
              <span>{t.tips.mouseWheelZoom}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}