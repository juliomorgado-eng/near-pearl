import { buildFlow, typing, type Chapter, type Step } from '@/components/demo/shell/flow';
import { AMOUNT, STOPS, SWAP_STEPS, TO, actions, initial, type SV, type SVAction } from './state';

const type_ = (act: SVAction, chars: string, lead?: number, gap?: number) =>
  typing<SV, SVAction>(act, chars, lead, gap);

/**
 * SWAP v5 — THE SHORT CUT
 * ==================================================================
 * The brief, in six lines:
 *
 *   the swap tab, pressed from the account
 *   USD Coin in the top field, 5000 typed, a destination already set
 *   the destination picker opens, a long list is flicked, PEARL is found
 *   PEARL is picked and the quote fills in — 2,777.78 PEARL at 1.80
 *   the trade is reviewed at full precision, then swapped, confidentially
 *   a success state, and back to the top
 *
 * THE ARITHMETIC. The deck plays every beat at `PACE` (1.25), and
 * `pnpm check:flows` asserts the product, so a beat that grows cannot quietly
 * move the clip's length.
 *
 *   scene 0    1,320ms   the account, and the tab that leaves it
 *   scene 1    1,980ms   a form that already knows half of what it needs
 *   scene 2    4,220ms   the list, and how long it is
 *   scene 3    2,900ms   the quote
 *   scene 4    2,180ms   the review sheet
 *   scene 5    5,400ms   one press, and Swap again
 *   outro        900ms   the account, which is also where it started
 *   ─────────────────
 *             18,900ms  ×1.25 = 23,625ms on screen
 *
 * THE DEAD HOLDS HAVE COME OUT, and the clip is shorter by exactly what they
 * were: 1,960 between the list stopping and the row being pressed, and 320 in
 * front of the first thing that happens. Neither moved somewhere else in the
 * script — a beat that is doing nothing is not a beat to spend elsewhere.
 * 28,700 → 25,850.
 *
 * It also said 5,600 here for two passes while authoring 6,180, and the
 * assertion caught it the moment a new scene made somebody add the column up.
 * Same lesson as the 3,300 below: a total in a comment is a claim, and this is
 * the only file in the repo where a claim is checked.
 *
 * The header above said 3,300 for scene 1 and 26,500 for the total on the
 * first pass, which is what the assertion is for: four digits at 160ms with a
 * 420ms lead is 900, not 1,900. Nobody would have caught that by reading.
 *
 * SCENE 1 KEPT ITS LENGTH THROUGH THREE PAIRS. It typed `2500` of Tether, then
 * tapped the balance for a whole position, then typed `0.25` of Bitcoin, and
 * now types `5000` of USD Coin into PEARL. Each typed amount is four glyphs
 * 160ms apart behind a 380ms lead — 860 — and the tap was given the same 860,
 * so the pair changed three times and the clock did not.
 *
 * IT IS PACED LIKE THE OLD PERPS CUT AND NOT LIKE ITS OWN FIRST DRAFT. Every
 * number below is the one that cut arrived at after two rounds of being too
 * fast: a 500ms rest after each value lands, sheets given longer than the 390ms
 * they take to arrive, and a hold on the last frame that is the longest beat in
 * the script. None of that was guessed twice.
 *
 * SIX STEPS, NOT ONE. The copy is not drawn on this route — the stage has no
 * headline — but the steps are what `check:flows` walks and what a reader of
 * this file needs to see the shape of the thing.
 */

const CHAPTERS: Chapter[] = [
  { id: 'acct', name: 'From the account', blurb: '' },
  { id: 'form', name: 'The form', blurb: '' },
  { id: 'list', name: 'The list', blurb: '' },
  { id: 'quote', name: 'The quote', blurb: '' },
  { id: 'send', name: 'Review, and one press', blurb: '' },
];

