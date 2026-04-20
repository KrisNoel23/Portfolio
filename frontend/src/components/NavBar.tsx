import { useState, useEffect, CSSProperties } from "react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.4rem 4rem",
    background: "rgba(13,13,15,0.88)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid var(--border)",
    boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.4)" : "none",
    transition: "box-shadow 0.3s",
  };

  return (
    <>
      <nav style={navStyle}>
        <a
          href="#hero"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "1rem",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          KN<span style={{ color: "var(--text)" }}>.</span>
        </a>

        <ul
          className="desktop-nav"
          style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="nav-link"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            padding: "0.5rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "var(--text)",
                transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 1
                      ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px,-5px)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(13,13,15,0.97)",
            borderBottom: "1px solid var(--border)",
            padding: "2rem",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1rem",
                color: "var(--muted)",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
