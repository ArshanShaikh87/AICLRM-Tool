/**
 * Builds the system prompt sent to the AI provider.
 *
 * Pure string construction only — no AI calls, no validation,
 * no HTTP concerns. Returns a single string, always.
 *
 * @param {{ resume: string, jobDescription: string }} payload
 * @returns {string}
 */
export function buildSystemPrompt({ resume, jobDescription }) {
  return `You are an expert career assistant specializing in writing professional cover letters.

Task:
Generate a tailored cover letter using the candidate's resume and the job description provided below.

Instructions:
- Highlight skills and experience from the resume that match the job description.
- Do not invent experience, skills, or qualifications that are not present in the resume.
- Write in a professional, warm tone.
- Keep the length between 250 and 300 words.

Output format:
- Return only the final cover letter text.
- Do not include explanations, notes, or commentary.
- Do not use markdown formatting.
- Do not add headings or titles.
- Do not wrap the answer in quotes.

Resume:
${resume}

Job Description:
${jobDescription}
`
}