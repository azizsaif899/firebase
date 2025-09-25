# 🚀 دليل البدء السريع - FlowCanvasAI

## 📋 ملخص سريع للإعداد

### 🔥 **إعداد Firebase في 5 دقائق**

#### **الطريقة الأولى: التلقائية (مُوصى بها)**
```bash
# 1. تشغيل سكريبت الإعداد التلقائي
chmod +x setup-firebase.sh
./setup-firebase.sh

# 2. تحديث ملف .env.local بالقيم الحقيقية
nano .env.local

# 3. تشغيل التطبيق
npm run dev
```

#### **الطريقة الثانية: اليدوية**
```bash
# 1. إنشاء مشروع Firebase
# انتقل إلى: https://console.firebase.google.com
# اضغط "Create project" -> أدخل: "flowcanvas-ai"

# 2. إنشاء ملف .env.local
cp .env.example .env.local
# حدّث القيم من Firebase Console

# 3. تهيئة قاعدة البيانات
# في Firebase Console: Firestore Database -> Create database

# 4. تشغيل التطبيق
npm run dev
```

---

## 🔑 **القيم المطلوبة لـ Firebase Studio**

### **📊 معلومات المشروع**
```javascript
Project Name: FlowCanvasAI
Project ID: flowcanvas-ai (أو اسم مخصص)
Location: us-central (أو الأقرب لك)
```

### **🔥 Firebase Configuration**
```bash
# من Firebase Console > Project Settings > General
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flowcanvas-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=flowcanvas-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=flowcanvas-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### **🎨 Figma Integration**
```bash
# من https://www.figma.com/settings
FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **🤖 Gemini AI**
```bash
# من https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 🧪 **اختبار الإعداد**

### **1. فحص الاتصالات**
```bash
# تشغيل التطبيق
npm run dev

# انتقل إلى صفحة الإعداد
http://localhost:3000/setup

# اضغط "اختبار الاتصال"
```

### **2. تهيئة البيانات الأولية**
```bash
# في صفحة الإعداد
اضغط "تهيئة البيانات" 
# سيتم إنشاء:
# - مكونات تجريبية
# - فئات التنظيم  
# - إعدادات افتراضية
```

---

## 🎯 **الاستخدام بعد الإعداد**

### **📱 الواجهات المتاحة:**

#### **🏠 الصفحة الرئيسية** - `/`
- عرض المميزات والخدمات
- أزرار الانتقال السريع

#### **💬 المحادثة الذكية** - `/conversation` 
- محادثة مع AI مساعد
- دعم عربي/إنجليزي كامل
- حفظ المحادثات

#### **🎨 مكتبة التصميم** - `/design-library`
- مكونات UI جاهزة
- نماذج وتصميمات
- أكواد قابلة للنسخ

#### **⚙️ الأتمتة** - `/automation`
- إنشاء سير عمل تلقائي
- محفزات ذكية
- تحليل الأداء

#### **🎨 مصمم سير العمل** - `/workflow-builder`
- مصمم سير العمل التفاعلي
- نظام العقد المطور
- حفظ وتحميل المشاريع

---

## 🆘 **حل المشاكل الشائعة**

### **❌ "Firebase project not found"**
```bash
الحل:
1. تأكد من PROJECT_ID في .env.local
2. تحقق من إنشاء المشروع في Firebase Console
3. فعّل Firestore Database
```

### **❌ "Permission denied"** 
```bash
الحل:
1. تحقق من قواعد الأمان في Firestore
2. تأكد من تسجيل الدخول
3. راجع userId في البيانات
```

### **❌ "Gemini API quota exceeded"**
```bash
الحل:
1. راجع استخدام API في Google Cloud Console
2. قم بترقية الخطة إذا لزم الأمر
3. قلل عدد الطلبات
```

---

## 🎉 **مبروك! التطبيق جاهز**

### **✅ ما تم إنجازه:**
- ✨ Firebase متصل ومُكوّن
- 🔥 قاعدة بيانات جاهزة مع البيانات الأساسية
- 🎨 تكامل Figma يعمل
- 🤖 مساعد AI ذكي
- 🔐 أمان متكامل
- 📱 واجهات متجاوبة

### **🚀 الخطوات التالية:**
1. **استكشف الواجهات** المختلفة
2. **استورد مشروع Figma** حقيقي
3. **جرب المحادثة** مع AI
4. **أنشئ مكونات** مخصصة
5. **شارك التطبيق** مع الفريق

---

**📞 تحتاج مساعدة؟**
- 📖 راجع `/docs/setup/firebase-setup.md` للتفاصيل الكاملة
- 🔧 استخدم `/setup` لاختبار النظام
- 💬 جرب المحادثة مع AI للمساعدة التفاعلية

**🎯 استمتع باستخدام FlowCanvasAI!** 🚀✨