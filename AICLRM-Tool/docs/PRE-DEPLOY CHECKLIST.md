# PRE-DEPLOY CHECKLIST

Purpose: Production me jaane se **pehle** ye poori list complete honi chahiye.
Koi bhi item skip mat karo — har ek ka reason niche diya hai. Ye list code
review (build/lint/test verified) + `docs/Do_and_Dont.md` roadmap se compile
ki gayi hai.

Jab poori list complete ho jaaye, is file ke bottom me date + apna naam
likh dena — taaki future me pata rahe last full check kab hua tha.

---

## 1. Money — Bill Surprise Na Aaye

- [ ] **Google Cloud Console → Billing → Budgets & Alerts** — ek budget cap set
      karo (e.g. ₹500/month) aur email alert on karo. Rate limiting (5
      req/10min per IP) request *count* limit karta hai, cost *amount*
      nahi guarantee karta — agar bahut saare unique IPs se load aaye ya
      koi bug rate limiter bypass kare, bill bina warning ke badh sakta hai.
- [ ] Gemini API ka current pricing tier confirm karo (free tier limits kya
      hain, kab se paid lagega)

---

## 2. Environment Variables — Vercel Dashboard

Vercel → Project → Settings → Environment Variables khol ke, **Production**
scope me ye sab present hone chahiye (sirf `.env.local` hone se kaam nahi
chalega — wo sirf local machine ke liye hai):

- [ ] `GEMINI_API_KEY`
- [ ] `GEMINI_MODEL`
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] `ALLOWED_ORIGIN` — final production domain, koi trailing slash nahi
- [ ] `SENTRY_DSN` (backend)
- [ ] `VITE_SENTRY_DSN` (frontend)
- [ ] `AI_PROVIDER` (agar set karna required hai)
- [ ] Naya env var add kiya to **manual redeploy trigger** kiya (Vercel
      naye vars ke saath auto-rebuild nahi karta)

---

## 3. Domain

- [ ] Final production domain decide ho gaya hai (Vercel default ya custom)
- [ ] `index.html` me `canonical`, `og:url`, `og:image`, `twitter:image` —
      sab isi final domain pe point kar rahe hain (abhi `aiclrm.vercel.app`
      placeholder hai)
- [ ] `public/sitemap.xml` ke saare `<loc>` tags final domain match karte hain
- [ ] `public/robots.txt` me sitemap URL final domain match karta hai
- [ ] Agar custom domain hai: Vercel → Settings → Domains me add + DNS
      propagate ho gaya (kuch ghante lag sakte hain)

---

## 4. Code Health (Automated — Baseline Already Verified)

Deploy se turant pehle ek baar aur confirm karo ki koi naya regression nahi
aaya:

- [ ] `npm run build` — clean pass hota hai
- [ ] `npm run test` — saare Vitest suites pass
- [ ] `npm run lint` — koi naya error nahi (pre-existing unrelated errors
      ignore kar sakte ho, but naye introduce nahi hone chahiye)

---

## 5. Analytics

- [ ] Umami (cloud.umami.is) pe free account bana ke site add kiya
- [ ] `index.html` me `data-website-id="YOUR-WEBSITE-ID"` ko actual id se
      replace kiya
- [ ] Agar Umami self-host ya alag domain use kar rahe ho, `vercel.json` ke
      CSP me `script-src` / `connect-src` bhi update kiya

---

## 6. Manual Functional Smoke Test (Real Browser, Real Device)

Automated tests business logic cover karte hain, UI flow nahi — ye khud
click karke test karo:

- [ ] Resume **PDF upload** → text extract ho raha hai
- [ ] Resume **DOCX upload** → text extract ho raha hai
- [ ] Resume **image upload** (PNG/JPEG) → Gemini se read ho raha hai
- [ ] "Paste resume text instead" fallback kaam kar raha hai
- [ ] **Consent checkbox** unchecked hone pe Generate button disabled hai
- [ ] Job description empty hone pe Generate disabled hai
- [ ] Ek bada (~7MB+) ya corrupt file daal ke **timeout error** dikh raha hai
      (20s ke andar recover hota hai, hang nahi hota)
- [ ] Cover letter generate hoke output display ho raha hai
- [ ] **Copy button** kaam kar raha hai
- [ ] **Download PDF button** kaam kar raha hai
- [ ] Network offline karke Generate try karo — friendly error message
      aata hai (crash/blank screen nahi)
- [ ] Mobile viewport (ya real phone) pe pura flow ek baar chalao
- [ ] Light aur Dark dono theme me UI check karo
- [ ] `/about` aur `/policies` pages directly URL me type karke refresh karo
      (SPA routing fallback test — 404 nahi aana chahiye)

---

## 7. Security Spot-Check

- [ ] Browser DevTools → Console khol ke koi **CSP violation** to nahi
      (khaaskar Umami script add karne ke baad)
- [ ] Ek dusre (galat) origin se `/api/generate` ko curl/Postman se hit
      karke `origin_not_allowed` aata hai confirm karo
- [ ] 6 baar jaldi-jaldi Generate click karke rate limit (`rate_limit_exceeded`)
      trigger hokar dikh raha hai

---

## 8. Legal Content Review

- [ ] `src/pages/Policies.jsx` (Privacy Policy + Terms) kisi aur insaan se
      padhwaya — khaaskar "resume/job description Gemini API ko jaata hai"
      wala disclosure accurate aur samajh me aane wala hai
- [ ] Consent checkbox ka text Policies page se match/contradict to nahi
      karta

---

## 9. Post-Deploy (Turant Baad)

- [ ] Live domain pe upar wala **Section 6 smoke test dobara** karo
      (Preview aur Production env vars alag ho sakte hain — preview pe
      kaam karna production pe kaam karne ki guarantee nahi deta)
- [ ] Sentry dashboard 5–10 min tak dekho — naya error spike to nahi aaya
- [ ] UptimeRobot monitor us live domain ki taraf point kar raha hai
      confirm karo

---

## Sign-off

| Field | Value |
|---|---|
| Checklist completed by | _____________ |
| Date | _____________ |
| Any item skipped + reason | _____________ |

---

*Last updated: August 2026*