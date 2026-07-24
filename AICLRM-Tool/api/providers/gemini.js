import { GoogleGenerativeAI } from '@google/generative-ai'

// Single Source of Truth for the model name.
//const MODEL_NAME = 'gemini-1.5-flash'
const MODEL_NAME =
  process.env.GEMINI_MODEL || 'gemini-1.5-flash'

let client = null

function getClient() {
console.log("******** VERSION B ********");
 
  const apiKey = process.env.GEMINI_API_KEY



  console.log("===== GEMINI DEBUG =====");
  console.log("API Key Exists:", !!apiKey);
  console.log("Model:", process.env.GEMINI_MODEL);

  if (!apiKey) {
    // Lazy check — evaluated on first call, not at module load time,
    // since env var availability isn't guaranteed at import time in
    // serverless environments.
    const error = new Error('Missing GEMINI_API_KEY environment variable.')
    error.status = 500
    throw error
  }

  if (!client) {
    client = new GoogleGenerativeAI(apiKey)
  }

  return client
}

/**
 * Sends a prompt to Gemini and returns the generated text.
 *
 * SDK-specific errors are normalized into plain JavaScript Error
 * objects (with a best-effort `.status` hint) — callers never see
 * Gemini SDK internals. No canonical error-code mapping happens here;
 * that responsibility belongs to the caller (generate.js).
 *
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateText(prompt) {
  const genAI = getClient()

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (err) {
         console.error("Gemini SDK Error:", err);
    const normalized = new Error(err?.message || 'Gemini request failed.')
    normalized.status = err?.status ?? err?.response?.status ?? undefined
    normalized.cause = err
    throw normalized
  }
}