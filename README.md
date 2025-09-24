# Oceanova – Coastal Hazard Intelligence (Frontend)

Oceanova is a modern, responsive web app that empowers coastal communities with real‑time hazard intelligence. Citizens, volunteers, and authorities can report, validate, visualize, and act on coastal risk signals through a beautiful UI built with React, Vite, Tailwind, and shadcn/ui.

This repository contains the frontend application only.

## Key Capabilities (USPs)

- **Citizen & Community Reporting**
  - Citizens, volunteers, coastal residents, and disaster managers can submit geotagged reports with photos/videos for ocean and coastal hazards.

- **Integrated Social Media Signals**
  - Data from public social media (Twitter/X, YouTube, Facebook, etc.) can be integrated and analyzed via NLP for hazard‑relevant discussions. (Mocked in this frontend; real ingestion happens in backend.)

- **Role‑Based Access**
  - Clear separation of roles: citizens (reporting) and officials/analysts (validation, decision‑making UX).

- **Live Dashboard with Interactive Map**
  - Real‑time dashboard to view crowdsourced reports, social signals, and hotspots. Includes filters by event type, location, source, and date.

- **Predictive Insights (MVP)**
  - Frontend displays short‑term coastal risk forecasts (mock data) with confidence bands and alert preferences.

- **Multi‑language UI (EN/HI)**
  - Built‑in language switcher for English and Hindi. Extendable to more languages.

- **Chatbot Assistant (MVP)**
  - Floating assistant provides guidance for reporting, alerts, and navigation (mock responses, i18n‑aware).

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui component library
- TanStack Query (state/fetching)
- Recharts (analytics/visualizations)

## Getting Started

Prerequisites: Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start dev server (default port 5173)
npm run dev

# Or specify a port (e.g., 8080)
npm run dev -- --port 8080

# Build for production
npm run build

# Preview the production build
npm run preview
```

Open the app in your browser. If you started on port 8080: http://localhost:8080

## Available Routes

- `/` – Landing page with CTAs to Citizen Reporter and Dashboard
- `/citizen` – Citizen Reporter (report hazards, view my reports, alerts, guides)
- `/dashboard` – Official dashboard (overview, reports map placeholder, analytics, alerts)

## Features Included in this Frontend

- **Reporting UI** in `src/pages/CitizenApp.tsx`
  - Hazard type, location, description, media upload UI (client‑side only for now)
  - “My Reports” section with status and trust score placeholders

- **Dashboard** in `src/pages/Dashboard.tsx`
  - Overview stats
  - Live Reports list (mock)
  - Analytics tab with a “Next 24h Coastal Risk” chart (mock forecast) and Alert Preferences dialog

- **Internationalization (i18n)**
  - `src/i18n/` provides a lightweight i18n context (EN/HI) and `LanguageSwitcher` component
  - Switcher is placed neatly in the Dashboard and Citizen page headers

- **Chatbot Assistant**
  - Global floating widget (`src/components/Chatbot.tsx`) with mock, language‑aware responses

## Project Structure (high level)

```
src/
  components/
    LanguageSwitcher.tsx
    Chatbot.tsx
    ui/ ... (shadcn components)
  i18n/
    index.tsx
  pages/
    Landing.tsx
    CitizenApp.tsx
    Dashboard.tsx
    NotFound.tsx
  main.tsx
  App.tsx
public/
  oceanova-favicon.svg
```

## Customization Notes

- To add more languages, extend the `translations` map in `src/i18n/index.tsx` and replace hardcoded strings by using `t("key")`.
- The forecast and social feed are mocked in the frontend; wire actual APIs in your backend and consume via TanStack Query.
- Favicon and meta tags are set in `index.html`.

## Contributing

Issues and PRs are welcome. Please lint and test your changes locally before submitting.

## License

MIT © Oceanova
