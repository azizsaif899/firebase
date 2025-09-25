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

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

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

  // Minimalist node templates with elegant design
  const nodeTemplates = [
    { 
      type: 'trigger' as const, 
      icon: Play, 
      size: 60,
      category: 'start'
    },
    { 
      type: 'action' as const, 
      icon: Settings, 
      size: 60,
      category: 'process'
    },
    { 
      type: 'condition' as const, 
      icon: GitBranch, 
      size: 60,
      category: 'decision'
    },
    { 
      type: 'data' as const, 
      icon: Database, 
      size: 60,
      category: 'process'
    },
    { 
      type: 'schedule' as const, 
      icon: Calendar, 
      size: 60,
      category: 'time'
    },
    { 
      type: 'integration' as const, 
      icon: Globe, 
      size: 60,
      category: 'external'
    },
    { 
      type: 'output' as const, 
      icon: MessageSquare, 
      size: 60,
      category: 'end'
    }
  ];

  // Enhanced snap to grid function with node spacing
  const snapToGridFn = useCallback((value: number, gridSize: number = 220) => {
    // Use 220px grid (200px node width + 20px spacing) for horizontal spacing
    // Use 120px grid (100px node height + 20px spacing) for vertical spacing
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  const snapToVerticalGrid = useCallback((value: number, gridSize: number = 120) => {
    // Separate function for vertical spacing
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
  }, [snapToGrid]);

  // Collision detection system
  const checkCollision = useCallback((x: number, y: number, excludeNodeId?: string) => {
    const nodeWidth = 200;
    const nodeHeight = 100;
    const padding = 10; // Extra padding for safety
    
    return nodes.some(node => {
      if (excludeNodeId && node.id === excludeNodeId) return false;
      
      // Calculate bounds for existing node (considering it might be expanded)
      const existingLeft = node.x - padding;
      const existingRight = node.x + nodeWidth + padding;
      const existingTop = node.y - padding;
      const existingBottom = node.y + nodeHeight + padding;
      
      // Calculate bounds for new position
      const newLeft = x;
      const newRight = x + nodeWidth;
      const newTop = y;
      const newBottom = y + nodeHeight;
      
      // Check for overlap
      return !(newRight <= existingLeft || 
               newLeft >= existingRight || 
               newBottom <= existingTop || 
               newTop >= existingBottom);
    });
  }, [nodes]);

  // Find nearest available position
  const findAvailablePosition = useCallback((preferredX: number, preferredY: number, excludeNodeId?: string) => {
    const gridX = 220;
    const gridY = 120;
    
    // Start with snapped preferred position
    let x = snapToGridFn(preferredX);
    let y = snapToVerticalGrid(preferredY);
    
    // If preferred position is available, use it
    if (!checkCollision(x, y, excludeNodeId)) {
      return { x, y };
    }
    
    // Search in expanding spiral pattern - prioritize right and down first
    const maxSearchRadius = 10; // Search up to 10 grid positions away
    
    // Try right positions first (preferred for workflow layouts)
    for (let offset = 1; offset <= maxSearchRadius; offset++) {
      const rightX = x + (offset * gridX);
      if (rightX >= 0 && rightX < 2000 && !checkCollision(rightX, y, excludeNodeId)) {
        return { x: rightX, y };
      }
    }
    
    // Then try down positions
    for (let offset = 1; offset <= maxSearchRadius; offset++) {
      const downY = y + (offset * gridY);
      if (downY >= 0 && downY < 2000 && !checkCollision(x, downY, excludeNodeId)) {
        return { x, y: downY };
      }
    }
    
    // Finally, full spiral search if needed
    for (let radius = 1; radius <= maxSearchRadius; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          // Skip if not on the edge of current radius (to create spiral effect)
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          
          const testX = x + (dx * gridX);
          const testY = y + (dy * gridY);
          
          // Make sure position is within reasonable bounds
          if (testX >= 0 && testY >= 0 && testX < 2000 && testY < 2000) {
            if (!checkCollision(testX, testY, excludeNodeId)) {
              return { x: testX, y: testY };
            }
          }
        }
      }
    }
    
    // If no position found, place at far right
    const fallbackX = (nodes.length + 1) * gridX;
    const fallbackY = y;
    return { x: fallbackX, y: fallbackY };
  }, [snapToGridFn, snapToVerticalGrid, checkCollision, nodes]);

  // Create new node with minimalist design
  const createNode = useCallback((type: Node['type'], x: number, y: number) => {
    const template = nodeTemplates.find(t => t.type === type);
    if (!template) return;

    // Find available position near the drop point
    const preferredX = x - 100; // Center on 200px grid
    const preferredY = y - 50; // Center on 120px grid
    const { x: availableX, y: availableY } = findAvailablePosition(preferredX, preferredY);
    
    // Check if the node was moved from preferred position
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
    
    // Clear auto-moved flag after animation
    if (wasAutoMoved) {
      setTimeout(() => {
        setNodes(current => current.map(n => 
          n.id === newNode.id ? { ...n, isAutoMoved: false } : n
        ));
      }, 2000);
    }
  }, [t.nodeTypes, findAvailablePosition]);

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

  // Mouse wheel zoom handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!canvasRef.current) return;
    
    e.preventDefault();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate zoom
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.2), 3);
    
    // Calculate new offset to zoom towards mouse position
    const zoomRatio = newZoom / zoom;
    const newOffsetX = mouseX - (mouseX - canvasOffset.x) * zoomRatio;
    const newOffsetY = mouseY - (mouseY - canvasOffset.y) * zoomRatio;
    
    setZoom(newZoom);
    setCanvasOffset({ x: newOffsetX, y: newOffsetY });
  }, [zoom, canvasOffset]);

  // Canvas panning handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Middle mouse button or Ctrl+Left click for panning
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

  // Get node color based on status
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

  // Handle node actions
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

  // Beautiful minimalist node rendering with expandable functionality
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
              size={node.size * 0.4}
              style={{ color: nodeColor }}
            />
          </div>
          
          {/* Status indicator dot */}
          {node.status !== 'idle' && (
            <div 
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                node.status === 'running' ? 'animate-pulse' : ''
              }`}
              style={{ backgroundColor: nodeColor }}
            />
          )}
          
          {/* Execution ring */}
          {node.isExecuting && (
            <div 
              className="absolute inset-0 rounded-full border-2 animate-spin"
              style={{ 
                borderColor: `${nodeColor}30`,
                borderTopColor: nodeColor
              }}
            />
          )}
          
          {/* Lock indicator */}
          {node.isLocked && (
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <Lock size={10} className="text-white" />
            </div>
          )}

          {/* Click hint */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="px-2 py-1 bg-background/90 backdrop-blur-sm border rounded-lg text-xs whitespace-nowrap shadow-lg">
              {language === 'ar' ? 'انقر للتوسيط' : 'Click to expand'}
            </div>
          </div>
          
          {/* Auto-moved indicator - visual only */}
          {node.isAutoMoved && (
            <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-background animate-pulse" />
          )}
        </div>
        
        {/* Connection ports (visible on hover) */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-background border-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
             style={{ borderColor: nodeColor }} />
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-background border-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
             style={{ borderColor: nodeColor }} />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-background border-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
             style={{ borderColor: nodeColor }} />
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-background border-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
             style={{ borderColor: nodeColor }} />
      </div>
    );
  };

  // Enhanced Canvas controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.2));
  const handleReset = () => {
    setZoom(1);
    setCanvasOffset({ x: 0, y: 0 });
  };

  const handleFitToScreen = () => {
    if (nodes.length === 0) return;
    
    // Calculate bounding box of all nodes
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
    
    // Calculate zoom to fit content
    const zoomX = containerWidth / contentWidth;
    const zoomY = containerHeight / contentHeight;
    const newZoom = Math.min(zoomX, zoomY, 1); // Don't zoom in beyond 100%
    
    // Calculate offset to center content
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
    
    // Calculate center of all nodes
    const centerX = nodes.reduce((sum, n) => sum + n.x + 100, 0) / nodes.length;
    const centerY = nodes.reduce((sum, n) => sum + n.y + 50, 0) / nodes.length;
    
    if (!canvasRef.current) return;
    
    const containerWidth = canvasRef.current.clientWidth;
    const containerHeight = canvasRef.current.clientHeight;
    
    const offsetX = containerWidth / 2 - centerX * zoom;
    const offsetY = containerHeight / 2 - centerY * zoom;
    
    setCanvasOffset({ x: offsetX, y: offsetY });
  };

  // Node actions
  const duplicateNode = () => {
    if (!selectedNode) return;
    
    // Find available position near the selected node
    const { x, y } = findAvailablePosition(selectedNode.x + 220, selectedNode.y);
    
    const newNode: Node = {
      ...selectedNode,
      id: `node-${Date.now()}`,
      x,
      y,
      isSelected: false,
      isExpanded: false,
      isAutoMoved: false
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
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} flex h-screen bg-background`}>
      {/* Clean Modern Sidebar */}
      <div className="w-80 bg-card border-r flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {t.title}
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFullscreen(!isFullscreen)}
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
          
          {/* Clean sidebar tabs */}
          <div className="flex bg-muted rounded-lg p-1">
            {(['nodes', 'properties', 'layers'] as const).map((tab) => (
              <Button
                key={tab}
                variant={sidebarTab === tab ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 text-sm"
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
            <div className="p-6 space-y-6">
              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {templates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={template.type}
                          draggable
                          onDragStart={(e) => handleDragStart(e, template.type)}
                          className="flex items-center gap-3 p-3 rounded-lg border cursor-grab hover:bg-muted/50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{t.nodeTypes[template.type]}</div>
                            <div className="text-xs text-muted-foreground capitalize">{category}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {/* Simple tip */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t.tips.dragNodes}
                </p>
              </div>
            </div>
          )}

          {sidebarTab === 'properties' && (
            <div className="p-6 space-y-4">
              {selectedNode ? (
                <>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${getNodeColor(selectedNode.status, false)}15`,
                          borderColor: getNodeColor(selectedNode.status, false)
                        }}
                      >
                        <Circle className="w-3 h-3" style={{ color: getNodeColor(selectedNode.status, false) }} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{selectedNode.type.toUpperCase()}</div>
                        <div className="text-xs text-muted-foreground">Node</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">{t.properties.label}</Label>
                      <Input
                        value={selectedNode.label}
                        onChange={(e) => updateNodeProperty('label', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">{t.properties.description}</Label>
                      <Textarea
                        value={selectedNode.description || ''}
                        onChange={(e) => updateNodeProperty('description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">{t.properties.status}</Label>
                      <div className="flex gap-2 mt-1 flex-wrap">
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
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
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
                  <Circle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">{t.tips.selectNode}</p>
                </div>
              )}
            </div>
          )}

          {sidebarTab === 'layers' && (
            <div className="p-6 space-y-2">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                {t.sidebar.layers}
              </h3>
              {nodes.length > 0 ? (
                nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedNode?.id === node.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setSelectedNode(node);
                      // Also expand the node when clicked in layers
                      setNodes(prev => prev.map(n => 
                        n.id === node.id 
                          ? { ...n, isExpanded: true }
                          : { ...n, isExpanded: false }
                      ));
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-4 h-4 border transition-all duration-200 ${
                            node.isExpanded ? 'rounded-lg' : 'rounded-full'
                          }`}
                          style={{ 
                            backgroundColor: `${getNodeColor(node.status, false)}15`,
                            borderColor: getNodeColor(node.status, false)
                          }}
                        />
                        <div>
                          <span className="text-sm font-medium">{node.label}</span>
                          <div className="text-xs text-muted-foreground capitalize flex items-center gap-2">
                            {node.type}
                            {node.isExpanded && (
                              <Badge variant="secondary" className="text-xs px-1 py-0">
                                {language === 'ar' ? 'موسع' : 'Expanded'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!node.isVisible && <EyeOff className="w-3 h-3 text-muted-foreground" />}
                        {node.isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                        {node.isExpanded && <Maximize className="w-3 h-3 text-primary" />}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Layers className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
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
        {/* Clean toolbar */}
        <div className="bg-card border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Tool selection */}
              <div className="flex bg-muted rounded-lg p-1">
                {[
                  { id: 'select', icon: MousePointer, label: t.tools.select },
                  { id: 'pan', icon: Move, label: t.tools.pan },
                  { id: 'connect', icon: ArrowRight, label: t.tools.connect }
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
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm w-16 text-center font-mono">
                  {Math.round(zoom * 100)}%
                </span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* View options */}
              <div className="flex gap-1">
                <Button
                  variant={showGrid ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  title={t.tools.grid}
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-1" />
                {t.tools.reset}
              </Button>
              
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

        {/* Clean canvas */}
        <div className="flex-1 overflow-hidden relative bg-muted/20">
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
            onClick={() => {
              setSelectedNode(null);
              // Collapse all nodes when clicking on canvas
              setNodes(prev => prev.map(node => ({ ...node, isExpanded: false })));
            }}
          >
            {/* Enhanced grid background for node spacing */}
            {showGrid && (
              <>
                {/* Main grid for node positioning */}
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
                {/* Fine grid for reference */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle, rgba(79, 151, 255, 0.3) 0.5px, transparent 0.5px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
              </>
            )}

            {/* Render elegant nodes */}
            {nodes.map(renderNode)}
            
            {/* Enhanced drag preview showing expanded size with collision detection */}
            {isDraggingFromSidebar && (
              <div
                className={`absolute pointer-events-none border-2 border-dashed rounded-2xl transition-colors duration-200 ${
                  dragPreviewCollision 
                    ? 'border-destructive/60 bg-destructive/5' 
                    : 'border-primary/60 bg-primary/5'
                }`}
                style={{
                  left: dragPreviewPos.x - 100,
                  top: dragPreviewPos.y - 50,
                  width: 200,
                  height: 100,
                  zIndex: 1000
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {dragPreviewCollision ? (
                      <>
                        <XCircle className="w-8 h-8 text-destructive/70 mx-auto mb-1" />
                        <div className="text-xs text-destructive/70 font-medium">
                          {language === 'ar' ? 'غير متاح' : 'Not available'}
                        </div>
                      </>
                    ) : (
                      <>
                        <Plus className="w-8 h-8 text-primary/70 mx-auto mb-1" />
                        <div className="text-xs text-primary/70 font-medium">
                          {language === 'ar' ? 'إفلات هنا' : 'Drop here'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Clean status bar */}
        <div className="bg-card border-t px-4 py-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>
                {language === 'ar' ? 'العقد:' : 'Nodes:'} {nodes.length}
              </span>
              <span>
                {language === 'ar' ? 'الاتصالات:' : 'Connections:'} {connections.length}
              </span>
              {nodes.some(n => n.isExpanded) && (
                <span className="text-primary">
                  {language === 'ar' ? 'موسع:' : 'Expanded:'} {nodes.filter(n => n.isExpanded).length}
                </span>
              )}
              {selectedNode && (
                <span>
                  {language === 'ar' ? 'المحدد:' : 'Selected:'} {selectedNode.label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>{Math.round(zoom * 100)}%</span>
              <span className="capitalize">{tool}</span>
              {showGrid && (
                <span className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'شبكة: 220×120' : 'Grid: 220×120'}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {language === 'ar' ? 'حجم العقدة: 200×100' : 'Node: 200×100'}
              </span>
              {snapToGrid && (
                <span className="text-xs text-green-500">
                  {language === 'ar' ? 'منع التراكب: مفعل' : 'Anti-collision: ON'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {language === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar' 
                ? `هل أنت متأكد من حذف العقدة "${nodeToDelete?.label}"؟ لا يمكن التراجع عن هذا الإجراء.`
                : `Are you sure you want to delete the node "${nodeToDelete?.label}"? This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {language === 'ar' ? 'حذف' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Node Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'إعدادات العقدة' : 'Node Settings'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar' 
                ? 'قم بتخصيص إعدادات هذه العقدة'
                : 'Customize the settings for this node'
              }
            </DialogDescription>
          </DialogHeader>

          {nodeToConfig && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${getNodeColor(nodeToConfig.status, false)}20`,
                    color: getNodeColor(nodeToConfig.status, false)
                  }}
                >
                  {(() => {
                    const template = nodeTemplates.find(t => t.type === nodeToConfig.type);
                    const Icon = template?.icon || Circle;
                    return <Icon size={20} />;
                  })()}
                </div>
                <div>
                  <h4 className="font-medium">{nodeToConfig.label}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{nodeToConfig.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">
                    {language === 'ar' ? 'اسم العقدة' : 'Node Name'}
                  </Label>
                  <Input
                    value={nodeToConfig.label}
                    onChange={(e) => setNodeToConfig(prev => prev ? {...prev, label: e.target.value} : null)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    {language === 'ar' ? 'الوصف' : 'Description'}
                  </Label>
                  <Textarea
                    value={nodeToConfig.description || ''}
                    onChange={(e) => setNodeToConfig(prev => prev ? {...prev, description: e.target.value} : null)}
                    className="mt-1"
                    rows={3}
                    placeholder={language === 'ar' ? 'أدخل وصف العقدة...' : 'Enter node description...'}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </Label>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {(['idle', 'running', 'success', 'error', 'warning'] as const).map((status) => (
                      <Button
                        key={status}
                        variant={nodeToConfig.status === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNodeToConfig(prev => prev ? {...prev, status} : null)}
                        className="text-xs capitalize"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="locked"
                    checked={nodeToConfig.isLocked}
                    onCheckedChange={(checked) => 
                      setNodeToConfig(prev => prev ? {...prev, isLocked: !!checked} : null)
                    }
                  />
                  <Label htmlFor="locked" className="text-sm">
                    {language === 'ar' ? 'قفل العقدة' : 'Lock node'}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visible"
                    checked={nodeToConfig.isVisible}
                    onCheckedChange={(checked) => 
                      setNodeToConfig(prev => prev ? {...prev, isVisible: !!checked} : null)
                    }
                  />
                  <Label htmlFor="visible" className="text-sm">
                    {language === 'ar' ? 'إظهار العقدة' : 'Show node'}
                  </Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleConfigCancel}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={() => nodeToConfig && handleConfigSave(nodeToConfig)}>
              <Settings className="w-4 h-4 mr-1" />
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}