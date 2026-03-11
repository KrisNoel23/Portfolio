import { SectionLabel, SectionTitle } from "./SectionUI.tsx";

interface Skill {
  icon: string;
  name: string;
  level: string;
}

const SKILLS: Skill[] = [
  { icon: "⚛️", name: "React", level: "Intermediate" },
  { icon: "🟦", name: "TypeScript", level: "Growing" },
  { icon: "🟨", name: "JavaScript", level: "Experienced" },
  { icon: "🌐", name: "HTML / CSS", level: "Experienced" },
  { icon: "🟩", name: "Node.js", level: "Intermediate" },
  { icon: "🚂", name: "Express.js", level: "Intermediate" },
  { icon: "🐍", name: "Python", level: "Growing" },
  { icon: "⚡", name: "FastAPI", level: "Growing" },
  { icon: "🐘", name: "PostgreSQL", level: "Intermediate" },
  { icon: "🗃️", name: "SQLite", level: "Familiar" },
  { icon: "🐙", name: "Git / GitHub", level: "Experienced" },
  { icon: "🟠", name: "Spotify API", level: "Shipped" },
  { icon: "🚀", name: "Render", level: "Deployed" },
  { icon: "☁️", name: "AWS", level: "Studying" },
];

function SkillCard({ icon, name, level }: Skill): JSX.Element {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "1.25rem 1rem",
        textAlign: "center",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <span
        style={{ fontSize: "1.8rem", marginBottom: "0.5rem", display: "block" }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "var(--text)",
          display: "block",
          marginBottom: "0.3rem",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          color: "var(--muted)",
        }}
      >
        {level}
      </span>
    </div>
  );
}

export default function Skills(): JSX.Element {
  return (
    <section
      id="skills"
      style={{
        padding: "8rem 4rem",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>Tech Stack</SectionLabel>
        <SectionTitle>What I work with.</SectionTitle>

        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {SKILLS.map((s) => (
            <SkillCard key={s.name} {...s} />
          ))}
        </div>

        <div
          className="reveal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background:
              "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(124,58,237,0.1))",
            border: "1px solid var(--accent)",
            borderRadius: 10,
            padding: "1rem 1.5rem",
            marginTop: "2.5rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🏅</span>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              color: "var(--text)",
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                color: "var(--accent)",
                display: "block",
                marginBottom: "0.2rem",
              }}
            >
              AWS Cloud Practitioner — In Progress
            </span>
            Studying CLF-C02 · IAM, EC2, S3, VPC, billing &amp; Well-Architected
            Framework
          </div>
        </div>
      </div>
    </section>
  );
}
