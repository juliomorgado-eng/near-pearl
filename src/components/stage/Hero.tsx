import { RISK_NOTE } from '@/lib/cards';

const LOGIN = 'https://near.com/login';

/**
 * The hero type and the ask above the fold.
 *
 * Each `.hw` unit falls back into the gradient on its own offset — the engine
 * owns those transforms, one window per line in `HW_RANGE` (schedule.ts). The
 * CTA block — button, friction, legal — rides --cue-out so it recedes on
 * exactly the same curve as the scroll cue and the headline. (The proof stat
 * that briefly sat here moved to the chapter's white plate — see
 * `CARDS[0].aside` in lib/cards.tsx.)
 */
export function Hero() {
  return (
    <>
      <div className="herotype live" id="herotype">
        <div className="inner" id="top">
          <h1 className="display long">
            <span className="hline"><span className="hw" data-hw="0">Trade PEARL, confidentially.</span></span>
            <span className="hline"><span className="hw" data-hw="1">Swap in from any chain, any asset you already hold.</span></span>
            <span className="hline"><span className="hw" data-hw="2">All from near.com.</span></span>
            <span className="hline"><span className="hw" data-hw="3"><span className="wordmark">Nobody can trace the trade back to you.</span></span></span>
          </h1>

          <div className="herocta">
            <a
              className="btn btn-primary btn-lg ripple-cta"
              href={LOGIN}
              target="_blank"
              rel="noopener"
              data-umami-event="cta-click"
              data-umami-event-pos="hero"
            >
              Start trading <span className="arw">&rarr;</span>
            </a>
            <p className="friction">No seed phrase. Ready in seconds.</p>
            <p className="herolegal">{RISK_NOTE}</p>
          </div>
        </div>
      </div>
      <div className="scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="bar" />
      </div>
    </>
  );
}
