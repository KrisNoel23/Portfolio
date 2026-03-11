import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function SectionLabel({ children }: Props): JSX.Element {
  return (
    <div
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.75rem",
        color: "var(--accent)",
        letterSpacing: "0.25em",
        textTransform: "uppercase" as CSSProperties["textTransform"],
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 30,
          height: 1,
          background: "var(--accent)",
        }}
      />
      {children}
    </div>
  );
}

export function SectionTitle({ children }: Props): JSX.Element {
  return (
    <h2
      style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        color: "var(--white)",
        marginBottom: "3.5rem",
      }}
    >
      {children}
    </h2>
  );
}
