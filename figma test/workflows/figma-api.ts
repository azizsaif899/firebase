// Figma API Integration for FlowCanvasAI
// Handles Figma file imports, design asset extraction, and Firebase storage

interface FigmaConfig {
  accessToken: string;
  baseUrl: string;
}

interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  schemaVersion: number;
  styles: Record<string, FigmaStyle>;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
  editorType: string;
  linkAccess: string;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  children?: FigmaNode[];
  backgroundColor?: FigmaColor;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  strokeWeight?: number;
  strokeAlign?: string;
  cornerRadius?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotation?: number;
  opacity?: number;
  blendMode?: string;
  isMask?: boolean;
  effects?: FigmaEffect[];
  exportSettings?: FigmaExportSetting[];
  constraints?: FigmaConstraint;
  transitionNodeID?: string;
  transitionDuration?: number;
  transitionEasing?: string;
  characters?: string;
  style?: FigmaTypeStyle;
  characterStyleOverrides?: FigmaStyleOverride[];
  styleOverrideTable?: Record<string, FigmaTypeStyle>;
}

interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks?: FigmaDocumentationLink[];
}

interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaFill {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE';
  visible?: boolean;
  opacity?: number;
  blendMode?: string;
  color?: FigmaColor;
  gradientHandlePositions?: FigmaVector[];
  gradientStops?: FigmaColorStop[];
  scaleMode?: 'FILL' | 'FIT' | 'CROP' | 'TILE';
  imageTransform?: number[][];
  scalingFactor?: number;
  rotation?: number;
  imageRef?: string;
  filters?: FigmaImageFilters;
  gifRef?: string;
}

interface FigmaStroke {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND';
  visible?: boolean;
  opacity?: number;
  blendMode?: string;
  color?: FigmaColor;
  gradientHandlePositions?: FigmaVector[];
  gradientStops?: FigmaColorStop[];
}

interface FigmaEffect {
  type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible?: boolean;
  radius: number;
  color?: FigmaColor;
  blendMode?: string;
  offset?: FigmaVector;
  spread?: number;
  showShadowBehindNode?: boolean;
}

interface FigmaExportSetting {
  suffix: string;
  format: 'JPG' | 'PNG' | 'SVG' | 'PDF';
  constraint: FigmaConstraint;
}

interface FigmaConstraint {
  type: 'SCALE' | 'WIDTH' | 'HEIGHT';
  value: number;
}

interface FigmaTypeStyle {
  fontFamily: string;
  fontPostScriptName?: string;
  paragraphSpacing?: number;
  paragraphIndent?: number;
  listSpacing?: number;
  hangingPunctuation?: boolean;
  hangingList?: boolean;
  fontSize: number;
  fontWeight: number;
  textAlignHorizontal?: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing: number;
  fills?: FigmaFill[];
  hyperlink?: FigmaHyperlink;
  opentypeFlags?: Record<string, number>;
  lineHeightPx: number;
  lineHeightPercent?: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
}

interface FigmaStyleOverride {
  start: number;
  end: number;
  styleID: string;
}

interface FigmaDocumentationLink {
  uri: string;
}

interface FigmaVector {
  x: number;
  y: number;
}

interface FigmaColorStop {
  position: number;
  color: FigmaColor;
}

interface FigmaImageFilters {
  exposure?: number;
  highlights?: number;
  shadows?: number;
  contrast?: number;
  saturation?: number;
  temperature?: number;
  tint?: number;
}

interface FigmaHyperlink {
  type: 'URL' | 'NODE';
  url?: string;
  nodeID?: string;
}

interface FigmaProject {
  id: string;
  name: string;
  thumbnailUrl: string;
  lastModified: string;
  createdAt: string;
  userId: string;
  figmaFileId: string;
  figmaFileKey: string;
  components: FigmaDesignComponent[];
  assets: FigmaAsset[];
  metadata: FigmaProjectMetadata;
}

interface FigmaDesignComponent {
  id: string;
  name: string;
  description?: string;
  type: 'BUTTON' | 'INPUT' | 'CARD' | 'ICON' | 'IMAGE' | 'TEXT' | 'CONTAINER' | 'OTHER';
  category: string;
  tags: string[];
  figmaNodeId: string;
  previewUrl?: string;
  codeSnippet?: string;
  props?: Record<string, any>;
  variants?: FigmaComponentVariant[];
  exportedAt: string;
}

