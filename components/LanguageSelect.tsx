'use client'

const languages = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Vue', 'Python', 'Node.js', 'Java', 'Go', 'PHP',
]

interface LanguageSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            value === lang
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-gray-800/80 text-gray-400 hover:text-gray-200 hover:bg-gray-700/80 border border-gray-700/50'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
