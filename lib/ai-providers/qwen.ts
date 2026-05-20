import type { AIProvider, AIRequest, AIResponse } from './types'

export class QwenProvider implements AIProvider {
  name = '通义千问'

  async generate(request: AIRequest): Promise<AIResponse> {
    const apiKey = process.env.QWEN_API_KEY
    const model = process.env.QWEN_MODEL || 'qwen-plus'

    if (!apiKey) {
      throw new Error('Qwen API key not configured')
    }

    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a professional programming assistant.' },
          { role: 'user', content: request.prompt },
        ],
        max_tokens: parseInt(process.env.MAX_OUTPUT_TOKENS || '3000'),
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Qwen API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      provider: this.name,
    }
  }
}
