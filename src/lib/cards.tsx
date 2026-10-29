import type { ReactNode } from 'react';

/**
 * THE ONE CHAPTER'S COPY
 * ==================================================================
 * Used to be four chapters (Perps, Account, Swap, Earn) — `/v2` still runs
 * all four, off its own `lib/v2/cards.tsx`. This route dropped to Perps
 * alone, so there is one entry, and its `head` carries the supplied hero
 * headline rather than the deck's old "Trade where the liquidity is..."
 * line — that text made sense as one voice among four; alone, it is not the
 * page's opening statement any more, and the headline is.
 *
 * Every composition of the tour still renders from this array (both `.side`
 * columns wide, the interleaved `.mch` section narrow), so a wording change
 * still lands everywhere at once — see the note this replaced for why the
 * pairing lives here rather than authored twice in `Lockup.tsx`.
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
        Trade perps, confidentially.<br />
        Fund from any chain, any asset you already hold.<br />
        All from near.com.<br />
        <span className="wordmark">Nobody can trace your position back to you.</span>
      </>
    ),
    aside: (
      /* THE WHITE PLATE CARRIES THE PROOF. `.rollquote` keeps the plate —
         the white card, its padding and radius. */
      <div className="rollquote">
        <p>
          <b>$30B+</b> in all-time cross-chain volume. The same NEAR Intents
          settlement layer that routes your funding into a position.
        </p>
      </div>
    ),
  },
];

/**
 * THE JURISDICTION AND RISK NOTE — a legal requirement, not a design decision.
 *
 * Authored here because more than one composition needs it and a narrow layout
 * that quietly drops it is not a smaller version of this page, it is a
 * different one. Rendered under the first CTA of each composition (`.herolegal`)
 * and again at the foot of the tour (`.perpsdisc` / `.mdisc`).
 *
 * TWO LINES, split on the `<br />`: the supplied copy is two separate
 * disclaimers, not one sentence.
 */
export const PERPS_NOTE = (
  <>
    Perps are not available to US persons or in other restricted jurisdictions.
    <br />
    Leveraged trading carries a substantial risk of loss.
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
 * the words cannot drift, which is the same bargain PERPS_NOTE above already
 * makes.
 */
/**
 * THE Q3 PERPS CAMPAIGN'S TRACKED LINK. Every "Start trading" on the page
 * (nav, hero, closing plate, mobile sticky and tour close) points here —
 * "Sign in" in the nav is the one exception, since it is not the campaign's
 * ask.
 */
export const CTA_URL =
  'https://near.com/login?ref=uykzkl1o&utm_source=perpscampaign&utm_medium=landing&utm_campaign=near_q3_perps';

export const PERM_WORDS = ['Get started with', 'a wallet or passkey.'] as const;
export const PERM_BODY =
  'Works with NEAR, Solana, EVM and more. No email, no KYC, no application. ' +
  'Just connect and start moving across 30+ chains.';
