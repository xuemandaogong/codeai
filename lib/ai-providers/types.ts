export interface AIRequest {
  prompt: string
  mode: string
  language: string
}

export interface AIResponse {
  content: string
  provider: string
}

export interface AIProvider {
  name: string
  generate(request: AIRequest): Promise<AIResponse>
}

export type ProviderName = 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'qwen' | 'zhipu'
