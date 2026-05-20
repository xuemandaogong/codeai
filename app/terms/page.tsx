import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - CodeAI',
  description: 'Terms of service for CodeAI coding assistant.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using CodeAI, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Service Description</h2>
            <p className="text-gray-300">
              CodeAI is an AI-powered coding assistant that helps users generate, explain, fix,
              optimize, and convert code. The service is provided for legitimate programming
              learning and development assistance purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptable Use</h2>
            <p className="text-gray-300">You agree to use CodeAI only for lawful purposes. You must NOT use this service for:</p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Creating malware, trojans, or viruses</li>
              <li>Phishing or social engineering attacks</li>
              <li>Stealing accounts, passwords, or credentials</li>
              <li>Bypassing authentication or security measures</li>
              <li>Creating malicious scripts or exploits</li>
              <li>Ransomware or extortion</li>
              <li>Denial of service attacks</li>
              <li>Unauthorized system access or hacking</li>
              <li>Any illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">AI-Generated Content</h2>
            <p className="text-gray-300">
              AI-generated code and content may contain errors or inaccuracies. You are responsible
              for reviewing and testing any code before using it in production environments.
              CodeAI does not guarantee the correctness, security, or fitness of AI-generated code
              for any particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-300">
              The CodeAI website and its original content are owned by us. AI-generated content
              is provided as-is for your use. You are responsible for ensuring that any code
              you use complies with applicable licenses and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-300">
              CodeAI is provided &quot;as is&quot; without warranties of any kind. We are not liable
              for any damages arising from the use of this service, including but not limited to
              damages from AI-generated code errors, service interruptions, or data loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Compliance</h2>
            <p className="text-gray-300">
              You are responsible for complying with all applicable local laws and regulations,
              as well as the terms of service of the AI model providers used by this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-300">
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting. Your continued use of the service constitutes acceptance
              of the modified terms.
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
