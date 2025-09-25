# 🧩 مرجع المكونات - Components Reference

## 📋 دليل شامل لجميع مكونات FlowCanvasAI

---

## 🏠 المكونات الرئيسية - Main Components

### 📱 App.tsx
**الوصف:** المكون الجذر الذي يدير حالة التطبيق والتنقل  
**المسار:** `/App.tsx`  
**النوع:** Client Component

**الميزات:**
- إدارة اللغة (عربي/إنجليزي) مع RTL
- إدارة الثيم (فاتح/داكن)
- التنقل بين 7 صفحات
- تحسينات الأداء مع localStorage
- معالجة الأخطاء المتطورة

**الاستخدام:**
```tsx
// المكون الجذر - يتم استدعاؤه تلقائياً
export default function App() {
  // منطق إدارة الحالة والتنقل
}
```

---

## 💬 مكونات المحادثة - Chat Components

### 🎯 ConversationPage.tsx
**الوصف:** صفحة المحادثة الكاملة مع واجهة WhatsApp  
**المسار:** `/components/ConversationPage.tsx`  
**النوع:** Client Component

**الميزات:**
- تصميم مطابق لـ WhatsApp Desktop
- دعم RTL كامل للعربية
- رسائل نصية وصوتية ومرئية
- قائمة جهات الاتصال
- شريط بحث متقدم
- لوحة معلومات جانبية

**Props:**
```tsx
interface ConversationPageProps {
  language: 'ar' | 'en';
  onBackToHome: () => void;
  onLanguageChange: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
}
```

### 💬 WhatsAppChat.tsx
**الوصف:** واجهة المحادثة الأساسية  
**المسار:** `/components/WhatsAppChat.tsx`  
**النوع:** Client Component

**الميزات:**
- منطقة الرسائل مع scroll تلقائي
- شريط الإدخال مع أزرار
- عرض حالة الكتابة
- دعم الرسائل الصوتية

### 🗨️ WhatsAppBubble.tsx
**الوصف:** فقاعات الرسائل المطابقة لـ WhatsApp  
**المسار:** `/components/WhatsAppBubble.tsx`  
**النوع:** Client Component

**الميزات:**
- تصميم دقيق مطابق للأصل
- فقاعات واردة وصادرة
- حالات الرسائل (مرسل، مستلم، مقروء)
- دعم الرسائل الصوتية مع Waveform

**Props:**
```tsx
interface BubbleProps {
  type: 'sent' | 'received';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  isVoice?: boolean;
  voiceDuration?: string;
}
```

### 📋 WhatsAppChatList.tsx
**الوصف:** قائمة المحادثات والجهات  
**المسار:** `/components/WhatsAppChatList.tsx`  
**النوع:** Client Component

**الميزات:**
- قائمة جهات الاتصال مع الصور الرمزية
- آخر رسالة ووقت الإرسال
- عداد الرسائل غير المقروءة
- حالة الاتصال (متصل/غير متصل)
- تأثيرات hover متقدمة

---

## 🎨 مكونات مصمم سير العمل - Workflow Components

### 🎨 MinimalistCanvasFixed3.tsx
**الوصف:** مصمم سير العمل المتطور مع نظام العقد  
**المسار:** `/components/MinimalistCanvasFixed3.tsx`  
**النوع:** Client Component

**الميزات:**
```
🎯 المجموعات المنظمة:
├── 1️⃣ البداية - محفزات وجدولة
├── 2️⃣ الإجراءات - إعدادات وتكامل  
├── 3️⃣ الفلترة - شروط ومنطق
├── 4️⃣ البيانات - قواعد بيانات
└── 5️⃣ النتيجة - مخرجات نهائية
```

**العقد المتاحة:**
- **محفز (Trigger)** - نقطة البداية
- **جدولة (Schedule)** - مهام مؤقتة
- **إجراء (Action)** - عمليات معالجة
- **تكامل (Integration)** - خدمات خارجية
- **شرط (Condition)** - منطق التفرع
- **بيانات (Data)** - قواعد البيانات
- **مخرجات (Output)** - النتائج النهائية

**Props:**
```tsx
interface CanvasProps {
  language: 'ar' | 'en';
  onClose?: () => void;
}
```

### 🎯 VisualCanvas.tsx
**الوصف:** Canvas التفاعلي للرسم والتصميم  
**المسار:** `/components/VisualCanvas.tsx`  
**النوع:** Client Component

**الميزات:**
- Drag & Drop للعقد
- اتصال العقد بخطوط ذكية
- تكبير وتصغير
- حفظ وتحميل المشاريع
- تصدير بصيغ متعددة

---

## 📚 مكونات مكتبة التصميم - Design Library Components

### 📖 DesignLibrary.tsx
**الوصف:** مكتبة التصميم الشاملة  
**المسار:** `/components/DesignLibrary.tsx`  
**النوع:** Client Component

