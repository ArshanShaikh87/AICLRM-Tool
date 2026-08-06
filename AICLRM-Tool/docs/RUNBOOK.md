# RUNBOOK — AI Cover Letter & Resume Match Tool

Purpose: jab kuch production mein toot jaaye, ye file batayegi kahan dekhna hai
aur kya karna hai. Panic mode mein pehla step hamesha yahi file honi chahiye.

---

## 1. Monitoring — Kahan Dekhein

| Cheez | Kahan | Kya batata hai |
|---|---|---|
| Site up/down | [UptimeRobot dashboard](https://uptimerobot.com) | Site reachable hai ya nahi (email alert bhi aata hai) |
| Frontend errors | Sentry → `aiclrm-frontend` project → Issues | Browser crashes, React errors |
| Backend errors | Sentry → `aiclrm-backend` project → Issues | `/api/generate` ke crashes, Gemini failures |
| Live logs | Vercel dashboard → Project → Deployments → latest → Logs | Real-time function logs, request-level detail |
| Rate limit usage | Upstash Redis dashboard | Kitne requests block ho rahe hain |

---

## 2. "Site Down" Alert Aaya (UptimeRobot)

1. Vercel dashboard → **Deployments** tab kholo, latest deployment ka status check karo (Failed/Building/Ready)
2. Agar latest deployment **Failed** hai:
   - Build logs padho, jo error dikhe usse fix karo
   - Tab tak purana deployment hi live rehta hai agar naya build fail hua ho (Vercel auto-rollback karta hai build failure pe) — so site turant down nahi honi chahiye is case mein
3. Agar deployment **Ready** hai but site phir bhi down hai:
   - Vercel dashboard → **Settings → Domains** check karo, DNS/domain issue to nahi
   - Vercel ka khud ka [status page](https://www.vercel-status.com) check karo — unka infra down ho sakta hai

---

## 3. "Cover letter generate nahi ho raha" (User Complaint / Sentry Error)

**Sentry backend project → Issues** mein jaake latest error dekho. Common causes:

### `generation_failed`
- **Gemini timeout/503:** Google ke side ka temporary overload. Agar bar-bar ho raha hai (single event nahi, pattern hai), Sentry mein event frequency check karo. Ek-do events normal hain (retry logic already handle karta hai), lekin spike ho to Gemini API status check karo: https://status.cloud.google.com
- **JSON parse failure (do baar retry ke baad bhi):** System prompt ya `responseMimeType` config mein kuch badla hai kya, recent commits check karo (`api/prompts/systemPrompt.js`, `api/providers/gemini.js`)

### `rate_limit_exceeded` (bahut zyada aa raha ho)
- Normal hai agar genuine traffic spike hai
- Agar suspicious pattern hai (same IP bar-bar, ya bahut zyada volume achanak), abuse ho sakta hai — Upstash dashboard mein IP-wise breakdown dekho

### `origin_not_allowed`
- Naya domain/preview URL add hua hai jo `ALLOWED_ORIGIN` env var mein nahi hai
- Fix: Vercel dashboard → Settings → Environment Variables → `ALLOWED_ORIGIN` mein naya origin comma-separated add karo, redeploy karo

---

## 4. Environment Variables — Reference

Agar koi feature achanak silently kaam karna band kar de (jaise Sentry events aana band ho jaayein, ya rate limiting bypass ho jaaye), **sabse pehle check karo ki required env var Vercel dashboard mein set hai ya nahi** — `.env.local` sirf local machine ke liye kaam karta hai, Vercel deployment ke liye alag se dashboard mein add karna padta hai (humne khud ye mistake ki thi Sentry setup ke waqt).

Required vars (Vercel → Settings → Environment Variables mein hone chahiye):

| Variable | Kis liye |
|---|---|
| `GEMINI_API_KEY` | AI generation |
| `GEMINI_MODEL` | Kaunsa model use ho |
| `UPSTASH_REDIS_REST_URL` | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting |
| `ALLOWED_ORIGIN` | CORS (comma-separated agar multiple domains) |
| `SENTRY_DSN` | Backend error tracking |
| `VITE_SENTRY_DSN` | Frontend error tracking |

Naya env var add karne ke baad **hamesha manual redeploy trigger karo** — Vercel automatically naye vars ke saath rebuild nahi karta.

---

## 5. Rollback (Bad Deployment)

1. Vercel dashboard → **Deployments** tab
2. Jo purana deployment stable tha (working state), uske "..." menu → **"Promote to Production"**
3. Ye turant purane version ko live kar dega, bina naya build kiye

---

## 6. Local Debugging

```bash
vercel dev          # local server, real env vars ke saath (.env.local se)
npm run test         # Vitest   validator, responseParser, fileParsers, pdfExport
npm run lint          # ESLint
```

Agar `vercel dev` khud fail ho raha hai, `.env.local` file check karo — saare required vars present hain ya nahi (upar wala table dekho).

---

## 7. Jab Kuch Samajh Na Aaye

1. Sentry mein full stack trace padho (error ke andar click karo, "Full Trace" dekho)
2. Vercel function logs mein exact request timestamp match karke dekho
3. Agar dono jagah kuch clear nahi mil raha, `git log` mein recent commits dekho — kya recently change hua hai jo isse related ho sakta hai

---

*Last updated: August 2026*