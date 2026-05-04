Run & seed quick notes

From the project root (week14/term-project):

```bash
# restart the server and clear sessions
npm run dev:reset

# ensure admin exists (seed admin user)
npm run seed-admin

# seed sample properties (inserts Kai Nani)
node seed-properties-fixed.js

# run quick DB diagnostics (native vs mongoose checks)
node scripts/test-db.js
```

If you hit CSRF or session issues, open a fresh Incognito window and retry. To temporarily disable CSRF for debugging, set `DISABLE_CSRF=true` in `.env` and restart.