**الميزات:**
- عرض جميع مكونات UI
- أمثلة تفاعلية مع الكود
- نظام الألوان والخطوط
- إرشادات التصميم المتجاوب
- تبديل الثيم المباشر

**الأقسام:**
```
📚 مكتبة التصميم:
├── 🎨 الألوان والخطوط
├── 🧩 مكونات UI الأساسية
├── 📱 التصميم المتجاوب
├── 🌙 نظام الثيمات
├── 🌍 دعم متعدد اللغات
└── ♿ إمكانية الوصول
```

---

## 🤖 مكونات الأتمتة - Automation Components

### ⚡ Automation.tsx
**الوصف:** صفحة الأتمتة مع جميع الأدوات  
**المسار:** `/components/Automation.tsx`  
**النوع:** Client Component

**الميزات:**
- مكتبة الإجراءات الشاملة
- نظام المحفزات المتقدم
- لوحة التحليلات والإحصائيات
- التنبيهات الذكية
- إدارة المهام المجدولة

### 📚 ActionLibrary.tsx
**الوصف:** مكتبة الإجراءات المتاحة  
**المسار:** `/components/ActionLibrary.tsx`  
**النوع:** Client Component

**الإجراءات المتاحة:**
- **إرسال بريد إلكتروني**
- **إنشاء مهمة**
- **تحديث قاعدة البيانات**
- **استدعاء API خارجي**
- **إرسال إشعار**
- **معالجة الملفات**

### ⚡ TriggerSystem.tsx
**الوصف:** نظام المحفزات والأحداث  
**المسار:** `/components/TriggerSystem.tsx`  
**النوع:** Client Component

**أنواع المحفزات:**
- **وقت محدد** - تشغيل في وقت معين
- **حدث ملف** - عند تغيير ملف
- **webhook** - عند استلام طلب HTTP
- **بريد إلكتروني** - عند وصول رسالة
- **قاعدة بيانات** - عند تغيير البيانات

---

## 🤖 مكونات الذكاء الاصطناعي - AI Components

### 🧠 AISidebar.tsx
**الوصف:** شريط جانبي للذكاء الاصطناعي  
**المسار:** `/components/AISidebar.tsx`  
**النوع:** Client Component

**الميزات:**
- محادثة مع الذكاء الاصطناعي
- تحليل سير العمل
- اقتراحات تحسين
- توليد كود تلقائي
- مساعدة سياقية

### 💬 features/ai/enhanced-chat-sidebar.tsx
**الوصف:** شريط محادثة ذكي محسن  
**المسار:** `/components/features/ai/enhanced-chat-sidebar.tsx`  
**النوع:** Client Component

**الميزات:**
- واجهة محادثة متقدمة
- تبويبات متعددة (محادثة، رؤى، سجل)
- اقتراحات ذكية
- حفظ تلقائي للمحادثات
- تصدير المحادثات

### 🎨 features/ai/ai-canvas-assistant.tsx
**الوصف:** مساعد ذكي لمصمم سير العمل  
**المسار:** `/components/features/ai/ai-canvas-assistant.tsx`  
**النوع:** Client Component

**الميزات:**
- تحليل المخططات الذكي
- اقتراحات تحسين الأداء
- توليد كود من المخططات
- فحص الأخطاء المحتملة
- تحسينات تلقائية

---

## 🎨 مكونات التصميم - Design Components

### 🎭 Header.tsx
**الوصف:** رأس الصفحة مع التنقل  
**المسار:** `/components/Header.tsx`  
**النوع:** Client Component

**الميزات:**
- شعار FlowCanvasAI المتحرك
- قائمة التنقل الرئيسية
- أزرار تبديل اللغة والثيم
- تصميم متجاوب
- تأثيرات hover متقدمة

**Props:**
```tsx
interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}
```

### 🏠 HeroSection.tsx
**الوصف:** القسم الرئيسي للصفحة الأولى  
**المسار:** `/components/HeroSection.tsx`  
**النوع:** Client Component

**الميزات:**
- عنوان رئيسي مع تأثيرات
- وصف تفاعلي
- أزرار العمل الرئيسية
- خلفيات متحركة
- تحسين SEO

### 🦶 Footer.tsx
**الوصف:** تذييل الصفحة مع الروابط  
**المسار:** `/components/Footer.tsx`  
**النوع:** Client Component

**الميزات:**
- روابط سريعة للصفحات
- معلومات التواصل
- شعار الشركة
- إشعار حقوق الطبع
- روابط وسائل التواصل

---

## ⚙️ مكونات Shadcn/ui - UI Components

### 🔘 Button
**المسار:** `/components/ui/button.tsx`  
**الاستخدام:**
```tsx
<Button variant="default" size="md">
  اضغط هنا
</Button>
```

**المتغيرات المتاحة:**
- `default` - الزر الأساسي
- `destructive` - زر حذف
- `outline` - زر بإطار
- `secondary` - زر ثانوي
- `ghost` - زر شفاف
- `link` - زر رابط

