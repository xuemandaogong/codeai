# CodeAI - AI Coding Assistant

An AI-powered coding assistant that helps you generate, explain, fix, optimize, and convert code directly in your browser.

## Features

- **Code Generation** - Describe what you need and get complete, runnable code
- **Code Explanation** - Understand complex code with detailed breakdowns
- **Error Fixing** - Get clear explanations and fix suggestions for errors
- **Code Optimization** - Improve performance and readability
- **Language Conversion** - Convert code between different programming languages
- **Multi-Model Support** - Choose from 6 different AI providers
- **Markdown Rendering** - Beautiful code display with syntax highlighting
- **One-Click Copy** - Easily copy generated code
- **Responsive Design** - Works on desktop and mobile
- **Dark Theme** - Easy on the eyes with a tech-inspired design

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown
- **Syntax Highlighting**: react-syntax-highlighter

## Supported AI Models

| Provider | Model Examples |
|----------|---------------|
| OpenAI | GPT-4, GPT-3.5 |
| Anthropic | Claude 3.5 Sonnet |
| Google | Gemini 1.5 Pro |
| DeepSeek | DeepSeek Chat |
| Alibaba Cloud | 通义千问 (Qwen) |
| Zhipu AI | 智谱GLM-4 |

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeai
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your API keys:
```env
MODEL_PROVIDER=openai
MODEL_FALLBACK_PROVIDER=deepseek

OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini

# Add other provider keys as needed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

### Model Provider Selection

```env
MODEL_PROVIDER=openai          # Primary model provider
MODEL_FALLBACK_PROVIDER=deepseek  # Fallback provider if primary fails
```

### Provider Configuration

#### OpenAI
```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

#### Anthropic Claude
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

#### Google Gemini
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-pro
```

#### DeepSeek
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_MODEL=deepseek-chat
```

#### Alibaba Cloud (通义千问)
```env
QWEN_API_KEY=your_qwen_api_key_here
QWEN_MODEL=qwen-plus
```

#### Zhipu AI (智谱GLM)
```env
ZHIPU_API_KEY=your_zhipu_api_key_here
ZHIPU_MODEL=glm-4-plus
```

### Other Settings
```env
MAX_INPUT_CHARS=4000    # Maximum input characters
MAX_OUTPUT_TOKENS=3000  # Maximum output tokens
```

## Deploy to Vercel

1. Push your code to GitHub.

2. Go to [Vercel](https://vercel.com) and sign in.

3. Click "New Project" and import your repository.

4. In the project settings, add the following environment variables:
   - `MODEL_PROVIDER`
   - `MODEL_FALLBACK_PROVIDER`
   - `OPENAI_API_KEY` (or whichever provider you use)
   - `OPENAI_MODEL`
   - Other provider keys as needed

5. Click "Deploy".

6. After deployment, you can add a custom domain in the project settings.

## Deploy to Domestic Server (China)

If you want to deploy to a server in mainland China:

1. Build the project:
```bash
npm run build
```

2. Copy the `.next`, `public`, `node_modules`, and `package.json` to your server.

3. Run the production server:
```bash
npm run start
```

**Important Notes for China Deployment:**
- You must obtain an ICP filing (备案) for your domain before making it publicly accessible.
- Ensure compliance with local content regulations.
- Update the privacy policy and terms of service as needed.
- This project does NOT bypass any model provider's regional restrictions.

## Troubleshooting

### API Key Not Configured
**Error**: "API key not configured"

**Solution**: Make sure you've added the API key to `.env.local` and restarted the development server.

### Incorrect Model Name
**Error**: "Model not found" or similar

**Solution**: Check that the model name in your environment variable matches the provider's documentation.

### Insufficient Quota
**Error**: "Rate limit exceeded" or "Insufficient quota"

**Solution**: Check your account balance and rate limits with the AI provider.

### Region Not Available
**Error**: "Region not available" or connection timeout

**Solution**: Some providers may not be available in certain regions. Use the fallback provider or a provider that supports your region.

### Request Timeout
**Error**: Request takes too long or times out

**Solution**: This can happen with complex requests. Try simplifying your input or try again later.

### Vercel Environment Variables Not Working
**Issue**: Changes to environment variables don't take effect

**Solution**: After changing environment variables in Vercel, you need to redeploy the project.

## Important Notes

- This project is designed for legitimate programming assistance only.
- API keys are stored securely in server-side environment variables.
- This project does NOT and should NOT be used to bypass any model provider's regional restrictions, account controls, or terms of service.
- Users must comply with local laws and the terms of service of their chosen AI provider.

## License

MIT
