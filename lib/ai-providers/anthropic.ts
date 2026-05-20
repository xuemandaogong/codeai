import type { AIProvider, AIRequest, AIResponse } from './types'

export class AnthropicProvider implements AIProvider {
  name = 'Claude'

  async generate(request: AIRequest): Promise<AIResponse> {
    const apiKey = process.env.ANTHROPIC_API_KEY
    const baseUrl = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/+$/, '')
    const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest'

    if (!apiKey) {
      throw new Error('Anthropic API key not configured')
    }

    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: parseInt(process.env.MAX_OUTPUT_TOKENS || '3000'),
        messages: [
          { role: 'user', content: request.prompt },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      content: data.content[0]?.text || '',
      provider: this.name,
    }
  }
}
