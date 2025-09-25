import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number
  checks: {
    api: boolean
    database: boolean
    ai: boolean
    memory: boolean
  }
  performance: {
    responseTime: number
    memoryUsage?: {
      used: number
      total: number
      percentage: number
    }
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // فحوصات الصحة الأساسية
    const checks = {
      api: true, // API يعمل بما أننا نرد
      database: await checkDatabaseHealth(),
      ai: await checkAIServiceHealth(),
      memory: checkMemoryHealth()
    }

    // حساب الأداء
    const responseTime = Date.now() - startTime
    const memoryUsage = getMemoryUsage()

    // تحديد الحالة العامة
    const allChecksPass = Object.values(checks).every(check => check === true)
    const status: HealthStatus['status'] = allChecksPass ? 'healthy' : 'degraded'

    const healthStatus: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime ? process.uptime() : 0,
      checks,
      performance: {
        responseTime,
        memoryUsage
      }
    }

    // إرجاع الحالة مع HTTP status المناسب
    return NextResponse.json(healthStatus, {
      status: status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Health check failed:', error)
    
    const errorStatus: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime ? process.uptime() : 0,
      checks: {
        api: false,
        database: false,
        ai: false,
        memory: false
      },
      performance: {
        responseTime: Date.now() - startTime
      }
    }

    return NextResponse.json(errorStatus, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  }
}

// فحص حالة قاعدة البيانات
async function checkDatabaseHealth(): Promise<boolean> {
  try {
    // يمكن إضافة فحص Firebase هنا
    // const admin = await import('firebase-admin')
    // await admin.firestore().collection('health').doc('test').get()
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}

// فحص حالة خدمة الذكاء الاصطناعي
async function checkAIServiceHealth(): Promise<boolean> {
  try {
    // يمكن إضافة فحص Gemini AI هنا
    // const { GoogleGenerativeAI } = await import('@google/generative-ai')
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    return true
  } catch (error) {
    console.error('AI service health check failed:', error)
    return false
  }
}

// فحص استخدام الذاكرة
function checkMemoryHealth(): boolean {
  try {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage()
      // تحقق من أن استخدام الذاكرة أقل من 80%
      const memoryThreshold = 0.8
      const currentUsage = memUsage.heapUsed / memUsage.heapTotal
      return currentUsage < memoryThreshold
    }
    return true
  } catch (error) {
    console.error('Memory health check failed:', error)
    return false
  }
}

// الحصول على معلومات استخدام الذاكرة
function getMemoryUsage() {
  try {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage()
      return {
        used: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
        total: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
        percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)
      }
    }
    return undefined
  } catch (error) {
    console.error('Failed to get memory usage:', error)
    return undefined
  }
}