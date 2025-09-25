import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ConversationPage } from '../../components/ConversationPage'

// Metadata للصفحة
export const metadata: Metadata = {
  title: 'محادثة - FlowCanvasAI',
  description: 'تفاعل مع نظام الذكاء الاصطناعي المتطور وابدأ محادثات ذكية لتحسين سير العمل',
  keywords: ['محادثة', 'شات', 'ذكاء اصطناعي', 'تفاعل', 'WhatsApp'],
  openGraph: {
    title: 'محادثة ذكية - FlowCanvasAI',
    description: 'تجربة محادثة متطورة مع الذكاء الاصطناعي',
    images: ['/og-conversation.png'],
  },
}

// Loading component
function ConversationLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-500"></div>
        <p className="text-white">جاري تحميل المحادثة...</p>
      </div>
    </div>
  )
}

export default function ConversationPageRoute() {
  return (
    <Suspense fallback={<ConversationLoading />}>
      <div className="h-screen w-full overflow-hidden">
        <ConversationPage 
          language="ar"
          onBackToHome={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/'
            }
          }}
          onLanguageChange={(lang: 'ar' | 'en') => {
            // Handle language change
            console.log('Language changed to:', lang)
          }}
          isDark={true}
          onThemeChange={(isDark: boolean) => {
            // Handle theme change
            console.log('Theme changed to:', isDark ? 'dark' : 'light')
          }}
        />
      </div>
    </Suspense>
  )
}