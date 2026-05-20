import type { AIProvider, AIRequest, AIResponse } from './types'

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI'

  async generate(request: AIRequest): Promise<AIResponse> {
    const apiKey = process.env.OPENAI_API_KEY
    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini'

    if (!apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: request.prompt },
          { role: 'user', content: request.prompt },
        ],
        max_tokens: parseInt(process.env.MAX_OUTPUT_TOKENS || '3000'),
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      provider: this.name,
    }
  }
}
