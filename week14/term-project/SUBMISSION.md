Submission for Week 14

GitHub commit: (see below for direct link)

Screenshots (attach these when submitting):
1. `screenshot-login.png` — Browser view showing the login page (`/admin/login`).
2. `screenshot-dashboard.png` — Admin dashboard after successful login showing the seeded property.
3. `screenshot-atlas-user-hash.png` — MongoDB Atlas Collections view showing the `users` document with a bcrypt hashed `password` field.

Reflection (3–5 sentences):
Integrating Passport.js revealed a session/CSRF mismatch problem caused by stale session cookies and the app's CSRF protection. I resolved it by switching to cookie-based CSRF tokens, adding middleware to clear stale `connect.sid` cookies, and making sure `csurf` is mounted after `cookie-parser` and sessions. While testing on MongoDB Atlas I also encountered intermittent Mongoose buffering timeouts; I mitigated this by adding connection tuning, retries/backoff, and using the native driver for a critical read route when necessary. These changes made login and the admin dashboard reliably available during local and Atlas testing.

Run & seed checklist

```bash
cd week14/term-project
npm run dev:reset
npm run seed-admin
node seed-properties-fixed.js
```

Notes
- Admin credentials created by the seeder: `admin@example.com` / `changeme`.
- To temporarily disable CSRF while debugging, set `DISABLE_CSRF=true` in `.env` and restart.
