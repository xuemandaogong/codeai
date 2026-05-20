import Link from 'next/link'

const features = [
  {
    icon: '⚡',
    title: 'Code Generation',
    description: 'Describe what you need and get complete, runnable code instantly.',
  },
  {
    icon: '🔧',
    title: 'Error Fixing',
    description: 'Paste your error and get clear explanations and fix suggestions.',
  },
  {
    icon: '📖',
    title: 'Code Explanation',
    description: 'Understand complex code with detailed breakdowns and explanations.',
  },
  {
    icon: '🚀',
    title: 'Code Optimization',
    description: 'Improve performance and readability with smart optimization tips.',
  },
  {
    icon: '🔄',
    title: 'Language Conversion',
    description: 'Convert code between different programming languages seamlessly.',
  },
]

const models = [
  { name: 'OpenAI', description: 'GPT-4, GPT-3.5' },
  { name: 'Claude', description: 'Anthropic Claude' },
  { name: 'Gemini', description: 'Google Gemini' },
  { name: 'DeepSeek', description: 'DeepSeek Chat' },
  { name: '通义千问', description: 'Alibaba Qwen' },
  { name: '智谱GLM', description: 'Zhipu AI' },
]

const steps = [
  { step: '1', title: 'Choose Task', description: 'Select the type of coding assistance you need.' },
  { step: '2', title: 'Select Language', description: 'Pick your programming language.' },
  { step: '3', title: 'Describe Request', description: 'Enter your coding question or paste code.' },
  { step: '4', title: 'Get Result', description: 'AI generates a clear, actionable response.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">AI-Powered Coding Assistant</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">CodeAI</span>
            <span className="text-white"> Assistant</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Generate, explain, fix, and optimize code directly in your browser with the power of AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/coding"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-lg"
            >
              Start Coding
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 border border-gray-700 transition-all text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Features</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to write better code, faster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Supported Models</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose from multiple AI providers for the best results.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {models.map((model, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all"
              >
                <div className="text-lg font-semibold text-white mb-1">{model.name}</div>
                <div className="text-xs text-gray-500">{model.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-12">
            Get started in four simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Code?</h2>
          <p className="text-gray-400 mb-8">
            Start using AI to write better code today.
          </p>
          <Link
            href="/coding"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
