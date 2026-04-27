# Week 8 Intermediate - Multi-API Dashboard

This project combines ideas from:
- 5.2 JSON
- weather-with-city-master
- 5.6 Secrets Project

## APIs and Data Sources
1. **OpenWeather API** for live city weather.
2. **Secrets API** for a random secret.
3. **Local JSON catalog** for course statistics.

## Features
- Single dashboard page with three data cards
- City search input to refresh weather data
- Graceful fallback when an API is unavailable
- Responsive layout for desktop/mobile

## Setup
1. Go to this folder:
   - `cd week8/multi-api-dashboard`
2. Install dependencies:
   - `npm install`
3. Copy env template:
   - `cp .env.example .env`
4. Add your OpenWeather key in `.env`.
5. Run the app:
   - `npm start`
6. Open:
   - `http://localhost:3000`

## Notes
- If `OPENWEATHER_API_KEY` is missing, weather card shows a clear message.
- Secrets and JSON stats still load even if weather fails.
