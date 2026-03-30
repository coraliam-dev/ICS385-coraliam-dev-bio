# ICS 385 Week 8: Intermediate Multi-API Dashboard

## Overview
This project is a responsive, real-time dashboard for UH Maui College, integrating:
- OpenWeatherMap (weather)
- JokeAPI (programming jokes)
- Chuck Norris Jokes (RapidAPI)
- Local JSON course data

## Features
- Secure API key management (modal + .env.example)
- Caching and rate limiting for all APIs
- Graceful error handling and fallback data
- Real-time weather, manual joke refresh, auto-updating stats
- Full CRUD for course management (extendable)
- Data export and settings management
- Responsive design for desktop, tablet, and mobile

## Setup Instructions
1. **Clone the repo and navigate to the dashboard folder:**
   ```sh
   cd week8/intermediate-dashboard
   ```
2. **Install dependencies (if using Node):**
   ```sh
   npm install
   ```
3. **Copy and configure your environment variables:**
   ```sh
   cp .env.example .env
   # Add your API keys to .env (never commit this file)
   ```
4. **For client-side (static) use:**
   - Open `dashboard.html` in your browser
   - Enter your API keys in the modal when prompted

## API Setup
- **OpenWeatherMap:** [Sign up](https://openweathermap.org/) and get a free API key
- **RapidAPI (Chuck Norris):** [Subscribe](https://rapidapi.com/) to the Chuck Norris Jokes API (free tier)
- **JokeAPI:** No registration required

## File Structure
```
intermediate-dashboard/
  ├── dashboard.html
  ├── styles.css
  ├── config.js
  ├── api-client.js
  ├── course-catalog.js
  ├── dashboard.js
  ├── sample-data.json
  ├── .env.example
  ├── .gitignore
  └── README.md
```

## Security
- Never commit your `.env` file or real API keys
- All client-side keys are stored in localStorage for development only

## Security Checklist
- [x] API keys are never hardcoded in code or HTML
- [x] .env.example provided, .env is gitignored
- [x] API keys are only stored in browser localStorage for development
- [x] SecureConfig class validates and loads API keys
- [x] Modal prompts user for API keys if missing
- [x] All error messages avoid leaking sensitive info
- [x] README and TESTING.md document security practices

## Credits
- ICS 385 Spring 2026, UH Maui College
- Assignment by Prof. [Your Instructor]
