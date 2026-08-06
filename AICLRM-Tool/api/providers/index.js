import * as geminiProvider from './gemini.js'

/**
 * Provider abstraction layer. generate.js talks ONLY to this file  
 * it never imports a specific provider (gemini.js, future openai.js, etc.)
 * directly. This means adding a second provider, or switching the active
 * one, never requires touching generate.js.
 *
 * Contract every provider module must follow: export a
 * `generateText(promptText, image, timeoutMs)` function that:
 *   - returns Promise<string>   the raw AI response text
 *   - on failure, throws an Error with:
 *       .status     numeric, HTTP-style (429, 500, 504, etc.)
 *       .isTimeout  boolean   true only if the failure was this
 *                   provider's own request timing out
 *     These two fields are what mapProviderError() and the retry logic
 *     in generate.js already depend on   any future provider must set
 *     them the same way gemini.js does.
 *
 * Only 'gemini' is wired up today. This is intentionally NOT a real
 * multi-provider setup yet   see docs/Do_and_Dont.md Phase 4: architecture
 * ready, actual second provider deferred until there's a real need
 * (cost, reliability, or a Gemini outage that justifies it).
 */
const PROVIDERS = {
  gemini: geminiProvider,
  // openai: openaiProvider,   // future   not implemented
  // claude: claudeProvider,   // future   not implemented
}

const PROVIDER_NAME = process.env.AI_PROVIDER || 'gemini'

function getProvider() {
  const provider = PROVIDERS[PROVIDER_NAME]
  if (!provider) {
    const error = new Error(`Unknown AI provider configured: "${PROVIDER_NAME}"`)
    error.status = 500
    throw error
  }
  return provider
}

export async function generateText(promptText, image, timeoutMs) {
  const provider = getProvider()
  return provider.generateText(promptText, image, timeoutMs)
}