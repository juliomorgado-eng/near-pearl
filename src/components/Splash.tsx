/**
 * THE CURTAIN — a pearl rising through deep water, two seconds, no JavaScript
 * =====================================================================
 * A short intro that covers the first ~2s of the page. It is not decoration
 * for its own sake: the faces this page loads are declared `font-display:swap`
 * (01-fonts.css), so the display headline — the largest thing on the page —
 * visibly re-shapes when Montreal lands, and the water's shader and the phone
 * both arrive a beat after hydration. The first second is when the page moves
 * most without anyone asking it to. The curtain covers exactly that window and
 * hands it to the brand instead.
 *
 * IT IS A CURTAIN AND NOT A PROGRESS BAR: the animation starts when the
 * stylesheet is parsed and finishes on its own clock (`--sp-run`,
 * 32-splash.css) without ever asking whether the page is ready. The session
 * gate in `layout.tsx` shortens it on every load after the first.
 *
 * Server-rendered markup and keyframes only, so it paints before hydration
 * and ships no client JavaScript; every image in it is a CSS background.
 */
export function Splash() {
  return (
    /* aria-hidden and not one character of text inside it. It stays in the DOM
       for the life of the page — the exit is `visibility:hidden`, not an
       unmount — so anything readable in here would be read out on every visit
       for the sake of two seconds of decoration. */
    <div className="splash" aria-hidden="true">
      <div className="sp-deep">
        <div className="sp-pearl">
          <i className="sp-ring" />
          <i className="sp-ring" />
          <span className="sp-orb" />
        </div>
        <div className="sp-brow">
          <span className="sp-near" />
          <span className="sp-x">×</span>
          <span className="sp-pw" />
        </div>
      </div>
    </div>
  );
}