interface FigmaComponentVariant {
  id: string;
  name: string;
  properties: Record<string, string>;
  figmaNodeId: string;
  previewUrl?: string;
}

interface FigmaAsset {
  id: string;
  name: string;
  type: 'IMAGE' | 'ICON' | 'ILLUSTRATION' | 'LOGO';
  format: 'PNG' | 'JPG' | 'SVG' | 'PDF';
  url: string;
  firebaseUrl?: string;
  figmaNodeId: string;
  width: number;
  height: number;
  size?: number;
  tags: string[];
  exportedAt: string;
}

interface FigmaProjectMetadata {
  version: string;
  lastSyncedAt: string;
  totalComponents: number;
  totalAssets: number;
  figmaTeamId?: string;
  figmaProjectId?: string;
  syncSettings: FigmaSyncSettings;
}

interface FigmaSyncSettings {
  autoSync: boolean;
  syncInterval: number; // in minutes
  syncComponents: boolean;
  syncAssets: boolean;
  generateCode: boolean;
  optimizeImages: boolean;
}

class FigmaAPI {
  private config: FigmaConfig;
  private db: any;
  private storage: any;

  constructor(config: FigmaConfig, firebase: { db: any; storage: any }) {
    this.config = {
      accessToken: config.accessToken || 'demo-token',
      baseUrl: config.baseUrl || 'https://api.figma.com/v1'
    };
    this.db = firebase.db;
    this.storage = firebase.storage;
  }

