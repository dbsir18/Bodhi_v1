# Bodhi

A personal digital workspace inspired by macOS, featuring rotating Bhagavad Gita artwork, a dock-based navigation system, and sections for thoughts, learnings, projects, and recommendations.

## Features

- **Gita Display** — Rotating Bhagavad Gita shlokas with curated artwork, displayed in a framed gallery style
- **macOS Dock** — Dock-based navigation to Thoughts, Learnings, Projects, Events, and Recommendations
- **Recommendations** — Sidebar-driven layout with tabs for Wins, Apps, Products, Bars & Places, People, and Content
- **Gym Heatmap** — GitHub-style contribution calendar tracking gym sessions (under Wins)
- **Spotify Widget** — Embedded playlist integration
- **Dark Mode** — Follows system preference with manual toggle

## Tech Stack

**Frontend:** React 19, Tailwind CSS, Radix UI, Lexical, CRACO

**Backend:** FastAPI, MongoDB (Motor), Pydantic

## Getting Started

### Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Runs at [http://localhost:3000](http://localhost:3000).

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
│   │   └── images/gita/       # Gita artwork
│   └── src/
│       ├── components/         # UI components
│       ├── data/mock.js        # Content data
│       ├── hooks/
│       └── lib/
└── backend/
    ├── server.py               # FastAPI app
    └── models.py               # Pydantic models
```

## License

Personal project by [Dhruv Bhargava](https://x.com/0xdBsir).
