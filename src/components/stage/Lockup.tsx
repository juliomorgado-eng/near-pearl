import { CARDS, CTA_URL, RISK_NOTE } from '@/lib/cards';
import { PhoneShell } from './phone/PhoneShell';
import { Cobrand } from './Cobrand';

/**
 * THE CARD LOCKUP — copy left, phone centre, offer and CTA right.
 *
 * Three stacks of ONE face now (`lib/cards.tsx` trimmed the deck to one chapter) —
 * `/v2` still walks four, index-aligned across `.side.l .face`, `.cswap >
 * .face` and `.side.r .face`.
 *
 * `.lockup-tall` IS THIS ROUTE'S OWN CSS FORK. `.side.l{min-height:172px}`
 * (13-rollup.css) was tuned for the old deck's headlines, three clauses at
 * most — this route's headline is the hero's own four-sentence statement,
 * and at four lines it overflowed its absolutely-positioned face down into
 * `.side.r`'s row (the exact failure the file's own "BREATHING ROOM" note
 * describes for a shorter overflow than this one). The class raises the
 * floor without touching `/v2`'s three-line cards.
 */
export function Lockup() {
  return (
    <div className="lockup lockup-tall" id="lockup">
      {/* near.com alone. The eyebrow was a co-brand lockup — The Rollup's
          pinwheel, a hairline rule, then near with its N — and The Rollup's
          mark and the rule were pulled from it (and from the narrow tour, the
          curtain and the nav) on request. */}
      <div className="rollbrow">
        <span className="nearw" role="img" aria-label="near.com" />
        <Cobrand />
      </div>

      {/* THE HEADLINES, RENDERED FROM `CARDS`. Both columns walk the same
          array, so the pairing that the engine relies on — `.side.l .face[n]`
          and `.side.r .face[n]` are the same chapter — is now a fact of the
          data rather than a convention two blocks of markup had to keep. */}
      <div className="side l">
        {CARDS.map((c) => (
          <div className="face" data-face={c.face} key={c.id}>
            <h2 className={'h1' + (c.headClass ?? '')}>{c.head}</h2>
          </div>
        ))}
      </div>

      <div className="rollcta">
        <div className="ctagroup">
          <a
            className="btn btn-primary btn-lg ripple-cta"
            href={CTA_URL}
            target="_blank"
            rel="noopener"
            data-umami-event="cta-click"
            data-umami-event-pos="lockup"
          >
            Start trading <span className="arw">&rarr;</span>
          </a>
          <a
            className="btn btn-outline btn-lg"
            href="https://near.com"
            target="_blank"
            rel="noopener"
            data-umami-event="cta-click"
            data-umami-event-pos="lockup-learn-more"
          >
            Learn more
          </a>
        </div>
        <p className="friction">No seed phrase. Ready in seconds.</p>
      </div>

      <p className="perpsdisc">{RISK_NOTE}</p>

      <PhoneShell />

      <div className="side r">
        {CARDS.map((c) => (
          <div className="face" data-face={c.face} key={c.id}>{c.aside}</div>
        ))}
      </div>
    </div>
  );
}
