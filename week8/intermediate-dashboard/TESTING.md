# ICS 385 Week 8 Dashboard: Testing Checklist

---
**Test Coverage & Instructions for Graders**

This document covers all required test scenarios for the ICS 385 Week 8 Multi-API Dashboard. Each checklist item can be verified by following the steps in the README.md. All error handling, security, and UI features are tested, including:
- API key entry modal and validation
- Fallback data and error messages for all APIs
- Caching, rate limiting, and UI responsiveness
- Security: no keys in code, .env is gitignored, localStorage only

To test error handling, try removing or entering invalid API keys, disconnecting from the internet, or rapidly refreshing widgets. All features should degrade gracefully and never crash the dashboard.
---

## 1. API Connectivity
- [ ] Enter valid OpenWeatherMap API key and verify weather loads for Kahului
- [ ] Enter valid RapidAPI key and verify Chuck Norris fact loads
- [ ] Verify programming joke loads (JokeAPI, no key needed)
- [ ] Test all APIs together and individually (remove one key at a time)

## 2. Error Scenarios
- [ ] Enter invalid API keys and confirm error messages/fallback data
- [ ] Disconnect from internet and check error handling for all widgets
- [ ] Rapidly refresh jokes/weather to test rate limiting and error UI

## 3. Data Integration
- [ ] Confirm course data displays with live API data
- [ ] Check dashboard stats update as expected when course data changes

## 4. Responsive Design
- [ ] Open dashboard.html on desktop, tablet, and mobile
- [ ] Confirm layout adapts and all widgets remain usable

## 5. Performance
- [ ] Add 50+ courses to sample-data.json
- [ ] Verify dashboard remains responsive and loads quickly
- [ ] Test multiple API calls in quick succession

## 6. Security
- [ ] Ensure .env is not committed (check .gitignore)
- [ ] In browser dev tools, confirm API keys are not exposed in network requests or JS variables (should only be in localStorage)

## 7. Caching
- [ ] Make a request, then repeat it within the cache expiry window (should use cached data)
- [ ] Wait for cache to expire and confirm new API call is made

## 8. User Experience
- [ ] Test all buttons (refresh, add/export course, settings)
- [ ] Confirm modals, error messages, and loading states display correctly
- [ ] Try all CRUD operations for courses (if implemented)
- [ ] Export data and verify the output

---

**Tip:** Mark each item as complete as you test. Add notes for any issues or improvements needed.
