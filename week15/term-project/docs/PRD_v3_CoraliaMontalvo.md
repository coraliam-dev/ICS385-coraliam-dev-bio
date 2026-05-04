# Kai Nani Term Project PRD v3

**Document version:** v3 — May 3, 2026  
**Author:** Coralia Montalvo  
**Project Name:** Kai Nani  
**Location:** Maui  
**Target Audience:** Luxury wellness travelers, honeymooners, and those seeking a restorative Maui stay.  
**GitHub Repository:** https://github.com/coraliam-dev/ICS385-coraliam-dev-bio  
**Live Deployment:** Pending

---

## 1. Project Overview

Kai Nani is a Maui-based luxury wellness property experience designed to appeal to travelers seeking relaxation, scenic beauty, and a restorative stay. The project’s public-facing site should communicate the property’s premium amenities clearly, while the administrative side should remain secure and limited to authenticated users.

## 2. Problem Statement

Kai Nani requires a polished public experience that allows visitors to quickly understand the property’s premium amenities and its suitability for a Maui wellness or romantic getaway. Additionally, the project needs a secure administrative interface where owners or reviewers can access property data, verify the dashboard, and manage future content without exposing internal tools to the public.

## 3. Target User Personas

- **Primary:** Travelers planning a high-end Maui stay, focusing on wellness, scenery, and a calm experience.
- **Secondary:** Property administrators and reviewers who need to manage data and verify site performance.

## 4. Functional Requirements

### Public & User Features

- **R1. Public Marketing Page:** The home page shall present the Kai Nani brand, high-quality hero imagery, and a concise summary of the property.
- **R2. Property Details:** The public page shall surface at least three core amenities and a short description of the Maui offering.
- **R3. Protected Admin Dashboard:** The authenticated dashboard shall display three Chart.js visualizations with non-empty data for guest or property summaries.

### Security & Authentication

- **R4. Local Account Creation:** The application shall allow a user to register with email and password, storing the password as a bcrypt hash. [New in v3]
- **R5. Local Sign-in:** The application shall allow existing users to sign in with email/password and create an authenticated session.
- **R6. Google Sign-in:** The application shall allow sign-in via Google OAuth 2.0 through Passport. [New in v3]
- **R7. Protected Admin Access:** The admin dashboard at `/admin/dashboard` and all future admin CRUD routes shall require authentication before rendering.
- **R8. Logout:** The application shall clear the user session and return the browser to the login page.

### Developer Hygiene

- **R9. Secret Hygiene:** The repository shall keep secrets out of version control by using `.env` and providing a committed `.env.example`.

## 5. Technical Architecture

**Stack:** Node.js, Express, EJS, MongoDB, Passport, Chart.js

### Request Flow

1. Browser → Express app / routes
2. Authentication → Passport (local or Google OAuth)
3. Session Management → express-session + connect-mongo
4. Database → MongoDB (users / properties collections)
5. View Layer → EJS views + Chart.js dashboards

The public experience uses Express and EJS to render the marketing page. Authentication is handled by Passport with session persistence in MongoDB, while the admin dashboard visualizations are rendered with Chart.js after the authenticated user is loaded from the session.

### 5.1 OAuth 2.0 Support

The application supports Google OAuth 2.0 for authentication using the `passport-google-oauth20` strategy. Google client credentials are stored in environment variables (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) and never committed. The OAuth callback URL is configured via `GOOGLE_CALLBACK_URL`.

On successful Google sign-in, the app performs a **find-or-link-or-create** flow:

- If a user exists with the same `googleId`, the user signs in.
- If an existing local account shares the same email, the account is linked after email verification.
- Otherwise, a new user document is created with `provider='google'` and the Google profile identifier stored as `googleId`.

### OAuth 2.0 Questions and Answers

