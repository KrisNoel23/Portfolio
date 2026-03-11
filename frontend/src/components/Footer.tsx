export default function Footer(): JSX.Element {
  return (
    <footer
      style={{
        padding: "2rem 4rem",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem",
          color: "var(--muted)",
          letterSpacing: "0.05em",
        }}
      >
        © 2025 <span style={{ color: "var(--accent)" }}>Kristopher Noel</span>.
        Built from Brooklyn.
      </p>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem",
          color: "var(--muted)",
          letterSpacing: "0.05em",
        }}
      >
        React + Vite + TypeScript · FastAPI · Netlify + Render
      </p>
    </footer>
  );
}
