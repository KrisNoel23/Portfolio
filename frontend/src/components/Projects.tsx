import { useState, CSSProperties } from "react";
import { SectionLabel, SectionTitle } from "./SectionUI.tsx";
import type { Project } from "../types/index.ts";
import moodioImg from "../assets/moodio.png";

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    featured: true,
    badge: "⭐ Capstone Project",
    title: "Moodio",
    desc: "A full-stack music mood-tracking app integrating Spotify's Web API and Web Playback SDK. Users log their emotional state, get dynamic mood-based recommendations, and build a personal favorites library — with seamless Spotify OAuth and real-time in-browser playback. Refactored from a monolithic 1,300-line server into clean modular architecture.",
    stack: [
      "React + TypeScript",
      "Node.js / Express",
      "PostgreSQL",
      "Spotify Web API",
      "Spotify Playback SDK",
      "OAuth",
      "Render",
    ],
    image: moodioImg,
    gradient: "linear-gradient(135deg, #1db954 0%, #191414 60%, #7c3aed 100%)",
    emoji: "🎵",
    github: "https://github.com/Kristopher-Noel",
    demo: undefined,
  },
  {
    id: 2,
    featured: false,
    badge: "Team Project",
    title: "PATCH",
    desc: "A collaborative health tracking application built with a team. Focused on intuitive UX for logging daily wellness metrics, with a RESTful API backend and production deployment on Render.",
    stack: ["JavaScript", "Node.js", "Express", "PostgreSQL"],
    image: "",
    gradient: "linear-gradient(135deg, #06d6a0 0%, #0d0d0f 100%)",
    emoji: "🩺",
    github: "https://github.com/PATCH-KFCX/PATCH2",
    demo: undefined,
  },
];

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({
  project: p,
  featured = false,
}: ProjectCardProps): JSX.Element {
  const [imgError, setImgError] = useState<boolean>(false);

  const cardStyle: CSSProperties = {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    overflow: "hidden",
    transition: "all 0.3s",
    display: "flex",
    flexDirection: featured ? "row" : "column",
    minHeight: featured ? 360 : "auto",
    marginBottom: featured ? "1.5rem" : 0,
  };

  const imgWrapStyle: CSSProperties = featured
    ? { width: "52%", flexShrink: 0, overflow: "hidden", position: "relative" }
    : { height: 200, overflow: "hidden", position: "relative" };

  return (
    <div
      className="reveal"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div style={imgWrapStyle}>
        {p.image && !imgError ? (
          <img
            src={p.image}
            alt={`${p.title} screenshot`}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top left",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: p.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
            }}
          >
            {p.emoji}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as CSSProperties["textTransform"],
            color: "var(--accent)",
            marginBottom: "0.75rem",
          }}
        >
          {p.badge}
        </div>
        <h3
          style={{
            fontSize: featured ? "1.8rem" : "1.4rem",
            fontWeight: 800,
            color: "var(--white)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            marginBottom: "1.5rem",
            flex: 1,
          }}
        >
          {p.desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                padding: "0.3rem 0.75rem",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                color: "var(--muted)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            style={btnPrimary}
          >
            GitHub →
          </a>
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              style={btnSecondary}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects(): JSX.Element {
  const featured = FALLBACK_PROJECTS.find((p) => p.featured);
  const rest = FALLBACK_PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      style={{
        padding: "8rem 4rem",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel>Work</SectionLabel>
      <SectionTitle>Projects I've built.</SectionTitle>

      {featured && <ProjectCard project={featured} featured />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {rest.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

const btnPrimary: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "0.6rem 1.25rem",
  borderRadius: 4,
  textDecoration: "none",
  background: "var(--accent)",
  color: "var(--bg)",
  fontWeight: 700,
};
const btnSecondary: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "0.6rem 1.25rem",
  borderRadius: 4,
  textDecoration: "none",
  border: "1px solid var(--border)",
  color: "var(--muted)",
};
