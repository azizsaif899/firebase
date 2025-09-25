import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FlowCanvasAI - منصة الأتمتة والذكاء الاصطناعي',
    short_name: 'FlowCanvasAI',
    description: 'منصة متطورة للأتمتة والذكاء الاصطناعي مع دعم كامل للغة العربية',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F0F',
    theme_color: '#4F97FF',
    orientation: 'portrait',
    scope: '/',
    lang: 'ar',
    dir: 'rtl',
    categories: ['productivity', 'business', 'utilities'],
    
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'شاشة رئيسية لمنصة FlowCanvasAI'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '720x1280',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'تطبيق FlowCanvasAI على الهاتف'
      }
    ],

    shortcuts: [
      {
        name: 'محادثة جديدة',
        short_name: 'محادثة',
        description: 'ابدأ محادثة جديدة مع الذكاء الاصطناعي',
        url: '/conversation',
        icons: [
          {
            src: '/shortcut-chat.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'مكتبة التصميم',
        short_name: 'تصميم',
        description: 'استكشف مكتبة التصميم والمكونات',
        url: '/design-library',
        icons: [
          {
            src: '/shortcut-design.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'الأتمتة',
        short_name: 'أتمتة',
        description: 'إدارة أنظمة الأتمتة والسير',
        url: '/automation',
        icons: [
          {
            src: '/shortcut-automation.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    ],

    related_applications: [
      {
        platform: 'webapp',
        url: 'https://flowcanvas-ai.vercel.app',
        id: 'ai.flowcanvas.webapp'
      }
    ],

    prefer_related_applications: false,
    
    edge_side_panel: {
      preferred_width: 400
    },

    launch_handler: {
      client_mode: 'focus-existing'
    }
  }
}