const STEPS: Step<SV, SVAction>[] = [
  /* ---- scene 0 · 1,320ms ----------------------------------------------
     THE ACCOUNT, AND THE TAB THAT LEAVES IT. The frame is on screen for 1,125ms
     and the whole scene for 1,650: it only plays from the second pass, once the
     reader has already watched a swap, and nothing on it moves, so what it
     owes here is not a read but an ANSWER — where the swap screen came from. */
  {
    id: 'home', ch: 'acct',
    title: 'Swap is a tab on your account',
    note: 'Not a page you navigate to and not another app: the third item in the bar, on the same account screen that holds the dollars being spent.',
    beats: [
      /* 700, AND IT WAS 1,400. Nothing moves on this screen — no figure is
         answering, no sheet is arriving, it is a frame the reader has already
         read on the way in. What it owes is the ANSWER to
         where the swap screen came from, and an answer does not need two
         seconds. 875ms of it, and then the press. */
      { ms: 700 },
      { ms: 200, set: { lit: 'tab:Swap' } },
      /* and this 420 is spent on the SWAP screen, not this one — the beat holds
         after its transition. It was 700 on top of scene 1's own 380, which is
         the same pause twice with a scene boundary between them. */
      { ms: 420, do: 'toSwap' },
    ],
  },

  /* ---- scene 1 · 1,980ms ---------------------------------------------- */
  {
    id: 'amount', ch: 'form',
    title: 'A form that already knows half of it',
    note: 'USD Coin is in the top field and the destination is the pair the app was last on. What is left is how much — 5,000 of the 18,400 the balance underneath says the wallet holds.',
    beats: [
      /* the opening frame: USD Coin in, NEAR already in the destination, nothing
         entered. It holds before anything moves, because what it is showing is
         a form that was filled in somewhere else.

         380, AND IT USED TO BE 700. What this frame has to say is that the pair
         is already there, and the pair is still there while the amount writes —
         the card does not change except for the figure in it. Holding it empty
         first was half a second of a screen that had already been read, and on
         a loop the reader has just watched the same form settle. */
      { ms: 380 },
      /* AND IT IS TYPED. An earlier cut spent a whole Tether position and got
         it in with one tap on the balance, because `6635.616976` is not a
         figure anyone enters by hand. `5000` is four characters and a PART of
         the holding, and `Use max` is the wrong gesture for a part. */
      ...type_('key', AMOUNT, 380, 160),
      { ms: 540 },
      /* and the chip is pressed here, on this screen, rather than the sheet
         simply being up on the next one */
      { ms: 200, set: { lit: 'to' } },
    ],
  },

  /* ---- scene 2 · 4,220ms ----------------------------------------------
     The list is the point of this scene and its length is the only thing it
     has to say, so it is given the most time of the six. TWO stops, not
     three: a throw down the catalogue past PEARL and a nudge back to it, which
     is the shape a thumb makes. See `STOPS` in state.ts for the rows. */
  {
    id: 'list', ch: 'list',
    title: 'Everything, and it keeps going',
    note: 'The picker opens on your own tokens, then the catalogue. PEARL is below the fold, so getting to it means passing a wallet and three coins you did not come for — which is the argument.',
    beats: [
      /* IT RESTS BEFORE IT MOVES. At 620 the track started travelling while the
         sheet was still arriving, so `Your tokens` — the wallet the account
         screen lists, with the same five quantities — went past unread. */
      { ms: 1200, do: 'picker' },
      /* DOWN, ONCE, past PEARL. 1,000 against 620ms of travel: the
         move is still the shorter half of the move-settle pair, which is what
         keeps it reading as somebody scrolling rather than as a cut, and the
         380 left over is the list coming to rest under its own weight. */
      { ms: 1000, do: 'scroll', arg: String(STOPS[0]) },
      /* and back four rows, to the coin the throw went past. Longer than the
         way down — a nudge back is the same gesture but the reader now knows
         what they are returning to, so the settle is what they are watching. */
      { ms: 1120, do: 'scroll', arg: String(STOPS[1]) },
      /* AND THEN IT PRESSES, rather than sitting on the answer. The beat is
         the last of the travel plus long enough to see PEARL arrive at the top.

         THE SCENE'S LENGTH DID NOT MOVE: 1,200 + 1,000 + 1,120 + 900 is the
         4,220 that 1,200 + 680 + 700 + 820 + 820 was. One fewer stop bought
         longer moves, not a shorter clip — `check:flows` reads the same
         18,900ms. */
      { ms: 900 },
    ],
  },

  /* ---- scene 3 · 2,900ms ---------------------------------------------- */
  {
    id: 'quote', ch: 'quote',
    title: 'The quote fills itself in',
    note: 'One tap on the destination and every derived figure on the screen answers: the rate, the amount out, the least you can receive.',
    beats: [
      { ms: 220, set: { lit: 'pick:' + TO } },
      { ms: 620, do: 'pick', arg: TO },
      /* the rest is the whole scene: four figures land at once and the eye
         needs somewhere to put them down */
      { ms: 2060 },
    ],
  },

  /* ---- scene 4 · 2,180ms ----------------------------------------------
     THE SHEET IS A SCENE, and it was nothing at all until now: `Review trade`
     used to settle the trade it named. It gets long enough to be read, because
     what it is for is the decimals the form rounds away — `2777.777` in the
     box, `2,777.77778` here — and a sheet that flashes past has stated
     nothing. */
  {
    id: 'review', ch: 'send',
    title: 'The trade, at full precision',
    note: 'The form rounds to what fits in a box. The sheet does not: the same figures to five decimals, the rate, and the least you can receive — and only then a button that trades.',
    beats: [
      { ms: 200, set: { lit: 'confirm' } },
      { ms: 480, do: 'confirm' },
      { ms: 1500 },
    ],
  },

  /* ---- scene 5 · 5,400ms ----------------------------------------------
     `step` runs one past the last row so all three read as done before the
     success state replaces them, because a settlement whose last line is still spinning when
     the screen changes is a settlement nobody saw finish. */
  {
    id: 'send', ch: 'send',
    title: 'One press',
    note: 'Finding best price, executing, swapped confidentially — 2,777.78 PEARL in, and nothing on a public ledger tying it to this account.',
    beats: [
      { ms: 200, set: { lit: 'swap' } },
      { ms: 420, do: 'swap' },
      { ms: 620, do: 'step' },
      { ms: 620, do: 'step' },
      { ms: 700, do: 'step' },
      /* all three ticked, and then the success state */
      { ms: 900, do: 'step' },
      { ms: 1120 },
      /* AND `SWAP AGAIN` IS PRESSED, which is what closes the loop. It used to
         be a button nobody touched and a four-second outro holding a frame the
         reader was done with; pressing it lands on the account, which is where
         this cut starts — so the seam is a gesture rather than a cut, and the
         outro is a beat rather than a scene. */
      { ms: 200, set: { lit: 'again' } },
      { ms: 620, do: 'again' },
    ],
  },
];

