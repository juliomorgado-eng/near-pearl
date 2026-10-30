import { CTA_URL } from '@/lib/cards';

/**
 * The header: transparent over the hero, near's mark hidden (the hero's
 * eyebrow carries the brand), Sign in and Start trading. Its look over the
 * water — white ghost, muted-green ask — is 44-hero.css.
 */
export function Nav() {
  return (
    <nav className="nav" id="nav">
      <a className="brand" href="#top" aria-label="near.com home">
        {/* near alone — the co-brand mark (The Rollup's pinwheel and the rule)
            was pulled from the header with every other eyebrow. The link's
            name says where it goes; the mark is decorative. near is the lockup
            with its N, the same file the hero uses, recut to black. */}
        <span className="brandnear" aria-hidden="true" />
      </a>
      <span className="navspacer" />
      <a className="btn btn-ghost" href={CTA_URL} target="_blank" rel="noopener" data-umami-event="cta-click" data-umami-event-pos="nav-signin">Sign in</a>
      <a className="btn btn-primary" href={CTA_URL} target="_blank" rel="noopener" data-umami-event="cta-click" data-umami-event-pos="nav-create">Start trading</a>
    </nav>
  );
}
