# ✅ WEEK 16 CODE REVIEW — PREPARATION COMPLETE

**Status:** Ready for Tuesday, May 5, 4:30 PM

---

## 📦 WHAT YOU HAVE

Your complete **Kai Nani Hospitality Dashboard** — a full-stack system built over 7 weeks:

### **Frontend (Weeks 12–13)**
- React + Vite + Tailwind CSS
- Public marketing page with luxury responsive design
- Dashboard with Chart.js guest analytics
- Real-time weather integration (Open-Meteo API)
- Sound Bath & Wellness recommendations (dynamic logic)

### **Backend (Weeks 10–11)**
- MongoDB + Mongoose schemas
- Property model with embedded reviews (subdocuments)
- Express REST API with query operators (`$gte`, `$lte`, `$elemMatch`)
- Seed scripts for data population

### **Authentication (Weeks 14–15)**
- Passport local strategy with bcrypt password hashing
- Google OAuth 2.0 integration
- Find-or-link-or-create account linking logic
- Session persistence via connect-mongo
- Email verification for security

---

## 📚 PREPARATION MATERIALS (In Your Repo Root)

1. **[CODE_REVIEW_PREP.md](CODE_REVIEW_PREP.md)** ← **START HERE**
   - Full project inventory (Weeks 10–16)
   - Recommended code artifact to present (Google OAuth callback)
   - Pre-presentation checklist
   - Q&A topics with full answers
   - Timing breakdown
   - Complete PRD highlights section

2. **[SPEAKER_NOTES.md](SPEAKER_NOTES.md)** ← **FOR REHEARSAL**
   - Word-for-word script for each 5-minute segment
   - Live demo path with timing
   - Detailed explanations for Q&A questions
   - Practice checklist
   - Last-minute tips and emergency protocols

3. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ← **FOR TUESDAY 4:30 PM**
   - TL;DR cheat sheet (print this out)
   - 5-minute breakdown
   - Key talking points
   - Bookmark URLs and file locations
   - Q&A answers in table format
   - Timing checklist

4. **[verify-code-review.sh](verify-code-review.sh)**
   - Automated verification script
   - Confirms clean install, dependencies, file structure

---

## 🎯 YOUR PRESENTATION STRATEGY

### **Segment 1: PRD Highlights (1 min)**
- Open your final PRD PDF (look in `week12/hw12b/` or `week13/`)
- Show: Cover, problem statement, target segment, acceptance criteria
- Speak to the why: "Boutique hotels need real-time wellness recommendations"

### **Segment 2a: Live Demo (1 min)**
- **Setup:** Two terminals running simultaneously:
  - Terminal 1: `cd week12/term-project && npm run preview` (marketing site on 4173)
  - Terminal 2: `cd week14/term-project && npm start` (backend on 3000)
- Demo path:
  1. Marketing page (`http://localhost:4173/` or Render URL) — show luxury design + weather feature
  2. Login page (`http://localhost:3000/login` or Render URL) — show local email + Google OAuth button
  3. Dashboard (`http://localhost:3000/admin/dashboard` or Render URL) — show Chart.js analytics + weather data
  4. Logout — remove authenticated user from the Passport session

### **Segment 2b: Code Walk-through (1 min)**
- **Artifact:** Google OAuth verify callback
- **File:** `week14/term-project/config/passport.js`
- **Lines:** 27–64
- **Explanation:** Find-or-link-or-create pattern + email verification logic
- **Why this one:** Complex, defensible, spans Weeks 14–15, interview-ready

### **Segment 3: Q&A (2 mins)**
- Topics: Mongoose design choices, React data flow, Passport authentication, bcrypt security
- Prepare honest reflection: "I'd denormalize dashboard queries to reduce MongoDB round-trips"

---

## 📋 BEFORE TUESDAY

### **This Week (Mon–Tue Morning)**
- [ ] Read **CODE_REVIEW_PREP.md** in full (25 min)
- [ ] Read **SPEAKER_NOTES.md** aloud (practice script for 10 min)
- [ ] Record yourself on phone; listen back (5 min)
- [ ] Locate your final PRD PDF; open in browser or PDF reader
- [ ] Test clean install: `git clone`, `npm install`, `npm start` (15 min)
- [ ] Fix any errors before Tuesday

### **Tuesday Morning (1–2 hours before 4:30 PM)**
- [ ] Final rehearsal with timer (aim for 4:50 total, 5:00 max)
- [ ] Pre-open VS Code with `week14/term-project/config/passport.js` visible (lines 27 in view)
- [ ] Pre-open browser tabs:
  - Your Render deployment URL (marketing page)
  - Login page URL
  - Dashboard URL (or ready to log in to see it)
  - Your PRD PDF

