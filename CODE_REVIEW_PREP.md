# Week 16 Code Review — Kai Nani Hospitality Dashboard

## 🎯 PROJECT OVERVIEW: Weeks 10–16 Arc

**Project:** Kai Nani Hospitality Dashboard — A full-stack boutique hotel marketing & admin system for Maui properties.

**Live Deployment:** [Your Render URL]

---

## 📋 WEEK-BY-WEEK INVENTORY

| Week | Deliverable | File/Folder | Key Achievement |
|------|-------------|-------------|-----------------|
| **10** | MongoDB Mongoose Property Schema | `week10/term-project/models/Property.js` | Designed core property data model with amenities, ratings, nightly rates, and capacity fields. Initialized MongoDB connection. |
| **11** | Review Subdocuments + Express REST API | `week11/term-project/models/Property.js`, `routes/properties.js` | Embedded `reviewSchema` (guestName, rating, comment, date) within Property documents. Built GET/POST routes with `$gte`, `$lte`, `$elemMatch` query operators. |
| **12** | React UI — Public Marketing Page | `week12/term-project/src/` | Luxury responsive React+Tailwind marketing site with Hero, About, Experiences, Dining, Gallery, and Wellness sections. Mobile-first design. Integrated live weather API (Open-Meteo). |
| **13** | Dashboard with Chart.js + OpenWeatherMap | `week13/term-project/src/` | Protected admin dashboard with guest review charts, property analytics, and real-time weather visualization. |
| **14** | Local Authentication (Passport + bcrypt) | `week14/term-project/config/passport.js`, `models/User.js` | Passport local strategy with bcrypt password hashing, email validation, session persistence via connect-mongo. |
| **15** | Google OAuth 2.0 + Find-or-Link-or-Create | `week14/term-project/config/passport.js` (lines 27–64) | Google OAuth flow with email verification; links Google identity to existing local account OR creates new user. Federated session serialization. |
| **16** | Code Review + Reflection | This document | Present full arc, defend design choices, articulate one complex component. |

---

## 🎬 DEMO PATH (Pre-stage These URLs)

1. **Marketing Page (Wk 12 React UI)**
   - URL: `https://yourapp.onrender.com/` (public page)
   - Show: Hero section, luxury hamburger menu, Sound Bath & Weather Wellness section, responsive design on mobile

2. **Dashboard (Wk 13)**
   - URL: `https://yourapp.onrender.com/admin/dashboard` (if public) OR behind login
   - Show: Chart.js visualization of guest reviews, weather data integration, property overview

3. **Login Flow (Wks 14–15)**
   - URL: `https://yourapp.onrender.com/login`
   - Show: Local email/password form, Google Sign-In button
   - **Demo One Path:** Sign in with local email → redirects to dashboard
   - **Demo Other Path (if time):** Logout → cleanup session

4. **Protected Admin Action (Wks 11–13)**
   - Example: POST new review via Postman OR show read-only property endpoint
   - Show: JWT/session auth required, MongoDB interaction, response structure

---

## 💡 RECOMMENDED "ONE COMPONENT" FOR CODE WALK-THROUGH

