import { useState, ChangeEvent, FormEvent, CSSProperties } from "react";
import { SectionLabel } from "./SectionUI.tsx";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
type FormStatus = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: ContactPayload = { name: "", email: "", message: "" };

const CONTACT_LINKS = [
  {
    emoji: "📧",
    label: "noelkris500@gmail.com",
    href: "mailto:noelkris500@gmail.com",
  },
  {
    emoji: "💼",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kristhesoftwareengineer",
  },
  { emoji: "🐙", label: "GitHub", href: "https://github.com/Kristopher-Noel" },
];

export default function Contact(): JSX.Element {
  const [form, setForm] = useState<ContactPayload>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "8rem 4rem",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="reveal"
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <SectionLabel>Contact</SectionLabel>

        <h2
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "var(--white)",
            marginBottom: "1.5rem",
          }}
        >
          Let's build
          <br />
          something{" "}
          <span
            style={{
              WebkitTextStroke: "1.5px var(--accent)",
              color: "transparent",
            }}
          >
            real.
          </span>
        </h2>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.9rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 500,
            margin: "0 auto 3rem",
          }}
        >
          I'm actively looking for software engineering opportunities. If you're
          building something interesting — or just want to connect — send a
          message.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: 480,
            margin: "0 auto 3rem",
            textAlign: "left",
          }}
        >
          {(["name", "email"] as const).map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field === "name" ? "Your name" : "your@email.com"}
              required
              value={form[field]}
              onChange={handleChange}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "0.85rem 1rem",
                color: "var(--text)",
                fontSize: "0.92rem",
                fontFamily: "'Syne', sans-serif",
                outline: "none",
                width: "100%",
              }}
            />
          ))}
          <textarea
            name="message"
            placeholder="What's on your mind?"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "0.85rem 1rem",
              color: "var(--text)",
              fontSize: "0.92rem",
              fontFamily: "'Syne', sans-serif",
              outline: "none",
              width: "100%",
              resize: "vertical",
              minHeight: 120,
            }}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              borderRadius: 4,
              padding: "1rem 2rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as CSSProperties["textTransform"],
              fontWeight: 700,
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sending" ? "Sending..." : "Send Message →"}
          </button>

          {status === "success" && (
            <p
              style={{
                color: "var(--accent3)",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
              }}
            >
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p
              style={{
                color: "#ff4444",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
              }}
            >
              Something went wrong — try emailing me directly.
            </p>
          )}
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {CONTACT_LINKS.map(({ emoji, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
                color: "var(--muted)",
                textDecoration: "none",
                padding: "1rem 1.75rem",
                border: "1px solid var(--border)",
                borderRadius: 8,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <span>{emoji}</span> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
