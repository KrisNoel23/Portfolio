// ── Project ───────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  featured: boolean;
  badge: string;
  title: string;
  desc: string;
  stack: string[];
  image: string; // imported asset path or URL
  gradient: string; // fallback gradient if image fails to load
  emoji: string;
  github: string;
  demo?: string;
}

// ── Contact form ─────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "success" | "error";

// ── Skill item ────────────────────────────────────────────────────────────────
export interface Skill {
  icon: string;
  name: string;
  level: string;
}

// ── Nav link ──────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}
