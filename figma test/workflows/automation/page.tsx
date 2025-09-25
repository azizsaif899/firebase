import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { Automation } from '../../components/Automation'

export const metadata: Metadata = {
  title: 'الأتمتة | Automation - FlowCanvasAI',
  description: 'نظام أتمتة شامل لسير العمل والعمليات الذكية مع الذكاء الاصطناعي المتقدم',
  keywords: [
    'الأتمتة',
    'سير العمل',
    'العمليات الذكية',
    'المحفزات',
    'الإجراءات',
    'التحليلات',
    'Automation',
    'Workflow',
    'Smart Operations',
    'Triggers',
    'Actions',
    'Analytics'
  ],
  openGraph: {
    title: 'الأتمتة | Automation - FlowCanvasAI',
    description: 'نظام أتمتة شامل لسير العمل والعمليات الذكية مع الذكاء الاصطناعي المتقدم',
    url: '/automation',
    images: [
      {
        url: '/og-automation.png',
        width: 1200,
        height: 630,
        alt: 'FlowCanvasAI Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الأتمتة | Automation - FlowCanvasAI',
    description: 'نظام أتمتة شامل لسير العمل والعمليات الذكية مع الذكاء الاصطناعي المتقدم',
    images: ['/twitter-automation.png'],
  },
}

// Loading component
function AutomationLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-primary/20"></div>
        </div>
        <p className="text-muted-foreground">جاري تحميل نظام الأتمتة...</p>
      </div>
    </div>
  )
}

export default function AutomationPage() {
  return (
    <Suspense fallback={<AutomationLoading />}>
      <Header />
      <main className="pt-20">
        <Automation language="ar" />
      </main>
    </Suspense>
  )
}