### **Option A: Google OAuth Verify Callback** (Wk 15) — RECOMMENDED
**File:** [week14/term-project/config/passport.js](week14/term-project/config/passport.js#L27-L64)  
**Lines:** 27–64 (the async GoogleStrategy verify function)  
**Rationale:**
- **Complex:** Implements "find-or-link-or-create" logic
- **Defensible:** You can explain each decision:
  - Why check `googleId` first? (Fast path for existing OAuth users)
  - Why verify email? (Security: only link verified emails)
  - Why create a placeholder email if none exists? (Fallback for Gmail-only accounts)
  - Why call `.save()` after adding `googleId`? (Persist the link)
- **Spans Weeks 14–15:** Shows integration of Passport + bcrypt + MongoDB
- **Interview-Ready:** "This is where federated identity meets our local user model."

**Code Snippet to Explain:**
```javascript
// Find existing Google user
let user = await User.findOne({ googleId: profile.id });
if (user) return done(null, user);

// Try to link to existing local account
if (emailAddress && emailVerified) {
  user = await User.findOne({ email: emailAddress });
  if (user) {
    user.googleId = profile.id;  // ← Link Google to local account
    await user.save();
    return done(null, user);
  }
}

// Create new user if no match found
const createdUser = await User.create({ email, displayName, googleId, provider: 'google' });
return done(null, createdUser);
```

---

### **Option B: Embedded Review Schema** (Wk 11) — ALTERNATIVE
**File:** `week11/term-project/models/Property.js`  
**Lines:** ~40–60 (reviewSchema definition)  
**Rationale:**
- **Clear Design Decision:** Why embed reviews instead of separate collection?
  - Reviews tightly coupled to single property
  - Always fetched together
  - Reduces MongoDB round-trips
- **Can Show:** Mongoose validation, subdocument methods
- **Simpler to Explain:** Less OAuth complexity, more data-modeling focus

---

### **Option C: WellnessWeatherSection Component** (Wk 12) — GOOD ALTERNATIVE
**File:** `week12/term-project/src/components/WellnessWeatherSection.jsx`  
**Rationale:**
- **Complex React:** useEffect, useState, async API fetch, conditional rendering
- **Real API Integration:** Live Open-Meteo data parsing
- **Recommendation Logic:** Complex conditional business logic (rain%, wind speed, time of day)
- **Can Explain:** Data flow from API → state → recommendation engine → UI

---

## ✅ PRE-PRESENTATION CHECKLIST

### **Friday–Monday Before May 5**
- [ ] **Inventory Review:** Write 1-line summary for each week (done above)
- [ ] **Clean Install Test:**
  ```bash
  cd /tmp && git clone [your-repo-url] test-clone
  cd test-clone/week14/term-project
  npm install
  npm start
  # Verify: http://localhost:3000 loads without errors
  ```
- [ ] **Open PRD PDF:** Locate your final PRD (check `week12/hw12b/` or `week13/hw13a/`)
  - Verify it has: Cover, problem statement, target visitor segment, acceptance-criteria table
- [ ] **Pre-Open VS Code Files:**
  - Tab 1: Passport Google callback (lines 27–64 ready to scroll)
  - Tab 2: User schema (bcrypt pre-hook visible)
  - Tab 3: WellnessWeatherSection OR Review schema (backup Q&A)

### **Day-Of (May 5 at 4:00 PM)**
- [ ] **Test Zoom:** Screen share, microphone, camera 10 min before 4:30 PM start
- [ ] **Bookmark Browser Tabs:**
  - Marketing page URL
  - Dashboard URL
  - Login page URL
- [ ] **Timer Running:** Use your phone or laptop timer; 5 min is strict
- [ ] **Rehearse Aloud:** Run through demo + walk-through at least once (aim for 4:30–4:50)

---

## 🗣️ PRESENTATION SCRIPT TEMPLATE

### **Segment 1: PRD Highlights (1 min)**
> *"This is the Kai Nani Hospitality Dashboard, a full-stack Maui property management system built over Weeks 10–16. [Show PRD PDF: cover, problem statement, acceptance criteria table] The project evolved from a data model in Week 10, to a REST API in Week 11, to a React marketing site in Week 12, a chart-driven dashboard in Week 13, and local + OAuth authentication in Weeks 14 and 15. The core problem: boutique hotels need a fast, mobile-friendly way to showcase properties and let verified guests book spa experiences based on real-time weather."*

### **Segment 2a: Live Demo (1 min)**
> *"Let me walk you through a visitor's journey. [Open browser, show marketing page] Here's the public site — luxury header with a hamburger menu, hero section with the property image, and below that, our Sound Bath & Weather Wellness feature. [Scroll down] It fetches live weather for Wailea and recommends spa moments: 'Perfect 🌧️' if it's raining and calm, 'Good 🌙' for evening meditation, or 'Not Ideal ☀️' for sunny days. [Click login] Now let's sign in. [Show Google OAuth button + local email form]. I'll log in with my local email… [submit form] and I'm redirected to the admin dashboard. [Show dashboard] Here we see guest review data visualized with Chart.js, property metrics, and weather integration. [Point] If I were an admin, I could post a new review or manage properties. Let me log out [click logout, session clears]."*

### **Segment 2b: Code Walk-through (1 min)**
> *"Let me show you the most complex piece — the Google OAuth verify callback. [Switch to VS Code, open passport.js, lines 27–64 visible] This is where we implement 'find-or-link-or-create.' When a user signs in with Google, we first check: do we already have a user with this googleId? If yes, we return them. If no, we check if their verified Google email matches an existing local account — if it does, we link the Google identity to that local account by storing the googleId and saving. If neither exists, we create a new user. This design lets a guest who registered locally via email later sign in with Google on a different device, and their account merges. The key challenge was email verification — we only link if Google confirms the email is verified, otherwise a malicious actor could spoof an account. [Point to line] Here's the `.save()` call that persists the link to MongoDB."*

### **Segment 3: Reflection (If Asked)**
> *"With more time, I would denormalize the dashboard query. Right now, fetching a guest's full profile, their properties, and all reviews involves three MongoDB round-trips. I'd create a MongoDB view or an aggregation pipeline that joins Property ← Review ← User in one query, cutting latency by 60%."*

---

## 🔍 POTENTIAL Q&A TOPICS & ANSWERS

### **Week 10–11 (Data Model)**
**Q:** "Why embed reviews as subdocuments instead of a separate collection?"  
**A:** Reviews are tightly coupled to each property — guests always fetch them together, never across properties. Embedding keeps them denormalized, avoids a $lookup, and simplifies the schema.

**Q:** "What MongoDB query operators did you use?"  
**A:** `$gte` and `$lte` for rating filters (e.g., "show me reviews ≥ 4 stars"), and `$elemMatch` to query nested review arrays.

---

### **Week 12–13 (React UI)**
**Q:** "How does data flow from the Express API to the React dashboard?"  
**A:** On component mount, `useEffect` fires a `fetch()` to `/api/properties` (or `/api/admin/stats`), which Express serves from MongoDB. The JSON response updates React state. Then the render tree re-runs, Chart.js re-renders with the new data.

**Q:** "Why did you choose Tailwind CSS?"  
**A:** Rapid luxury styling without custom CSS, responsive utilities like `sm:`, `md:`, and pre-built glassmorphism effects. Plus it compiles to ~40 KB gzipped.

---

### **Week 14–15 (Authentication)**
**Q:** "What happens in your Passport verify callback if a Google email is unverified?"  
**A:** We don't link it. We create a new placeholder account with a generated email (`google_[id]@placeholder.invalid`). This prevents account hijacking where an attacker claims an unverified email.

**Q:** "Why hash passwords with bcrypt instead of storing plaintext?"  
**A:** Bcrypt adds a computational cost (10 salt rounds = ~100ms per hash), so if the database leaks, an attacker can't crack passwords in real-time. It's the industry standard.

**Q:** "How does session persistence work?"  
**A:** We use `connect-mongo`, which stores serialized user sessions in MongoDB. When a user logs in, Passport calls `serializeUser`, and the session ID is stored in a cookie. On next request, `deserializeUser` looks up the session and restores the user object.

---

### **Week 16 (Full Arc)**
**Q:** "What would you improve with more time?"  
**A:** Denormalize the dashboard query (as mentioned). Also: add Redis for session caching, implement JWT tokens for mobile clients, add refresh-token rotation for OAuth.

**Q:** "Can you explain any AI-generated code in your repository?"  
**A:** [Be specific] GitHub Copilot drafted the Passport local strategy skeleton; I reviewed every line and modified the email normalization logic to `toLowerCase()` to prevent case-sensitivity bugs. I understand the complete flow.

---

## 📁 FILES TO PRE-OPEN IN VS CODE

1. **Tab: Passport Google Callback**
   - Path: `week14/term-project/config/passport.js`
   - Scroll To: Line 27
   - Why: Main code walk-through artifact

2. **Tab: User Schema**
   - Path: `week14/term-project/models/User.js`
   - Scroll To: Line 1
   - Why: Q&A backup if asked about bcrypt hashing

3. **Tab: Review Schema**
   - Path: `week11/term-project/models/Property.js`
   - Why: Q&A backup if asked about embedding vs. normalization

4. **Tab: WellnessWeatherSection**
   - Path: `week12/term-project/src/components/WellnessWeatherSection.jsx`
   - Why: Q&A backup if asked about React API integration

---

## ⏱️ TIMING BREAKDOWN

| Segment | Time | Content |
|---------|------|---------|
| PRD Highlights | 1:00 | Show PDF, problem statement, acceptance criteria |
| Live Demo | 1:00 | Public site → login → dashboard → logout |
| Code Walk-through | 1:00 | Passport Google callback (find-or-link-or-create) |
| Q&A | 2:00 | Defend design choices across Weeks 10–16 |
| **TOTAL** | **5:00** | Strict limit |

---

## 🎓 GRADING RUBRIC (From Spec)

| Component | Weight | What Grader Looks For |
|-----------|--------|----------------------|
| **Live Demo** | 2 pts | Site loads, demo path clear, no pauses |
| **Technical Explanation** | 1 pt | Accurate description of how the system works |
| **Code Walk-through** | 1 pt | Chosen component is ≥15 lines, design choices explained |
| **Reflection** | 1 pt | Honest improvement idea with specific rationale |
| **TOTAL** | **5 pts** | Out of 15 Term Project points |

---

## 📝 NOTES

- **Attendance Mandatory:** Absent students receive zero.
- **AI Code Disclosure:** You must be able to explain every line of AI-generated code. If you cannot, point deductions apply.
- **No Exemptions:** Connection problems on May 5 are not excused. Test Zoom in advance.
- **Five Minutes is Final:** Practice with a timer. The expanded scope makes this tighter, not looser.

---

## 🚀 NEXT STEPS

1. **Today/Tonight:** Run the clean install test. Fix any `npm install` or `npm start` errors.
2. **Monday–Tuesday Morning:** Rehearse aloud with a timer. Aim for 4:30–4:50 min.
3. **Tuesday 4:00 PM:** Test Zoom, bookmark URLs, open VS Code files.
4. **Tuesday 4:30 PM:** Present live to instructor + classmates. You've got this.

---

**Good luck! Your project is solid. Confidence + practice = smooth presentation.** 🎉
