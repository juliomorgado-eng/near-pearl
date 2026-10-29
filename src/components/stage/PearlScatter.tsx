'use client';
import { useEffect, useRef } from 'react';

/**
 * THE HIDDEN PEARLS — small siblings of the field's big pearl (`.gcss::before`
 * on /v2 and /v3), tucked around its rim and against the frame. `/` never
 * shows them: `.pearlet` is `display:none` until `html:has(.theme-near)`
 * (41-theme-near.css).
 *
 * Each is placed in CSS (`--x`/`--y`/`--s`/`--o`, per `data-p`); this file only
 * moves them. The cursor pulls each a few pixels toward it, scaled by its own
 * depth (`d`, 4–14px at most), and one within ~140px of the cursor eases a
 * little further out of hiding. One `pointermove` listener on window, one rAF
 * loop that stops itself once every pearl has settled.
 *
 * NOTHING MOVES on a coarse pointer or under reduced motion: no listener at all.
 */
const PEARLS = [4, 6, 9, 14, 7, 11, 5, 12];
const NEAR = 140;

export function PearlScatter() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = box.current;
    if (!root) return;
    if (matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;

    const els = Array.from(root.children) as HTMLElement[];
    const st = els.map(() => ({ x: 0, y: 0, l: 0, tx: 0, ty: 0, tl: 0 }));
    let mx = -1e4, my = -1e4, raf = 0;

    const aim = () => {
      const w = innerWidth, h = innerHeight;
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - st[i].x;
        const cy = r.top + r.height / 2 - st[i].y;
        const d = PEARLS[i];
        // parallax: the whole frame's worth of cursor travel is ±d px
        st[i].tx = ((mx - w / 2) / w) * 2 * d;
        st[i].ty = ((my - h / 2) / h) * 2 * d;
        st[i].tl = Math.hypot(mx - cx, my - cy) < NEAR + r.width / 2 ? 1 : 0;
      });
    };

    const tick = () => {
      let busy = false;
      els.forEach((el, i) => {
        const s = st[i];
        s.x += (s.tx - s.x) * 0.06;
        s.y += (s.ty - s.y) * 0.06;
        s.l += (s.tl - s.l) * 0.05;
        if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) + Math.abs(s.tl - s.l) > 0.01) busy = true;
        el.style.setProperty('--px', s.x.toFixed(2) + 'px');
        el.style.setProperty('--py', s.y.toFixed(2) + 'px');
        el.style.setProperty('--pl', s.l.toFixed(3));
      });
      raf = busy ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      aim();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    addEventListener('pointermove', move, { passive: true });
    return () => {
      removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pearlets" ref={box} aria-hidden="true">
      {PEARLS.map((_, i) => (
        <span className="pearlet" data-p={i} key={i} />
      ))}
    </div>
  );
}
