// Firebase Initial Setup and Data Population
// This file helps initialize Firebase with basic data structure

import { db } from './firebase';
import { config } from './config';

interface InitialData {
  collections: {
    [key: string]: any[];
  };
  indexes: string[];
  securityRules: string;
}

// Sample data structure for initial setup
const initialData: InitialData = {
  collections: {
    // Sample design components
    designComponents: [
      {
        id: 'modern-button-01',
        name: 'Modern Button',
        description: 'A modern button component with hover effects',
        category: 'actions',
        type: 'BUTTON',
        tags: ['button', 'modern', 'ui', 'primary'],
        createdBy: 'system',
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        codeSnippet: {
          react: `<Button className="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
  Click Me
</Button>`,
          html: `<button class="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
  Click Me
</button>`
        },
        previewImages: {
          thumbnail: 'https://via.placeholder.com/300x200?text=Modern+Button',
          fullSize: 'https://via.placeholder.com/600x400?text=Modern+Button'
        },
        usage: {
          downloads: 0,
          likes: 0,
          views: 0
        }
      },
      {
        id: 'glass-card-01',
        name: 'Glass Card',
        description: 'A modern glass morphism card component',
        category: 'data-display',
        type: 'CARD',
        tags: ['card', 'glass', 'modern', 'ui'],
        createdBy: 'system',
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        codeSnippet: {
          react: `<Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Beautiful glass morphism effect</p>
  </CardContent>
</Card>`,
          html: `<div class="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl p-6 rounded-lg">
  <h3 class="font-semibold mb-4">Glass Card</h3>
  <p>Beautiful glass morphism effect</p>
</div>`
        },
        previewImages: {
          thumbnail: 'https://via.placeholder.com/300x200?text=Glass+Card',
          fullSize: 'https://via.placeholder.com/600x400?text=Glass+Card'
        },
        usage: {
          downloads: 0,
          likes: 0,
          views: 0
        }
      },
      {
        id: 'ai-chat-input-01',
        name: 'AI Chat Input',
        description: 'Smart chat input with AI assistance',
        category: 'inputs',
        type: 'INPUT',
        tags: ['input', 'chat', 'ai', 'smart'],
        createdBy: 'system',
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        codeSnippet: {
          react: `<div className="relative">
  <Input 
    className="pr-12 bg-background/50 backdrop-blur-sm border-primary/20" 
    placeholder="اكتب رسالتك هنا..."
  />
  <Button 
    size="sm" 
    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-chart-2"
  >
    <Send className="w-4 h-4" />
  </Button>
</div>`,
          html: `<div class="relative">
  <input 
    class="w-full pr-12 bg-background/50 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-2" 
    placeholder="اكتب رسالتك هنا..."
  />
  <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-chart-2 p-2 rounded">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
    </svg>
  </button>
</div>`
        },
        previewImages: {
          thumbnail: 'https://via.placeholder.com/300x200?text=AI+Chat+Input',
          fullSize: 'https://via.placeholder.com/600x400?text=AI+Chat+Input'
        },
        usage: {
          downloads: 0,
          likes: 0,
          views: 0
        }
      }
    ],

    // Sample categories for organization
    componentCategories: [
      { id: 'actions', name: { ar: 'الإجراءات', en: 'Actions' }, icon: 'zap' },
      { id: 'inputs', name: { ar: 'المدخلات', en: 'Inputs' }, icon: 'edit' },
      { id: 'data-display', name: { ar: 'عرض البيانات', en: 'Data Display' }, icon: 'grid' },
      { id: 'navigation', name: { ar: 'التنقل', en: 'Navigation' }, icon: 'menu' },
      { id: 'overlays', name: { ar: 'الطبقات', en: 'Overlays' }, icon: 'layers' },
      { id: 'forms', name: { ar: 'النماذج', en: 'Forms' }, icon: 'form-input' }
    ]
  },

  // Recommended Firestore indexes
  indexes: [
    'figmaProjects: userId (ASC), createdAt (DESC)',
    'conversations: userId (ASC), updatedAt (DESC)', 
    'designComponents: category (ASC), isPublic (ASC), createdAt (DESC)',
    'designComponents: tags (ARRAY), isPublic (ASC)',
    'userProfiles: email (ASC)'
  ],

  // Security rules template
  securityRules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isValidProjectData() {
      return request.resource.data.keys().hasAll(['name', 'userId', 'figmaFileKey']) &&
             request.resource.data.userId == request.auth.uid;
    }
    
    // Figma projects - private to user
    match /figmaProjects/{projectId} {
      allow read, write: if isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isValidProjectData();
    }
    
    // User profiles - private to user
    match /userProfiles/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // Conversations - private to user  
    match /conversations/{conversationId} {
      allow read, write: if isOwner(resource.data.userId);
    }
    
    // Design components - public read, authenticated write
    match /designComponents/{componentId} {
      allow read: if resource.data.isPublic == true || isOwner(resource.data.createdBy);
      allow write: if isAuthenticated();
    }
    
    // Component categories - public read
    match /componentCategories/{categoryId} {
      allow read: if true;
      allow write: if false; // Only admin can modify
    }
  }
}`
};

/**
 * Initialize Firebase with sample data
 */
export async function initializeFirebaseData(): Promise<boolean> {
  try {
    console.log('🔥 Starting Firebase initialization...');

    // Check if we're in demo mode
    if (config.app.environment === 'demo') {
      console.log('⚠️  Running in demo mode - skipping actual Firebase setup');
      return true;
    }

    // Initialize collections with sample data
    for (const [collectionName, documents] of Object.entries(initialData.collections)) {
      console.log(`📂 Initializing collection: ${collectionName}`);
      
      for (const doc of documents) {
        try {
          const docRef = db.collection(collectionName).doc(doc.id);
          const docSnap = await docRef.get();
          
          if (!docSnap.exists) {
            await docRef.set(doc);
            console.log(`✅ Added document: ${doc.id}`);
          } else {
            console.log(`ℹ️  Document already exists: ${doc.id}`);
          }
        } catch (error) {
          console.error(`❌ Error adding document ${doc.id}:`, error);
        }
      }
    }

    console.log('✅ Firebase initialization completed successfully');
    return true;

  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return false;
  }
}

/**
 * Create a user profile when they first sign up
 */
export async function createUserProfile(userId: string, userData: {
  email?: string;
  displayName?: string;
  photoURL?: string;
}): Promise<boolean> {
  try {
    const userProfile = {
      id: userId,
      email: userData.email || '',
      displayName: userData.displayName || 'مستخدم جديد',
      photoURL: userData.photoURL || '',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      preferences: {
        language: 'ar',
        theme: 'dark',
        figmaIntegration: {
          connectedAt: null,
          lastSyncAt: null,
          totalProjects: 0
        }
      },
      subscription: {
        plan: 'free',
        status: 'active',
        expiresAt: null
      }
    };

    const docRef = db.collection('userProfiles').doc(userId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      await docRef.set(userProfile);
      console.log(`✅ Created user profile for: ${userId}`);
      return true;
    } else {
      // Update last login
      await docRef.update({
        lastLoginAt: new Date().toISOString()
      });
      console.log(`ℹ️  Updated last login for: ${userId}`);
      return true;
    }
  } catch (error) {
    console.error('❌ Error creating user profile:', error);
    return false;
  }
}

/**
 * Get user's Figma projects count and update profile
 */
export async function updateUserFigmaStats(userId: string): Promise<void> {
  try {
    const projectsSnapshot = await db.collection('figmaProjects')
      .where('userId', '==', userId)
      .get();

    const totalProjects = projectsSnapshot.size;

    await db.collection('userProfiles').doc(userId).update({
      'preferences.figmaIntegration.totalProjects': totalProjects,
      'preferences.figmaIntegration.lastSyncAt': new Date().toISOString()
    });

    console.log(`📊 Updated Figma stats for user ${userId}: ${totalProjects} projects`);
  } catch (error) {
    console.error('❌ Error updating user Figma stats:', error);
  }
}

/**
 * Clean up old demo data (for maintenance)
 */
export async function cleanupDemoData(): Promise<void> {
  try {
    console.log('🧹 Starting cleanup of old demo data...');

    // Delete conversations older than 30 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    const oldConversations = await db.collection('conversations')
      .where('createdAt', '<', cutoffDate.toISOString())
      .get();

    const batch = db.batch ? db.batch() : null;
    let deleteCount = 0;

    oldConversations.docs.forEach((doc) => {
      if (batch) {
        batch.delete(doc.ref);
        deleteCount++;
      }
    });

    if (batch && deleteCount > 0) {
      await batch.commit();
      console.log(`🗑️  Deleted ${deleteCount} old conversations`);
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

/**
 * Export current data structure for backup
 */
export async function exportDataStructure(): Promise<any> {
  try {
    const collections = ['figmaProjects', 'userProfiles', 'designComponents'];
    const exportData: any = {};

    for (const collectionName of collections) {
      const snapshot = await db.collection(collectionName).get();
      exportData[collectionName] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    return exportData;
  } catch (error) {
    console.error('❌ Error exporting data structure:', error);
    return null;
  }
}

// Helper function to check Firebase connectivity
export async function testFirebaseConnection(): Promise<{
  connected: boolean;
  error?: string;
  details?: any;
}> {
  try {
    // Try to read from a collection
    const testDoc = await db.collection('test').doc('connectivity').get();
    
    return {
      connected: true,
      details: {
        projectId: config.firebase.projectId,
        environment: config.app.environment,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error: any) {
    return {
      connected: false,
      error: error.message,
      details: {
        projectId: config.firebase.projectId,
        environment: config.app.environment
      }
    };
  }
}

// Export helper functions
export {
  initialData,
  type InitialData
};