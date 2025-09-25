import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// تعريف المسارات المحمية
const protectedPaths = ['/dashboard', '/admin']
const publicPaths = ['/', '/conversation', '/design-library', '/automation', '/workflow-builder']

// إعدادات الأمان
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // إضافة رؤوس الأمان
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // التحقق من اللغة والتوجيه
  const acceptLanguage = request.headers.get('accept-language')
  const preferredLanguage = acceptLanguage?.includes('ar') ? 'ar' : 'en'
  
  // إعداد cookies للغة والثيم
  if (!request.cookies.get('flowcanvas-language')) {
    response.cookies.set('flowcanvas-language', preferredLanguage, {
      maxAge: 365 * 24 * 60 * 60, // سنة واحدة
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

  if (!request.cookies.get('flowcanvas-theme')) {
    response.cookies.set('flowcanvas-theme', 'dark', {
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

  // تحسين الأداء - إضافة cache headers للموارد الثابتة
  if (pathname.startsWith('/_next/static/') || pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // API Routes - تطبيق rate limiting
  if (pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
    
    // إضافة headers للـ API
    response.headers.set('X-RateLimit-Limit', '100')
    response.headers.set('X-RateLimit-Remaining', '99')
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    
    // منع CORS إلا للمجالات المحددة
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://flowcanvas-ai.vercel.app',
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ]
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }
  }

  // إعادة توجيه المسارات القديمة
  if (pathname === '/chat') {
    return NextResponse.redirect(new URL('/conversation', request.url))
  }

  if (pathname === '/design') {
    return NextResponse.redirect(new URL('/design-library', request.url))
  }

  // Bot detection وحماية من المحاولات الخبيثة
  const userAgent = request.headers.get('user-agent') || ''
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scrapy/i,
    /postman/i,
    /insomnia/i
  ]

  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent))
  
  if (isSuspicious && !pathname.startsWith('/api/')) {
    // إضافة delay للبوتات المشبوهة
    response.headers.set('X-Bot-Detected', 'true')
  }

  // إعداد CSP (Content Security Policy)
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://vitals.vercel-insights.com https://firebaseapp.com https://*.googleapis.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ')

  response.headers.set('Content-Security-Policy', cspHeader)

  // تسجيل الزيارات للتحليل (في development فقط)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname} - ${userAgent}`)
  }

  return response
}

// تحديد المسارات التي سيعمل عليها الـ middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|sw.js|workbox-|icon-).*)',
  ],
}