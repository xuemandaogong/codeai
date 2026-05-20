const MALICIOUS_PATTERNS = [
  /trojan/i,
  /phishing/i,
  /steal\s*(account|password|token|cookie|credential)/i,
  /bypass\s*(login|auth|security|permission)/i,
  /keylogger/i,
  /ransomware/i,
  /exploit\s*(vulnerability|server|system)/i,
  /inject\s*(malicious|sql|xss|script)/i,
  /brute\s*force/i,
  /ddos/i,
  /reverse\s*shell/i,
  /backdoor/i,
  /rootkit/i,
  /credential\s*harvesting/i,
  /session\s*hijacking/i,
  /mass\s*scanning/i,
  /batch\s*scan/i,
]

const SAFE_PATTERNS = [
  /learn/i,
  /study/i,
  /tutorial/i,
  /example/i,
  /practice/i,
  /homework/i,
  /assignment/i,
  /fix\s*(bug|error|issue)/i,
  /explain/i,
  /optimize/i,
  /improve/i,
  /refactor/i,
  /convert/i,
  /generate/i,
  /create/i,
  /build/i,
  /implement/i,
  /write/i,
  /component/i,
  /api/i,
  /function/i,
  /class/i,
  /interface/i,
  /database/i,
  /frontend/i,
  /backend/i,
]

export function checkInputSafety(input: string): { safe: boolean; reason?: string } {
  const lowerInput = input.toLowerCase()

  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(lowerInput)) {
      return {
        safe: false,
        reason: 'Your request appears to involve potentially harmful activities. This tool is designed for legitimate programming assistance only.',
      }
    }
  }

  return { safe: true }
}

export function sanitizeOutput(content: string): string {
  // Remove any potential API keys that might have leaked
  let sanitized = content.replace(/sk-[a-zA-Z0-9]{48}/g, '[API_KEY_REDACTED]')
  sanitized = content.replace(/Bearer\s+[a-zA-Z0-9._-]{20,}/g, '[TOKEN_REDACTED]')

  return sanitized
}
