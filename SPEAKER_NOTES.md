# Week 16 Code Review — Speaker Notes

**Duration:** 5 minutes (strict)  
**Date/Time:** Tuesday, May 5, 4:30 PM  
**Audience:** Instructor + classmates (Zoom)

---

## 🎯 SEGMENT 1: PRD HIGHLIGHTS (0:00–1:00)

### **What You'll Do**
- Open your final PRD (PDF)
- Show and speak to:
  1. Cover page / title
  2. Problem statement
  3. Target visitor segment
  4. Acceptance criteria table (from Week 15)

### **Script** (read naturally, don't memorize word-for-word)

*[Open PDF, show cover]*

> "Hi everyone. This is the **Kai Nani Hospitality Dashboard** — a full-stack web application for boutique hotels in Maui. The name **Kai Nani** means 'beautiful ocean' in Hawaiian, reflecting our focus on luxury waterfront properties.
>
> *[Point to problem statement]*
>
> The problem we're solving: Boutique hotels struggle to showcase properties and guest experiences in real-time. Potential visitors want personalized recommendations — for example, when should you book a spa moment? Our answer: **Sound Bath & Wellness recommendations based on live weather data.**
>
> *[Point to target segment]*
>
> We're targeting high-income leisure travelers, ages 35–65, who value wellness and luxury. They're willing to pay premium rates for curated experiences.
>
> *[Point to acceptance criteria table]*
>
> Over seven weeks, we went from a MongoDB data model in Week 10, to REST APIs in Week 11, a React marketing site in Week 12, a dashboard with analytics in Week 13, and local + Google OAuth authentication in Weeks 14 and 15. By Week 15, all acceptance criteria passed: public marketing page, protected admin dashboard, local sign-in, Google OAuth, session persistence, and environment security."

**Duration:** ~60 seconds

---

## 🎬 SEGMENT 2a: LIVE DEMO (1:00–2:00)

### **Pre-Demo Checklist**
- [ ] Terminal 1 running: `cd week12/term-project && npm run preview` (port 4173)
- [ ] Terminal 2 running: `cd week14/term-project && npm start` (port 3000)
- [ ] Browser has three tabs ready:
  - Tab 1: `http://localhost:4173/` (marketing page)
  - Tab 2: `http://localhost:3000/login` (login page)
  - Tab 3: Ready to show dashboard after login
