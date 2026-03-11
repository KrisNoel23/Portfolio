# Kristopher Noel — Portfolio

> React 18 + Vite + **TypeScript** frontend · **FastAPI** Python backend · Gmail SMTP contact form

🌐 **Live:** [krisnoelportfolio.netlify.app](https://krisnoelportfolio.netlify.app)

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

Edit `backend/main.py` — add to the `PROJECTS` list:

```python
Project(
    id=3,
    featured=False,
    badge="Personal Project",
    title="Your Project Name",
    desc="What it does and why it matters.",
    stack=["React", "FastAPI", "PostgreSQL"],
    gradient="linear-gradient(135deg, #yourcolor 0%, #0d0d0f 100%)",
    emoji="🚀",
    github="https://github.com/Kristopher-Noel/your-repo",
    demo="https://your-live-url.com",
)
```

Then add a screenshot to `frontend/src/assets/` and reference it in `Projects.tsx`.

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
