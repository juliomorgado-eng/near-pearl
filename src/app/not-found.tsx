import type { Metadata } from 'next';
import Link from 'next/link';
import { CTA_URL } from '@/lib/cards';
import '@/styles/39-not-found.css';

/**
 * THE 404, IN THE PAGE'S OWN VOICE.
 *
 * It borrows the hero rather than inventing a look: the same green field, the
 * same ink, near's mark as the eyebrow, and a line that answers the hero's
 * last one — "Nobody can trace the trade back to you" becomes a page nobody
 * can trace, and a missing page is a block that was never mined. The chart
 * underneath is the curtain's candles run the other way down to zero, which
 * is what a dead link is.
 *
 * TWO WAYS OUT, AND HOME IS THE FIRST. Someone on a broken link wanted a page,
 * not the signup; the campaign's ask is the second button. It carries
 * `data-umami-event-pos="404"` like every other ask, so its clicks and views
 * land in the same two lists (see docs/analytics.md).
 *
 * It renders inside the root layout, so the curtain, the analytics hooks and
 * the Umami script all come with it. Next marks the response noindex.
 */
export const metadata: Metadata = {
  title: 'Page not found — near.com',
};

/* A walk from a high to nothing: two relief bounces on the way down so it
   reads as a market, not a bar chart shrinking. The last close is the floor. */
const WALK = [
  92, 98, 94, 100, 91, 86, 90, 82, 76, 80, 71, 74, 64, 58, 62,
  53, 47, 51, 40, 34, 38, 29, 24, 27, 18, 12, 15, 7, 3, 1, 0,
];

const CANDLES = WALK.slice(0, -1).map((o, i) => {
  const c = WALK[i + 1];
  return { o, c, h: Math.max(o, c) + 2.5, l: Math.max(0, Math.min(o, c) - 2.5) };
});

const W = 1000;
const H = 300;
const step = W / CANDLES.length;
const y = (v: number) => H - (v / 104) * H;

export default function NotFound() {
  return (
    <main className="nf">
      <Link className="nf-brand" href="/" aria-label="near.com home">
        <span className="nearw" aria-hidden="true" />
      </Link>

      <div className="nf-inner">
        <p className="nf-tag">
          <span className="nf-dot" aria-hidden="true" />
          Error 404 · Block not found
        </p>

        <h1 className="display nf-title">
          Nobody can trace this&nbsp;page.
          <span className="nf-soft">Not even us.</span>
        </h1>

        <p className="nf-body">
          The link may be old, or the page has moved. Your PEARL is fine —
          no miner has found this block, and no one will.
        </p>

        <div className="nf-ctas">
          <Link className="btn btn-primary btn-lg" href="/">
            Back to home <span className="arw">&rarr;</span>
          </Link>
          <a
            className="btn btn-outline btn-lg"
            href={CTA_URL}
            target="_blank"
            rel="noopener"
            data-umami-event="cta-click"
            data-umami-event-pos="404"
          >
            Start trading
          </a>
        </div>
      </div>

      <div className="nf-chart" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <line className="nf-floor" x1="0" x2={W} y1={H - 1} y2={H - 1} />
          {CANDLES.map((k, i) => {
            const x = i * step + step / 2;
            const top = y(Math.max(k.o, k.c));
            const bot = y(Math.min(k.o, k.c));
            return (
              <g
                key={i}
                className={k.c >= k.o ? 'nf-c up' : 'nf-c'}
                style={{ '--i': i } as React.CSSProperties}
              >
                <line x1={x} x2={x} y1={y(k.h)} y2={y(k.l)} />
                <rect x={x - step * 0.3} width={step * 0.6} y={top} height={Math.max(2, bot - top)} rx="2" />
              </g>
            );
          })}
        </svg>
        <span className="nf-price">$0.00 · −100%</span>
      </div>
    </main>
  );
}
