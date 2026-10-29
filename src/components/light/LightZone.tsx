'use client';
import { useReveal } from '@/hooks/useReveal';
import { Faq } from './Faq';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';
import { MobileCta } from './MobileCta';
import { Security } from './Security';
import { Story } from './Story';

/**
 * Everything below the stage. It sits on cream paper with its own rounded
 * bottom, and the closing plate above it is sized to match that radius exactly.
 *
 * NO `GetStarted` CARD HERE. The stage's own closing plate (`.permcopy` wide,
 * `.mclose` narrow — see `Stage.tsx` / `MobileTour.tsx`) already contracts
 * into exactly this card — same headline, same body, same button
 * (`lib/cards.tsx`'s `PERM_WORDS` / `PERM_BODY`). A second copy of it here
 * would be the same card twice in a row.
 */
export function LightZone() {
  useReveal();

  return (
    <div className="light">
      <div className="lightbody">
        <Story />

        <Security />
        <Faq />
        <FinalCta />
      </div>

      <MobileCta />
      <Footer />
    </div>
  );
}
