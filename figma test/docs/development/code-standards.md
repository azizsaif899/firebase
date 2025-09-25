# 📝 معايير الكود والتطوير

## 📋 المحتويات
- [المعايير العامة](#المعايير-العامة)
- [TypeScript](#typescript)
- [React Components](#react-components)
- [CSS & Styling](#css--styling)
- [أسماء الملفات](#أسماء-الملفات)
- [التوثيق](#التوثيق)
- [أفضل الممارسات](#أفضل-الممارسات)

## المعايير العامة

### 🎯 **مبادئ أساسية**
```typescript
// ✅ اكتب كود واضح ومفهوم
// ✅ استخدم أسماء وصفية للمتغيرات والدوال
// ✅ اتبع مبدأ DRY (Don't Repeat Yourself)
// ✅ اكتب تعليقات مفيدة باللغة العربية والإنجليزية
// ✅ اتبع معايير ESLint و Prettier
```

### 📏 **تنسيق الكود**
```typescript
// المسافة البادئة: 2 spaces
// طول السطر الأقصى: 80 حرف
// نهاية السطر: LF (\n)
// الترميز: UTF-8

// مثال صحيح
const fetchUserData = async (userId: string): Promise<User> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};
```

## TypeScript

### 🔧 **إعداد TypeScript**
```json
// tsconfig.json الأساسيات
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 📝 **كتابة Types**
```typescript
// ✅ استخدم interfaces للكائنات
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ استخدم type للاتحادات والحالات المتقدمة
type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';

// ✅ استخدم generics عند الحاجة
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// ✅ استخدم enums للقيم الثابتة
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}
```

### 🎨 **Props Types**
```typescript
// ✅ props واضحة ومفصلة
interface ChatSidebarProps {
  language: 'ar' | 'en';
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
  children?: React.ReactNode;
}

// ✅ استخدم default props
const ChatSidebar: React.FC<ChatSidebarProps> = ({
  language,
  isCollapsed = false,
  onToggle,
  className = '',
  children
}) => {
  // Component logic
};
```

## React Components

### 🏗️ **هيكل المكون**
```typescript
// 1. Imports
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

// 2. Types & Interfaces
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Component
export const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onAction 
}) => {
  // 4. State
  const [isLoading, setIsLoading] = useState(false);
  
  // 5. Effects
  useEffect(() => {
    // Setup logic
  }, []);
  
  // 6. Handlers
  const handleClick = useCallback(() => {
    setIsLoading(true);
    onAction();
  }, [onAction]);
  
  // 7. Render
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Click me'}
      </Button>
    </div>
  );
};
```

### 🎣 **Custom Hooks**
```typescript
// ✅ استخدم custom hooks للمنطق المشترك
export const useLocalStorage = <T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
};
```

### 🔄 **State Management**
```typescript
// ✅ استخدم React Context للحالة العامة
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## CSS & Styling

### 🎨 **Tailwind Classes**
```typescript
// ✅ ترتيب الكلاسات
const className = [
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 m-2',
  // Sizing
  'w-full h-auto',
  // Typography
  'font-medium',
  // Colors & Backgrounds
  'bg-primary text-white',
  // Effects
  'shadow-lg rounded-lg',
  // States
  'hover:bg-primary-dark focus:outline-none',
  // Responsive
  'md:p-6 lg:p-8'
].join(' ');

// ✅ استخدم CSS variables للقيم الديناميكية
<div 
  style={{ 
    '--sidebar-width': `${sidebarWidth}px` 
  }}
  className="w-[var(--sidebar-width)]"
>
```

### 💎 **Custom CSS Classes**
```css
/* ✅ اتبع naming convention واضحة */
.chat-sidebar-backdrop {
  /* Properties grouped logically */
  
  /* Display & Positioning */
  position: fixed;
  top: 0;
  right: 0;
  
  /* Box Model */
  width: 350px;
  height: 100vh;
  padding: 1rem;
  
  /* Visual */
  background: rgba(var(--card), 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(var(--border), 0.3);
  
  /* Animation */
  transition: all 0.3s ease;
  
  /* Other */
  z-index: 40;
}

/* ✅ استخدم BEM methodology */
.chat-message {
  /* Block */
}

.chat-message__content {
  /* Element */
}

.chat-message--user {
  /* Modifier */
}
```

## أسماء الملفات

### 📁 **هيكل الملفات**
```
components/
├── ChatSidebar.tsx          # PascalCase للمكونات
├── hooks/
│   └── useLocalStorage.ts   # camelCase للhooks
├── types/
│   └── api.types.ts         # camelCase.types.ts
├── utils/
│   └── date-helpers.ts      # kebab-case للutilities
└── constants/
    └── api-endpoints.ts     # kebab-case للثوابت
```

### 📝 **قواعد التسمية**
```typescript
// ✅ المكونات: PascalCase
export const ChatSidebar = () => {};

// ✅ Hooks: camelCase starting with 'use'
export const useLocalStorage = () => {};

// ✅ Types/Interfaces: PascalCase
interface UserProfile {}
type ApiResponse = {};

// ✅ Variables/Functions: camelCase
const userName = 'ahmad';
const getUserData = () => {};

// ✅ Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 5000;
```

## التوثيق

### 📖 **JSDoc Comments**
```typescript
/**
 * دالة لجلب بيانات المستخدم من API
 * Fetches user data from the API
 * 
 * @param userId - معرف المستخدم الفريد / Unique user identifier
 * @param options - خيارات إضافية للطلب / Additional request options
 * @returns Promise يحتوي على بيانات المستخدم / Promise containing user data
 * 
 * @example
 * ```typescript
 * const user = await fetchUserData('123', { includeProfile: true });
 * console.log(user.name);
 * ```
 */
export const fetchUserData = async (
  userId: string,
  options: FetchOptions = {}
): Promise<User> => {
  // Implementation
};
```

### 📝 **Component Documentation**
```typescript
/**
 * شريط الدردشة الجانبي الذكي
 * Smart AI Chat Sidebar Component
 * 
 * يوفر واجهة دردشة تفاعلية مع الذكاء الاصطناعي
 * Provides an interactive chat interface with AI
 * 
 * @features
 * - تأثيرات بلور متقدمة / Advanced blur effects
 * - دعم اللغتين العربية والإنجليزية / Arabic & English support
 * - انيميشن سلس للطي والفتح / Smooth collapse/expand animations
 * - تكامل مع Gemini AI / Gemini AI integration
 */
export const ChatSidebar: React.FC<ChatSidebarProps> = (props) => {
  // Component implementation
};
```

## أفضل الممارسات

### ⚡ **الأداء**
```typescript
// ✅ استخدم useMemo للحسابات المكلفة
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ استخدم useCallback للدوال
const handleClick = useCallback(() => {
  onAction();
}, [onAction]);

// ✅ استخدم React.memo للمكونات
export const OptimizedComponent = React.memo<Props>(({ data }) => {
  return <div>{data.name}</div>;
});
```

### 🛡️ **Error Handling**
```typescript
// ✅ استخدم Error Boundaries
class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// ✅ استخدم try-catch للAsync operations
const fetchData = async () => {
  try {
    const data = await api.getData();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    toast.error('فشل في تحميل البيانات');
    throw error;
  }
};
```

### 🔒 **الأمان**
```typescript
// ✅ نظف البيانات المدخلة
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// ✅ تحقق من صحة البيانات
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### 🎯 **الإتاحة (Accessibility)**
```typescript
// ✅ استخدم semantic HTML
<button
  type="button"
  aria-label="إغلاق النافذة / Close dialog"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <CloseIcon />
</button>

// ✅ أضف focus management
useEffect(() => {
  if (isOpen) {
    const firstFocusable = dialogRef.current?.querySelector('button, input');
    (firstFocusable as HTMLElement)?.focus();
  }
}, [isOpen]);
```

## الخلاصة

اتباع هذه المعايير يضمن:
- ✅ **كود نظيف وقابل للقراءة**
- ✅ **سهولة الصيانة والتطوير**
- ✅ **تقليل الأخطاء والبُقع**
- ✅ **تحسين الأداء والأمان**
- ✅ **توافق مع معايير الصناعة**