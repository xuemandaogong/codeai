'use client'

const modes = [
  { id: 'generate', label: '生成代码', short: '生成' },
  { id: 'explain', label: '解释代码', short: '解释' },
  { id: 'fix', label: '修复错误', short: '修复' },
  { id: 'optimize', label: '优化代码', short: '优化' },
  { id: 'convert', label: '语言转换', short: '转换' },
]

interface ModeSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function ModeSelect({ value, onChange }: ModeSelectProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            value === mode.id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-gray-800/80 text-gray-400 hover:text-gray-200 hover:bg-gray-700/80 border border-gray-700/50'
          }`}
        >
          <span className="sm:hidden">{mode.short}</span>
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  )
}