- [ ] Network tab in DevTools closed (don't show technical noise)
- [ ] Phone ready to show mobile view if asked
- [ ] Do NOT share password / API keys during demo

### **Demo Path: Visitor Journey**

#### **Part 1: Public Marketing Site (0:20)**
*URL: `http://localhost:4173/` (or your Render deployment)*

> "Let me walk you through a visitor's journey. First, they land on the public home page."
>
> *[Open browser tab 1, navigate to marketing site, scroll slowly through hero section]*
>
> "We see a luxury header with a hamburger menu [click menu], which opens a full-screen overlay with navigation to Stays, Experiences, Dining, and Wellness. [Close menu.] Below, the hero section showcases the property with a call-to-action 'Book a Stay.'
>
> *[Scroll to Sound Bath & Weather Wellness section]*
>
> This is our signature feature — real-time Sound Bath & Weather Wellness recommendations. [Point to current weather card] It's fetching live weather for Wailea right now: 72°F, light rain, calm wind. Based on these conditions, the system recommends [point to recommendation badge] 'Perfect 🌧️ — Rain Sound Bath Moment.' This is why we built this: combining data science with hospitality."

#### **Part 2: Login Flow (0:15)**
*URL: `http://localhost:3000/login` (or your Render deployment)*

> "Now a returning guest wants to access their dashboard. [Switch to browser tab 2, navigate to login page.] They see two options: local email/password sign-in [point] or Google OAuth. Let me sign in with my local email."
>
> *[Enter test credentials (e.g., test@example.com / password), submit]*
>
> "[Waiting for redirect…] Notice the session is being persisted to MongoDB via connect-mongo. Once authenticated, Passport serializes the user ID into a session cookie. The browser stores the session ID, and we're logged in."

#### **Part 3: Admin Dashboard (0:15)**
*URL: `http://localhost:3000/admin/dashboard` (or redirected after login)*

> "And we're in the protected dashboard. [Show chart] Here we see guest reviews visualized with Chart.js — a real-time breakdown of star ratings and review sentiment. Below, property metrics: occupancy rate, nightly rate, capacity. All of this is populated from MongoDB queries joined with external weather data from Open-Meteo API."

#### **Part 4: Logout (0:10)**
*Click logout button*

> "When we log out, the session is deleted from MongoDB, the cookie is cleared, and we're returned to the login page. The user is now unauthenticated."

**Duration:** ~60 seconds total

---

## 💻 SEGMENT 2b: CODE WALK-THROUGH (1:00–2:00)

### **Recommended Component: Google OAuth Verify Callback**

*[Switch to VS Code]*

> "Now let me show you the most complex piece of this system. This is the **Google OAuth verify callback** from our Passport configuration.
>
> *[VS Code: week14/term-project/config/passport.js, lines 27–64 visible]*
>
> When a visitor clicks 'Sign in with Google,' we're using the Passport GoogleStrategy. Google returns a profile object with the user's ID, email, and verification status. Here's the magic:
>
> *[Point to line 27]*
> 
> First, we check: **do we already have a user with this Google ID?** [Point to line 28–30] If yes, this is easy — they signed in with Google before. We return them immediately.
>
> *[Point to line 33–39]*
>
> If no, we check: **does their verified Google email match an existing local account?** This is crucial for security. We verify the email because if we didn't, a malicious actor could spoof someone else's email. If the email matches and is verified, we **link** the Google identity to the local account. [Point to line 36] We set `user.googleId = profile.id` and save. Now this user can sign in with either email/password OR Google.
>
> *[Point to line 42–49]*
>
> If neither condition matches, we **create a new user**. If Google didn't provide an email or it wasn't verified, we generate a placeholder email [point to line 45] so the user can still access their account.
>
> This is the **find-or-link-or-create** pattern — it unifies local and federated authentication."

**Key Talking Points** (if asked to clarify):
- **Why not link unverified emails?** Account hijacking risk. An attacker could claim someone else's email.
- **Why save after adding googleId?** Mongoose changes don't persist automatically; `.save()` commits to MongoDB.
- **Why placeholder email?** Some Google accounts (e.g., workspace accounts) don't expose email. We need a unique identifier in our database.

**Duration:** ~60 seconds

---

## ❓ SEGMENT 3: Q&A (2:00–4:00)

### **Likely Questions & Prepared Answers**

---

#### **Q1: "Why embed reviews as subdocuments rather than a separate collection?"**

> "Great question. In Week 11, we had to choose. Embedding means reviews live inside each Property document. Separate collection means Property and Review are linked via foreign key (ObjectId).
>
> We chose embedding because:
>
> 1. **Tight Coupling:** Reviews are always fetched together with the property. A guest never asks 'show me all reviews across all properties' — they want reviews *for a specific property.*
>
> 2. **Query Performance:** With embedding, we fetch the property and all its reviews in one query. With a separate collection, we'd need a `$lookup` aggregation, which is slower.
>
> 3. **Data Size:** Property reviews aren't huge (maybe 50–100 per property). If we had millions of reviews per property, we'd reconsider.
>
> The tradeoff: embedded reviews can't be indexed independently, and updating one review requires re-saving the entire property document. But for our use case, the benefits outweigh the costs."

---

#### **Q2: "What MongoDB query operators did you implement?"**

> "In Week 11, we built a filtering system using three operators:
>
> - **`$gte` and `$lte`**: 'Get me properties with star rating between 4 and 5.' We query `starRating: { $gte: 4, $lte: 5 }`.
>
> - **`$elemMatch`**: 'Get me properties that have at least one review with a rating ≥ 4.' We query `reviews: { $elemMatch: { rating: { $gte: 4 } } }`. This is powerful because it filters on nested subdocument fields.
>
> These operators form the backbone of our dashboard filters."

---

#### **Q3: "How does data flow from your Express API to the React dashboard?"**

> "Good question. Here's the full stack:
>
> 1. **React Component Mount:** In Week 13, we built `DashboardPage.jsx`. On component mount, `useEffect` runs.
>
> 2. **Fetch from API:** `useEffect` calls `fetch('/api/admin/stats')`, which makes an HTTP GET request to our Express server.
>
> 3. **Express Route Handler:** In `week14/term-project/routes/admin.js`, the route handler queries MongoDB for properties, guest reviews, and average ratings.
>
> 4. **Database Query:** `Property.find()` returns documents from MongoDB, with reviews embedded.
>
> 5. **Response:** The handler sends JSON back to React.
>
> 6. **React State Update:** `fetch().then(res => res.json()).then(data => setDashboardData(data))`. React updates state.
>
> 7. **Re-render:** The component re-renders with the new data. Chart.js reads the state and re-renders the visualization.
>
> The flow is: **Browser → Fetch → Express → MongoDB → JSON Response → React State → Chart.js UI**."

---

#### **Q4: "What happens in your Passport verify callback if a Google email is unverified?"**

> "We don't link it. We create a new user with a generated placeholder email: `google_[profile.id]@placeholder.invalid`. 
>
> Why? **Account hijacking.** If we linked unverified emails, an attacker could sign up for Google with someone else's email (and never verify it), then claim their account on our platform. By requiring verified emails, we ensure only the legitimate owner can link their Google account to an existing local account."

---

#### **Q5: "Why bcrypt instead of plaintext passwords?"**

> "Bcrypt adds computational cost. We use 10 salt rounds, which means each password hash takes ~100 milliseconds to compute. Why is this good?
>
> If our MongoDB database leaks (worst case), an attacker has password hashes, not plaintext. They can't use them directly. To crack a password, they'd need to:
>
> 1. Guess a password candidate ('password123')
> 2. Hash it with bcrypt (100 ms)
> 3. Compare to the leaked hash
> 4. Repeat for millions of candidates
>
> At 100 ms per guess, cracking even a weak password takes hours or days — not seconds. Plaintext offers no such protection."

---

#### **Q6: "How does session persistence work?"**

> "We use `connect-mongo`, which stores serialized sessions in MongoDB. Here's the flow:
>
> 1. **Login:** User submits email/password. Passport's LocalStrategy verifies. Passport calls `serializeUser(user, done)`, which stores `user.id` (not the whole user object) in the session.
>
> 2. **Session Storage:** `connect-mongo` takes the session data and stores it in MongoDB's `sessions` collection with a TTL (time-to-live). Example document: `{ sessionID: '...', session: { passport: { user: '507f...' } }, expires: ... }`
>
> 3. **Session Cookie:** Express sets a cookie in the browser: `connect.sid=...`. (The value is the sessionID.)
>
> 4. **Next Request:** Browser sends the cookie. Express middleware extracts it, looks up the session in MongoDB, and passes the session to `deserializeUser(id, done)`, which fetches the full User from MongoDB and attaches it to `req.user`.
>
> 5. **Logout:** We call `req.logout()` and `req.session.destroy()`, which deletes the session from MongoDB and clears the cookie."

---

#### **Q7: "What would you improve with more time?"**

> "The dashboard query. Right now, fetching a guest's profile + their properties + all reviews involves three MongoDB round-trips:
>
> 1. `User.findById(userId)`
> 2. `Property.find({ userId })`
> 3. `Review.aggregate([{ $match: { propertyId: ... } }])`
>
> With more time, I'd use MongoDB's `$lookup` aggregation operator to join all three collections in a single query. Or I'd denormalize — store a summary of reviews (count, avg rating) directly in the Property document. This would cut latency by 60%."

---

#### **Q8 (If Asked About AI Code):** "Can you explain the Passport local strategy?"

> "Absolutely. This is where AI helped but I fully understand it.
>
> *[Point to relevant lines in passport.js]*
>
> GitHub Copilot drafted the skeleton using Passport docs patterns. I reviewed and modified:
>
> - **Email normalization:** I added `.trim().toLowerCase()` to prevent case-sensitivity bugs. 'User@example.com' and 'user@example.com' must be treated as the same account.
>
> - **Error messages:** I made them intentionally vague ('Invalid email or password') so attackers can't guess valid emails. If we said 'Email not found,' that's a giveaway.
>
> - **Promise handling:** I ensured `.comparePassword()` returns a Promise (via bcrypt.compare), so we properly `await` it.
>
> Every line, I can defend."

---

## 🎓 REFLECTION (If Time Permits or Asked)

> "Here's my honest reflection: I would denormalize the dashboard query. Fetching properties + reviews + metrics involves three database round-trips, adding latency. With more time, I'd implement a MongoDB view that pre-joins Property ← Review ← User, or use `$facet` aggregation to fetch all three in one query. This would improve page load time from ~800ms to ~300ms.
>
> Also: I'd add Redis for session caching. Right now every request deserializes the session from MongoDB. Redis would be faster."

---

## ⏱️ TIMING NOTES

- **PRD Highlights:** ~50–60 seconds (leaves 10-sec buffer)
- **Live Demo:** ~55–65 seconds (1 min total, leaves buffer for slow page loads)
- **Code Walk-through:** ~50–60 seconds
- **Q&A:** ~100 seconds (most of the 2 minutes)
- **Reflection:** ~30 seconds (if time)

---

## 🔍 PRACTICE CHECKLIST

- [ ] Record yourself on your phone. Listen back for:
  - Filler words ("um," "uh," "like")
  - Rushed speech (slow down 10%)
  - Stumbles over technical terms (practice pronunciation)
- [ ] Rehearse with slides/code visible. Don't just read notes.
- [ ] Time yourself. Aim for 4:30–4:50. Under 5:00.
- [ ] Get Q&A prompts from classmates if possible. Practice answers.
- [ ] Zoom test:
  - [ ] Screen share works (try sharing entire screen + application window)
  - [ ] Microphone clear (no background noise)
  - [ ] Camera working
  - [ ] Internet stable (plug in ethernet if possible)

---

## 🚀 MOMENT-OF-TRUTH CHECKLIST (Tuesday 4:30 PM)

- [ ] Zoom room open and working
- [ ] Firefox/Chrome with tabs bookmarked (marketing page, dashboard, login)
- [ ] VS Code open with `week14/term-project/config/passport.js` visible, scrolled to line 27
- [ ] PDF reader open to your PRD
- [ ] Water bottle nearby (don't talk with a dry throat)
- [ ] Calm energy. You know this material. You built this. Be confident.

---

## 💡 LAST-MINUTE TIPS

1. **Speak Clearly:** Pause between sentences. Don't rush.
2. **Eye Contact:** Look at the camera, not the screen.
3. **Silence is OK:** If you need 2 seconds to think before Q&A, that's fine. Better than "um."
4. **If Something Breaks:** "Let me reboot that quickly." You have 5 minutes of grace; use it wisely.
5. **Be Honest:** If you don't know the answer to a Q&A question, say "That's a great point I didn't anticipate. I'd need to research that." Honesty > bluffing.

---

**You've built a sophisticated full-stack system across seven weeks. That's rare at this level. Go in with confidence.** 🎉

---

**Questions before Tuesday? Review the CODE_REVIEW_PREP.md file in the workspace for the full inventory and file structure.**
