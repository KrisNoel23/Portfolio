"""
Kristopher Noel — Portfolio Backend
FastAPI + Gmail SMTP contact form
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Kris Noel Portfolio API", version="1.0.0")

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://krisnoelportfolio.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Models ────────────────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

class Project(BaseModel):
    id: int
    featured: bool
    badge: str
    title: str
    desc: str
    stack: List[str]
    gradient: str
    emoji: str
    github: str
    demo: Optional[str] = None
    # Note: `image` is not served from backend — frontend injects local assets


# ── Data ──────────────────────────────────────────────────────────────────────
# To add a new project: add an entry here. Frontend reflects it automatically.
PROJECTS: List[Project] = [
    Project(
        id=1,
        featured=True,
        badge="⭐ Capstone Project",
        title="Moodio",
        desc=(
            "A full-stack music mood-tracking app integrating Spotify's Web API and Web "
            "Playback SDK. Users log their emotional state, get dynamic mood-based "
            "recommendations, and build a personal favorites library — with seamless "
            "Spotify OAuth and real-time in-browser playback. Refactored from a monolithic "
            "1,300-line server into clean modular architecture."
        ),
        stack=[
            "React + TypeScript", "Node.js / Express", "PostgreSQL",
            "Spotify Web API", "Spotify Playback SDK", "OAuth", "Render",
        ],
        gradient="linear-gradient(135deg, #1db954 0%, #191414 60%, #7c3aed 100%)",
        emoji="🎵",
        github="https://github.com/Kristopher-Noel",
        demo=None,  # Replace with live URL when available
    ),
    Project(
        id=2,
        featured=False,
        badge="Team Project",
        title="PATCH",
        desc=(
            "A collaborative health tracking application built with a team. "
            "Focused on intuitive UX for logging daily wellness metrics, "
            "with a RESTful API backend and production deployment on Render."
        ),
        stack=["JavaScript", "Node.js", "Express", "PostgreSQL"],
        gradient="linear-gradient(135deg, #06d6a0 0%, #0d0d0f 100%)",
        emoji="🩺",
        github="https://github.com/Kristopher-Noel",
        demo=None,
    ),
]


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def root() -> dict:
    return {"message": "Kris Noel Portfolio API is live 🚀"}


@app.get("/api/projects", response_model=List[Project])
def get_projects() -> List[Project]:
    """Return all portfolio projects."""
    return PROJECTS


@app.post("/api/contact")
def contact(form: ContactForm) -> dict:
    """
    Receives contact form and sends a styled HTML email via Gmail SMTP.

    Required env vars (copy .env.example → .env and fill in):
      GMAIL_USER      — your Gmail address
      GMAIL_APP_PASS  — 16-char App Password (Google Account → Security → App Passwords)
      NOTIFY_EMAIL    — where to receive messages (can match GMAIL_USER)
    """
    gmail_user = os.getenv("GMAIL_USER")
    app_pass   = os.getenv("GMAIL_APP_PASS")
    notify_to  = os.getenv("NOTIFY_EMAIL", gmail_user)

    if not gmail_user or not app_pass:
        # Dev mode — log to console instead of sending email
        print("\n📬 Contact form submission (dev mode — configure .env to enable email):")
        print(f"   From:    {form.name} <{form.email}>")
        print(f"   Message: {form.message}\n")
        return {"status": "ok", "mode": "dev"}

    msg = MIMEMultipart("alternative")
    msg["Subject"]  = f"Portfolio Message from {form.name}"
    msg["From"]     = gmail_user
    msg["To"]       = notify_to
    msg["Reply-To"] = form.email

    html = f"""
    <html>
    <body style="font-family:'Helvetica Neue',sans-serif;background:#0d0d0f;color:#e8e8f0;padding:2rem;">
      <div style="max-width:560px;margin:0 auto;background:#13131a;border:1px solid #2a2a3a;border-radius:12px;padding:2rem;">
        <h2 style="color:#ff6b35;margin-bottom:1.5rem;">📬 New Portfolio Message</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:.5rem 0;color:#7070a0;font-size:.85rem;width:80px;">Name</td>
            <td style="padding:.5rem 0;color:#e8e8f0;">{form.name}</td>
          </tr>
          <tr>
            <td style="padding:.5rem 0;color:#7070a0;font-size:.85rem;">Email</td>
            <td style="padding:.5rem 0;">
              <a href="mailto:{form.email}" style="color:#ff6b35;">{form.email}</a>
            </td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #2a2a3a;margin:1.5rem 0;"/>
        <p style="color:#7070a0;font-size:.85rem;margin-bottom:.5rem;">Message</p>
        <p style="color:#e8e8f0;line-height:1.7;white-space:pre-wrap;">{form.message}</p>
        <hr style="border:none;border-top:1px solid #2a2a3a;margin:1.5rem 0;"/>
        <p style="color:#7070a0;font-size:.75rem;">Sent via krisnoelportfolio.netlify.app</p>
      </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(html, "html"))

    try:
        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ctx) as server:
            server.login(gmail_user, app_pass)
            server.sendmail(gmail_user, notify_to, msg.as_string())
        return {"status": "ok"}
    except Exception as exc:
        print(f"Email send error: {exc}")
        raise HTTPException(status_code=500, detail="Failed to send email")


@app.post("/api/ping")
def ping(data: dict = {}) -> dict:
    """Lightweight visitor analytics ping."""
    print(f"📊 Visit: {data.get('page', '/')}")
    return {"status": "ok"}