### 📄 Card
**المسار:** `/components/ui/card.tsx`  
**الاستخدام:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>العنوان</CardTitle>
  </CardHeader>
  <CardContent>
    المحتوى هنا
  </CardContent>
</Card>
```

### 📝 Input
**المسار:** `/components/ui/input.tsx`  
**الاستخدام:**
```tsx
<Input 
  type="text" 
  placeholder="أدخل النص هنا"
  className="text-right" // للعربية
/>
```

### 📊 Dialog
**المسار:** `/components/ui/dialog.tsx`  
**الاستخدام:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>فتح المحادثة</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>عنوان المحادثة</DialogTitle>
      <DialogDescription>
        وصف المحادثة
      </DialogDescription>
    </DialogHeader>
    المحتوى هنا
  </DialogContent>
</Dialog>
```

---

## 🔧 مكونات الأدوات - Utility Components

### 🌍 LanguageToggle.tsx
**الوصف:** مبديل اللغة بين العربية والإنجليزية  
**المسار:** `/components/LanguageToggle.tsx`  
**النوع:** Client Component

**الميزات:**
- تبديل فوري بين اللغات
- حفظ تلقائي للتفضيل
- تأثيرات انتقال سلسة
- دعم RTL تلقائي

### 🌙 ThemeToggle.tsx
**الوصف:** مبديل الثيم بين الفاتح والداكن  
**المسار:** `/components/ThemeToggle.tsx`  
**النوع:** Client Component

**الميزات:**
- تبديل فوري للثيم
- حفظ تلقائي للتفضيل
- انتقالات سلسة
- أيقونات متحركة

### 🎨 ProfessionalLogo.tsx
**الوصف:** شعار FlowCanvasAI المهني  
**المسار:** `/components/ProfessionalLogo.tsx`  
**النوع:** Client Component

**الميزات:**
- تصميم متقدم مع تأثيرات
- أحجام متعددة
- ألوان قابلة للتخصيص
- رسوم متحركة

---

## 📊 مكونات التحليلات - Analytics Components

### 📈 AnalyticsDashboard.tsx
**الوصف:** لوحة التحليلات والإحصائيات  
**المسار:** `/components/AnalyticsDashboard.tsx`  
**النوع:** Client Component

**الميزات:**
- مخططات بيانية تفاعلية
- إحصائيات فورية
- فلاتر زمنية
- تصدير التقارير
- مقارنات دورية

**البيانات المعروضة:**
- **عدد المستخدمين النشطين**
- **عدد المشاريع المكتملة**
- **وقت الاستجابة المتوسط**
- **معدل نمو الاستخدام**
- **إحصائيات الأخطاء**

### 🔔 SmartAlerts.tsx
**الوصف:** نظام التنبيهات الذكية  
**المسار:** `/components/SmartAlerts.tsx`  
**النوع:** Client Component

**أنواع التنبيهات:**
- **تنبيهات النظام** - حالة الخادم
- **تنبيهات المستخدم** - رسائل شخصية
- **تنبيهات الأمان** - تحذيرات أمنية
- **تنبيهات الأداء** - مشاكل الأداء
- **تنبيهات المهام** - انتهاء المهام

---

## 🔧 إرشادات الاستخدام

### 📝 إنشاء مكون جديد
```tsx
// template للمكونات الجديدة
'use client';

import { useState } from 'react';

interface NewComponentProps {
  language: 'ar' | 'en';
  // props أخرى
}

export function NewComponent({ language }: NewComponentProps) {
  const [state, setState] = useState();

  return (
    <div className={`${language === 'ar' ? 'rtl font-arabic' : 'ltr'}`}>
      {/* محتوى المكون */}
    </div>
  );
}
```

### 🎨 استخدام الثيمات
```tsx
// للوصول لمتغيرات الثيم
<div className="bg-card text-foreground border-border">
  محتوى مع ثيم تلقائي
</div>

// للألوان المخصصة
<div className="bg-primary text-primary-foreground">
  محتوى بالألوان الأساسية
</div>
```

### 🌍 دعم RTL
```tsx
// للنصوص العربية
<div className="rtl font-arabic text-right">
  النص العربي هنا
</div>

// للنصوص الإنجليزية
<div className="ltr text-left">
  English text here
</div>
```

---

## 📚 مراجع إضافية

### 🔗 روابط مفيدة
- **[Shadcn/ui Documentation](https://ui.shadcn.com/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Next.js 15](https://nextjs.org/docs)**
- **[React 18](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

### 📖 وثائق ذات صلة
- **[البدء السريع](./setup/quick-start.md)**
- **[دليل المطور](./development/architecture.md)**
- **[استكشاف الأخطاء](./troubleshooting/README.md)**
- **[دليل النشر](./deployment/deployment-guide.md)**

---

*🧩 هذا المرجع يشمل جميع المكونات المتاحة في FlowCanvasAI مع أمثلة الاستخدام*