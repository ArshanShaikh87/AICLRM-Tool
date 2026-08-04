import { GoogleGenerativeAI } from '@google/generative-ai'

// Single Source of Truth for the model name.
//const MODEL_NAME = 'gemini-1.5-flash'
const MODEL_NAME =
  process.env.GEMINI_MODEL || 'gemini-3.6-flash'

let client = null

function getClient() {

  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    // Lazy check   evaluated on first call, not at module load time,
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
 * objects (with a best-effort `.status` hint)   callers never see
 * Gemini SDK internals. No canonical error-code mapping happens here;
 * that responsibility belongs to the caller (generate.js).
 *
 * @param {string} prompt
 * @returns {Promise<string>}
 */
// export async function generateText(prompt) {
//   const genAI = getClient()

//   try {
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME })
//     const result = await model.generateContent(prompt)
//     return result.response.text()
//   } catch (err) {
//     const normalized = new Error(err?.message || 'Gemini request failed.')
//     normalized.status = err?.status ?? err?.response?.status ?? undefined
//     normalized.cause = err
//     throw normalized
//   }
// }
// export async function generateText(promptText, image) {
//   const genAI = getClient()

//   try {
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME })

//     const parts = [{ text: promptText }]
//     if (image?.base64) {
//       parts.push({ inlineData: { data: image.base64, mimeType: image.mimeType } })
//     }

//     const result = await model.generateContent(parts)
//     return result.response.text()
//   } catch (err) {
//     const normalized = new Error(err?.message || 'Gemini request failed.')
//     normalized.status = err?.status ?? err?.response?.status ?? undefined
//     normalized.cause = err
//     throw normalized
//   }
// }

// export async function generateText(promptText, image, timeoutMs = 8000) {
//   const genAI = getClient()
//   const model = genAI.getGenerativeModel({
//     model: MODEL_NAME,
//     generationConfig: {
//       responseMimeType: 'application/json',
//     },
//   })

//   const parts = [{ text: promptText }]
//   if (image?.base64) {
//     parts.push({ inlineData: { data: image.base64, mimeType: image.mimeType } })
//   }

//   const timeoutPromise = new Promise((_, reject) =>
//     setTimeout(() => reject(Object.assign(new Error('Gemini request timed out'), { status: 504 })), timeoutMs)
//   )

//   try {
//     const result = await Promise.race([model.generateContent(parts), timeoutPromise])
//     return result.response.text()
//   } catch (err) {
//     const normalized = new Error(err?.message || 'Gemini request failed.')
//     normalized.status = err?.status ?? err?.response?.status ?? undefined
//     normalized.cause = err
//     throw normalized
//   }
// }
// Kept under Vercel free-tier's 10s function timeout with room for one
// retry on transient (non-timeout) failures. See rateLimiter.js pattern
// for the "tuned for free tier" philosophy   this mirrors it.
const DEFAULT_TIMEOUT_MS = 6000

export async function generateText(promptText, image, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const genAI = getClient()
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  const parts = [{ text: promptText }]
  if (image?.base64) {
    parts.push({ inlineData: { data: image.base64, mimeType: image.mimeType } })
  }

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(Object.assign(new Error('Gemini request timed out'), { status: 504, isTimeout: true })), timeoutMs)
  )

  try {
    const result = await Promise.race([model.generateContent(parts), timeoutPromise])
    return result.response.text()
  } catch (err) {
    const normalized = new Error(err?.message || 'Gemini request failed.')
    normalized.status = err?.status ?? err?.response?.status ?? undefined
    // Marks whether this failure is worth retrying. A timeout at 6s means
    // Gemini was already slow   retrying immediately would likely just
    // burn the same time again and blow the 10s function budget. Network
    // blips (fetch failed, ECONNRESET, etc.) are different: a fresh attempt
    // often succeeds fast.
    normalized.isTimeout = Boolean(err?.isTimeout)
    normalized.cause = err
    throw normalized
  }
}