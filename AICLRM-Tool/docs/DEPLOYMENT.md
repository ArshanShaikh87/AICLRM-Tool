# DEPLOYMENT — Staging Discipline

Purpose: RUNBOOK.md batata hai jab production **toot jaaye** to kya karna hai.
Ye file batati hai wo breakage **hone hi na de** — production me kuch bhi
push karne se pehle test karne ka standard workflow.

---

## 1. Branch Strategy

Solo/small-team MVP hai, isliye heavy git-flow avoid kiya hai. Simple rule:

- **`main`** → production. Vercel isse auto-deploy karta hai live domain pe.
- **Feature branches** (`feature/xyz`, `fix/xyz`) → kaam yahin karo, `main` se kabhi
  seedha commit mat karo.
- Feature branch push karte hi Vercel automatically ek **Preview Deployment**
  bana deta hai (unique URL) — ye hamara staging environment hai, alag se
  koi staging server maintain nahi karna padta.

```
feature/xyz  →  push  →  Vercel Preview URL  →  test  →  PR → main  →  Production
```

---

## 2. ⚠️ CORS Gotcha — Preview URLs `origin_not_allowed` denge

`api/generate.js` me `ALLOWED_ORIGIN` ek **strict exact-match allowlist** hai
(comma-separated origins, wildcard support nahi hai). Vercel har preview
deployment ko ek **naya random URL** deta hai
(`aiclrm-tool-git-feature-xyz-username.vercel.app`), jo allowlist me
match nahi karega — result: preview pe Generate button hamesha
`origin_not_allowed` dega, jab tak ye setup na ho:

**Fix — ek stable staging alias banao (one-time setup):**

1. Vercel dashboard → Project → **Settings → Domains**
2. Ek branch-specific alias assign karo, jaise `staging.aiclrm.vercel.app` →
   ek fixed branch (e.g. `develop`, agar use karna ho) ya "all preview
   deployments" ke liye Vercel ka default `<project>-git-<branch>.vercel.app`
   pattern note kar lo
3. Us **stable** URL ko Vercel → Settings → Environment Variables →
   `ALLOWED_ORIGIN` me add karo, scope = **Preview** (Production scope me
   mat dalna)
4. Ab us fixed branch se push karne pe preview hamesha kaam karega, bina
   har baar env var update kiye

Agar random per-PR preview URLs pe bhi test karna hai (fixed branch nahi),
to temporarily us specific preview URL ko `ALLOWED_ORIGIN` (Preview scope)
me add karo, test karke wapas hata do — but ye ideal nahi hai, isliye ek
fixed staging branch/alias use karna better hai.

---

## 3. Pre-Merge Checklist

`main` me merge karne se **pehle**, preview URL pe ye sab confirm karo:

- [ ] `npm run lint` — clean (ya sirf pre-existing unrelated errors)
- [ ] `npm run test` — sab Vitest suites pass
- [ ] Preview URL par manually resume upload + generate try karo (real
      Gemini call, real UI) — dummy/mocked response nahi
- [ ] Naya env var add kiya hai to **dono** scopes check karo — Preview
      aur Production dono me set hai ya sirf ek me reh gaya (common miss)
- [ ] Agar CSP/`vercel.json` touch kiya hai, browser console me CSP
      violation errors check karo (silently kuch block ho sakta hai)
- [ ] Consent checkbox, rate limiting, aur error states (network fail,
      empty input) manually trigger karke dekho — inhe automated tests
      cover nahi karte

Sab green ho tabhi PR ko `main` me merge karo.

---

## 4. Production Deploy Ke Baad

1. Live domain pe wahi smoke test dobara karo (preview aur production
   environment vars alag ho sakte hain — preview pe kaam karna guarantee
   nahi deta production pe bhi kaam karega)
2. Sentry dashboard 5–10 min tak dekho — naya error spike to nahi aaya
3. Kuch galat lage to **RUNBOOK.md § 5 (Rollback)** follow karo

---

*Last updated: August 2026*