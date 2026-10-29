'use client';
import { useRef } from 'react';
import { useCtaContract } from '@/hooks/useCtaContract';
import { CTA_URL } from '@/lib/cards';

/**
 * The closing plate. It enters full-bleed and contracts to a resting inset —
 * the same shape of move as the stage shrink, and it deliberately matches the
 * light panel's own bottom radius so the two read as one surface.
 *
 * No `.rv` here: its translateY(16px) would move the top edge, and the top edge
 * is the one thing that has to stay put through the contract.
 *
 * NO PHOTOGRAPH, NO `.ctagrad`. The plate is flat — the same green the footer
 * takes right after it (31-hero-green.css) — so there is no layer left for a
 * parallax hook to drift; `useCtaParallax` went with it.
 *
 * NO BODY LINE. It was "Your account is seconds away" / "No email. No KYC.
 * Pick a wallet or passkey and you're in." — the supplied copy is a single
 * headline and the button, nothing under it; the fee-and-friction case was
 * already made at the hero and again at `GetStarted`.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  useCtaContract(ref);

  return (
    <section className="finalcta" id="start" ref={ref}>
      <div className="inner">
        <h2 className="h1">Trade PEARL <span className="wordmark">confidentially.</span></h2>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <a
            className="btn btn-primary btn-lg"
            href={CTA_URL}
            target="_blank"
            rel="noopener"
            data-umami-event="cta-click"
            data-umami-event-pos="final"
          >
            Start trading <span className="arw">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
