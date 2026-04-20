// ── Project ───────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  featured: boolean;
  badge: string;
  type: string;
  tags: string[];
  title: string;
  desc: string;
  stack: string[];
  image?: string; // injected on the frontend from local assets
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
