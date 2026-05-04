# Week 16 Code Review — Quick Reference Card

**Print this out or keep on your phone for Tuesday 4:30 PM**

---

## 📊 PROJECT ARC AT A GLANCE

| Week | What | File | Key Line |
|------|------|------|----------|
| **10** | Property Schema | `week10/models/Property.js` | amenities, nightlyRate, starRating |
| **11** | Review Subdocs + REST API | `week11/models/Property.js` | `reviewSchema`, `$elemMatch`, `$gte/$lte` |
| **12** | React Marketing Site | `week12/src/components/WellnessWeatherSection.jsx` | Live Open-Meteo API, recommendation logic |
| **13** | Dashboard + Charts | `week13/src/components/Dashboard.jsx` | Chart.js, guest review analytics |
| **14** | Local Auth | `week14/config/passport.js` | Lines 1–25, bcrypt, LocalStrategy |
| **15** | OAuth + Find-or-Link-or-Create | `week14/config/passport.js` | **Lines 27–64** ← MAIN CODE WALK-THROUGH |
| **16** | Code Review | This card | You are here. |

---

## 🎯 5-MINUTE BREAKDOWN

| Time | What | Example |
|------|------|---------|
| **0:00–1:00** | PRD + Problem Statement | "Kai Nani = boutique hotels + real-time weather recommendations" |
| **1:00–1:45** | Live Demo (Site + Login + Dashboard) | Open browser, show homepage → login → dashboard → logout |
| **1:45–2:00** | Code Walk-through | VS Code: Passport Google callback (lines 27–64) |
| **2:00–4:00** | Q&A | Be ready to defend any week's code |

---

## 🔑 KEY TALKING POINTS

### **PRD (Why did you build this?)**
- Problem: Boutique hotels need real-time weather + wellness recommendations
- Solution: React site with live API data + admin dashboard
- Scope: 7 weeks, full stack (MongoDB → Express → React + Passport)

### **Architecture (How does it work?)**
- **Frontend:** React (Weeks 12–13) + Tailwind CSS
- **Backend:** Express + Mongoose (Weeks 10–11)
- **Auth:** Passport local + Google OAuth (Weeks 14–15)
- **Data Flow:** React fetch → Express route → MongoDB query → JSON response

### **Hardest Part (Google OAuth find-or-link-or-create)**
```
If googleId exists → return user (fast path)
Else if verified email matches local account → link them
Else → create new user
```
Why? Email verification prevents account hijacking.

### **If Asked "What Would You Improve?"**
Denormalize dashboard query: 3 round-trips → 1 aggregation pipeline = 60% latency cut.

---

## 📱 DEMO PATH (Two Apps, Two Terminals)

**Terminal 1 (start first):**
```bash
cd week12/term-project && npm run preview
# Runs on http://localhost:4173/
```

**Terminal 2 (start second):**
```bash
cd week14/term-project && npm start
# Runs on http://localhost:3000/
```

### **Browser Tabs to Bookmark:**

1. **Marketing page:** `http://localhost:4173/` (or Render URL)
   - Show: Hero, menu, Sound Bath section, real-time weather
   
2. **Login page:** `http://localhost:3000/login` (or Render URL)
   - Show: Local email form, Google OAuth button
   
3. **Dashboard:** `http://localhost:3000/admin/dashboard` (or Render URL)
   - Show: Chart.js reviews, property metrics, weather integration

---

## 💻 CODE FILE TO SHOW

**Primary Walk-through:**
- File: `week14/term-project/config/passport.js`
- Lines: 27–64
- What it does: Google OAuth verify callback (find-or-link-or-create)
- Why it's complex: Handles 3 identity scenarios + email verification + MongoDB writes

**Backup Files (if Q&A goes deep):**
- `week14/term-project/models/User.js` (bcrypt pre-hook)
- `week11/term-project/models/Property.js` (embedded reviews)
- `week12/term-project/src/components/WellnessWeatherSection.jsx` (React useEffect + API fetch)

---

## ❓ LIKELY Q&A ANSWERS (Cheat Sheet)

| Q | A (TL;DR) |
|---|-----------|
| Why embed reviews? | Fetched together, no need for $lookup, performance. |
| $elemMatch use case? | Filter on nested review fields: "properties with ≥4-star reviews" |
| Data flow React→Express→MongoDB? | fetch() → route handler → query → JSON response → setState → re-render |
| Passport verify callback logic? | Find by googleId → link to email match → create new user |
| Why bcrypt? | Computational cost (~100ms) makes cracking infeasible if database leaks. |
| Session persistence? | connect-mongo stores sessions in MongoDB; cookie holds sessionID; deserializeUser on each request. |
| If AI code? | "I reviewed every line. Here's what I modified: [point to specific change]." |

---

## ⏱️ TIMING CHECKLIST

- [ ] PRD opening: 0:00 (**stop at 0:05**)
- [ ] Problem statement: 0:05 (**stop at 0:35**)
- [ ] Live demo starts: 0:35
  - [ ] Marketing page scroll: 0:35–0:45
  - [ ] Click login: 0:45–1:15
  - [ ] Show dashboard: 1:15–1:45
- [ ] Code walk-through starts: 1:45 (**stop at 2:00**)
- [ ] Q&A opens: 2:00 (**answer for 2:00**)

**Target total: 4:50–5:00**

---

## 🧠 MINDSET

- ✅ You built this system from scratch over 7 weeks.
- ✅ All code compiles cleanly.
- ✅ You can explain every decision.
- ✅ Deployment is ready.
- ✅ Q&A is a conversation, not an interrogation.
- ✅ If you don't know something, say "That's a great question I'd need to research."

**Confidence > perfection.**

---

## 🎬 REHEARSE CHECKLIST (This Week)

- [ ] **Monday:** Record yourself. Listen back. Cut filler words.
- [ ] **Tuesday Morning:** Do a final run-through with timer.
- [ ] **Tuesday 4:00 PM:** Test Zoom mic, screen share, camera.
- [ ] **Tuesday 4:15 PM:** Open VS Code, PRD, browser tabs. Silence phone.
- [ ] **Tuesday 4:30 PM:** Join Zoom early. Test screen share once more.
- [ ] **Tuesday 4:35 PM:** You're live. Speak clearly. Own it. 🚀

---

## 📞 EMERGENCY CONTACTS (If Something Breaks)

- **Render deployment down?** Show local version: `npm install && npm start` at `http://localhost:3000`
- **VS Code won't open?** Have file paths memorized: "It's at week14/term-project/config/passport.js, lines 27 through 64."
- **Zoom freezes?** Rejoin quietly. You'll lose ~30 seconds but it's recoverable.
- **Forgot what you were saying?** Pause. Sip water. "Let me collect my thoughts." 3 seconds of silence is fine.

---

## ✨ FINAL WORDS

You've built a luxury hotel system with real-time weather, OAuth, and a full admin dashboard. That's **sophisticated full-stack engineering**. The rubric looks for:

- ✅ **Live Demo (2 pts):** Your site works. Just click through it.
- ✅ **Technical Explanation (1 pt):** Describe the architecture. You know this.
- ✅ **Code Walk-through (1 pt):** Explain Passport Google callback. Practiced.
- ✅ **Reflection (1 pt):** "I'd denormalize queries for speed." Honest answer.
- ✅ **AI Code (Bonus):** "Copilot drafted it; I reviewed and modified line X."

**You're ready. Trust your preparation. Show what you've built.** 🎉

---

**Questions? Review the full CODE_REVIEW_PREP.md or SPEAKER_NOTES.md files in your workspace.**
