import type { AIProvider, AIRequest, AIResponse } from './types'

export class GeminiProvider implements AIProvider {
  name = 'Gemini'

  async generate(request: AIRequest): Promise<AIResponse> {
    const apiKey = process.env.GEMINI_API_KEY
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro'

    if (!apiKey) {
      throw new Error('Gemini API key not configured')
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: request.prompt },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: parseInt(process.env.MAX_OUTPUT_TOKENS || '3000'),
          temperature: 0.7,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      provider: this.name,
    }
  }
}
