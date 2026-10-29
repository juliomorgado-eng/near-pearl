import type { ReactNode } from 'react';

/**
 * THE ONE CHAPTER'S COPY — Trade PEARL on near.com.
 * ==================================================================
 * Forked from the Confidential Perps landing, which had already dropped the
 * old four-chapter deck to one. One entry, and its `head` carries the hero
 * headline. The `id`/`face` values are the demo wiring's vocabulary (the
 * phone code still refers to the chapter by them), not page copy.
 *
 * Every composition of the tour renders from this array (both `.side`
 * columns wide, the interleaved `.mch` section narrow), so a wording change
 * lands everywhere at once.
 */
export type Card = {
  /** stable key, and the chapter's name in the step rail's own vocabulary */
  id: 'perps' | 'account' | 'swap' | 'earn';
  /** the ORIGINAL deck index — kept for the demo-app wiring, which still
      refers to cards by it even though only `perps` ever mounts here */
  face: 0 | 1 | 2 | 3;
  /** extra classes for the headline, where one of them needs them */
  headClass?: string;
  head: ReactNode;
  /** what sits beside the headline: a paragraph, or on Perps the quote */
  aside: ReactNode;
};

export const CARDS: Card[] = [
  {
    id: 'perps',
    face: 2,
    head: (
      <>
        Trade PEARL, confidentially.<br />
        Swap in from any chain, any asset you already hold.<br />
        All from near.com.<br />
        <span className="wordmark">Nobody can trace the trade back to you.</span>
      </>
    ),
    aside: (
      /* THE WHITE PLATE CARRIES THE PROOF. `.rollquote` keeps the plate —
         the white card, its padding and radius. */
      <div className="rollquote">
        <p>
          <b>$30B+</b> in all-time cross-chain volume. The same NEAR Intents
          settlement layer that routes your swap into PEARL.
        </p>
      </div>
    ),
  },
];

/**
 * THE RISK NOTE — a compliance requirement, not a design decision.
 *
 * Authored here because more than one composition needs it and a narrow layout
 * that quietly drops it is not a smaller version of this page, it is a
 * different one. Rendered under the first CTA of each composition (`.herolegal`)
 * and again at the foot of the tour (`.perpsdisc` / `.mdisc` — class names
 * kept from the perps fork, they are styling hooks only).
 *
 * TWO LINES, split on the `<br />`: two separate statements, not one sentence.
 */
export const RISK_NOTE = (
  <>
    PEARL is a new, volatile crypto asset and its value can fall to zero.
    <br />
    Nothing on this page is investment advice. Only trade what you can afford to lose.
  </>
);

/**
 * THE CLOSING PLATE'S WORDS, AND WHY THEY ARE WORDS AND NOT MARKUP.
 *
 * `Stage.tsx` sets these in three `.pw` units, because the closing plate's copy
 * is the hero recede run backwards and the engine walks `.pw` to do it. The
 * narrow composition has no closing plate — there is no shrink on a page whose
 * scroll is its own — so it renders the same sentences as an ordinary section,
 * and it must NOT wear `.pw`: `qsa('.pw')` is global, and a second set of them
 * would have the engine animating a block that is nowhere near the plate.
 *
 * Hence pieces rather than a node. Each composition brings its own wrapper and
 * the words cannot drift, which is the same bargain RISK_NOTE above already
 * makes.
 */
/**
 * THE Q4 PEARL CAMPAIGN'S LINK. PENDING: the tracked link / `ref` is still to
 * be confirmed by the campaign owner — this reuses the perps campaign's ref
 * with PEARL utm tags until then. Every "Start trading" on the page (nav,
 * hero, closing plate, mobile sticky and tour close) points here.
 */
export const CTA_URL =
  'https://near.com/login?ref=uykzkl1o&utm_source=pearlcampaign&utm_medium=landing&utm_campaign=near_q4_pearl';

export const PERM_WORDS = ['Get started with', 'a wallet or passkey.'] as const;
export const PERM_BODY =
  'Works with NEAR, Solana, EVM and more. No email, no KYC, no application. ' +
  'Just connect and start moving across 30+ chains.';
