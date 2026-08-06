import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('provider abstraction (index.js)', () => {
  const ORIGINAL_ENV = process.env.AI_PROVIDER

  afterEach(() => {
    process.env.AI_PROVIDER = ORIGINAL_ENV
    vi.resetModules()
  })

  it('defaults to gemini when AI_PROVIDER is not set', async () => {
    delete process.env.AI_PROVIDER
    vi.resetModules()

    vi.doMock('./gemini.js', () => ({
      generateText: vi.fn(() => Promise.resolve('mock response')),
    }))

    const { generateText } = await import('./index.js')
    const result = await generateText('prompt', null, 5000)

    expect(result).toBe('mock response')
  })

  it('throws a clear error for an unconfigured provider name', async () => {
    process.env.AI_PROVIDER = 'nonexistent-provider'
    vi.resetModules()

    const { generateText } = await import('./index.js')

    await expect(generateText('prompt', null, 5000)).rejects.toThrow(
      'Unknown AI provider configured'
    )
  })
})