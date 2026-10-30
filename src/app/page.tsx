import type { Metadata } from 'next';
import { Cobrand } from '@/components/stage/Cobrand';

/**
 * `/` — THE REVIEW MENU, and the deploy's front door: the URL a host hands
 * out opens here, and each landing lives one path down (/v1, /v2, /v3). One page that lays the three directions side
 * by side so a reviewer can compare them before opening any. The routes send
 * `X-Frame-Options: DENY` (next.config.ts), so the previews are stills of each
 * hero at 1440 x 900 (public/menu/*.webp), not live iframes; recapture them
 * when a hero changes.
 *
 * Its own look: the v2 field as a header band with a cropped pearl, the cards
 * on paper. `.theme-menu` scopes 43-menu.css and hides the splash curtain.
 */
export const metadata: Metadata = {
  title: 'PEARL on near.com — versions',
  robots: { index: false, follow: false },
};

type Swatch = { c: string; n: string };

const VERSIONS: {
  href: string; tag: string; name: string; lead: string;
  img: string; points: string[]; swatches: Swatch[];
}[] = [
  {
    href: '/v1',
    tag: 'v1',
    name: 'Pearl leads',
    lead: 'The full landing in Pearl’s own light: paper to blush, a drifting lustre, Pearl’s canvas below.',
    img: '/menu/v1.webp',
    points: ['Scroll tour + phone swap', 'Story, Security, 7 FAQs', 'NEAR green on the asks'],
    swatches: [
      { c: '#F0EFEA', n: 'Paper' },
      { c: '#f0c3ae', n: 'Blush' },
      { c: '#080807', n: 'Canvas' },
      { c: '#00EC97', n: 'NEAR' },
    ],
  },
  {
    href: '/v2',
    tag: 'v2',
    name: 'NEAR leads',
    lead: 'The same landing in near.com’s green, with Pearl as a co-brand: the lockup, the chip, the pearls.',
    img: '/menu/v2.webp',
    points: ['Hidden pearls follow the cursor', 'Simplified Pearl island', '5 FAQs from the launch post'],
    swatches: [
      { c: '#5EFAA7', n: 'Field' },
      { c: '#16B862', n: 'Deep' },
      { c: '#f0c3ae', n: 'Pearl' },
      { c: '#272727', n: 'Footer' },
    ],
  },
  {
    href: '/v3',
    tag: 'v3',
    name: 'The announcement',
    lead: 'One screen: “PEARL is now on near.com”, the ask, the swap running on the phone, then the footer.',
    img: '/menu/v3.webp',
    points: ['Hero + footer only', 'Link to the launch post', 'v2 colours'],
    swatches: [
      { c: '#5EFAA7', n: 'Field' },
      { c: '#1F1F1F', n: 'Ink' },
      { c: '#f0c3ae', n: 'Pearl' },
      { c: '#f6f2ed', n: 'Cream' },
    ],
  },
];

export default function Versions() {
  return (
    <>
      <span className="theme-menu" hidden />
      <main className="vm">
        <header className="vm-head">
          <div className="vm-pearl" aria-hidden="true" />
          <div className="vm-pearl sm" aria-hidden="true" />
          <div className="vm-headin">
            <div className="vm-brow">
              <span className="nearw" role="img" aria-label="near.com" />
              <Cobrand />
            </div>
            <p className="vm-kicker">Launch landing · review</p>
            <h1 className="vm-title">
              Three ways to say <span className="vm-chip">PEARL</span> is on near.com.
            </h1>
            <p className="vm-sub">
              Same product, same swap, three balances between the two brands.
              Open one to walk it end to end.
            </p>
          </div>
        </header>

        <ol className="vm-grid">
          {VERSIONS.map((v, i) => (
            <li key={v.tag}>
              <a className="vm-card" href={v.href}>
                <div className="vm-frame">
                  <div className="vm-bar" aria-hidden="true">
                    <i /><i /><i />
                    <span>near.com{v.href}</span>
                  </div>
                  <div className="vm-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static still, served as-is */}
                    <img src={v.img} alt={`${v.tag} hero`} width={1440} height={900} loading={i ? 'lazy' : 'eager'} />
                  </div>
                </div>

                <div className="vm-meta">
                  <p className="vm-num">0{i + 1} · {v.tag}</p>
                  <h2 className="vm-name">{v.name}</h2>
                  <p className="vm-lead">{v.lead}</p>
                  <ul className="vm-points">
                    {v.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <div className="vm-foot">
                    <ul className="vm-sw" aria-label="Palette">
                      {v.swatches.map((s) => (
                        <li key={s.n} style={{ background: s.c }} title={`${s.n} ${s.c}`} />
                      ))}
                    </ul>
                    <span className="vm-open">Open {v.tag} <span className="arw">&rarr;</span></span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>

        <p className="vm-note">Internal review page · not indexed · previews are stills of each hero at 1440 × 900</p>
      </main>
    </>
  );
}
