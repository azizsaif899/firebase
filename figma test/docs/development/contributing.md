# 🤝 المساهمة في FlowCanvasAI | Contributing to FlowCanvasAI

<div dir="rtl">

مرحباً بك في مجتمع FlowCanvasAI! نحن نرحب بجميع أنواع المساهمات من تقارير الأخطاء إلى الميزات الجديدة.

</div>

Welcome to the FlowCanvasAI community! We welcome all types of contributions from bug reports to new features.

---

## 📋 كيفية المساهمة | How to Contribute

### 🐛 الإبلاغ عن الأخطاء | Bug Reports

<div dir="rtl">

قبل الإبلاغ عن خطأ، تأكد من:
1. البحث في Issues الموجودة
2. استخدام أحدث إصدار
3. توفير معلومات كافية لإعادة الإنتاج

</div>

Before reporting a bug, please:
1. Search existing issues
2. Use the latest version  
3. Provide enough information to reproduce

**قالب الإبلاغ عن خطأ | Bug Report Template:**

```markdown
**وصف المشكلة | Problem Description:**
[وصف واضح ومختصر للمشكلة | Clear and concise description]

**خطوات إعادة الإنتاج | Steps to Reproduce:**
1. [الخطوة الأولى | First step]
2. [الخطوة الثانية | Second step]  
3. [النتيجة | Result]

**السلوك المتوقع | Expected Behavior:**
[ما كان متوقعاً أن يحدث | What should happen]

**البيئة | Environment:**
- النظام | OS: [Windows/Mac/Linux]
- المتصفح | Browser: [Chrome/Firefox/Safari]
- الإصدار | Version: [Version number]
```

### ✨ طلب ميزات جديدة | Feature Requests

<div dir="rtl">

لطلب ميزة جديدة:
1. تأكد أنها غير موجودة
2. اشرح الحاجة إليها
3. قدم أمثلة عن كيفية الاستخدام

</div>

To request a new feature:
1. Ensure it doesn't exist
2. Explain the need for it
3. Provide usage examples

### 💻 المساهمة بالكود | Code Contributions

#### 🚀 البدء السريع | Quick Start

```bash
# استنساخ المشروع
git clone https://github.com/your-username/flowcanvas-ai.git
cd flowcanvas-ai

# تثبيت التبعيات
npm install

# إنشاء branch جديد
git checkout -b feature/your-feature-name

# تشغيل المشروع
npm run dev
```

#### 📝 إرشادات الكود | Code Guidelines

##### **TypeScript:**
- ✅ استخدم TypeScript للكود الجديد
- ✅ وضع types واضحة
- ✅ تجنب `any` قدر الإمكان

##### **React Components:**
- ✅ استخدم functional components مع hooks
- ✅ اتبع نمط التسمية PascalCase للمكونات
- ✅ أضف PropTypes أو TypeScript interfaces

##### **Styling:**
- ✅ استخدم Tailwind CSS
- ✅ اتبع نظام الألوان الموجود
- ✅ تأكد من الدعم لـ RTL

##### **دعم اللغات | Language Support:**
- ✅ أضف النصوص بالعربية والإنجليزية
- ✅ استخدم المفاتيح الوصفية للترجمة
- ✅ تأكد من اتجاه النص الصحيح

#### 🧪 الاختبارات | Testing

```bash
# تشغيل الاختبارات
npm run test

# اختبار التغطية
npm run test:coverage

# فحص الكود
npm run lint

# فحص الأنواع
npm run type-check
```

#### 📋 Commit Guidelines

نستخدم [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# أمثلة على الـ commits
git commit -m "feat: إضافة ميزة التحليل الذكي"
git commit -m "fix: إصلاح خطأ في Chat Sidebar"  
git commit -m "docs: تحديث التوثيق"
git commit -m "style: تحسين التصميم"
git commit -m "refactor: إعادة هيكلة المكونات"
git commit -m "test: إضافة اختبارات للـ AI Provider"
```

**أنواع الـ Commits:**
- `feat`: ميزة جديدة
- `fix`: إصلاح خطأ  
- `docs`: تحديث التوثيق
- `style`: تغييرات التصميم
- `refactor`: إعادة هيكلة الكود
- `test`: إضافة اختبارات
- `chore`: مهام صيانة

### 🔄 عملية Pull Request

1. **Fork المشروع**
2. **إنشاء branch جديد:**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **تطبيق التغييرات:**
   - اكتب كود نظيف ومنظم
   - أضف اختبارات إذا لزم الأمر
   - تأكد من عمل جميع الاختبارات

4. **Commit التغييرات:**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```

5. **Push إلى branch:**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **فتح Pull Request:**
   - اذهب إلى GitHub
   - اضغط "New Pull Request"
   - املأ التفاصيل المطلوبة

#### 📋 Pull Request Template

```markdown
## 🎯 نوع التغيير | Type of Change
- [ ] Bug fix (إصلاح خطأ)
- [ ] New feature (ميزة جديدة)
- [ ] Breaking change (تغيير كبير)
- [ ] Documentation update (تحديث التوثيق)

## 📝 الوصف | Description
[وصف واضح للتغييرات المقترحة]

## 🧪 الاختبارات | Testing
- [ ] Unit tests pass
- [ ] Integration tests pass  
- [ ] Manual testing completed

## 📱 لقطات الشاشة | Screenshots
[إذا كان التغيير يؤثر على UI]

## ✅ Checklist
- [ ] الكود يتبع إرشادات المشروع
- [ ] تم اختبار التغييرات
- [ ] تم تحديث التوثيق إذا لزم الأمر
- [ ] الدعم للغتين العربية والإنجليزية
```

---

## 👥 مجتمع المطورين | Developer Community

### 💬 قنوات التواصل | Communication Channels

- **📧 البريد الإلكتروني:** developers@flowcanvas-ai.com
- **💬 Discord:** [FlowCanvasAI Developers](https://discord.gg/flowcanvas-ai-dev)
- **🐦 Twitter:** [@FlowCanvasAIDev](https://twitter.com/FlowCanvasAIDev)

### 🏆 المساهمون | Contributors

شكراً لجميع المساهمين الرائعين في هذا المشروع!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- سيتم تحديث هذه القائمة تلقائياً -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📄 الرخصة | License

<div dir="rtl">

بالمساهمة في FlowCanvasAI، فإنك توافق على أن مساهماتك ستكون مرخصة تحت رخصة MIT الخاصة بالمشروع.

</div>

By contributing to FlowCanvasAI, you agree that your contributions will be licensed under the project's MIT License.

---

<div align="center">

### 🚀 **شكراً لك على المساهمة في FlowCanvasAI!**
### 🚀 **Thank you for contributing to FlowCanvasAI!**

**مع الحب من فريق FlowCanvasAI** ❤️  
**Made with Love by FlowCanvasAI Team** ❤️

</div>