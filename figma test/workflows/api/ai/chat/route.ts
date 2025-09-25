import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'edge'

// إعداد Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

interface ChatRequest {
  messages: ChatMessage[]
  language?: 'ar' | 'en'
  context?: string
}

interface ChatResponse {
  message: string
  suggestions?: string[]
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    // التحقق من وجود API Key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'مفتاح API للذكاء الاصطناعي غير متوفر' },
        { status: 500 }
      )
    }

    // قراءة البيانات من الطلب
    const body: ChatRequest = await request.json()
    const { messages, language = 'ar', context } = body

    // التحقق من صحة البيانات
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'الرسائل مطلوبة ويجب أن تكون مصفوفة غير فارغة' },
        { status: 400 }
      )
    }

    // الحصول على آخر رسالة من المستخدم
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'آخر رسالة يجب أن تكون من المستخدم' },
        { status: 400 }
      )
    }

    // إعداد النموذج
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // إعداد السياق والتعليمات
    const systemPrompt = createSystemPrompt(language, context)
    const conversationHistory = messages.map(msg => 
      `${msg.role === 'user' ? 'المستخدم' : 'المساعد'}: ${msg.content}`
    ).join('\n')

    const fullPrompt = `${systemPrompt}\n\nسجل المحادثة:\n${conversationHistory}\n\nالرد:`

    // إرسال الطلب إلى Gemini
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    // تحليل الرد واستخراج الاقتراحات
    const { message, suggestions } = parseAIResponse(text, language)

    // تسجيل الاستخدام (للمراقبة)
    console.log(`[AI Chat] User: ${lastMessage.content.substring(0, 50)}... | Response: ${message.substring(0, 50)}...`)

    const chatResponse: ChatResponse = {
      message,
      suggestions
    }

    return NextResponse.json(chatResponse, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

  } catch (error) {
    console.error('AI Chat API Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف'
    
    return NextResponse.json(
      { 
        error: language === 'ar' 
          ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
          : 'Sorry, an error occurred while processing your request. Please try again.'
      },
      { status: 500 }
    )
  }
}

// إنشاء تعليمات النظام
function createSystemPrompt(language: 'ar' | 'en', context?: string): string {
  const basePrompts = {
    ar: `أنت مساعد ذكي متخصص في منصة FlowCanvasAI للأتمتة والذكاء الاصطناعي.

خصائصك:
- تتحدث العربية بطلاقة وبشكل طبيعي
- خبير في الأتمتة وسير العمل والذكاء الاصطناعي
- تقدم إجابات مفيدة وعملية
- تستخدم أمثلة واضحة ومناسبة
- تحافظ على الطابع المهني والودود

إرشادات الرد:
- اجعل إجاباتك واضحة ومفيدة
- استخدم تنسيق منظم عند الحاجة
- قدم اقتراحات عملية
- تجنب الإجابات الطويلة جداً`,

    en: `You are an intelligent assistant specialized in the FlowCanvasAI automation and AI platform.

Your characteristics:
- Fluent in English with natural communication
- Expert in automation, workflows, and artificial intelligence
- Provide helpful and practical answers
- Use clear and appropriate examples
- Maintain a professional and friendly tone

Response guidelines:
- Make your answers clear and useful
- Use organized formatting when needed
- Provide practical suggestions
- Avoid overly long responses`
  }

  let prompt = basePrompts[language]
  
  if (context) {
    prompt += `\n\nسياق إضافي: ${context}`
  }

  return prompt
}

// تحليل رد الذكاء الاصطناعي
function parseAIResponse(text: string, language: 'ar' | 'en'): { message: string; suggestions?: string[] } {
  // البحث عن اقتراحات في النص
  const suggestionPatterns = {
    ar: /اقتراحات?:?\s*\n?(.+?)(?:\n\n|$)/is,
    en: /suggestions?:?\s*\n?(.+?)(?:\n\n|$)/is
  }

  const pattern = suggestionPatterns[language]
  const match = text.match(pattern)
  
  let message = text
  let suggestions: string[] | undefined

  if (match) {
    // إزالة قسم الاقتراحات من الرسالة الرئيسية
    message = text.replace(match[0], '').trim()
    
    // استخراج الاقتراحات
    const suggestionsText = match[1].trim()
    suggestions = suggestionsText
      .split(/\n|,|\|/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 100)
      .slice(0, 3) // حد أقصى 3 اقتراحات
  }

  return { message, suggestions }
}

// Rate limiting helper (يمكن تحسينه بقاعدة بيانات)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // دقيقة واحدة
  const maxRequests = 10 // 10 طلبات في الدقيقة

  const userRecord = rateLimitMap.get(ip)
  
  if (!userRecord || now > userRecord.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (userRecord.count >= maxRequests) {
    return false
  }
  
  userRecord.count++
  return true
}