import { describe, it, expect } from 'vitest'
import { parseAiResponse } from './responseParser.js'

describe('parseAiResponse', () => {
  it('parses valid JSON with coverLetter and missingKeywords', () => {
    const raw = JSON.stringify({
      coverLetter: 'Dear Hiring Manager, ...',
      missingKeywords: ['TypeScript', 'AWS'],
    })
    const result = parseAiResponse(raw)
    expect(result.coverLetter).toBe('Dear Hiring Manager, ...')
    expect(result.missingKeywords).toEqual(['TypeScript', 'AWS'])
  })

  it('strips markdown code fences before parsing', () => {
    const raw = '```json\n' + JSON.stringify({ coverLetter: 'Hello', missingKeywords: [] }) + '\n```'
    const result = parseAiResponse(raw)
    expect(result.coverLetter).toBe('Hello')
  })

  it('defaults missingKeywords to [] when field is missing', () => {
    const raw = JSON.stringify({ coverLetter: 'Hello' })
    expect(parseAiResponse(raw).missingKeywords).toEqual([])
  })

  it('filters out non-string / empty entries in missingKeywords', () => {
    const raw = JSON.stringify({
      coverLetter: 'Hello',
      missingKeywords: ['Valid', '', '   ', 42, null, 'AlsoValid'],
    })
    expect(parseAiResponse(raw).missingKeywords).toEqual(['Valid', 'AlsoValid'])
  })

  it('caps missingKeywords at 8 entries', () => {
    const raw = JSON.stringify({
      coverLetter: 'Hello',
      missingKeywords: Array.from({ length: 12 }, (_, i) => `kw${i}`),
    })
    expect(parseAiResponse(raw).missingKeywords).toHaveLength(8)
  })

  it('throws on empty input', () => {
    expect(() => parseAiResponse('')).toThrow('Empty AI response')
  })

  it('throws on invalid JSON', () => {
    expect(() => parseAiResponse('not json at all')).toThrow('AI response was not valid JSON')
  })

  it('throws when coverLetter is missing', () => {
    const raw = JSON.stringify({ missingKeywords: ['a'] })
    expect(() => parseAiResponse(raw)).toThrow('missing a valid coverLetter field')
  })

  it('throws when JSON is an array instead of an object', () => {
    expect(() => parseAiResponse('[1,2,3]')).toThrow('was not an object')
  })
})