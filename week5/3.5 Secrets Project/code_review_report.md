# Code Review Report: 3.5 Secrets Project

## Security Limitations of Original Code

1. **Global Authorization Variable**
   - The code uses a global variable (`userIsAuthorised`) to track authentication. This is unsafe because once any user logs in successfully, all users are considered authorized until the server restarts.
   - No session or user tracking; authorization is not tied to individual users.

2. **Hardcoded Password**
   - The password is hardcoded in the source code (`ILoveProgramming`). Anyone with access to the code knows the password.
   - Password is checked in plaintext, making it easy to hack or brute-force.

3. **No Password Hashing**
   - The password is compared directly, without hashing. Industry standards require storing and comparing hashed passwords.

4. **No Environment Variables**
   - Sensitive information (password) should be stored in environment variables, not in code.

5. **No Rate Limiting or Brute Force Protection**
   - The code does not limit login attempts, making it vulnerable to brute-force attacks.

6. **No HTTPS**
   - The server does not enforce HTTPS, so passwords can be intercepted in transit.

7. **No Session Management**
   - There is no session or cookie-based authentication. Once authorized, the state is global and not user-specific.

## Areas for Improvement

- Use session middleware (e.g., express-session) to track user authentication per session.
- Store passwords securely using environment variables and hash them with bcrypt or similar.
- Implement rate limiting to prevent brute-force attacks.
- Enforce HTTPS for secure communication.
- Remove global authorization state; use user-specific authentication.
- Add logging and monitoring for suspicious activity.

## Code Review Template Elements

- **Functionality:** Works as intended, but insecure.
- **Security:** Major flaws; see above.
- **Maintainability:** Code is readable, but security practices are outdated.
- **Scalability:** Not scalable for multiple users.
- **Documentation:** Needs comments and documentation on security risks.

## Summary

The original code is functional but highly insecure. It is vulnerable to multiple attack vectors and does not follow best practices for authentication. Improvements are needed for any real-world use.

---

*Report by GitHub Copilot, February 2026*
