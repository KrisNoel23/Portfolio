import { SectionLabel, SectionTitle } from "./SectionUI.tsx";

interface StatCard {
  number: string;
  label: string;
}
const STATS: StatCard[] = [
  { number: "2+", label: "Full-Stack Projects Shipped" },
  { number: "AWS", label: "Cloud Practitioner (In Progress)" },
  { number: "BK", label: "Brooklyn Born & Based" },
  { number: "∞", label: "Curiosity, No Limits" },
];

const TAGS: string[] = [
  "🎵 Music + Mood",
  "🏋️ Gym Rat",
  "✈️ Wanderlust",
  "📖 Lifelong Reader",
  "🇹🇹 Trini Roots",
  "☁️ Cloud Curious",
];

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      style={{
        padding: "8rem 4rem",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel>About Me</SectionLabel>
      <SectionTitle>
        I build things
        <br />
        that matter.
      </SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        <div className="reveal">
          {(
            [
              <>
                <strong style={{ color: "var(--text)" }}>
                  My path into tech wasn't traditional
                </strong>{" "}
                — and that's exactly what I bring to the table. Growing up in
                Brooklyn in a Trinidadian immigrant household, I had no roadmap
                into software engineering. I found my way through The Marcy Lab
                School, driven by curiosity and the realization that the
                technology I grew up with was built by people just like me.
              </>,
              <>
                I'm a{" "}
                <strong style={{ color: "var(--text)" }}>
                  Software Engineering Fellow
                </strong>{" "}
                who loves the full picture — frontend feel, backend structure,
                and everything that connects the two. I care deeply about
                building with empathy and intention, especially when it comes to
                products that serve real people.
              </>,
              <>
                Outside the code editor, I'm lifting weights, traveling,
                writing, or reading something that shifts my perspective. I
                believe the best engineers never stop being students.
              </>,
            ] as JSX.Element[]
          ).map((text, i) => (
            <p
              key={i}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--muted)",
                marginBottom: "1.5rem",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="reveal">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "1.75rem 1.5rem",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: "var(--accent)",
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  padding: "0.5rem 1rem",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  color: "var(--muted)",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent3)";
                  e.currentTarget.style.color = "var(--accent3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
