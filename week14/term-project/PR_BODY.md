Title: Add admin authentication, seeding, and DB hardening

Summary

This branch (feature/admin-auth) implements an admin login using Passport.js LocalStrategy, session persistence via `connect-mongo`, bcrypt-hashed passwords, CSRF protection (cookie-based), and seed scripts to create an admin user and a sample property (`Kai Nani`). It also hardens MongoDB connection handling to reduce transient buffering/timeouts when using Atlas.

Key changes

- Added `models/User.js` (bcrypt pre-save + compare)
- Added `routes/auth.js` and `routes/admin.js` with EJS views under `views/admin`
- Added session store via `connect-mongo` and CSRF using `csurf` (cookie-based)
- Added seed scripts: `seed-admin.js` and `seed-properties-fixed.js`
- Hardened `server.js` to add connect retries/backoff, connection tuning, and `/healthz` endpoint
- Added `RUN_SEED.md` with run & seed instructions

Testing & validation

1. Start server and clear sessions:

```bash
cd week14/term-project
npm run dev:reset
```

2. Seed admin and properties:

```bash
npm run seed-admin
node seed-properties-fixed.js
```

3. Open http://localhost:3000/admin/login in a fresh Incognito window and sign in with `admin@example.com` / `changeme`.

Notes / Caveats

- CSRF is enabled by default; to temporarily disable it for debugging set `DISABLE_CSRF=true` in `.env` and restart.
- If you plan to run on Atlas, ensure Network Access whitelist contains your IP and set `MONGODB_URI` accordingly.

Next steps

- Optionally tune mongoose pool sizes and socket timeouts via env vars (`MONGO_MAX_POOL`, `MONGO_MIN_POOL`, `MONGO_HEARTBEAT_MS`).
- Add more admin functionality (CRUD) and require admin role checks for routes.
