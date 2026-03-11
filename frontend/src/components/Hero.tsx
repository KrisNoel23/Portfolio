import { useEffect, useRef, CSSProperties } from "react";
import profileImg from "../assets/profile.jpeg";

const TYPEWRITER_TEXTS: string[] = [
  "> Building apps people feel.",
  "> Full-stack from Brooklyn.",
  "> Music + code + purpose.",
  "> Currently open to work 👋",
];

export default function Hero(): JSX.Element {
  const twRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let tIdx = 0;
    let cIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = (): void => {
      const cur = TYPEWRITER_TEXTS[tIdx];
      cIdx = deleting ? cIdx - 1 : cIdx + 1;
      if (twRef.current) twRef.current.textContent = cur.substring(0, cIdx);

      let delay = deleting ? 35 : 70;
      if (!deleting && cIdx === cur.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % TYPEWRITER_TEXTS.length;
        delay = 300;
      }

      timer = setTimeout(type, delay);
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" style={sectionStyle}>
      {/* Left — text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={eyebrowStyle}>
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "var(--accent)",
            }}
          />
          Software Engineer · Brooklyn, NY
        </div>

        <h1 style={nameStyle}>
          Kristopher
          <br />
          <span
            style={{
              WebkitTextStroke: "1.5px var(--accent)",
              color: "transparent",
            }}
          >
            Noel.
          </span>
        </h1>

        <p style={taglineStyle}>
          Full-stack engineer who builds with{" "}
          <span style={{ color: "var(--accent3)" }}>purpose</span>. From a
          household of Trinidadian immigrants to the NYC tech scene — I turn
          ideas into experiences people actually feel.
        </p>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "1rem",
            color: "var(--accent)",
            minHeight: "1.5em",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span ref={twRef} />
          <span style={{ animation: "blink 1s step-end infinite" }}>|</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#projects" style={btnPrimary}>
            See My Work
          </a>
          <a href="#contact" style={btnOutline}>
            Get In Touch
          </a>
        </div>
      </div>

      {/* Right — profile photo */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={photoFrameStyle}>
          {/* Decorative ring */}
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: "1.5px solid var(--accent)",
              opacity: 0.4,
            }}
          />
          {/* Accent dot */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              width: 20,
              height: 20,
              background: "var(--accent)",
              borderRadius: "50%",
              border: "3px solid var(--bg)",
              zIndex: 2,
            }}
          />
          <img
            src={profileImg}
            alt="Kristopher Noel at Marcy Lab graduation"
            style={photoStyle}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "4rem",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.7rem",
          color: "var(--muted)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          writingMode: "vertical-rl",
        }}
      >
        Scroll
        <span
          style={{
            display: "block",
            width: 1,
            height: 60,
            background: "var(--border)",
          }}
        />
      </div>
    </section>
  );
}

const sectionStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "5rem",
  padding: "8rem 4rem 4rem",
  maxWidth: 1200,
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
};

const eyebrowStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.85rem",
  color: "var(--accent)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const nameStyle: CSSProperties = {
  fontSize: "clamp(3rem, 7vw, 7rem)",
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: "-0.03em",
  marginBottom: "1.5rem",
  color: "var(--white)",
};

const taglineStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
  color: "var(--muted)",
  marginBottom: "2rem",
  maxWidth: 480,
  lineHeight: 1.75,
};

const photoFrameStyle: CSSProperties = {
  position: "relative",
  width: 320,
  height: 380,
  borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
  overflow: "hidden",
  border: "2px solid var(--border)",
  flexShrink: 0,
};

const photoStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center top",
  display: "block",
};

const btnPrimary: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.85rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "1rem 2rem",
  background: "var(--accent)",
  color: "var(--bg)",
  border: "none",
  borderRadius: 4,
  textDecoration: "none",
  fontWeight: 700,
  display: "inline-block",
};

const btnOutline: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.85rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "1rem 2rem",
  background: "transparent",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: 4,
  textDecoration: "none",
  display: "inline-block",
};
