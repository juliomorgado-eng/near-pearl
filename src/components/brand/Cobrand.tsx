/**
 * `× Pearl`, beside near's mark in the hero eyebrow (`.dw-brow`, 44-hero.css).
 *
 * The wordmark is Pearl Research's own logotype file, served as an <img>.
 */
export function Cobrand() {
  return (
    <span className="cobrand" role="img" aria-label="× Pearl">
      <span className="cox" aria-hidden="true">×</span>
      {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG mark */}
      <img className="pearlw" src="/logos/pearl-logotype.svg" alt="" />
    </span>
  );
}