  // 🎨 Get Figma file data
  async getFile(fileKey: string): Promise<FigmaFile> {
    try {
      if (this.config.accessToken === 'demo-token') {
        return this.getMockFile(fileKey);
      }

      const response = await fetch(`${this.config.baseUrl}/files/${fileKey}`, {
        headers: {
          'X-Figma-Token': this.config.accessToken
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Figma file:', error);
      return this.getMockFile(fileKey);
    }
  }

  // 🖼️ Get image exports from Figma
  async getImages(fileKey: string, nodeIds: string[], options?: {
    format?: 'png' | 'jpg' | 'svg' | 'pdf';
    scale?: number;
    use_absolute_bounds?: boolean;
  }): Promise<Record<string, string>> {
    try {
      if (this.config.accessToken === 'demo-token') {
        return this.getMockImages(nodeIds);
      }

      const params = new URLSearchParams({
        ids: nodeIds.join(','),
        format: options?.format || 'png',
        scale: (options?.scale || 1).toString(),
        use_absolute_bounds: (options?.use_absolute_bounds || false).toString()
      });

      const response = await fetch(`${this.config.baseUrl}/images/${fileKey}?${params}`, {
        headers: {
          'X-Figma-Token': this.config.accessToken
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Figma images: ${response.statusText}`);
      }

      const data = await response.json();
      return data.images || {};
    } catch (error) {
      console.error('Error fetching Figma images:', error);
      return this.getMockImages(nodeIds);
    }
  }

  // 🔄 Import Figma design to FlowCanvasAI
  async importDesign(fileKey: string, userId: string, options?: {
    projectName?: string;
    syncSettings?: Partial<FigmaSyncSettings>;
  }): Promise<FigmaProject> {
    try {
      console.log(`🎨 Importing Figma design: ${fileKey}`);

      // 1. Fetch Figma file data
      const figmaFile = await this.getFile(fileKey);
      
      // 2. Extract components and assets
      const components = await this.extractComponents(figmaFile, fileKey);
      const assets = await this.extractAssets(figmaFile, fileKey);

      // 3. Create project in Firebase
      const project: FigmaProject = {
        id: this.generateId(),
        name: options?.projectName || figmaFile.name || 'Imported Design',
        thumbnailUrl: figmaFile.thumbnailUrl || '',
        lastModified: figmaFile.lastModified || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        userId,
        figmaFileId: fileKey,
        figmaFileKey: fileKey,
        components,
        assets,
        metadata: {
          version: figmaFile.version || '1.0',
          lastSyncedAt: new Date().toISOString(),
          totalComponents: components.length,
          totalAssets: assets.length,
          syncSettings: {
            autoSync: true,
            syncInterval: 60,
            syncComponents: true,
            syncAssets: true,
            generateCode: true,
            optimizeImages: true,
            ...options?.syncSettings
          }
        }
      };

      // 4. Save to Firebase
      await this.db.collection('figmaProjects').doc(project.id).set(project);

      console.log(`✅ Successfully imported Figma design: ${project.name}`);
      return project;

    } catch (error) {
      console.error('Error importing Figma design:', error);
      throw error;
    }
  }

  // 🧩 Extract design components from Figma file
  private async extractComponents(figmaFile: FigmaFile, fileKey: string): Promise<FigmaDesignComponent[]> {
    const components: FigmaDesignComponent[] = [];

    const traverseNode = async (node: FigmaNode, category: string = 'general') => {
      if (!node) return;

      // Check if node is a component
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        const componentType = this.detectComponentType(node);
        const previewUrl = await this.generateComponentPreview(fileKey, node.id);

        const component: FigmaDesignComponent = {
          id: this.generateId(),
          name: node.name || 'Unnamed Component',
          description: `Imported from Figma: ${node.name}`,
          type: componentType,
          category,
          tags: this.generateTags(node),
          figmaNodeId: node.id,
          previewUrl,
          codeSnippet: await this.generateCodeSnippet(node),
          props: this.extractProps(node),
          variants: await this.extractVariants(node, fileKey),
          exportedAt: new Date().toISOString()
        };

        components.push(component);
      }

      // Recursively process children
      if (node.children) {
        for (const child of node.children) {
          await traverseNode(child, this.getCategoryFromNode(child));
        }
      }
    };

    await traverseNode(figmaFile.document);
    return components;
  }

  // 🖼️ Extract assets from Figma file
  private async extractAssets(figmaFile: FigmaFile, fileKey: string): Promise<FigmaAsset[]> {
    const assets: FigmaAsset[] = [];

    const traverseNode = async (node: FigmaNode) => {
      if (!node) return;

      // Check if node contains images or icons
      if (this.isAssetNode(node)) {
        const assetType = this.detectAssetType(node);
        const exportUrl = await this.exportAsset(fileKey, node.id);

        if (exportUrl) {
          const asset: FigmaAsset = {
            id: this.generateId(),
            name: node.name || 'Unnamed Asset',
            type: assetType,
            format: this.getAssetFormat(node),
            url: exportUrl,
            figmaNodeId: node.id,
            width: node.width || 0,
            height: node.height || 0,
            tags: this.generateAssetTags(node),
            exportedAt: new Date().toISOString()
          };

          assets.push(asset);
        }
      }

      // Recursively process children
      if (node.children) {
        for (const child of node.children) {
          await traverseNode(child);
        }
      }
    };

    await traverseNode(figmaFile.document);
    return assets;
  }

  // 🔍 Sync existing project with Figma
  async syncProject(projectId: string): Promise<FigmaProject> {
    try {
      console.log(`🔄 Syncing Figma project: ${projectId}`);

      const projectDoc = await this.db.collection('figmaProjects').doc(projectId).get();
      if (!projectDoc.exists) {
        throw new Error('Project not found');
      }

      const project = projectDoc.data() as FigmaProject;
      const updatedProject = await this.importDesign(project.figmaFileKey, project.userId, {
        projectName: project.name,
        syncSettings: project.metadata.syncSettings
      });

      // Update existing project
      await this.db.collection('figmaProjects').doc(projectId).update({
        ...updatedProject,
        id: projectId, // Keep original ID
        createdAt: project.createdAt // Keep original creation date
      });

      console.log(`✅ Successfully synced project: ${project.name}`);
      return { ...updatedProject, id: projectId, createdAt: project.createdAt };

    } catch (error) {
      console.error('Error syncing Figma project:', error);
      throw error;
    }
  }

  // 📱 Get user's Figma projects
  async getUserProjects(userId: string): Promise<FigmaProject[]> {
    try {
      // For mock Firebase, use simpler query
      const snapshot = await this.db.collection('figmaProjects').get();
      
      const projects = snapshot.docs
        .map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter((project: FigmaProject) => project.userId === userId)
        .sort((a: FigmaProject, b: FigmaProject) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      return projects;
    } catch (error) {
      console.error('Error fetching user projects:', error);
      return [];
    }
  }

  // 🗑️ Delete Figma project
  async deleteProject(projectId: string): Promise<void> {
    try {
      await this.db.collection('figmaProjects').doc(projectId).delete();
      console.log(`🗑️ Deleted Figma project: ${projectId}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Helper methods
  private detectComponentType(node: FigmaNode): FigmaDesignComponent['type'] {
    const name = node.name?.toLowerCase() || '';
    
    if (name.includes('button') || name.includes('btn')) return 'BUTTON';
    if (name.includes('input') || name.includes('field')) return 'INPUT';
    if (name.includes('card')) return 'CARD';
    if (name.includes('icon')) return 'ICON';
    if (name.includes('image') || name.includes('img')) return 'IMAGE';
    if (name.includes('text') || node.type === 'TEXT') return 'TEXT';
    if (name.includes('container') || name.includes('wrapper')) return 'CONTAINER';
    
    return 'OTHER';
  }

  private detectAssetType(node: FigmaNode): FigmaAsset['type'] {
    const name = node.name?.toLowerCase() || '';
    
    if (name.includes('icon')) return 'ICON';
    if (name.includes('logo')) return 'LOGO';
    if (name.includes('illustration') || name.includes('graphic')) return 'ILLUSTRATION';
    
    return 'IMAGE';
  }

  private getAssetFormat(node: FigmaNode): FigmaAsset['format'] {
    // Logic to determine best format based on node type
    if (node.type === 'VECTOR' || this.containsVectorElements(node)) return 'SVG';
    return 'PNG';
  }

  private containsVectorElements(node: FigmaNode): boolean {
    // Check if node contains vector paths
    return node.type === 'VECTOR' || 
           (node.children?.some(child => this.containsVectorElements(child)) || false);
  }

  private isAssetNode(node: FigmaNode): boolean {
    const assetTypes = ['VECTOR', 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'IMAGE'];
    return assetTypes.includes(node.type) && !this.isComponentPart(node);
  }

  private isComponentPart(node: FigmaNode): boolean {
    // Logic to determine if node is part of a component rather than standalone asset
    return false; // Simplified for now
  }

  private generateTags(node: FigmaNode): string[] {
    const tags: string[] = [];
    const name = node.name?.toLowerCase() || '';
    
    // Add type-based tags
    tags.push(node.type.toLowerCase());
    
    // Add semantic tags based on name
    if (name.includes('primary')) tags.push('primary');
    if (name.includes('secondary')) tags.push('secondary');
    if (name.includes('large') || name.includes('big')) tags.push('large');
    if (name.includes('small') || name.includes('mini')) tags.push('small');
    if (name.includes('dark')) tags.push('dark');
    if (name.includes('light')) tags.push('light');
    
    return [...new Set(tags)]; // Remove duplicates
  }

  private generateAssetTags(node: FigmaNode): string[] {
    return this.generateTags(node);
  }

  private getCategoryFromNode(node: FigmaNode): string {
    const name = node.name?.toLowerCase() || '';
    
    if (name.includes('navigation') || name.includes('nav')) return 'navigation';
    if (name.includes('form')) return 'forms';
    if (name.includes('card')) return 'data-display';
    if (name.includes('button') || name.includes('btn')) return 'actions';
    if (name.includes('input') || name.includes('field')) return 'inputs';
    if (name.includes('modal') || name.includes('dialog')) return 'overlays';
    
    return 'general';
  }

  private async generateComponentPreview(fileKey: string, nodeId: string): Promise<string> {
    try {
      const images = await this.getImages(fileKey, [nodeId], { format: 'png', scale: 2 });
      return images[nodeId] || '';
    } catch (error) {
      console.error('Error generating component preview:', error);
      return '';
    }
  }

  private async exportAsset(fileKey: string, nodeId: string): Promise<string> {
    try {
      const images = await this.getImages(fileKey, [nodeId], { 
        format: 'png', 
        scale: 2,
        use_absolute_bounds: true 
      });
      return images[nodeId] || '';
    } catch (error) {
      console.error('Error exporting asset:', error);
      return '';
    }
  }

  private async generateCodeSnippet(node: FigmaNode): Promise<string> {
    // Generate React/Tailwind code snippet from Figma node
    const componentType = this.detectComponentType(node);
    
    switch (componentType) {
      case 'BUTTON':
        return this.generateButtonCode(node);
      case 'INPUT':
        return this.generateInputCode(node);
      case 'CARD':
        return this.generateCardCode(node);
      default:
        return this.generateGenericCode(node);
    }
  }

  private generateButtonCode(node: FigmaNode): string {
    const name = node.name || 'Button';
    const width = node.width ? `w-[${node.width}px]` : 'w-auto';
    const height = node.height ? `h-[${node.height}px]` : 'h-auto';
    
    return `<button className="${width} ${height} bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
  ${name}
</button>`;
  }

  private generateInputCode(node: FigmaNode): string {
    const name = node.name || 'Input';
    const width = node.width ? `w-[${node.width}px]` : 'w-full';
    const height = node.height ? `h-[${node.height}px]` : 'h-auto';
    
    return `<input 
  type="text" 
  placeholder="${name}"
  className="${width} ${height} px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
/>`;
  }

  private generateCardCode(node: FigmaNode): string {
    const name = node.name || 'Card';
    const width = node.width ? `w-[${node.width}px]` : 'w-full';
    const height = node.height ? `h-[${node.height}px]` : 'h-auto';
    
    return `<div className="${width} ${height} bg-card border border-border rounded-lg p-4 shadow-sm">
  <h3 className="font-semibold mb-2">${name}</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>`;
  }

  private generateGenericCode(node: FigmaNode): string {
    const name = node.name || 'Component';
    const width = node.width ? `w-[${node.width}px]` : 'w-auto';
    const height = node.height ? `h-[${node.height}px]` : 'h-auto';
    
    return `<div className="${width} ${height} bg-background border border-border rounded-lg">
  <!-- ${name} -->
</div>`;
  }

  private extractProps(node: FigmaNode): Record<string, any> {
    return {
      width: node.width,
      height: node.height,
      backgroundColor: node.backgroundColor,
      borderRadius: node.cornerRadius,
      opacity: node.opacity
    };
  }

  private async extractVariants(node: FigmaNode, fileKey: string): Promise<FigmaComponentVariant[]> {
    // Extract component variants if it's a component set
    if (node.type !== 'COMPONENT_SET') return [];
    
    const variants: FigmaComponentVariant[] = [];
    
    if (node.children) {
      for (const child of node.children) {
        if (child.type === 'COMPONENT') {
          const previewUrl = await this.generateComponentPreview(fileKey, child.id);
          
          variants.push({
            id: this.generateId(),
            name: child.name || 'Variant',
            properties: this.extractVariantProperties(child),
            figmaNodeId: child.id,
            previewUrl
          });
        }
      }
    }
    
    return variants;
  }

  private extractVariantProperties(node: FigmaNode): Record<string, string> {
    // Extract variant properties from node name
    const name = node.name || '';
    const properties: Record<string, string> = {};
    
    // Parse variant properties from name like "Button/Primary/Large"
    const parts = name.split('/').map(part => part.trim());
    if (parts.length > 1) {
      parts.slice(1).forEach((part, index) => {
        properties[`property${index + 1}`] = part;
      });
    }
    
    return properties;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Mock data for development
  private getMockFile(fileKey: string): FigmaFile {
    return {
      document: {
        id: '0:0',
        name: 'Document',
        type: 'DOCUMENT',
        children: [
          {
            id: '1:1',
            name: 'Page 1',
            type: 'CANVAS',
            children: [
              {
                id: '2:1',
                name: 'Primary Button',
                type: 'COMPONENT',
                width: 120,
                height: 40,
                backgroundColor: { r: 0.31, g: 0.59, b: 1, a: 1 }
              },
              {
                id: '2:2',
                name: 'Input Field',
                type: 'COMPONENT',
                width: 200,
                height: 36
              }
            ]
          }
        ]
      },
      components: {
        '2:1': {
          key: 'button-primary',
          name: 'Primary Button',
          description: 'Primary action button'
        }
      },
      schemaVersion: 1,
      styles: {},
      name: 'Demo Design System',
      lastModified: new Date().toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/400x300',
      version: '1.0',
      role: 'owner',
      editorType: 'figma',
      linkAccess: 'view'
    };
  }

  private getMockImages(nodeIds: string[]): Record<string, string> {
    const images: Record<string, string> = {};
    nodeIds.forEach(id => {
      images[id] = `https://via.placeholder.com/400x300?text=Node+${id}`;
    });
    return images;
  }
}

// Export Figma API class and types
export {
  FigmaAPI,
  type FigmaFile,
  type FigmaNode,
  type FigmaProject,
  type FigmaDesignComponent,
  type FigmaAsset,
  type FigmaSyncSettings
};

import { config as appConfig } from './config';

// Initialize Figma API
export const createFigmaAPI = (config: Partial<FigmaConfig>, firebase: { db: any; storage: any }) => {
  return new FigmaAPI({
    accessToken: config.accessToken || appConfig.figma.accessToken,
    baseUrl: config.baseUrl || appConfig.figma.baseUrl
  }, firebase);
};

export default FigmaAPI;