# HW13-C: Term Project 3 — React Visitor Statistics Dashboard

## Overview

This Week 13 checkpoint extends the Week 12 marketing page into a visitor analytics dashboard for **Kai Nani (Maui)**. The app now includes:

- Marketing page with Hero, About, Amenities, and CTA
- Marketing page property fetch attempt from `/properties` with local fallback
- Dashboard view with island selector
- Three visual analytics components
- Weather widget driven by OpenWeatherMap API

## Dashboard Features

### 1) Arrival Chart (`ArrivalChart.jsx`)

- Type: Bar chart (`react-chartjs-2`)
- Data: monthly arrivals by island
- Behavior: updates when `selectedIsland` changes
- Current source: local fallback JSON in `src/data/dashboardData.js`
- TODO: switch to backend `GET /api/arrivals?island=<island>` when route is finalized

### 2) Visitor Origin Chart (`OriginChart.jsx`)

- Type: Doughnut chart
- Data: U.S. domestic, Japan, Canada, other international share
- Behavior: updates when `selectedIsland` changes

### 3) Length-of-Stay Trend (`LengthOfStayChart.jsx`)

- Type: Line chart
- Data: DBEDT-inspired yearly average stay values
- Behavior: updates when `selectedIsland` changes

### KPI Metric Cards (`MetricCards.jsx`)

- Average Daily Rate (ADR)
- Occupancy %
- Average Length of Stay
- Length-of-stay value is computed with `Array.reduce()`

## Weather Widget

`WeatherWidget.jsx` loads current weather for the selected island city:

- Maui → Kahului
- O'ahu → Honolulu
- Kaua'i → Lihue

It supports loading and error states and reads API key from `VITE_WEATHER_KEY`.

## Setup

1. Install dependencies:
   - `npm install`
2. Create environment file:
   - copy `.env.example` to `.env`
   - set `VITE_WEATHER_KEY`
3. Run development server:
   - `npm run dev`
4. Build production bundle:
   - `npm run build`

## File Structure

- `src/App.jsx` (marketing page + dashboard navigation)
- `src/Dashboard.jsx` (dashboard layout/state)
- `src/charts/ArrivalChart.jsx`
- `src/charts/OriginChart.jsx`
- `src/charts/LengthOfStayChart.jsx`
- `src/components/MetricCards.jsx`
- `src/components/WeatherWidget.jsx`
- `src/data/dashboardData.js`
- `.env.example`

## AI Attribution

I used GitHub Copilot for implementation assistance, debugging help, and formatting suggestions. I reviewed and edited all code decisions and project structure before finalizing.

## Week 14–15 Plan

Next steps are to route chart data through authenticated backend endpoints, protect admin access with Passport.js, and keep dashboard components reusable under an auth wrapper.
