import { useEffect, useRef } from "react";

// [size(px), opacity, blur(px), lerp factor]
const CIRCLES = [
  [38, 1.0,  0, 0.18 ],
  [33, 0.45, 0, 0.14 ],
  [28, 0.28, 0, 0.10 ],
  [23, 0.16, 0, 0.07 ],
  [18, 0.09, 0, 0.05 ],
  [14, 0.04, 0, 0.035],
] as const;

const COUNT = CIRCLES.length;

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [tabindex]";

// Distance at which trail circles start fading (px)
const FADE_START = 28;
const FADE_END   = 6;

export function CursorDot() {
  const refs       = useRef<HTMLDivElement[]>([]);
  const raf        = useRef<number>(0);
  const isOver     = useRef(false);
  const inWindow   = useRef(false);
  const pos        = useRef(
    Array.from({ length: COUNT + 1 }, () => ({ x: -300, y: -300 }))
  );

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      pos.current[0].x = e.clientX;
      pos.current[0].y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const hit = !!target.closest(INTERACTIVE) || (target as HTMLElement).innerText?.trim().length > 0;
      if (hit === isOver.current) return;
      isOver.current = hit;

      refs.current.forEach((el, i) => {
        if (!el) return;
        if (hit) {
          el.style.background                    = "rgba(255,255,255,0.02)";
          el.style.backdropFilter                = "none";
          (el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "none";
          el.style.border                        = `1px solid rgba(255,255,255,${i === 0 ? 0.3 : 0.1})`;
          el.style.boxShadow                     = "none";
        } else {
          const [, opacity, blur] = CIRCLES[i];
          el.style.background                    = `rgba(255,255,255,${0.06 * opacity})`;
          el.style.backdropFilter                = `blur(${6 + blur}px) saturate(1.4)`;
          (el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = `blur(${6 + blur}px) saturate(1.4)`;
          el.style.border                        = `1px solid rgba(255,255,255,${0.18 * opacity})`;
          el.style.boxShadow                     = `inset 0 0 12px rgba(0,128,255,${0.08 * opacity}), 0 0 0 1px rgba(0,128,255,${0.1 * opacity})`;
        }
      });
    };

    const tick = () => {
      // Main circle position (index 1, not 0 which is raw mouse)
      const mx = pos.current[1].x;
      const my = pos.current[1].y;

      for (let i = 1; i <= COUNT; i++) {
        const [size, , , lerpF] = CIRCLES[i - 1];
        pos.current[i].x = lerp(pos.current[i].x, pos.current[i - 1].x, lerpF);
        pos.current[i].y = lerp(pos.current[i].y, pos.current[i - 1].y, lerpF);
        const el = refs.current[i - 1];
        if (!el) continue;

        el.style.transform =
          `translate(${pos.current[i].x - size / 2}px, ${pos.current[i].y - size / 2}px)`;

        // Trail circles (i > 1) fade out as they approach the main circle
        if (inWindow.current && i > 1) {
          const dx   = pos.current[i].x - mx;
          const dy   = pos.current[i].y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t    = Math.max(0, Math.min(1, (dist - FADE_END) / (FADE_START - FADE_END)));
          el.style.opacity = t.toFixed(3);
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    const setVisible = (v: boolean) => {
      inWindow.current = v;
      // Always snap main circle visibility immediately
      const main = refs.current[0];
      if (main) main.style.opacity = v ? "1" : "0";
      // Trail circles: hide immediately on leave; re-entry handled by tick
      if (!v) {
        for (let i = 1; i < COUNT; i++) {
          const el = refs.current[i];
          if (el) el.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      {CIRCLES.map(([size, opacity, blur], i) => (
        <div
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: `rgba(255,255,255,${0.06 * opacity})`,
            backdropFilter: `blur(${6 + blur}px) saturate(1.4)`,
            WebkitBackdropFilter: `blur(${6 + blur}px) saturate(1.4)`,
            border: `1px solid rgba(255,255,255,${0.18 * opacity})`,
            boxShadow: `inset 0 0 12px rgba(0,128,255,${0.08 * opacity}), 0 0 0 1px rgba(0,128,255,${0.1 * opacity})`,
            pointerEvents: "none",
            zIndex: 9999 - i,
            willChange: "transform, opacity",
            transform: "translate(-300px, -300px)",
            opacity: 0,
            // Opacity is driven entirely by JS — no CSS transition for it
            // so the distance-based fade in tick() is immediate and smooth
            transition: "background 0.2s, border 0.2s, backdrop-filter 0.2s, box-shadow 0.2s",
          }}
        />
      ))}
    </>
  );
}
