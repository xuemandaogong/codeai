'use client'

import MarkdownResult from './MarkdownResult'
import CopyButton from './CopyButton'

export interface ChatMessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

interface ChatMessageProps {
  message: ChatMessageData
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-full w-full bg-gray-900/80 border border-gray-800 rounded-2xl rounded-tl-md px-5 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">CodeAI</span>
          <CopyButton text={message.content} />
        </div>
        <div className="overflow-auto">
          <MarkdownResult content={message.content} />
        </div>
      </div>
    </div>
  )
}
