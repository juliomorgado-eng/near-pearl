'use client';
import { useSyncExternalStore } from 'react';
import { BLOG_URL, CTA_URL, RISK_NOTE } from '@/lib/cards';
import { ChapterScreen } from '@/components/stage/phone/AppDevice';
import { Cobrand } from '@/components/stage/Cobrand';
import { GradientField } from '@/components/stage/GradientField';

/**
 * /v3 — THE ANNOUNCEMENT. One screen: the v2 field (green, the big pearl and
 * its hidden siblings, which still answer the cursor), the launch line, the
 * ask, and the phone running the swap into PEARL. No stage engine, no tour:
 * the device is `ChapterScreen` on its own clock, the way the narrow tour
 * draws it (MobileTour.tsx `ChapterDevice`), mounted on the client only so the
 * server HTML never carries a frame of a demo that is already moving.
 * Styles: 42-v3.css.
 */
const noop = () => () => {};

export function HeroV3() {
  // false in the server HTML, true from the first client render
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  return (
    <section className="v3hero" id="top" aria-label="PEARL on near.com">
      <GradientField />

      <div className="v3inner">
        <div className="v3copy">
          <div className="v3brow">
            <span className="nearw" role="img" aria-label="near.com" />
            <Cobrand />
          </div>

          <h1 className="display">
            <span className="k-asset">PEARL</span> is now on near.com
          </h1>
          <p className="v3lead">
            Swap into and out of PEARL across supported chains. Confidential by
            default. Powered by NEAR Intents.
          </p>

          <div className="v3cta">
            <a
              className="btn btn-primary btn-lg ripple-cta"
              href={CTA_URL}
              target="_blank"
              rel="noopener"
              data-umami-event="cta-click"
              data-umami-event-pos="v3-hero"
            >
              Trade PEARL on near.com <span className="arw">&rarr;</span>
            </a>
            <a
              className="v3link"
              href={BLOG_URL}
              target="_blank"
              rel="noopener"
              data-umami-event="cta-click"
              data-umami-event-pos="v3-blog"
            >
              Learn more about Pearl <span className="arw">&rarr;</span>
            </a>
          </div>

          <p className="v3legal">{RISK_NOTE}</p>
        </div>

        <div className="v3dev">{mounted ? <ChapterScreen at={0} /> : null}</div>
      </div>
    </section>
  );
}
