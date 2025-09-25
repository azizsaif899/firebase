'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
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
  Database,
  CheckCircle,
  XCircle,
  Calendar,
  Globe,
  MessageSquare,
  Minimize,
  ArrowRight,
  X
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

export function MinimalistCanvasNoSidebar({ language, onClose }: MinimalistCanvasProps) {
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
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isDraggingFromSidebar, setIsDraggingFromSidebar] = useState(false);
  const [dragPreviewPos, setDragPreviewPos] = useState({ x: 0, y: 0 });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<Node | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [nodeToConfig, setNodeToConfig] = useState<Node | null>(null);
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
      nodeTypes: {
        trigger: 'محفز',
        action: 'إجراء',
        condition: 'شرط',
        data: 'بيانات',
        schedule: 'جدولة',
        integration: 'تكامل',
        output: 'مخرجات'
      },
      tips: {
        dragNodes: 'اسحب العقد إلى المساحة',
        selectNode: 'اختر عقدة لعرض خصائصها',
        mouseWheelZoom: 'استخدم عجلة الماوس للتكبير والتصغير',
        middleClickPan: 'اضغط الزر الأوسط أو Ctrl+اسحب للتحريك',
        panTool: 'أداة التحريك نشطة - اسحب لتحريك الكانفا',
        dropHere: 'الإفلات هنا'
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
      nodeTypes: {
        trigger: 'Trigger',
        action: 'Action',
        condition: 'Condition',
        data: 'Data',
        schedule: 'Schedule',
        integration: 'Integration',
        output: 'Output'
      },
      tips: {
        dragNodes: 'Drag nodes to workspace',
        selectNode: 'Select a node to view properties',
        mouseWheelZoom: 'Use mouse wheel to zoom in/out',
        middleClickPan: 'Middle-click or Ctrl+drag to pan',
        panTool: 'Pan tool active - drag to move canvas',
        dropHere: 'Drop here'
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

  // Grid functions
  const snapToGridFn = useCallback((value: number, gridSize: number = 220) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  const snapToVerticalGrid = useCallback((value: number, gridSize: number = 120) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  // Collision detection
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

  // Find available position
  const findAvailablePosition = useCallback((preferredX: number, preferredY: number, excludeNodeId?: string) => {
    const gridX = 220;
    const gridY = 120;
    
    let x = snapToGridFn(preferredX);
    let y = snapToVerticalGrid(preferredY);
    
    if (!checkCollision(x, y, excludeNodeId)) {
      return { x, y };
    }
    
    // Search for available position
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

  // Node creation
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

  // Drag and Drop
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
      
      const snappedX = snapToGridFn(x);
      const snappedY = snapToVerticalGrid(y);
      
      setDragPreviewPos({ x: snappedX, y: snappedY });
    }
  };

  const handleDragLeave = () => {
    setIsDraggingFromSidebar(false);
  };

  // Node interaction handlers
  const handleNodeClick = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    
    if (tool === 'select' && !node.isLocked) {
      setSelectedNode(node);
      
      // Toggle expanded state
      setNodes(prev => prev.map(n => 
        n.id === node.id 
          ? { ...n, isExpanded: !n.isExpanded }
          : { ...n, isExpanded: false } // Collapse other nodes
      ));
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    
    if (tool === 'select' && !node.isLocked && node.isExpanded) {
      // Only allow dragging if node is expanded and we're not clicking on buttons
      const target = e.target as HTMLElement;
      if (!target.closest('button')) {
        setDraggedNode(node);
        
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    } else if (!node.isExpanded) {
      // For collapsed nodes, allow dragging
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
      
      // Find available position near the desired location
      const { x, y } = findAvailablePosition(rawX, rawY, draggedNode.id);

      setNodes(prev => prev.map(node => 
        node.id === draggedNode.id ? { ...node, x, y } : node
      ));
    }
  }, [draggedNode, dragOffset, canvasOffset, zoom, findAvailablePosition]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
  }, []);

  // Mouse wheel zoom
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

  // Canvas panning
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

  // Node actions
  const handleNodeConfigure = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    setNodeToConfig(node);
    setShowConfigDialog(true);
  };

  const handleNodeDelete = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    setNodeToDelete(node);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (nodeToDelete) {
      setNodes(prev => prev.filter(n => n.id !== nodeToDelete.id));
      setConnections(prev => prev.filter(conn => 
        conn.sourceId !== nodeToDelete.id && conn.targetId !== nodeToDelete.id
      ));
      if (selectedNode?.id === nodeToDelete.id) {
        setSelectedNode(null);
      }
    }
    setShowDeleteConfirm(false);
    setNodeToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setNodeToDelete(null);
  };

  const handleConfigSave = (updatedNode: Node) => {
    setNodes(prev => prev.map(n => 
      n.id === updatedNode.id ? updatedNode : n
    ));
    if (selectedNode?.id === updatedNode.id) {
      setSelectedNode(updatedNode);
    }
    setShowConfigDialog(false);
    setNodeToConfig(null);
  };

  const handleConfigCancel = () => {
    setShowConfigDialog(false);
    setNodeToConfig(null);
  };

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

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

  // Node color
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

  // Node rendering
  const renderNode = (node: Node) => {
    const template = nodeTemplates.find(t => t.type === node.type);
    if (!template || !node.isVisible) return null;

    const Icon = template.icon;
    const nodeColor = getNodeColor(node.status, node.isSelected);
    
    if (node.isExpanded) {
      // Expanded rectangular node
      return (
        <div
          key={node.id}
          className={`absolute cursor-pointer transition-all duration-500 group select-none z-30`}
          style={{
            left: node.x - 60, // Center the expanded node
            top: node.y - 20,
            width: 200,
            height: 100
          }}
          onMouseDown={(e) => handleNodeMouseDown(e, node)}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Expanded node container */}
          <div
            className="relative w-full h-full rounded-2xl border-2 backdrop-blur-sm bg-card shadow-xl transition-all duration-500"
            style={{
              borderColor: nodeColor,
              boxShadow: node.isAutoMoved 
                ? `0 0 0 4px #F59E0B15, 0 12px 40px #F59E0B25, 0 0 20px #F59E0B` 
                : `0 0 0 4px ${nodeColor}15, 0 12px 40px ${nodeColor}25`
            }}
          >
            {/* Header with icon and close button */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: `${nodeColor}20`,
                    color: nodeColor
                  }}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-foreground truncate max-w-[100px]">
                    {node.label}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize">
                    {node.type}
                  </p>
                </div>
              </div>
              
              {/* Status and close */}
              <div className="flex items-center gap-2">
                {node.status !== 'idle' && (
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: nodeColor }}
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 hover:bg-muted"
                  onClick={(e) => handleNodeClick(e, node)}
                >
                  <Minimize size={12} />
                </Button>
              </div>
            </div>
            
            {/* Description if available */}
            {node.description && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {node.description}
                </p>
              </div>
            )}
            
            {/* Action buttons - Icons only */}
            <div className="flex items-center justify-end gap-2 p-4 pt-2 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-primary/10"
                onClick={(e) => handleNodeConfigure(e, node)}
                title={language === 'ar' ? 'إعدادات العقدة' : 'Node Settings'}
              >
                <Settings size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive"
                onClick={(e) => handleNodeDelete(e, node)}
                title={language === 'ar' ? 'حذف العقدة' : 'Delete Node'}
              >
                <Trash2 size={14} />
              </Button>
            </div>
            
            {/* Execution progress indicator */}
            {node.isExecuting && (
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-pulse">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-t-2xl animate-pulse" />
              </div>
            )}

            {/* Enhanced connection ports for expanded node */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-background border-2 rounded-full shadow-md flex items-center justify-center"
                 style={{ borderColor: nodeColor }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: nodeColor }} />
            </div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-background border-2 rounded-full shadow-md flex items-center justify-center"
                 style={{ borderColor: nodeColor }}>
              <ArrowRight size={12} style={{ color: nodeColor }} />
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-background border-2 rounded-full shadow-md flex items-center justify-center"
                 style={{ borderColor: nodeColor }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: nodeColor }} />
            </div>
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-background border-2 rounded-full shadow-md flex items-center justify-center"
                 style={{ borderColor: nodeColor }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: nodeColor }} />
            </div>
          </div>
        </div>
      );
    }

    // Collapsed circular node (original design)
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-300 group select-none ${
          node.isSelected ? 'z-20' : 'z-10'
        } ${node.isLocked ? 'opacity-70' : ''}`}
        style={{
          left: node.x,
          top: node.y,
          width: node.size,
          height: node.size
        }}
        onMouseDown={(e) => handleNodeMouseDown(e, node)}
        onClick={(e) => handleNodeClick(e, node)}
      >
        {/* Main node circle */}
        <div
          className={`
            relative w-full h-full rounded-full
            border-2 backdrop-blur-sm
            transition-all duration-300
            ${node.isSelected ? 'scale-110' : 'group-hover:scale-105'}
            ${node.status === 'running' ? 'animate-pulse' : ''}
          `}
          style={{
            backgroundColor: `${nodeColor}15`,
            borderColor: nodeColor,
            boxShadow: node.isAutoMoved
              ? `0 0 0 4px #F59E0B25, 0 8px 32px #F59E0B30, 0 0 15px #F59E0B`
              : node.isSelected 
                ? `0 0 0 4px ${nodeColor}25, 0 8px 32px ${nodeColor}30`
                : `0 4px 16px ${nodeColor}20`
          }}
        >
          {/* Icon container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon 
              className="transition-all duration-300"
              style={{ color: nodeColor }}
              size={node.size * 0.4}
            />
          </div>
          
          {/* Status indicator */}
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

          {/* Auto-moved indicator */}
          {node.isAutoMoved && (
            <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-background animate-pulse" />
          )}

          {/* Node label on hover */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border shadow-lg z-50">
            {node.label}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-background relative">
      {/* Top Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left section - Tools */}
          <div className="flex items-center gap-2">
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
                  className="px-3"
                  title={toolItem.label}
                >
                  <toolItem.icon size={16} />
                </Button>
              ))}
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(prev => Math.min(prev * 1.2, 3))}
                title={t.tools.zoomIn}
              >
                <ZoomIn size={16} />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(prev => Math.max(prev * 0.8, 0.2))}
                title={t.tools.zoomOut}
              >
                <ZoomOut size={16} />
              </Button>
            </div>

            {/* Grid toggle */}
            <Button
              variant={showGrid ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              title={t.tools.grid}
            >
              <Grid size={16} />
            </Button>
          </div>

          {/* Center section - Title */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">{t.title}</h1>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" title={t.tools.save}>
              <Save size={16} />
            </Button>
            <Button variant="ghost" size="sm" title={t.tools.export}>
              <Download size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setNodes([])}>
              <RotateCcw size={16} />
            </Button>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 pt-16 overflow-hidden cursor-crosshair bg-background"
        style={{
          cursor: tool === 'pan' ? 'grab' : tool === 'select' ? 'default' : 'crosshair'
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
      >
        {/* Grid Pattern */}
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: `${220 * zoom}px ${120 * zoom}px`,
              backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
              color: 'var(--border)'
            }}
          />
        )}

        {/* Canvas Content */}
        <div 
          className="relative w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${canvasOffset.x / zoom}px, ${canvasOffset.y / zoom}px)`,
            transformOrigin: '0 0'
          }}
        >
          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                  <GitBranch className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t.tips.dropHere}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.tips.dragNodes}
                </p>
              </div>
            </div>
          )}

          {/* Render Nodes */}
          {nodes.map(renderNode)}

          {/* Drag Preview */}
          {isDraggingFromSidebar && (
            <div
              className="absolute pointer-events-none z-40 opacity-50"
              style={{
                left: dragPreviewPos.x,
                top: dragPreviewPos.y,
                width: 60,
                height: 60
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-dashed border-primary bg-primary/20 flex items-center justify-center">
                <GitBranch size={24} className="text-primary" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar' 
                ? 'هل أنت متأكد من حذف هذه العقدة؟ لا يمكن التراجع عن هذا الإجراء.'
                : 'Are you sure you want to delete this node? This action cannot be undone.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {language === 'ar' ? 'حذف' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Node Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'إعدادات العقدة' : 'Node Configuration'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar' 
                ? 'قم بتخصيص إعدادات العقدة المحددة'
                : 'Customize the settings for the selected node'
              }
            </DialogDescription>
          </DialogHeader>
          {nodeToConfig && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  {language === 'ar' ? 'اسم العقدة' : 'Node Name'}
                </label>
                <input
                  type="text"
                  value={nodeToConfig.label}
                  onChange={(e) => setNodeToConfig({...nodeToConfig, label: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  {language === 'ar' ? 'الوصف' : 'Description'}
                </label>
                <textarea
                  value={nodeToConfig.description || ''}
                  onChange={(e) => setNodeToConfig({...nodeToConfig, description: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleConfigCancel}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={() => nodeToConfig && handleConfigSave(nodeToConfig)}>
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}