'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * FIVE QUESTIONS, PERPS-SPECIFIC — the AEO/GEO core. Both the visible
 * accordion and the FAQPage JSON-LD below read from this one array, so the
 * two can never say something different from each other.
 */
const ITEMS: { q: string; a: string }[] = [
  {
    q: 'What are perps?',
    a: "Perpetual futures are contracts that let you take a leveraged long or short position on an asset's price without an expiry date. On near.com, you trade 50+ perp markets with up to 40x leverage through a direct integration of Hyperliquid.",
  },
  {
    q: 'How do I fund a perps position?',
    a: "Fund from any asset on any chain in your account. NEAR Intents auto-swaps your assets to the margin currency, so you don't have to bridge or move funds to a separate venue first.",
  },
  {
    q: 'What leverage can I trade with?',
    a: 'Up to 40x leverage across 50+ markets. Higher leverage increases both potential gains and potential losses.',
  },
  {
    q: 'Do I control my assets?',
    a: 'Yes. Funding and settlement are signed on your device and route through NEAR Intents. Your assets stay in your control until you open a position.',
  },
  {
    q: 'Is my position private?',
    a: 'near.com provides you with a dedicated account for trading perpetuals on the Hyperliquid platform. Deposits and withdrawals to and from that account are confidential.',
  },
];

/**
 * FAQPage JSON-LD, FOR AEO/GEO. `mainEntity` is the ITEMS array, mapped
 * verbatim — question in `name`, answer in `acceptedAnswer.text`. One source,
 * two readers: this script tag and the accordion below.
 */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

/**
 * Hiding an answer until it is asked for is the right behaviour in an FAQ and
 * nowhere else on this page — which is why the accordion lives here and not in
 * a shared component.
 *
 * The panel animates on max-height, so the open height is a measured pixel
 * value. It has to be RE-measured on resize: a panel measured at one width
 * clips its own answer at a narrower one.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const remeasure = () => {
      panels.current.forEach((pn, i) => {
        if (!pn) return;
        pn.style.maxHeight = i === open ? pn.scrollHeight + 'px' : '0px';
      });
    };
    remeasure();
    addEventListener('resize', remeasure);
    return () => removeEventListener('resize', remeasure);
  }, [open]);

  return (
    <section className="band" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="shell split top">
        <div className="copy rv">
          <h2 className="h1">Common questions</h2>
          <p className="lead" style={{ color: 'var(--l-fg-2)' }}>
            Everything people ask before they open an account.
          </p>
        </div>
        <div className="rv">
          <div className="acc">
            {ITEMS.map((item, i) => (
              <div className={'acc-item' + (open === i ? ' open' : '')} key={item.q}>
                <button
                  className="acc-btn"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="plus">+</span>
                  <span className="t">{item.q}</span>
                </button>
                <div
                  className="acc-panel"
                  ref={(el) => { panels.current[i] = el; }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
