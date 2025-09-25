// Configuration file for FlowCanvasAI
// Handles environment variables safely across different environments

interface AppConfig {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  figma: {
    accessToken: string;
    baseUrl: string;
  };
  gemini: {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  app: {
    name: string;
    version: string;
    environment: 'development' | 'production' | 'demo';
    supportedLanguages: string[];
  };
}

// Helper function to safely get environment variables
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
};

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Check if we're in demo mode
const isDemoMode = () => {
  const hasRealFirebaseKey = getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY') && 
                            getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY') !== 'demo-api-key';
  const hasRealGeminiKey = getEnvVar('NEXT_PUBLIC_GEMINI_API_KEY') && 
                          getEnvVar('NEXT_PUBLIC_GEMINI_API_KEY') !== 'demo-key';
  const hasRealFigmaKey = getEnvVar('FIGMA_ACCESS_TOKEN') && 
                         getEnvVar('FIGMA_ACCESS_TOKEN') !== 'demo-token';
  
  return !hasRealFirebaseKey || !hasRealGeminiKey || !hasRealFigmaKey;
};

// App configuration
export const config: AppConfig = {
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', 'demo-api-key'),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'flowcanvas-ai.firebaseapp.com'),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'flowcanvas-ai'),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'flowcanvas-ai.appspot.com'),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '123456789'),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', '1:123456789:web:abc123'),
    measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', 'G-XXXXXXXXXX')
  },
  figma: {
    accessToken: getEnvVar('FIGMA_ACCESS_TOKEN', 'demo-token'),
    baseUrl: getEnvVar('FIGMA_BASE_URL', 'https://api.figma.com/v1')
  },
  gemini: {
    apiKey: getEnvVar('NEXT_PUBLIC_GEMINI_API_KEY', 'demo-key'),
    model: getEnvVar('GEMINI_MODEL', 'gemini-2.0-flash-exp'),
    temperature: parseFloat(getEnvVar('GEMINI_TEMPERATURE', '0.7')),
    maxTokens: parseInt(getEnvVar('GEMINI_MAX_TOKENS', '4096'))
  },
  app: {
    name: 'FlowCanvasAI',
    version: '2.0.0',
    environment: isDemoMode() ? 'demo' : (getEnvVar('NODE_ENV', 'development') as 'development' | 'production'),
    supportedLanguages: ['ar', 'en']
  }
};

// Export helper functions
export const isDemo = isDemoMode();
export const environment = config.app.environment;
export const isBrowserEnvironment = isBrowser;

// Console logs for debugging
if (isBrowser && console) {
  console.log('🚀 FlowCanvasAI Configuration Loaded');
  console.log('📱 Environment:', config.app.environment);
  console.log('🔥 Firebase Project:', config.firebase.projectId);
  console.log('🤖 Gemini Model:', config.gemini.model);
  console.log('🎨 Figma Integration:', config.figma.accessToken !== 'demo-token' ? '✅ Connected' : '🔄 Demo Mode');
  
  if (isDemo) {
    console.log('⚠️  Running in DEMO mode - some features may be simulated');
    console.log('💡 To enable full functionality, configure your API keys in environment variables');
  }
}

// Type exports
export type { AppConfig };

// Default export
export default config;