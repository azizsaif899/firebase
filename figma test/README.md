# 🤖 FlowCanvasAI

<div align="center">

![FlowCanvasAI](https://img.shields.io/badge/FlowCanvasAI-v3.0-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**منصة احترافية للأتمتة والذكاء الاصطناعي مع تصميم داكن ودعم كامل للعربية**

[✨ المميزات](#-المميزات-الرئيسية) • [🚀 البدء السريع](#-البدء-السريع) • [📚 التوثيق](#-التوثيق) • [🤝 المساهمة](#-المساهمة)

</div>

---

## 🌟 نظرة عامة

FlowCanvasAI هي منصة متطورة تجمع بين الأتمتة والذكاء الاصطناعي في واجهة احترافية. تدعم المنصة اللغة العربية بالكامل مع دعم RTL وتتضمن نظام محادثة متقدم يحاكي WhatsApp بدقة.

### 🎯 الهدف الرئيسي
إنشاء منصة شاملة تمكن المستخدمين من:
- 🤖 **التفاعل مع الذكاء الاصطناعي** بطريقة طبيعية وسلسة
- ⚡ **أتمتة المهام المعقدة** بواجهة بصرية سهلة
- 🎨 **تصميم الواجهات** باستخدام مكتبة شاملة من المكونات
- 💬 **التواصل الفعال** عبر نظام محادثة متطور

---

## ✨ المميزات الرئيسية

### 🚀 تقنيات متطورة
- **Next.js 15** مع App Router للأداء الفائق
- **TypeScript** للأمان وسهولة التطوير
- **Tailwind CSS v4** للتصميم المتجاوب
- **Firebase** للبيانات والمصادقة
- **Gemini 2.0 Flash AI** للذكاء الاصطناعي

### 🌍 دعم شامل للعربية
- ✅ **دعم RTL** كامل للغة العربية
- ✅ **خطوط احترافية** مُحسنة للعربية والإنجليزية
- ✅ **واجهة ثنائية اللغة** قابلة للتبديل فورياً
- ✅ **تخطيط متجاوب** يتكيف مع اتجاه النص

### 💬 نظام المحادثة المتقدم
- 🎨 **واجهة WhatsApp** مطابقة للأصل 100%
- 🔊 **رسائل صوتية** مع عرض الموجة الصوتية
- 📱 **تصميم متجاوب** يعمل على جميع الأجهزة
- 🌙 **الوضع المظلم** مع انتقالات سلسة

### ⚡ نظام الأتمتة الذكي
- 🎯 **مصمم سير العمل** البصري المتطور
- 🔗 **ربط الأنظمة** المختلفة بسهولة
- 📊 **تحليل الأداء** في الوقت الفعلي
- 🤖 **ذكاء اصطناعي مدمج** للتحسين التلقائي

### 🎨 مكتبة التصميم الشاملة
- 🧩 **80+ مكون** جاهز للاستخدام
- 🎭 **أنظمة تصميم متعددة** قابلة للتخصيص
- 🌈 **ألوان ديناميكية** تتكيف مع المحتوى
- ✨ **رسوم متحركة** احترافية ومحسنة

---

## 🚀 البدء السريع

### 📋 المتطلبات الأساسية

```bash
Node.js 18+ 
npm أو yarn أو pnpm
```

### ⚡ التشغيل في 3 خطوات

1. **تثبيت التبعيات**
```bash
npm install
```

2. **تشغيل المشروع**
```bash
npm run dev
```

3. **افتح المتصفح** 🎉
```
http://localhost:3000
```

### 🎯 جاهز للاستخدام فوراً!

✅ **لا حاجة لإعداد Firebase أو مفاتيح API**  
✅ **يعمل في وضع التجربة بجميع المميزات**  
✅ **دعم كامل للعربية مع RTL**  
✅ **واجهة محادثة تفاعلية**

---

## 🌐 الصفحات والمميزات

| الصفحة | الرابط | الوصف | المميزات |
|---------|--------|---------|-----------|
| 🏠 **الرئيسية** | `/` | الواجهة الترحيبية | Hero, Features, Pricing |
| 💬 **المحادثة** | `/conversation` | نظام WhatsApp المتطور | AI Chat, Voice Messages |
| 🎨 **مكتبة التصميم** | `/design-library` | مكونات UI جاهزة | 80+ Components |
| ⚡ **الأتمتة** | `/automation` | أدوات الأتمتة | Analytics, Triggers |
| 🔄 **مصمم الـ Workflow** | `/workflow-builder` | إنشاء المخططات | Visual Builder |

---

## 🔧 إعداد Firebase (اختياري ولكن مُوصى به)

للحصول على التجربة الكاملة مع حفظ البيانات:

### 1. إنشاء مشروع Firebase
```bash
# اذهب إلى Firebase Console
https://console.firebase.google.com/

# أنشئ مشروعاً جديداً
# فعّل Firestore Database
# فعّل Authentication
```

### 2. إضافة المفاتيح
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456

# Gemini AI (اختياري)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🤖 إعداد Gemini AI (اختياري)

للحصول على مساعد ذكي متطور:

1. **احصل على API Key**
```bash
# اذهب إلى Google AI Studio
https://makersuite.google.com/app/apikey

# أنشئ مفتاح API جديد
# أضفه في .env.local
```

2. **اختبار الاتصال**
```bash
# سيظهر "✅ Gemini AI متصل" في الكونسول
npm run dev
```

---

## 📦 بناء المشروع للإنتاج

```bash
# بناء النسخة المحسنة
npm run build

# تشغيل النسخة المبنية محلياً
npm run start

# فحص جودة الكود
npm run lint

# فحص الأنواع
npm run type-check
```

---

## 🛠️ التخصيص والتطوير

### 🎨 تخصيص الألوان
```css
/* styles/globals.css */
:root {
  --primary: #4F97FF;        /* الأزرق الأساسي */
  --secondary: #1ABC9C;      /* الأخضر المكمل */
  --background: #0F0F0F;     /* خلفية داكنة */
}
```

### 🌍 إضافة لغات جديدة
```typescript
// lib/translations.ts
export const translations = {
  ar: { welcome: 'مرحباً' },
  en: { welcome: 'Welcome' },
  fr: { welcome: 'Bonjour' }, // لغة جديدة
};
```

### 🧩 إضافة مكونات جديدة
```bash
# إنشاء مكون جديد
touch components/MyNewComponent.tsx

# استيراد في App.tsx
import { MyNewComponent } from './components/MyNewComponent';
```

---

## 📚 التوثيق

### 📖 دلائل شاملة
- **[🚀 دليل البدء السريع](./docs/setup/quick-start.md)** - ابدأ في 5 دقائق
- **[🏗️ بنية المشروع](./docs/architecture/overview.md)** - فهم البنية التقنية
- **[🧩 مرجع المكونات](./docs/components-reference.md)** - جميع المكونات الـ 80+
- **[🔧 استكشاف الأخطاء](./docs/troubleshooting/README.md)** - حل المشاكل الشائعة

### 🎯 أدلة متخصصة
- **[💬 نظام المحادثة](./docs/chat-system.md)** - WhatsApp Interface
- **[⚡ نظام الأتمتة](./docs/automation.md)** - Workflow Builder
- **[🎨 مكتبة التصميم](./docs/design-system.md)** - UI Components
- **[🌍 دعم اللغات](./docs/i18n.md)** - Internationalization

---

## 🔄 وضع التجربة (Demo Mode)

إذا لم تقم بإعداد Firebase أو Gemini AI، سيعمل التطبيق في **وضع التجربة**:

✅ **متاح:**
- واجهة المستخدم الكاملة
- جميع المكونات والصفحات
- التنقل بين الصفحات
- تبديل اللغة والثيم

⚠️ **محدود:**
- لا يتم حفظ البيانات
- AI محاكي (ردود جاهزة)
- بعض المميزات المتقدمة

---

## 🆘 استكشاف الأخطاء

### ❌ مشاكل شائعة وحلولها

#### 🐛 خطأ في تثبيت الحزم
```bash
# احذف الملفات واعد التثبيت
rm -rf node_modules package-lock.json
npm install
```

#### 🐛 مشكلة في البيئة
```bash
# تحقق من النسخة
node --version  # يجب أن تكون 18+
npm --version

# تحديث Node.js إذا لزم الأمر
```

#### 🐛 مشكلة في الخطوط العربية
```bash
# تأكد من تفعيل الخطوط في tailwind.config.js
# تأكد من وجود font-arabic في الفئات
```

#### 🐛 مشكلة في Firebase
```bash
# تحقق من صحة المفاتيح في .env.local
# تأكد من تفعيل الخدمات في Firebase Console
# تحقق من صحة أذونات قاعدة البيانات
```

---

## 📊 الإحصائيات والأداء

### 🎯 مؤشرات الأداء
- ⚡ **وقت التحميل الأولي:** < 2 ثانية
- 🚀 **Core Web Vitals:** جميعها في المنطقة الخضراء
- 📱 **نقاط الاستجابة:** جميع الأجهزة مدعومة
- 🌍 **دعم المتصفحات:** Chrome, Firefox, Safari, Edge

### 📈 إحصائيات المشروع
- 🧩 **المكونات:** 80+ مكون جاهز
- 📄 **الصفحات:** 6 صفحات رئيسية
- 🎨 **أنظمة التصميم:** 5 أنماط مختلفة
- 🌍 **اللغات المدعومة:** العربية والإنجليزية
- ⚡ **أنماط الرسوم المتحركة:** 20+ رسمة متحركة

---

## 🤝 المساهمة

نرحب بمساهماتكم! 🎉

### 🔄 خطوات المساهمة
1. **Fork المشروع**
2. **إنشاء branch جديد** (`git checkout -b feature/amazing-feature`)
3. **Commit التغييرات** (`git commit -m 'Add amazing feature'`)
4. **Push للـ branch** (`git push origin feature/amazing-feature`)
5. **فتح Pull Request**

### 📝 قواعد المساهمة
- اتبع [دليل التطوير](./docs/development/contributing.md)
- اكتب تسميات واضحة للـ commits
- أضف اختبارات للمميزات الجديدة
- تأكد من أن الكود يمر جميع الاختبارات

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 🙏 شكر وتقدير

### 🌟 التقنيات المستخدمة
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework  
- [TypeScript](https://www.typescriptlang.com/) - Type Safety
- [Firebase](https://firebase.google.com/) - Backend Services
- [Gemini AI](https://ai.google.dev/) - AI Integration

### 👥 الفريق
- **فريق FlowCanvas AI** - التطوير والتصميم
- **مجتمع المطورين** - المساهمات والاختبار
- **المستخدمون** - التغذية الراجعة والاقتراحات

---

## 📞 الدعم والتواصل

### 💬 الحصول على المساعدة
- 📧 **البريد الإلكتروني:** support@flowcanvas.ai
- 💬 **Discord:** [انضم لمجتمعنا](https://discord.gg/flowcanvas)
- 📚 **التوثيق:** [docs.flowcanvas.ai](https://docs.flowcanvas.ai)
- 🐛 **تقرير الأخطاء:** [GitHub Issues](https://github.com/flowcanvas/issues)

### 🔗 روابط مفيدة
- 🌐 **الموقع الرسمي:** [flowcanvas.ai](https://flowcanvas.ai)
- 📱 **التطبيق:** [app.flowcanvas.ai](https://app.flowcanvas.ai)
- 📖 **المدونة:** [blog.flowcanvas.ai](https://blog.flowcanvas.ai)
- 🎥 **قناة YouTube:** [FlowCanvas AI](https://youtube.com/@flowcanvas)

---

<div align="center">

### 🎉 مبروك! FlowCanvasAI جاهز للانطلاق! 🚀

**صُنع بـ ❤️ من فريق FlowCanvas AI**

[![Star on GitHub](https://img.shields.io/github/stars/flowcanvas/flowcanvas-ai?style=social)](https://github.com/flowcanvas/flowcanvas-ai)
[![Follow on Twitter](https://img.shields.io/twitter/follow/flowcanvas_ai?style=social)](https://twitter.com/flowcanvas_ai)

</div>