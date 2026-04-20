import { useState, useEffect, CSSProperties } from "react";
import Cursor from "./Cursor.tsx";
import NavBar from "./NavBar.tsx";
import { SectionLabel, SectionTitle } from "./SectionUI.tsx";
import type { Project } from "../types/index.ts";
import moodioImg from "../assets/moodio.png";
import patchImg from "../assets/patch.png";

const PROJECT_IMAGES: Record<number, string> = {
  1: moodioImg,
  2: patchImg,
};

function ProjectCard({ project: p }: { project: Project }): JSX.Element {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div
      className="reveal"
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        {p.image && !imgError ? (
          <img
            src={p.image}
            alt={`${p.title} screenshot`}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
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
            fontSize: "1.4rem",
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
              Watch Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCatalog(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        setProjects(data.map((p) => ({ ...p, image: PROJECT_IMAGES[p.id] })));
      })
      .catch(() => {});
  }, []);

  const types = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filtered = projects.filter((p) => {
    const typeMatch = selectedType === "All" || p.type === selectedType;
    const tagMatch = selectedTags.every((t) => p.tags.includes(t));
    return typeMatch && tagMatch;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <>
      <Cursor />
      <NavBar />
      <section
        style={{
          padding: "8rem 4rem",
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionLabel>All Work</SectionLabel>
        <SectionTitle>Projects I've built.</SectionTitle>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}
        >
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              style={selectedType === t ? pillActive : pillInactive}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={selectedTags.includes(tag) ? pillActive : pillInactive}
            >
              {tag}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}

const pillBase: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "0.4rem 1rem",
  borderRadius: 20,
  cursor: "pointer",
};

const pillActive: CSSProperties = {
  ...pillBase,
  border: "none",
  background: "var(--accent)",
  color: "var(--bg)",
  fontWeight: 700,
};

const pillInactive: CSSProperties = {
  ...pillBase,
  background: "var(--bg2)",
  border: "1px solid var(--border)",
  color: "var(--muted)",
  fontWeight: 400,
};

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
