'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * SEVEN QUESTIONS, PEARL-SPECIFIC — the AEO/GEO core. Both the visible
 * accordion and the FAQPage JSON-LD below read from this one array, so the
 * two can never say something different from each other. Keep the Proof of
 * Useful Work answers hedged ("designed to"), and keep the PRL disambiguation:
 * it is the one answer that stops a reader buying the wrong token.
 */
const ITEMS: { q: string; a: string }[] = [
  {
    q: 'What is Pearl?',
    a: 'Pearl is a Layer 1 blockchain built by Pearl Research, live on mainnet since April 27, 2026. PEARL is its native asset, with a 2.1B hard cap, no pre-mine or investor allocation (as reported by the project), roughly 3-minute blocks and no halvings.',
  },
  {
    q: 'What is Proof of Useful Work?',
    a: "Pearl's consensus. GPU miners run matrix multiplication, the core math of AI training and inference, and the protocol is designed so that the same work produces the proofs that secure the chain and issue PEARL.",
  },
  {
    q: 'Is PEARL the same as PRL?',
    a: 'Partly. NEAR Intents lists the Pearl network\'s asset under the symbol PRL. But the PRL listed on exchanges such as Coinbase and KuCoin is a different, unrelated token (Perle). On near.com, look for PEARL on the Pearl network.',
  },
  {
    q: 'How do I buy PEARL on near.com?',
    a: 'Sign in with a passkey or wallet, pick PEARL and choose what to pay with: any supported asset, on any supported chain. NEAR Intents finds the route. No bridge to pick, no wrapped token to manage.',
  },
  {
    q: 'Are my swaps private?',
    a: 'Yes. near.com has been confidential by default since September, so your PEARL swaps happen out of public view and nobody can trace the trade back to you.',
  },
  {
    q: 'Can my wallet or app offer PEARL?',
    a: 'Yes. The Pearl network is on the NEAR Intents 1Click API. If you already use NEAR Intents, PEARL cross-chain swaps come through the integration you already have. One integration, not a new project.',
  },
  {
    q: 'How do I turn PEARL into stablecoins?',
    a: 'Swap PEARL for a stablecoin on near.com and choose the chain you want it on, such as the one your bills are paid from. The swap is confidential by default.',
  },
];

/**
 * FIVE, FROM THE LAUNCH POST — /v2's set. Each answer is the post's own
 * argument cut to a sentence or two; the PRL note rides in the first answer
 * rather than getting a question of its own.
 */
export const FAQ_V2: { q: string; a: string }[] = [
  {
    q: 'What is PEARL?',
    a: "PEARL is the native asset of Pearl, a Proof of Useful Work network. Pearl is designed to let GPUs run AI workloads while producing the proofs that secure the chain. On NEAR Intents it is listed as PRL; it is not the unrelated Perle token traded under the same symbol.",
  },
  {
    q: 'How do I trade PEARL on near.com?',
    a: 'Swap supported assets from other chains into PEARL, or take PEARL out to the wider onchain economy, from one interface. NEAR Intents finds the route, so there is no bridge to pick.',
  },
  {
    q: 'Are my PEARL swaps private?',
    a: 'Yes. near.com has been confidential by default since September, so your swaps happen out of public view.',
  },
  {
    q: 'Can my wallet or app offer PEARL?',
    a: 'Yes. The Pearl network is on the NEAR Intents 1Click API. If you already use NEAR Intents, PEARL is one more supported asset on the same integration, not a new project.',
  },
  {
    q: 'How do I turn PEARL into stablecoins?',
    a: 'Swap PEARL for a stablecoin on near.com and pick the chain your bills are paid from. For GPU operators paid in PEARL, that closes the gap without broadcasting the trade.',
  },
];

/**
 * FAQPage JSON-LD, FOR AEO/GEO. `mainEntity` is the items array, mapped
 * verbatim — question in `name`, answer in `acceptedAnswer.text`. One source,
 * two readers: this script tag and the accordion below.
 */
const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
});

/**
 * Hiding an answer until it is asked for is the right behaviour in an FAQ and
 * nowhere else on this page — which is why the accordion lives here and not in
 * a shared component.
 *
 * The panel animates on max-height, so the open height is a measured pixel
 * value. It has to be RE-measured on resize: a panel measured at one width
 * clips its own answer at a narrower one.
 */
export function Faq({ items = ITEMS }: { items?: { q: string; a: string }[] }) {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
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
            {items.map((item, i) => (
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
