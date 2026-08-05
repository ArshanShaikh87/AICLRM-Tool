import * as Sentry from '@sentry/node'

let initialized = false

/**
 * Initializes Sentry once per warm serverless instance. Vercel functions
 * reuse the same process across invocations (warm starts), so this
 * guards against re-initializing on every request. Fails open   if
 * SENTRY_DSN isn't set (e.g. local dev without it configured), Sentry
 * simply stays inactive rather than crashing the function.
 */
export function initSentry() {
  if (initialized) return
  initialized = true

  const dsn = process.env.SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV || 'development',
    // Error monitoring only for now   no tracing, to conserve the free
    // tier's event quota while the product is still in validation.
    tracesSampleRate: 0,
  })
}

export { Sentry }