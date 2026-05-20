import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - CodeAI',
  description: 'Privacy policy for CodeAI coding assistant.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Collection</h2>
            <p className="text-gray-300">
              CodeAI is designed with privacy in mind. We do not store API keys on the frontend.
              All API keys are securely stored in server-side environment variables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Processing</h2>
            <p className="text-gray-300">
              When you use our coding assistant, your input is sent to the configured AI model provider
              to generate responses. This is necessary for the service to function.
            </p>
            <p className="text-gray-300 mt-2">
              Your input and the AI-generated responses are processed in real-time and are not stored
              in any database or log system in this version.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300">
              We use the following AI model providers to generate code responses:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>OpenAI</li>
              <li>Anthropic (Claude)</li>
              <li>Google (Gemini)</li>
              <li>DeepSeek</li>
              <li>Alibaba Cloud (通义千问)</li>
              <li>Zhipu AI (智谱GLM)</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Each provider has its own privacy policy and terms of service.
              Please review their policies for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">No User Accounts</h2>
            <p className="text-gray-300">
              This version of CodeAI does not require user registration or login.
              We do not collect personal information such as names, email addresses,
              or account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Chat History</h2>
            <p className="text-gray-300">
              We do not store chat history. Each session is independent, and your
              conversation data is not persisted beyond the current session.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-300">
              This privacy policy may be updated as the service evolves. Please check
              this page periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
            <p className="text-gray-300">
              If you have questions about this privacy policy, please contact us.
            </p>
          </section>

          <p className="text-gray-500 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
