Authentication & dev notes

- Start server and tail logs:

```bash
cd week14/term-project
npm run dev:reset
```

- Clear stale sessions (uses `.env` MONGODB_URI if present):

```bash
mongosh "mongodb://127.0.0.1:27017/ics385_week14" --eval 'db.sessions.deleteMany({})'
```

- Disable CSRF temporarily for troubleshooting (NOT recommended for production):

Edit `week14/term-project/.env` and set:

```
DISABLE_CSRF=true
```

Then restart:

```bash
npm run dev:reset
```

- Rollback: revert `server.js` to re-enable the temporary exemption if needed (git can be used to reset).

- Notes: CSRF is now enforced for the login POST; ensure you test in a fresh Incognito/Private window and clear cookies if you see "invalid csrf token" errors.
