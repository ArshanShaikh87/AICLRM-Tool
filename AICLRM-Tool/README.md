# AI Cover Letter & Resume Match Tool — Project Architecture

**Version:** 1.0 (MVP)
**Owner:** [Your Name]
**Last Updated:** July 2026

---

## 1. Problem Statement

Job seekers (freshers, early-career professionals) repeatedly write tailored cover letters for every job application. This is repetitive, time-consuming, and most people either reuse generic templates or spend excessive time manually tailoring content to each job description.

## 2. Product Scope (MVP — V1)

### What it does
- User pastes their **resume text** and a **job description**.
- Tool generates:
  1. A tailored **cover letter** (250–300 words, professional tone, India-context aware)
  2. A **keyword gap analysis** — skills/terms present in the JD but missing/underemphasized in the resume

### Explicitly OUT of scope for V1
- No login/authentication
- No database / persistent storage
- No payment integration
- No history of past generations
- No file upload (PDF/DOCX parsing) — text paste only

> Rule: Do not add anything to this list until V1 is validated with real users.

---

## 3. System Architecture

```
┌─────────────────────┐
│   Browser (Client)  │
│  - React form       │
│  - 2 inputs: Resume,│
│    Job Description  │
│  - Output display + │
│    Copy button       │
└──────────┬───────────┘
           │ HTTPS POST (JSON)
           │ { resume, jobDescription }
           ▼
┌──────────────────────────┐
│  Serverless Function      │
│  (Vercel / Netlify)        │
│  - Rate limiting (per IP)  │
│  - Input length validation │
│  - Holds API key (secret)  │
│  - Builds system + user    │
│    prompt                  │
└──────────┬─────────────────┘
           │ HTTPS POST
           │ (Anthropic Messages API)
           ▼
┌──────────────────────────┐
│      Claude API          |_
│  Model: Haiku 4.5          │
│  (cost-optimized)          │
└──────────┬─────────────────┘
           │ JSON response
           ▼
┌──────────────────────────┐
│  Serverless Function     │
│  - Parses response       │
│  - Returns clean JSON    │
│    to client             │
└──────────┬───────────────
           │
           ▼
┌──────────────────────────┐
│   Browser (Client)       │
│  - Renders cover letter  │
│  - Renders keyword gaps  │
│  - Copy-to-clipboard     │
└──────────────────────────┘
```

**Key architectural decisions:**

| Decision | Reason |
|---|---|
| No database | Zero persistence needed for V1; removes hosting, backup, and security overhead |
| No login | Removes auth complexity; lowers friction for first-time users |
| Serverless function (not a full backend server) | No server to manage/scale; free tier covers early usage |
| Haiku 4.5 model (not Sonnet/Opus) | ~3–5x cheaper; sufficient quality for this task |
| Stateless design | Every request is independent — simpler to debug, scale, and reason about |

---

## 4. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React (Vite) | Lightweight, fast build |
| Styling | Tailwind CSS | Fast to style, no design system overhead |
| Hosting (frontend) | Vercel / Netlify | Free tier, auto-deploy from GitHub |
| Backend | Serverless function (Vercel Functions / Netlify Functions) | No server management |
| AI Model | Claude Haiku 4.5 via Anthropic API | Cost-optimized |
| Payments (future, not V1) | Razorpay | Indian payment gateway, easy integration |
| Version control | Git + GitHub | Standard |

---

## 5. API Design

### Endpoint: `POST /api/generate`

**Request body:**
```json
{
  "resume": "string (max 3000 chars)",
  "jobDescription": "string (max 3000 chars)"
}
```

**Response body:**
```json
{
  "coverLetter": "string",
  "missingKeywords": ["string", "string", "..."]
}
```

**Error responses:**
```json
{ "error": "rate_limit_exceeded" }   // 429
{ "error": "input_too_long" }         // 400
{ "error": "generation_failed" }      // 500
```

### Server-side validation rules
- Reject if `resume` or `jobDescription` exceeds 3000 characters
- Reject if either field is empty
- Rate limit: max 5 requests per IP per day (V1, simple in-memory or edge-config counter)

---

## 6. Prompt Design (System Prompt — fixed, backend-only)

```
You are an expert career coach who writes cover letters for job
seekers in the Indian job market. Given a resume and a job
description, produce:

1. A cover letter (250-300 words, professional but warm tone,
   no generic buzzwords, specific to the role)
2. A list of 3-5 keywords/skills present in the job description
   but missing or underemphasized in the resume

Respond ONLY in valid JSON with keys "coverLetter" and
"missingKeywords" (array of strings). No preamble, no markdown.
```

User message = raw resume + JD text only. No user-side prompt engineering needed — this is the tool's core differentiation vs. directly using ChatGPT/Claude.

---

## 7. Cost Management

| Item | Estimate |
|---|---|
| Model | Claude Haiku 4.5 ($1/$5 per million input/output tokens) |
| Avg request size | ~1,100 input tokens + ~400 output tokens |
| Cost per request | ~$0.003 (~₹0.25) |
| 1,000 requests | ~₹250 |

**Cost controls built into architecture:**
- Input length capped at 3,000 characters per field
- Rate limiting: 5 requests/IP/day
- Model locked to Haiku (not user-selectable)
- Prepaid API credits, auto-reload OFF

---

## 8. Folder Structure

```
cover-letter-tool/
├── src/
│   ├── components/
│   │   ├── InputForm.jsx
│   │   ├── OutputDisplay.jsx
│   │   └── CopyButton.jsx
│   ├── App.jsx
│   └── main.jsx
├── api/
│   └── generate.js          # serverless function
├── public/
├── .env.local                # ANTHROPIC_API_KEY (never committed)
├── .gitignore
├── package.json
└── README.md
```

---

## 9. Deployment Flow

1. Push code to GitHub
2. Connect repo to Vercel/Netlify
3. Add `ANTHROPIC_API_KEY` as an environment variable (never in frontend code)
4. Auto-deploy on push to `main`
5. Test on live URL before sharing

---

## 10. Validation Plan (2 weeks)

| Metric | Target |
|---|---|
| Total users (friends, LinkedIn, college network) | 15–20 |
| Repeat users (came back without being asked) | 5+ |
| Manual feedback collected | From every user who tries it |

**Decision gate:** If repeat usage is low, revisit the differentiation (keyword analysis) before adding any new feature. Do not add database/auth/payment until this gate is passed.

---

## 11. Roadmap (post-validation only)

- V2: Save history (requires DB — introduce only if users ask for it)
- V3: Freemium tier (Razorpay integration, usage limits)
- V4: Resume file upload (PDF parsing)
- V5: ATS-compatibility score

---

## 12. Risks & Open Questions

- API cost scaling if traffic spikes unexpectedly (mitigated via rate limiting)
- Output quality consistency across varied resume formats (monitor via manual review of first 50 outputs)
- Differentiation vs. directly using ChatGPT/Claude — must keep reinforcing via structured output (keyword gaps), not just convenience