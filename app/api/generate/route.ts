import { NextRequest } from 'next/server'
import { generateAIResponse } from '@/lib/ai'
import { checkInputSafety } from '@/lib/safety'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip)
    if (!rateLimitResult.allowed) {
      return Response.json(
        { error: `Too many requests. Please try again in ${rateLimitResult.retryAfter} seconds.` },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { input, mode, language } = body

    // Validate input
    if (!input || typeof input !== 'string') {
      return Response.json(
        { error: 'Please provide a valid input.' },
        { status: 400 }
      )
    }

    if (!mode || !['generate', 'explain', 'fix', 'optimize', 'convert'].includes(mode)) {
      return Response.json(
        { error: 'Please select a valid task mode.' },
        { status: 400 }
      )
    }

    if (!language || typeof language !== 'string') {
      return Response.json(
        { error: 'Please select a programming language.' },
        { status: 400 }
      )
    }

    // Check input length
    const maxInputChars = parseInt(process.env.MAX_INPUT_CHARS || '4000')
    if (input.length > maxInputChars) {
      return Response.json(
        { error: `Input is too long. Maximum ${maxInputChars} characters allowed.` },
        { status: 400 }
      )
    }

    // Safety check
    const safetyResult = checkInputSafety(input)
    if (!safetyResult.safe) {
      return Response.json(
        { error: safetyResult.reason },
        { status: 400 }
      )
    }

    // Generate AI response
    const result = await generateAIResponse(input, mode, language)

    return Response.json({
      content: result.content,
      provider: result.provider,
    })
  } catch (error) {
    console.error('Generate API error:', error)
    return Response.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
