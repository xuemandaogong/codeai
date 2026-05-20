import type { AIRequest, AIResponse, ProviderName } from './ai-providers/types'
import { OpenAIProvider } from './ai-providers/openai'
import { AnthropicProvider } from './ai-providers/anthropic'
import { GeminiProvider } from './ai-providers/gemini'
import { DeepSeekProvider } from './ai-providers/deepseek'
import { QwenProvider } from './ai-providers/qwen'
import { ZhipuProvider } from './ai-providers/zhipu'
import { buildSystemPrompt, buildUserPrompt } from './prompts'
import { sanitizeOutput } from './safety'

const providers = {
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
  gemini: new GeminiProvider(),
  deepseek: new DeepSeekProvider(),
  qwen: new QwenProvider(),
  zhipu: new ZhipuProvider(),
}

function getProvider(name: string) {
  const provider = providers[name as ProviderName]
  if (!provider) {
    throw new Error(`Unknown provider: ${name}`)
  }
  return provider
}

export async function generateAIResponse(
  input: string,
  mode: string,
  language: string
): Promise<AIResponse> {
  const providerName = (process.env.MODEL_PROVIDER || 'openai') as ProviderName
  const fallbackName = (process.env.MODEL_FALLBACK_PROVIDER || 'deepseek') as ProviderName

  const systemPrompt = buildSystemPrompt(mode, language)
  const userPrompt = buildUserPrompt(input, mode, language)

  const request: AIRequest = {
    prompt: `${systemPrompt}\n\n${userPrompt}`,
    mode,
    language,
  }

  try {
    const provider = getProvider(providerName)
    const response = await provider.generate(request)
    return {
      content: sanitizeOutput(response.content),
      provider: response.provider,
    }
  } catch (error) {
    console.error(`Primary provider (${providerName}) failed:`, error)

    // Try fallback provider
    try {
      const fallbackProvider = getProvider(fallbackName)
      const response = await fallbackProvider.generate(request)
      return {
        content: sanitizeOutput(response.content),
        provider: `${response.provider} (fallback)`,
      }
    } catch (fallbackError) {
      console.error(`Fallback provider (${fallbackName}) also failed:`, fallbackError)
      throw new Error('AI service is temporarily unavailable. Please try again later.')
    }
  }
}
