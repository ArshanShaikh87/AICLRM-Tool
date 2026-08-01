# PHASE 1   Survival Layer (isके bina public launch mat karna)

Ye woh cheezein hain jinke bina real traffic aate hi ya to bill blow hoga, ya security hole exploit hoga.

Rate limiting (Upstash Redis, IP-based)	                Abuse se bachne ke liye   sabse urgent
Prompt injection guard (system prompt hardening)	Resume/JD ke through system prompt hijack na ho
CORS lock (sirf apne domain se request accept)	        Koi doosri site tumhara API misuse na kare
Basic security headers (CSP, X-Frame-Options)	        Clickjacking/XSS se basic protection
Google Cloud budget cap + alert	                        Bill surprise na aaye

Avoid is phase mein: naye features, UI polish, SEO   abhi nahi. Pehle "leak-proof" banao.

# PHASE 2   Infra Reality Check

Ye phase code se zyada decision-making hai.


Vercel free-tier limits samajhna (10s timeout, concurrency cap)	"Thousands of users" free tier pe realistically nahi chalega   ye pata hona chahiye pehle hi
Decide karo: Pro plan lena hai ya launch chhota rakhna hai pehle	Galat expectation set na ho
Timeout + retry logic Gemini calls pe	Slow response se request fail na ho silently

Avoid: "thousands of users" ka assumption leke aage badhna bina infra verify kiye. Pehle chhote scale pe stable karo, phir scale-up plan karo.

# PHASE 3   Trust & Stability

Basic unit tests (Vitest)   validator, fileParsers, pdfExport	Regression bugs jaisa humein mila (character-limit wala) dobara na ho
Error tracking (Sentry free tier)	Pata chale production mein kya fail ho raha hai, bina user complaint ke
Uptime monitoring (UptimeRobot)	Site down hone se pehle tumhe pata chale
Simple RUNBOOK.md	Panic mode mein fast recovery

Avoid: 100% test coverage ka target rakhna abhi   sirf critical paths (validation, file parsing, PDF export) cover karo. Perfectionism time waste karega.

# PHASE 4   Core Feature Ko Real Banao

missingKeywords actually implement karo (abhi hardcoded [] hai)	Ye tumhara core differentiator hai jo README mein highlight kiya hai   abhi kaam hi nahi karta
Provider abstraction (Gemini ke sath ek layer, taaki future mein switch/fallback easy ho)	Single point of failure hatao

Avoid: Naye AI providers actually add karna abhi (OpenAI, Claude integration)   sirf architecture ready rakho, actual multi-provider baad mein.

# PHASE 5   Performance & Polish

Lazy-load heavy libraries (pdfjs-dist, mammoth, jspdf)	Bundle size 60-70% chhota, faster initial load
SEO basics (meta tags, sitemap, robots.txt)	Bina isके Google pe discover hi nahi hoge
Privacy-respecting analytics (Plausible/Umami)	Data-driven decisions, bina "privacy-first" branding tode
Accessibility audit (Lighthouse)	Already decent hai, but verify karo

Avoid: Google Analytics use karna agar "privacy-first, nothing stored" tumhara core pitch hai   ye contradiction lagega users ko.

# PHASE 6   Legal & Compliance (launch ke turant pehle)

Consent checkbox Generate button se pehle ("I agree to Terms")	Abhi Policies page hai but enforce nahi hoti
File-parsing timeout (malicious file se browser hang na ho)	Security + UX dono
Staging/preview deployment discipline	Ek galat commit se live site down na ho
Kya poori tarah avoid karna hai (kam se kam abhi)
Google Drive integration   OAuth complexity, alag project jaisa scope hai
Login/authentication system   README mein khud "MVP validate hone tak nahi" likha hai, usi pe rehna
Payment gateway (Razorpay)   jab tak users ki demand na dikhe
Multiple AI providers actually switch karna live   sirf architecture ready rakho
100% test coverage obsession   critical paths kaafi hain abhi
PWA / offline mode   nice-to-have hai, priority nahi