import type { AIProvider, AIRequest, AIResponse } from './types'

export class ZhipuProvider implements AIProvider {
  name = '智谱GLM'

  async generate(request: AIRequest): Promise<AIResponse> {
    const apiKey = process.env.ZHIPU_API_KEY
    const model = process.env.ZHIPU_MODEL || 'glm-4-plus'

    if (!apiKey) {
      throw new Error('Zhipu API key not configured')
    }

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
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
      throw new Error(`Zhipu API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      provider: this.name,
    }
  }
}
