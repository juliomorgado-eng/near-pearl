'use client';
import { useEffect, useRef } from 'react';
import { makeWater, type Water } from './water-gl';

/**
 * THE DEEP WATER FIELD. One photograph split in two: the water
 * (`deep-water-*.webp`, the pearl painted out) and the pearl itself
 * (`pearl.webp`, cut on its own circle), so the two can move apart a little.
 *
 * What moves, and how little:
 *   - the water ripples, its surface glints and the shafts under it shimmer
 *     (water-gl.ts — one shader over the water photograph); without WebGL the
 *     still photograph stays, its shafts breathing in CSS
 *   - the whole scene drifts on a 46s ease (CSS)
 *   - the pearl bobs on its own 14s float (CSS)
 *   - motes — the suspended specks in the photograph — rise on a canvas
 *   - the cursor tilts the scene: water ±10px, pearl ±18px, motes by depth,
 *     and a soft lamp follows it; motes near it drift aside
 *
 * The cursor writes `--mx`/`--my` (−1…1, lerped) and `--gx`/`--gy` (px) on
 * the root; 44-hero.css turns them into `translate`. Nothing listens on a coarse
 * pointer, nothing moves under reduced motion, and the loop sleeps while the
 * field is off screen or the tab is hidden.
 */
const MOTES = 88;

export function DeepWater() {
  const root = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const glc = useRef<HTMLCanvasElement>(null);
  const base = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = root.current, canvas = cvs.current;
    if (!el || !canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

    let w = 0, h = 0, dpr = 1;
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = el.clientWidth; h = el.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    // the living water, if WebGL is there; it takes over from the <img> once
    // its first frame is drawn
    const gc = glc.current, wbox = gc?.parentElement;
    let water: Water | null = gc
      ? makeWater(gc, base.current?.currentSrc || '/img/water/deep-water-2048.webp', () => wbox?.classList.add('gl'))
      : null;
    const lost = (e: Event) => { e.preventDefault(); water = null; wbox?.classList.remove('gl'); };
    gc?.addEventListener('webglcontextlost', lost);
    const t0 = performance.now();

    // depth 0..1: far motes are small, dim, slow and barely parallax
    const motes = Array.from({ length: MOTES }, () => {
      const z = Math.random();
      return {
        x: Math.random(), y: Math.random(), z,
        r: .6 + z * 1.6,
        vy: .004 + z * .012,            // fraction of height per second
        ph: Math.random() * Math.PI * 2,
        tw: .4 + Math.random() * 1.2,   // twinkle rate
        dx: 0, dy: 0,                   // push from the cursor, px
      };
    });

    let mx = 0, my = 0, tx = 0, ty = 0;      // normalised cursor, eased
    let gx = -1e4, gy = -1e4;                 // cursor in field px
    let raf = 0, last = performance.now(), on = true;

    const frame = (now: number) => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      mx += (tx - mx) * .045; my += (ty - my) * .045;
      el.style.setProperty('--mx', mx.toFixed(4));
      el.style.setProperty('--my', my.toFixed(4));

      water?.draw((now - t0) / 1000, mx, my);

      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;
      for (const m of motes) {
        m.y -= m.vy * dt;
        if (m.y < -.02) { m.y = 1.02; m.x = Math.random(); }
        const sway = Math.sin(t * .3 + m.ph) * (6 + m.z * 10);
        let px = m.x * w + sway - mx * (4 + m.z * 22);
        let py = m.y * h - my * (3 + m.z * 14);
        // the cursor parts the water a little
        const ddx = px - gx, ddy = py - gy, d2 = ddx * ddx + ddy * ddy;
        if (d2 < 140 * 140) {
          const f = (1 - Math.sqrt(d2) / 140) * 16 * (.4 + m.z);
          const d = Math.sqrt(d2) || 1;
          m.dx += ((ddx / d) * f - m.dx) * .08; m.dy += ((ddy / d) * f - m.dy) * .08;
        } else { m.dx *= .96; m.dy *= .96; }
        px += m.dx; py += m.dy;
        // brighter toward the surface, where the light is
        const lit = .25 + .75 * (1 - m.y);
        const a = (.24 + m.z * .56) * lit * (.55 + .45 * Math.sin(t * m.tw + m.ph));
        if (a <= .01) continue;
        ctx.globalAlpha = a;
        ctx.fillStyle = '#F4E9DA';
        ctx.beginPath(); ctx.arc(px, py, m.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = on ? requestAnimationFrame(frame) : 0;
    };
    const wake = () => { if (!raf && on) { last = performance.now(); raf = requestAnimationFrame(frame); } };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      gx = e.clientX - r.left; gy = e.clientY - r.top;
      tx = (gx / r.width) * 2 - 1; ty = (gy / r.height) * 2 - 1;
      el.style.setProperty('--gx', gx.toFixed(1) + 'px');
      el.style.setProperty('--gy', gy.toFixed(1) + 'px');
      el.dataset.lamp = '1';
    };
    const leave = () => { tx = 0; ty = 0; gx = gy = -1e4; delete el.dataset.lamp; };

    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting && !document.hidden; wake(); });
    io.observe(el);
    const vis = () => { on = !document.hidden; wake(); };
    document.addEventListener('visibilitychange', vis);
    const ro = new ResizeObserver(() => { size(); water?.size(); });
    ro.observe(el);
    if (gc) ro.observe(gc);
    if (fine) {
      addEventListener('pointermove', move, { passive: true });
      document.documentElement.addEventListener('pointerleave', leave);
    }
    wake();

    return () => {
      cancelAnimationFrame(raf); raf = 0; on = false;
      io.disconnect(); ro.disconnect();
      water?.dispose();
      gc?.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', vis);
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="dw-sea" ref={root} aria-hidden="true">
      <div className="dw-scene">
        <div className="dw-water">
          {/* eslint-disable-next-line @next/next/no-img-element -- a fixed-size art layer, sized by CSS */}
          <img
            ref={base}
            className="dw-base"
            src="/img/water/deep-water-2048.webp"
            srcSet="/img/water/deep-water-1280.webp 1280w, /img/water/deep-water-2048.webp 2048w, /img/water/deep-water-3200.webp 3200w"
            sizes="max(127vw, 185svh)"
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          {/* the same water again, screened over the shafts and swaying, so
              the light under the surface flickers rather than sits */}
          {/* eslint-disable-next-line @next/next/no-img-element -- same file, already cached */}
          <img className="dw-shafts" src="/img/water/deep-water-1280.webp" alt="" decoding="async" />
          <canvas className="dw-gl" ref={glc} />
        </div>
      </div>
      <div className="dw-pearl">
        {/* eslint-disable-next-line @next/next/no-img-element -- a cut-out art layer */}
        <img src="/img/water/pearl.webp" alt="" decoding="async" />
      </div>
      <canvas className="dw-motes" ref={cvs} />
      <div className="dw-lamp" />
      <div className="dw-scrim" />
    </div>
  );
}
