import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { VisualWorkflowPage } from '../../components/VisualWorkflowPage'

export const metadata: Metadata = {
  title: 'مصمم سير العمل | Workflow Builder - FlowCanvasAI',
  description: 'مصمم سير العمل المرئي المتقدم - إنشاء وتصميم مخططات العمليات التفاعلية بالذكاء الاصطناعي',
  keywords: [
    'مصمم سير العمل',
    'مخططات العمليات',
    'سير العمل المرئي',
    'التصميم التفاعلي',
    'المحفزات',
    'الإجراءات',
    'Workflow Builder',
    'Visual Workflow',
    'Process Design',
    'Interactive Design',
    'Triggers',
    'Actions'
  ],
  openGraph: {
    title: 'مصمم سير العمل | Workflow Builder - FlowCanvasAI',
    description: 'مصمم سير العمل المرئي المتقدم - إنشاء وتصميم مخططات العمليات التفاعلية بالذكاء الاصطناعي',
    url: '/workflow-builder',
    images: [
      {
        url: '/og-workflow-builder.png',
        width: 1200,
        height: 630,
        alt: 'FlowCanvasAI Workflow Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مصمم سير العمل | Workflow Builder - FlowCanvasAI',
    description: 'مصمم سير العمل المرئي المتقدم - إنشاء وتصميم مخططات العمليات التفاعلية بالذكاء الاصطناعي',
    images: ['/twitter-workflow-builder.png'],
  },
}

// Loading component
function WorkflowBuilderLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full border-4 border-primary/10"></div>
        </div>
        <p className="text-muted-foreground">جاري تحميل منشئ سير العمل...</p>
      </div>
    </div>
  )
}

export default function WorkflowBuilderPage() {
  return (
    <Suspense fallback={<WorkflowBuilderLoading />}>
      <Header />
      <main className="pt-20">
        <VisualWorkflowPage 
          language="ar" 
          onClose={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/'
            }
          }} 
        />
      </main>
    </Suspense>
  )
}