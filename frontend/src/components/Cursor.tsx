import { useEffect, useRef } from "react";

interface Pos {
  x: number;
  y: number;
}

export default function Cursor(): JSX.Element {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<Pos>({ x: 0, y: 0 });
  const ringPos = useRef<Pos>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const animate = (): void => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: 12,
          height: 12,
          background: "var(--accent)",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid var(--accent)",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          opacity: 0.5,
        }}
      />
    </>
  );
}
