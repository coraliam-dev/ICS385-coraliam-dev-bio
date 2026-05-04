const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kai Nani Hospitality Dashboard</title>
        <style>
          body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(180deg,#f7fbfa,#eef6f4);color:#17332d;padding:24px}
          main{max-width:760px;background:#fff;border:1px solid rgba(11,107,82,.08);border-radius:20px;padding:32px;box-shadow:0 16px 40px rgba(10,30,20,.08)}
          a{color:#0b6b52;font-weight:700;text-decoration:none}
          .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
          .button{display:inline-block;padding:12px 18px;border-radius:999px;background:#0b6b52;color:#fff}
          .ghost{background:#fff;color:#0b6b52;border:1px solid rgba(11,107,82,.16)}
        </style>
      </head>
      <body>
        <main>
          <p style="text-transform:uppercase;letter-spacing:.12em;color:#0b6b52;font-size:.82rem">Kai Nani</p>
          <h1>Hawaii Hospitality Dashboard</h1>
          <p>Public marketing page for the term project. Use the authenticated dashboard to review property records and admin-only data.</p>
          <div class="actions">
            <a class="button" href="/login">Sign in</a>
            <a class="button ghost" href="/dashboard">Open dashboard</a>
          </div>
        </main>
      </body>
    </html>`);
});

  // Convenience route: forward /dashboard to the protected admin dashboard
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) return res.redirect('/admin/dashboard');
    return res.redirect('/login');
  });

module.exports = router;