1. **Which provider is used?** Google OAuth 2.0 via `passport-google-oauth20`.
2. **Where are secrets stored?** In `.env`, with a checked-in `.env.example` for reference.
3. **Which scopes are requested?** `profile` and `email`.
4. **What user fields are persisted?** `googleId`, `provider`, `displayName`, and `email`. The password remains nullable for Google-only accounts.
5. **How are accounts linked?** The app uses a find-or-link-or-create rule to avoid duplicate accounts across local and Google login.
6. **Are Google access tokens stored long-term?** No. Only the identity metadata required for account lookup and linking is persisted.
7. **How is the callback secured?** The callback URL is configured via environment variables and should use HTTPS in production.

## 6. Authentication & Security

### 6.1 Strategies

The app supports local authentication (email + bcrypt hashed password) and Google OAuth 2.0 through Passport.

### 6.2 User Model

The user model includes:

- `email` (unique)
- `displayName`
- `password` (nullable)
- `googleId`
- `provider`
- `role`
- `createdAt`

### 6.3 Account Linking

The system uses a **find-or-link-or-create** rule to prevent duplicate accounts when users switch between local and Google login.

### 6.4 Session Management

The app uses `express-session` with a 14-day TTL. Cookies are secured with `httpOnly` and `sameSite=lax`.

### 6.5 Secret Storage

All sensitive keys such as `MONGO_URI` and `GOOGLE_CLIENT_SECRET` are stored in a `.env` file and excluded from Git.

## 7. Acceptance Criteria

| ID | Given | When | Then |
|---|---|---|---|
| AC-1 | Any visitor | Requests GET `/` | Home page renders successfully (HTTP 200). |
| AC-2 | Any authenticated user | Requests GET `/admin/dashboard` | Three Chart.js visualizations render with non-empty data. |
| AC-3 | New user | Submits POST `/auth/register` with valid email/password | User is created and password is stored as a bcrypt hash. |
| AC-4 | Existing user | Submits POST `/auth/login` with valid credentials | Session is created and user is redirected to `/admin/dashboard`. |
| AC-5 | Google user | Completes the Google OAuth flow | User is redirected to `/admin/dashboard` and the user document includes `googleId` and `provider='google'`. |
| AC-6 | Unauthenticated user | Requests GET `/admin/dashboard` | App redirects to `/admin/login` (HTTP 302) or returns 401. |
| AC-7 | Authenticated user | Submits POST `/logout` | Session is cleared and subsequent requests to `/admin/dashboard` redirect to login (302) or return 401. |
| AC-8 | Developer | Checks repository | `.env` is absent from Git and `.env.example` is present. |

### 7.1 Automated Test Scripts

Create `tests/auth.test.js` using Jest + Supertest. These tests map directly to the acceptance criteria above and should exercise the same routes used by the application.

- **Test 1 (AC-3 Local Sign-up):** POST a valid registration payload to `/auth/register`; verify redirect or success response, user creation, and bcrypt-hashed password storage.
- **Test 2 (AC-4 Local Sign-in):** POST a valid login payload to `/auth/login`; verify redirect to `/admin/dashboard` and the presence of a session cookie.
- **Test 3 (AC-5 Google OAuth):** Mock the Google profile callback; verify redirect to `/admin/dashboard` and confirm the user document includes `googleId` and `provider='google'`.
- **Test 4 (AC-6 Route Guard):** GET `/admin/dashboard` without authentication; verify a 302 redirect to `/admin/login`.
- **Test 5 (AC-7 Logout):** Log in first, then POST `/logout`; verify the session is cleared on the subsequent request.

**Screenshot evidence:** Embed a screenshot of the green Jest output here after running the tests.

> Insert your screenshot below once the tests pass:
>
> ![Jest test output screenshot](./images/jest-output.png)

## 8. AI Attribution

- **GitHub Copilot** — used for grammar cleanup, formatting, and document organization only.

## 9. Submission Checklist

- [ ] PDF named `PRD_v3_LastnameFirstname.pdf` uploaded to Lamaku.
- [ ] Editable source (`DOCX` or `MD`) committed to `week15/term-project/docs/`.
- [ ] Section §5 revised to include OAuth 2.0; all seven questions answered.
- [ ] Section §7 includes at least 6 acceptance criteria and at least 3 Jest tests.
- [ ] Test-output screenshot embedded in §7.
- [ ] Version label `v3 — May 3, 2026` on cover.

