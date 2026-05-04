Week 14 — Admin Login (Passport.js)

Setup
- Copy `.env.example` to `.env` and set `SESSION_SECRET` and `MONGODB_URI` (do not commit `.env`).
- Optionally set `ADMIN_EMAIL` (default in `.env.example`) — do NOT include the password in the README or repo.
- Install and seed:

```bash
cd week14/term-project
npm install
cp .env.example .env
# edit .env for SESSION_SECRET and MONGODB_URI
npm run seed-admin   # creates admin user using ADMIN_EMAIL (reads ADMIN_PASSWORD from .env)
node server.js
```

Notes
- The admin login is at `/admin/login`. The dashboard is `/admin/dashboard` and is protected by `middleware/isAuthenticated.js`.
- Passwords are hashed with bcrypt (10 salt rounds) in `models/User.js` (pre-save hook). The seeded admin account is created by `seed-admin.js`.
- `.env.example` is committed; `.env` is ignored by `.gitignore`.

Reflection — Passport.js challenge

Integrating Passport.js required matching how sessions and the authentication flow are ordered: session middleware must be registered before `passport.initialize()` and `passport.session()`, and CSRF tokens require an active session. My first automated login attempts failed due to CSRF token handling (token rendered with line breaks when fetched programmatically). I fixed this by sanitizing the rendered token and verifying the CSRF/session ordering; for local testing I briefly allowed disabling CSRF, then re-enabled it and verified the flow in the browser. The experience reinforced that middleware order and exact cookie/token exchange are critical for session-based auth.
