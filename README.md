# Bodhi — dhruvbhargava.xyz

A personal digital workspace inspired by macOS, built with React. Rotating Indian art gallery, dock-based navigation, essays, gym tracking, and more.

## Features

- **Art Gallery** — Rotating Indian artwork (Hiroshi Yoshida, Edward Lear) displayed in a framed gallery style with entrance animations
- **macOS Dock** — Vertical dock on desktop, horizontal bottom bar on mobile. Navigates to Thoughts, Learnings, Projects, Events, Recommendations, and About
- **Thoughts & Learnings** — Markdown essays with cover images, sidebar + article layout on desktop, card → full article flow on mobile. Deep-linkable URLs (e.g. `/learnings/chief-of-staff-equation`)
- **Recommendations** — Sidebar tabs for Wins, Apps, Products, Bars & Places, People, and Content
- **Gym Heatmap** — GitHub-style contribution calendar tracking gym sessions, most recent month first with year labels
- **About** — Name, location, BITS Pilani, current role, previous companies (with links), outside interests
- **Dark Mode** — Manual toggle with smooth transition
- **Auto Changelog** — Generated from git log at build time, shown in TopBar dropdown
- **Vercel Analytics** — Page view tracking via `@vercel/analytics`
- **URL Routing** — All sections have shareable URLs, browser back/forward works. No react-router, uses History API directly

## Tech Stack

**Frontend:** React 19, Tailwind CSS 3, Radix UI (scroll-area, dropdown, tooltip, badge), CRACO

**Backend:** FastAPI, MongoDB (Motor), Pydantic v2

## Getting Started

### Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Runs at [http://localhost:3000](http://localhost:3000).

The `prestart` script auto-generates `src/data/changelog.json` from git log before the dev server starts.

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

Runs at [http://localhost:8000](http://localhost:8000).

## Project Structure

```
Bodhi/
├── frontend/
│   ├── public/
│   │   └── images/
│   │       ├── covers/         # Article cover images (including SVGs)
│   │       └── gallery/        # Rotating Indian artwork
│   ├── scripts/
│   │   └── generate-changelog.js  # Builds changelog.json from git log
│   └── src/
│       ├── components/
│       │   ├── sections/       # ThoughtsSection, LearningsSection, AboutSection, etc.
│       │   ├── ArtGallery.jsx
│       │   ├── Dock.jsx
│       │   ├── TopBar.jsx
│       │   ├── WindowModal.jsx
│       │   └── RecommendationsContent.jsx
│       ├── data/
│       │   ├── mock.js         # All content: essays, gym sessions, recommendations, etc.
│       │   └── changelog.json  # Auto-generated, git-ignored
│       └── hooks/
└── backend/
    ├── server.py               # FastAPI app
    └── models.py               # Pydantic models
```

## URLs

| Path | Content |
|------|---------|
| `/` | Home (gallery) |
| `/thoughts` | Thoughts list |
| `/thoughts/:slug` | Individual thought |
| `/learnings` | Learnings list |
| `/learnings/:slug` | Individual learning |
| `/events` | Events grid |
| `/events/:slug` | Event detail |
| `/projects` | Projects |
| `/recommendations` | Recommendations |
| `/about` | About |

## Deployment

Live at **[dhruvbhargava.xyz](https://dhruvbhargava.xyz)**, deployed on Vercel.

```bash
# Deploy manually
npm i -g vercel
cd frontend
vercel
```

The backend (FastAPI + MongoDB) runs separately and is not required for the static frontend.

---

Personal project by [Dhruv Bhargava](https://dhruvbhargava.xyz).
