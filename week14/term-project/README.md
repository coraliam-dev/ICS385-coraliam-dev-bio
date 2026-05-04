# Kai Nani Hospitality Dashboard

Live URL: https://yourapp.onrender.com  (replace with your Render or other host URL before final submission)

Three-page Hawaii hospitality dashboard with public marketing, protected admin access, and local plus Google authentication.

## Setup
- Clone the repo and open `week14/term-project`.
- Run `npm install`.
- Copy `.env.example` to `.env` and set `MONGO_URI`, `SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_CALLBACK_URL`.
- Start locally with `npm start`.

## Stack
- Node.js, Express, EJS, MongoDB, Mongoose
- Passport local strategy + Google OAuth 2.0
- connect-mongo for session persistence
- Helmet and express-validator for security hardening
- Jest and Supertest for integration testing

## AI Tools Used
- GitHub Copilot / GPT-5.4 mini — used to draft and refactor the auth bootstrap, tests, and README structure.
- I can explain every generated or modified code path in this repository.

## Acceptance Criteria Results
| AC | Result | Notes |
| --- | --- | --- |
| AC-1 | Pass | Public home page renders at `/`. |
| AC-2 | Pass | Authenticated dashboard renders at `/admin/dashboard`. |
| AC-3 | Pass | Local registration flow remains supported by the user model and seeding path. |
| AC-4 | Pass | Local sign-in redirects to `/dashboard`. |
| AC-5 | Pass | Google OAuth creates or links a user with `googleId` and `provider='google'`. |
| AC-6 | Pass | Unauthenticated dashboard requests redirect to `/login`. |
| AC-7 | Pass | Logout clears the session and returns the user to `/login`. |
| AC-8 | Pass | `.env` is ignored and `.env.example` is committed. |

## Test Output
- Test screenshot: `screenshots/npm-test.png` (capture the `npm test` run before submission).
- Existing screenshots: `screenshots/screenshot-login.png`, `screenshots/screenshot-dashboard.png`, `screenshots/screenshot-atlas-user-hash.png`.

## Notes
- `models/User.js` stores local and federated identities with optional passwords for Google-only accounts.
- `config/passport.js` implements the find-or-link-or-create Google account rule.
- `routes/auth.js` serves both `/login` and the `/admin/login` alias.
