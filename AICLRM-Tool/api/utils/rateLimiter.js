import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let ratelimit = null

/**
 * Lazily creates the rate limiter — same pattern as gemini.js's getClient(),
 * env vars aren't guaranteed to be available at module load time.
 */
function getRateLimiter() {
  if (!ratelimit) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      const error = new Error('Missing Upstash Redis environment variables.')
      error.status = 500
      throw error
    }

    const redis = new Redis({ url, token })

    // 5 requests per IP per 10 minutes — generous enough for real usage
    // (a user regenerating a few times), tight enough to block abuse.
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      analytics: true,
      prefix: 'ratelimit:generate',
    })
  }

  return ratelimit
}

/**
 * Resolves the client's IP from Vercel's forwarded headers.
 * Falls back to a constant key if truly unavailable (local dev without vercel dev).
 */
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

/**
 * Checks whether the current request is within rate limits.
 * Returns { success: boolean, remaining: number, reset: number }
 */
export async function checkRateLimit(req) {
  const limiter = getRateLimiter()
  const ip = getClientIp(req)
  return limiter.limit(ip)
}