export const swapV5Flow = buildFlow<SV, SVAction>({
  initial,
  actions,
  chapters: CHAPTERS,
  steps: STEPS,
  /* THE FIRST PASS OPENS ON THE FORM, not on the account.
     Scene 0 exists to answer where the swap screen came from — Swap is a tab on
     the account, not a page you navigate to — and that answer is worth keeping.
     What it cannot do is be the FIRST thing this chapter shows, because the
     tour used to put the account chapter directly above it: scrolling from 02
     to 03 landed on the screen just left behind, and it looked stuck. And on
     the page as it is now this is the FIRST screen anyone sees, so it should
     open on the thing the page is selling — a trade into PEARL.

     So the establishing shot moves to pass two. Arrive at the chapter and the
     swap form is already up, which is what the chapter is named for; stay
     through one loop and the account, the tab and the press are all still
     there. Nothing is deleted and no beat is retimed — `check:flows` reads the
     same 18,900ms it did before. */
  openAt: 'amount',
  /* reduced motion gets the frame with the quote on it: the only one that
     shows both what was asked for and what it buys */
  restStep: 'quote',
  /* short, because the frame it holds is the frame the clip opens on: `again`
     has already taken the reader home, so the loop has nothing left to hide */
  outro: 900,
  anchor: {
    toSwap: 'amount',
    again: 'home',
    max: 'amount',
    picker: 'list',
    scroll: 'list',
    pick: 'quote',
    confirm: 'review',
    closeReview: 'quote',
    swap: 'send',
    step: 'send',
  },
  /* a settlement is not waiting for anyone: while a reader holds the wheel it
     ticks through the same transitions the beats fire */
  auto: (s) => (s.submitting && !s.done ? { after: 620, do: 'step' } : null),
});

export { SWAP_STEPS };
