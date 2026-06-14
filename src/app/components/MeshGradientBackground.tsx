"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}


export function MeshGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const orbsRef = useRef<Orb[]>([]);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const hues = [210, 200, 220, 205, 215, 195, 225, 208];

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w > 0 && h > 0) {
        canvas.width  = w;
        canvas.height = h;
      }
    };

    // Defer first resize so the router layout has fully painted
    const initRaf = requestAnimationFrame(() => {
      resize();
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    orbsRef.current = hues.map((hue) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 180 + Math.random() * 220,
      hue,
      saturation: 70 + Math.random() * 10,
      lightness: 30 + Math.random() * 10,
      alpha: 0.16 + Math.random() * 0.12,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove, { passive: true });

    const onVisibility = () => {
      pausedRef.current = document.visibilityState !== "visible";
      if (!pausedRef.current && !prefersReduced) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      if (pausedRef.current) return;

      // Re-measure if canvas still has no size (can happen during first render)
      if (canvas.width === 0 || canvas.height === 0) resize();

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(draw); return; }
      frameRef.current++;

      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.85);
      bg.addColorStop(0, "hsl(220,60%,5%)");
      bg.addColorStop(1, "hsl(225,70%,3%)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const t = frameRef.current * 0.006;

      orbsRef.current.forEach((orb, idx) => {
        // Persistent wander — unique phase per orb so they don't sync up
        const phase = idx * 1.37 + orb.hue * 0.05;
        orb.vx += Math.sin(t + phase) * 0.018;
        orb.vy += Math.cos(t + phase * 0.79) * 0.018;

        // Mouse attraction
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        orb.vx += (dx / dist) * 0.000006 * dist;
        orb.vy += (dy / dist) * 0.000006 * dist;

        // Soft speed cap — prevents runaway velocity
        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
        if (speed > 1.2) { orb.vx *= 1.2 / speed; orb.vy *= 1.2 / speed; }

        orb.vx *= 0.995;
        orb.vy *= 0.995;
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = w + orb.radius;
        if (orb.x > w + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = h + orb.radius;
        if (orb.y > h + orb.radius) orb.y = -orb.radius;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `hsla(${orb.hue},${orb.saturation}%,${orb.lightness}%,${orb.alpha})`);
        grad.addColorStop(1, `hsla(${orb.hue},${orb.saturation}%,${orb.lightness}%,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Trail removed — cursor dot is now a DOM element (CursorDot) for zero-lag GPU compositing

      // Noise overlay — only on desktop, every 3rd frame to cut CPU cost
      if (!isMobile && frameRef.current % 3 === 0) {
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 16) {
          const noise = (Math.random() - 0.5) * 10;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Vignette
      const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.9);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    if (prefersReduced) {
      draw();
      cancelAnimationFrame(rafRef.current);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(initRaf);
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", maxWidth: "100%" }}
    />
  );
}
