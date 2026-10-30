'use client';
import { useSyncExternalStore } from 'react';
import { BLOG_URL, CTA_URL, RISK_NOTE } from '@/lib/cards';
import { Cobrand } from '@/components/brand/Cobrand';
import { AppScreen } from './AppScreen';
import { DeepWater } from './DeepWater';

/**
 * THE PAGE. The announcement — PEARL is now on near.com — with the phone
 * running the swap, over a dark underwater photograph: light coming down from
 * the surface, one pearl hanging behind the device. The field is `DeepWater`; layout and ink are 44-hero.css.
 * The phone mounts on the client only, so the server HTML never carries a
 * frame of a demo that is already moving.
 */
const noop = () => () => {};

export function Hero() {
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  return (
    <section className="dw-hero" id="top" aria-label="PEARL on near.com">
      <DeepWater />

      <div className="dw-inner">
        <div className="dw-copy">
          <div className="dw-brow">
            <span className="nearw" role="img" aria-label="near.com" />
            <Cobrand />
          </div>

          <h1 className="display">
            <span className="dw-chip"><span className="dw-chip-t">PEARL</span></span> is now on <span className="dw-near">near.com</span>
          </h1>
          <p className="dw-lead">
            Swap into and out of PEARL across supported chains. Confidential by
            default. Powered by NEAR Intents.
          </p>

          <div className="dw-cta">
            <a
              className="btn btn-lg dw-ask"
              href={CTA_URL}
              target="_blank"
              rel="noopener"
              data-umami-event="cta-click"
              data-umami-event-pos="hero"
            >
              Trade PEARL on near.com <span className="arw">&rarr;</span>
            </a>
            <a
              className="dw-link"
              href={BLOG_URL}
              target="_blank"
              rel="noopener"
              data-umami-event="cta-click"
              data-umami-event-pos="hero-blog"
            >
              Learn more about Pearl <span className="arw">&rarr;</span>
            </a>
          </div>

          <p className="dw-legal">{RISK_NOTE}</p>
        </div>

        <div className="dw-dev">{mounted ? <AppScreen /> : null}</div>
      </div>
    </section>
  );
}
