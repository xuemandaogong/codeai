'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ModeSelect from './ModeSelect'
import LanguageSelect from './LanguageSelect'
import ChatMessage, { type ChatMessageData } from './ChatMessage'
import LoadingState from './LoadingState'
import ErrorMessage from './ErrorMessage'

const CONTEXT_TURNS = 6

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function buildContextPrompt(messages: ChatMessageData[], currentInput: string): string {
  const recentMessages = messages.slice(-(CONTEXT_TURNS * 2))
  if (recentMessages.length === 0) return currentInput

  const history = recentMessages
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n')

  return `[Conversation History]\n${history}\n\n[Current Question]\n${currentInput}`
}

export default function CodeAssistant() {
  const [mode, setMode] = useState('generate')
  const [language, setLanguage] = useState('JavaScript')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessageData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading, scrollToBottom])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 200) + 'px'
    }
  }, [input])

  const handleSubmit = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: ChatMessageData = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const prompt = buildContextPrompt(messages, trimmed)

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: prompt, mode, language }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response.')
      }

      const assistantMessage: ChatMessageData = {
        id: generateId(),
        role: 'assistant',
        content: data.content,
        createdAt: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClearChat = () => {
    setMessages([])
    setError('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Top bar: mode + language */}
      <div className="flex-shrink-0 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-4 py-3 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] text-gray-500 uppercase tracking-wider">任务</span>
            <ModeSelect value={mode} onChange={setMode} />
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-700" />
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[11px] text-gray-500 uppercase tracking-wider flex-shrink-0">语言</span>
            <LanguageSelect value={language} onChange={setLanguage} />
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex-shrink-0 text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded-lg hover:bg-gray-800 transition-colors"
            >
              清空对话
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 min-h-0">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <p className="text-lg font-medium text-gray-400 mb-1">开始编程对话</p>
            <p className="text-sm text-gray-600 text-center max-w-md">
              在下方输入你的编程问题，AI 会记住上下文，支持连续追问和修改代码。
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl rounded-tl-md overflow-hidden">
              <LoadingState />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex-shrink-0 px-2 pb-2">
          <ErrorMessage message={error} onRetry={handleSubmit} />
        </div>
      )}

      {/* Input area */}
      <div className="flex-shrink-0 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-3">
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的编程问题... (Enter 发送, Shift+Enter 换行)"
            rows={1}
            className="flex-1 bg-gray-800/80 border border-gray-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none max-h-[200px]"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-[11px] text-gray-600">
            AI 会记住最近 {CONTEXT_TURNS} 轮对话上下文
          </p>
          <p className="text-[11px] text-gray-600">
            {input.length > 0 && `${input.length} 字`}
          </p>
        </div>
      </div>
    </div>
  )
}