### **Tuesday at 4:00 PM (30 min before start)**
- [ ] Test Zoom: screen share, microphone, camera
- [ ] Join Zoom room early
- [ ] Silence phone
- [ ] Have water nearby
- [ ] Take 3 deep breaths

---

## 💡 WHAT MAKES THIS PRESENTATION STRONG

✅ **Full Arc Coverage:** You're not just showing Week 15 auth; you're showing how Weeks 10–11 data model, Weeks 8–9 API integration, Weeks 12–13 React UI, and Weeks 14–15 authentication all fit together.

✅ **Complex Artifact:** Google OAuth callback demonstrates sophisticated system design (federated identity, email verification, account linking, MongoDB persistence).

✅ **Honest Reflection:** "I'd denormalize queries" is a specific, thoughtful improvement grounded in database design, not vague platitudes.

✅ **Prepared Q&A:** You've practiced answers for every likely question across the 7-week arc.

✅ **Live Demo:** Your site is deployed and works. Walk through it confidently.

---

## 🚨 IF ANYTHING BREAKS ON TUESDAY

| Issue | Action |
|-------|--------|
| Render deployment down | Show local version: `npm start` at http://localhost:3000 |
| VS Code won't open | Have file paths memorized; point to the lines verbally |
| Zoom freezes | Rejoin quietly; you'll lose 30 seconds but it's recoverable |
| Browser won't load | Have static screenshots ready; explain "it would show this..." |
| Brain freeze (Q&A) | Pause. Sip water. "Let me think about that..." 3 sec of silence is fine |
| Forgot what to say | Look at **QUICK_REFERENCE.md** on your phone for talking points |

---

## 📊 GRADING BREAKDOWN (5 points out of 15)

- **Live Demo (2 pts):** Site loads, path is clear, no major pauses
- **Technical Explanation (1 pt):** You accurately describe how the system works
- **Code Walk-through (1 pt):** Component is ≥15 lines, design choices are explained
- **Reflection (1 pt):** Honest improvement idea grounded in your system

**Goal:** 5/5. You've prepared for this. Deliver clearly.

---

## 🎬 5-MINUTE TIMING (Your Cheat Sheet)

| Time | Section | What to Do |
|------|---------|-----------|
| **0:00** | Intro | "Hi, this is Kai Nani Hospitality Dashboard..." |
| **0:05** | PRD (Show PDF) | Problem statement + target segment + acceptance criteria |
| **1:00** | Demo (Open browser) | Marketing page → login → dashboard → logout |
| **1:45** | Code (Open VS Code) | Passport callback (lines 27–64) walk-through |
| **2:00** | Q&A (Listen) | Answer for ~2 minutes |
| **4:00** | Reflection | "I'd denormalize queries..." |
| **4:50** | End | "Thank you." |

---

## ✨ FINAL REMINDERS

- **You've earned this.** You built a full-stack system from scratch.
- **Confidence matters.** Speak clearly. Own your work.
- **Five minutes is tight.** Practice cuts down surprises.
- **Honesty wins.** "That's a great question I'd need to research" is better than bluffing.
- **The rubric rewards depth.** Explaining *why* you chose something matters more than *what* you chose.

---

## 📞 QUICK LINKS (For Tuesday)

| Resource | Location |
|----------|----------|
| Prep Guide | [CODE_REVIEW_PREP.md](CODE_REVIEW_PREP.md) |
| Speaker Notes | [SPEAKER_NOTES.md](SPEAKER_NOTES.md) |
| Cheat Sheet | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| Passport Code | `week14/term-project/config/passport.js` (lines 27–64) |
| User Model | `week14/term-project/models/User.js` (backup Q&A) |
| Live Site | Your Render deployment URL |

---

## 🎯 ONE LAST THING

Your project has:
- ✅ Real-time API integration (weather)
- ✅ Sophisticated auth system (local + OAuth + find-or-link-or-create)
- ✅ Database design decisions (embedded subdocuments, query operators)
- ✅ Full React + Express stack
- ✅ Production deployment

This is **above-average work for Week 16.** Present it proudly.

---

**Good luck on Tuesday, May 5 at 4:30 PM. You're ready. Go show them what you built.** 🚀

---

*Last updated: May 4, 2026*  
*Next milestone: Code Review Presentation (Tue 4:30 PM)*
