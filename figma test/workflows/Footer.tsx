'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

interface FooterProps {
  language: 'ar' | 'en';
}

export function Footer({ language }: FooterProps) {
  const isRTL = language === 'ar';
  
  const texts = {
    ar: {
      logo: 'QnA',
      description: 'نحن نقدم حلول الأتمتة الذكية المدعومة بالذكاء الاصطناعي لتحويل أعمالك وزيادة كفاءتك. انضم إلى آلاف المستخدمين الذين يثقون بنا.',
      newsletter: {
        title: 'اشترك في النشرة الإخبارية',
        description: 'احصل على آخر التحديثات والأخبار مباشرة في بريدك الإلكتروني',
        placeholder: 'أدخل بريدك الإلكتروني',
        button: 'اشترك'
      },
      links: {
        company: {
          title: 'الشركة',
          items: ['من نحن', 'فريق العمل', 'الوظائف', 'الأخبار', 'الشراكات']
        },
        services: {
          title: 'الخدمات',
          items: ['الأتمتة الذكية', 'التعلم الآلي', 'معالجة البيانات', 'تحليل الأداء', 'الاستشارات']
        },
        support: {
          title: 'الدعم',
          items: ['مركز المساعدة', 'التوثيق', 'الدعم الفني', 'الحالة', 'التحديثات']
        },
        legal: {
          title: 'قانوني',
          items: ['سياسة الخصوصية', 'شروط الخدمة', 'ملفات تعريف الارتباط', 'الأمان', 'الامتثال']
        }
      },
      contact: {
        title: 'تواصل معنا',
        email: 'info@qna.com',
        phone: '+966 11 123 4567',
        address: 'الرياض، المملكة العربية السعودية'
      },
      copyright: '© 2024 QnA. جميع الحقوق محفوظة.',
      bottomLinks: ['سياسة الخصوصية', 'شروط الخدمة', 'ملفات تعريف الارتباط']
    },
    en: {
      logo: 'QnA',
      description: 'We provide intelligent automation solutions powered by AI to transform your business and increase efficiency. Join thousands of users who trust us.',
      newsletter: {
        title: 'Subscribe to Newsletter',
        description: 'Get the latest updates and news directly in your email',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      },
      links: {
        company: {
          title: 'Company',
          items: ['About Us', 'Team', 'Careers', 'News', 'Partnerships']
        },
        services: {
          title: 'Services',
          items: ['Smart Automation', 'Machine Learning', 'Data Processing', 'Performance Analytics', 'Consulting']
        },
        support: {
          title: 'Support',
          items: ['Help Center', 'Documentation', 'Technical Support', 'Status', 'Updates']
        },
        legal: {
          title: 'Legal',
          items: ['Privacy Policy', 'Terms of Service', 'Cookies', 'Security', 'Compliance']
        }
      },
      contact: {
        title: 'Contact Us',
        email: 'info@qna.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA, USA'
      },
      copyright: '© 2024 QnA. All rights reserved.',
      bottomLinks: ['Privacy Policy', 'Terms of Service', 'Cookies']
    }
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/40">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid md:grid-cols-2 lg:grid-cols-6 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Company info and newsletter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo and description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4F97FF] to-[#1ABC9C] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Q&A</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  {texts[language].logo}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {texts[language].description}
              </p>
            </div>

            {/* Newsletter signup */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {texts[language].newsletter.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {texts[language].newsletter.description}
              </p>
              <div className={`flex gap-2 max-w-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Input
                  type="email"
                  placeholder={texts[language].newsletter.placeholder}
                  className="flex-1"
                />
                <Button className="btn-primary hover-scale text-white">
                  {texts[language].newsletter.button}
                </Button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-[#4F97FF] hover:text-white transition-colors flex items-center justify-center text-muted-foreground hover-scale"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {texts[language].links.company.title}
              </h3>
              <div className="space-y-2">
                {texts[language].links.company.items.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-[#4F97FF] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Services links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {texts[language].links.services.title}
              </h3>
              <div className="space-y-2">
                {texts[language].links.services.items.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-[#4F97FF] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Support links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {texts[language].links.support.title}
              </h3>
              <div className="space-y-2">
                {texts[language].links.support.items.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-[#4F97FF] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {texts[language].links.legal.title}
              </h3>
              <div className="space-y-2">
                {texts[language].links.legal.items.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-[#4F97FF] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className={`grid md:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Mail className="h-5 w-5 text-[#4F97FF]" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-foreground">{texts[language].contact.email}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Phone className="h-5 w-5 text-[#4F97FF]" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="text-foreground">{texts[language].contact.phone}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <MapPin className="h-5 w-5 text-[#4F97FF]" />
              <div>
                <div className="text-sm text-muted-foreground">Address</div>
                <div className="text-foreground">{texts[language].contact.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-border/40 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className="text-sm text-muted-foreground">
              {texts[language].copyright}
            </div>
            <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {texts[language].bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-[#4F97FF] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}