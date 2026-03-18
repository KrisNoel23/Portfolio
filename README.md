# Kristopher Noel — Portfolio

🌐 **Live:** [krisnoelportfolio.netlify.app](https://krisnoelportfolio.netlify.app)

---

## What is this?

This is my personal developer portfolio — a full-stack web application that showcases who I am as a software engineer, the projects I've built, my technical skills, and how to get in touch with me. It's designed to give anyone — recruiters, collaborators, or fellow developers — a clear and honest picture of what I can do.

## Why was it built?

As a software engineer, a resume only tells part of the story. I built this portfolio to have a living, interactive space where I can show my work rather than just describe it. The goal is to represent my identity as an engineer: where I come from, what I care about building, and the projects I'm proud of.

## What problem does it solve?

Breaking into software engineering — especially without a traditional background — means you have to prove yourself through what you've built. This portfolio solves the problem of visibility: it puts my projects, skills, and story in one accessible place so that the right people can find me and see the depth of my work beyond a one-page resume.

---

## Tech Stack

| Layer           | Technology                           |
| --------------- | ------------------------------------ |
| Frontend        | React 18 + Vite + TypeScript         |
| Styling         | CSS custom properties (no framework) |
| Backend         | Python 3.12 + FastAPI                |
| Validation      | Pydantic v2                          |
| Email           | Gmail SMTP (`smtplib`)               |
| Frontend deploy | Netlify                              |
| Backend deploy  | Render                               |

---

## Project Structure

```
portfolio/
├── .gitignore
├── README.md
├── frontend/                        # React + Vite + TypeScript
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── types/
│       │   └── index.ts             # Shared interfaces (Project, Skill, etc.)
│       ├── assets/
│       │   ├── profile.jpeg         # Your graduation photo
│       │   └── moodio.png           # Moodio screenshot
│       └── components/
│           ├── Cursor.tsx
│           ├── NavBar.tsx
│           ├── Hero.tsx             # Uses profile.jpeg
│           ├── About.tsx
│           ├── SectionUI.tsx        # Shared SectionLabel + SectionTitle
│           ├── Skills.tsx
│           ├── Projects.tsx         # Uses moodio.png + fetches /api/projects
│           ├── Contact.tsx          # Posts to /api/contact
│           └── Footer.tsx
└── backend/                         # Python + FastAPI
    ├── main.py
    ├── requirements.txt
    └── .env.example
```

---

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # then add your Gmail App Password
uvicorn main:app --reload --port 8000
# → http://localhost:8000
# → http://localhost:8000/docs  (interactive API docs)
```

> Vite proxies `/api/*` → `localhost:8000` automatically — no extra config needed in dev.

---

## Migrating from Old Structure

Your old files map to the new structure like this:

| Old location                     | New location               | Notes                   |
| -------------------------------- | -------------------------- | ----------------------- |
| `index.html`                     | `frontend/index.html`      | Rewritten for Vite      |
| `style.css` + `mediaqueries.css` | `frontend/src/index.css`   | Merged + cleaned        |
| `script.ts`                      | `frontend/src/components/` | Split into components   |
| `script.js`                      | ❌ Deleted                 | TypeScript only         |
| `assets/`                        | `frontend/src/assets/`     | Move images here        |
| `venv/`                          | `backend/venv/`            | Belongs with backend    |
| `package.json`                   | `frontend/package.json`    | Replaced by Vite config |

---

## Adding a New Project

Projects are stored in PostgreSQL. To add one, insert a row directly:

```sql
INSERT INTO projects (featured, badge, title, desc, stack, gradient, emoji, github, demo)
VALUES (
  false,
  'Personal Project',
  'Your Project Name',
  'What it does and why it matters.',
  '["React", "FastAPI", "PostgreSQL"]',
  'linear-gradient(135deg, #yourcolor 0%, #0d0d0f 100%)',
  '🚀',
  'https://github.com/Kristopher-Noel/your-repo',
  'https://your-live-url.com'
);
```

Then add a screenshot to `frontend/src/assets/` and register it in the `PROJECT_IMAGES` map in `Projects.tsx`:

```tsx
const PROJECT_IMAGES: Record<number, string> = {
  1: moodioImg,
  2: patchImg,
  3: yourNewImg,  // add this line
};
```

---

## Gmail App Password Setup

1. Go to [myaccount.google.com](https://myaccount.google.com) → **Security**
2. Enable **2-Step Verification**
3. Go to **App Passwords** → Mail → Generate
4. Paste the 16-character code into `.env` as `GMAIL_APP_PASS`

Without these, the backend logs submissions to the console (dev mode).

---

## API Endpoints

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| `GET`  | `/`             | Health check            |
| `GET`  | `/api/projects` | All projects as JSON    |
| `POST` | `/api/contact`  | Send contact form email |
| `POST` | `/api/ping`     | Visitor analytics ping  |

---

## Deployment

### Frontend → Netlify

```bash
cd frontend && npm run build
# Deploy /dist to Netlify
```

### Backend → Render

- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add env vars: `GMAIL_USER`, `GMAIL_APP_PASS`, `NOTIFY_EMAIL`

---

## Tech Stack

| Layer           | Technology                           |
| --------------- | ------------------------------------ |
| Frontend        | React 18 + Vite + TypeScript         |
| Styling         | CSS custom properties (no framework) |
| Backend         | Python 3.12 + FastAPI                |
| Validation      | Pydantic v2                          |
| Email           | Gmail SMTP (`smtplib`)               |
| Frontend deploy | Netlify                              |
| Backend deploy  | Render                               |

---

_Built from Brooklyn. © 2025 Kristopher Noel._
