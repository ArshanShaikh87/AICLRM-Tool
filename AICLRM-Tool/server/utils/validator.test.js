import { describe, it, expect } from 'vitest'
import { validateInput } from './validator.js'
import { RESUME_MAX_LENGTH, JOB_DESCRIPTION_MAX_LENGTH } from '../../src/constants/limits.js'

describe('validateInput', () => {
  const validResume = 'B'.repeat(50)
  const validJobDescription = 'A'.repeat(50)

  it('returns null for valid resume text + job description', () => {
    expect(validateInput({ resume: validResume, jobDescription: validJobDescription })).toBeNull()
  })

  it('returns resume_required when resume is missing', () => {
    expect(validateInput({ jobDescription: validJobDescription })).toBe('resume_required')
  })

  it('returns resume_required when resume is whitespace-only', () => {
    expect(validateInput({ resume: '   \n\t  ', jobDescription: validJobDescription })).toBe('resume_required')
  })

  it('accepts a resumeImage in place of resume text', () => {
    const result = validateInput({
      resumeImage: { base64: 'abc123', mimeType: 'image/png' },
      jobDescription: validJobDescription,
    })
    expect(result).toBeNull()
  })

  it('returns input_too_long when resumeImage base64 exceeds the size ceiling', () => {
    const oversized = 'a'.repeat(6_000_001)
    const result = validateInput({
      resumeImage: { base64: oversized, mimeType: 'image/png' },
      jobDescription: validJobDescription,
    })
    expect(result).toBe('input_too_long')
  })

  it('returns input_too_long when resume text exceeds RESUME_MAX_LENGTH', () => {
    const oversized = 'x'.repeat(RESUME_MAX_LENGTH + 1)
    expect(validateInput({ resume: oversized, jobDescription: validJobDescription })).toBe('input_too_long')
  })

  it('returns job_description_required when job description is missing', () => {
    expect(validateInput({ resume: validResume })).toBe('job_description_required')
  })

  it('returns job_description_required when job description is whitespace-only', () => {
    expect(validateInput({ resume: validResume, jobDescription: '   ' })).toBe('job_description_required')
  })

  it('returns input_too_long when job description exceeds JOB_DESCRIPTION_MAX_LENGTH', () => {
    const oversized = 'y'.repeat(JOB_DESCRIPTION_MAX_LENGTH + 1)
    expect(validateInput({ resume: validResume, jobDescription: oversized })).toBe('input_too_long')
  })

  it('prioritizes resume_required over job_description_required when both are missing', () => {
    expect(validateInput({})).toBe('resume_required')
  })
})