// Firebase Configuration for FlowCanvasAI
// This file handles Firebase initialization and configuration

import { config } from './config';

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

// Firebase configuration from central config
const firebaseConfig: FirebaseConfig = config.firebase;

// Mock Firebase services for development
export class MockFirestore {
  private data: Map<string, any> = new Map()

  collection(path: string) {
    return {
      add: async (data: any) => {
        const id = Math.random().toString(36).substr(2, 9)
        this.data.set(`${path}/${id}`, { id, ...data, createdAt: new Date() })
        return { id }
      },
      
      get: async () => ({
        docs: Array.from(this.data.entries())
          .filter(([key, doc]) => key.startsWith(path))
          .map(([key, doc]) => ({
            id: doc.id,
            data: () => doc,
            exists: true
          }))
      }),
      
      doc: (id: string) => ({
        get: async () => ({
          exists: this.data.has(`${path}/${id}`),
          data: () => this.data.get(`${path}/${id}`)
        }),
        set: async (data: any) => {
          this.data.set(`${path}/${id}`, { id, ...data, updatedAt: new Date() })
          return Promise.resolve()
        },
        update: async (data: any) => {
          const existing = this.data.get(`${path}/${id}`) || {}
          this.data.set(`${path}/${id}`, { ...existing, ...data, updatedAt: new Date() })
          return Promise.resolve()
        },
        delete: async () => {
          this.data.delete(`${path}/${id}`)
          return Promise.resolve()
        }
      }),
      
      where: (field: string, operator: string, value: any) => ({
        orderBy: (orderField: string, direction: 'asc' | 'desc' = 'asc') => ({
          get: async () => ({
            docs: Array.from(this.data.entries())
              .filter(([key, doc]) => key.startsWith(path))
              .filter(([key, doc]) => {
                const docData = doc;
                switch (operator) {
                  case '==': return docData[field] === value;
                  case '!=': return docData[field] !== value;
                  case '>': return docData[field] > value;
                  case '<': return docData[field] < value;
                  case '>=': return docData[field] >= value;
                  case '<=': return docData[field] <= value;
                  default: return true;
                }
              })
              .sort(([, docA], [, docB]) => {
                const aVal = docA[orderField];
                const bVal = docB[orderField];
                if (direction === 'desc') {
                  return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
                }
                return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
              })
              .map(([key, doc]) => ({
                id: doc.id,
                data: () => doc,
                exists: true
              }))
          })
        }),
        get: async () => ({
          docs: Array.from(this.data.entries())
            .filter(([key, doc]) => key.startsWith(path))
            .filter(([key, doc]) => {
              const docData = doc;
              switch (operator) {
                case '==': return docData[field] === value;
                case '!=': return docData[field] !== value;
                case '>': return docData[field] > value;
                case '<': return docData[field] < value;
                case '>=': return docData[field] >= value;
                case '<=': return docData[field] <= value;
                default: return true;
              }
            })
            .map(([key, doc]) => ({
              id: doc.id,
              data: () => doc,
              exists: true
            }))
        })
      }),
      
      orderBy: (field: string, direction: 'asc' | 'desc' = 'asc') => ({
        get: async () => ({
          docs: Array.from(this.data.entries())
            .filter(([key, doc]) => key.startsWith(path))
            .sort(([, docA], [, docB]) => {
              const aVal = docA[field];
              const bVal = docB[field];
              if (direction === 'desc') {
                return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
              }
              return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            })
            .map(([key, doc]) => ({
              id: doc.id,
              data: () => doc,
              exists: true
            }))
        })
      })
    }
  }
}

export class MockFirebaseAuth {
  private currentUser: any = null

  get user() {
    return this.currentUser
  }

  async signInAnonymously() {
    this.currentUser = {
      uid: 'anonymous-' + Math.random().toString(36).substr(2, 9),
      isAnonymous: true
    }
    return { user: this.currentUser }
  }

  async signOut() {
    this.currentUser = null
  }

  onAuthStateChanged(callback: (user: any) => void) {
    callback(this.currentUser)
    return () => {} // unsubscribe function
  }
}

export class MockFirebaseFunctions {
  httpsCallable(functionName: string) {
    return async (data: any) => {
      // Simulate cloud function calls
      console.log(`Mock Firebase Function: ${functionName}`, data)
      
      switch (functionName) {
        case 'generateAIResponse':
          return { data: await this.mockAIResponse(data) }
        case 'processWorkflow':
          return { data: await this.mockWorkflowProcessing(data) }
        case 'analyzeData':
          return { data: await this.mockDataAnalysis(data) }
        default:
          return { data: { success: true, message: 'Mock function executed' } }
      }
    }
  }

  private async mockAIResponse(data: { message: string, language: string }) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const responses = {
      ar: [
        'شكراً لك على سؤالك. كيف يمكنني مساعدتك اليوم؟',
        'هذا سؤال ممتاز! دعني أفكر في أفضل طريقة للرد عليه.',
        'بناءً على خبرتي في الأتمتة والذكاء الاصطناعي، أنصحك بـ...',
        'يمكنني مساعدتك في تحسين سير العمل الخاص بك من خلال...'
      ],
      en: [
        'Thank you for your question. How can I assist you today?',
        'That\'s an excellent question! Let me think about the best way to answer it.',
        'Based on my experience in automation and AI, I recommend...',
        'I can help you improve your workflow by...'
      ]
    }

    const langResponses = responses[data.language as keyof typeof responses] || responses.en
    const response = langResponses[Math.floor(Math.random() * langResponses.length)]

    return {
      success: true,
      response,
      timestamp: new Date().toISOString(),
      confidence: 0.85 + Math.random() * 0.1
    }
  }

  private async mockWorkflowProcessing(data: any) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      success: true,
      processedSteps: data.steps?.length || 0,
      optimizations: [
        'Reduced processing time by 15%',
        'Identified 2 redundant steps',
        'Suggested parallel execution for steps 3-5'
      ],
      executionTime: Math.random() * 1000 + 500,
      timestamp: new Date().toISOString()
    }
  }

  private async mockDataAnalysis(data: any) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      success: true,
      insights: [
        'Peak usage detected between 2-4 PM',
        '23% improvement in efficiency',
        'Recommended scaling at 85% capacity'
      ],
      metrics: {
        accuracy: 0.92,
        performance: 0.88,
        efficiency: 0.91
      },
      timestamp: new Date().toISOString()
    }
  }
}

// Initialize mock services
export const db = new MockFirestore()
export const auth = new MockFirebaseAuth()
export const functions = new MockFirebaseFunctions()

// Export configuration
export { firebaseConfig }

// Initialize Firebase (mock)
export const initializeFirebase = () => {
  console.log('🔥 Firebase Mock initialized for FlowCanvasAI')
  console.log('📱 Project:', firebaseConfig.projectId)
  return {
    db,
    auth,
    functions,
    config: firebaseConfig
  }
}

// Real-time listeners simulation
export const createRealtimeListener = (collection: string, callback: (data: any[]) => void) => {
  // Simulate real-time updates
  const interval = setInterval(() => {
    const mockData = [
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'workflow_update',
        status: ['running', 'completed', 'paused'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString()
      }
    ]
    callback(mockData)
  }, 5000)

  return () => clearInterval(interval)
}

export default {
  db,
  auth,
  functions,
  initializeFirebase,
  createRealtimeListener
}