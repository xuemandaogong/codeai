import type { Metadata } from 'next'
import CodeAssistant from '@/components/CodeAssistant'

export const metadata: Metadata = {
  title: 'Coding Assistant - CodeAI',
  description: 'AI-powered coding chat assistant.',
}

export default function CodingPage() {
  return (
    <div className="h-screen py-4 px-4">
      <CodeAssistant />
    </div>
  )
}
