'use client';
import { useReveal } from '@/hooks/useReveal';
import { Faq, FAQ_V2 } from './Faq';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';
import { MobileCta } from './MobileCta';
import { Security } from './Security';
import { Story } from './Story';
import { StoryV2 } from './StoryV2';

/**
 * Everything below the stage. It sits on cream paper with its own rounded
 * bottom, and the closing plate above it is sized to match that radius exactly.
 *
 * NO `GetStarted` CARD HERE. The stage's own closing plate (`.permcopy` wide,
 * `.mclose` narrow — see `Stage.tsx` / `MobileTour.tsx`) already contracts
 * into exactly this card — same headline, same body, same button
 * (`lib/cards.tsx`'s `PERM_WORDS` / `PERM_BODY`). A second copy of it here
 * would be the same card twice in a row.
 *
 * `/v2` trims the zone: the simplified Pearl island, no Security band, the
 * five blog-led questions. `/` renders exactly what it always has.
 */
export function LightZone({ variant = 'v1' }: { variant?: 'v1' | 'v2' }) {
  const v2 = variant === 'v2';
  useReveal();

  return (
    <div className="light">
      <div className="lightbody">
        {v2 ? <StoryV2 /> : <Story />}

        {!v2 && <Security />}
        <Faq items={v2 ? FAQ_V2 : undefined} />
        <FinalCta />
      </div>

      <MobileCta />
      <Footer />
    </div>
  );
}
