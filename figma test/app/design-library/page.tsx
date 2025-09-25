import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { DesignLibrary } from '../../components/DesignLibrary'

export const metadata: Metadata = {
  title: 'مكتبة التصميم | Design Library - FlowCanvasAI',
  description: 'نظام التصميم الشامل - لوحة التحكم في العناصر البصرية والثيمات مع دعم كامل للغة العربية',
  keywords: [
    'مكتبة التصميم',
    'نظام التصميم',
    'الألوان',
    'الخطوط',
    'المكونات',
    'Design Library',
    'Design System',
    'Colors',
    'Typography',
    'Components'
  ],
  openGraph: {
    title: 'مكتبة التصميم | Design Library - FlowCanvasAI',
    description: 'نظام التصميم الشامل - لوحة التحكم في العناصر البصرية والثيمات',
    url: '/design-library',
    images: [
      {
        url: '/og-design-library.png',
        width: 1200,
        height: 630,
        alt: 'FlowCanvasAI Design Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مكتبة التصميم | Design Library - FlowCanvasAI',
    description: 'نظام التصميم الشامل - لوحة التحكم في العناصر البصرية والثيمات',
    images: ['/twitter-design-library.png'],
  },
}

// Loading component
function DesignLibraryLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 animate-pulse rounded bg-primary/20"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <p className="text-muted-foreground">جاري تحميل مكتبة التصميم...</p>
      </div>
    </div>
  )
}

export default function DesignLibraryPage() {
  return (
    <Suspense fallback={<DesignLibraryLoading />}>
      <Header />
      <main className="pt-20">
        <DesignLibrary language="ar" />
      </main>
    </Suspense>
  )
}