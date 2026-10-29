# near.com — Trade PEARL, confidentially

Campaign landing for PEARL on near.com. PEARL is the native asset of Pearl, a
Proof of Useful Work Layer 1 by Pearl Research, now live on NEAR Intents. The
page sells one thing: swap into PEARL from any chain and asset, confidentially,
from near.com.

Forked from the near.com "Confidential Perps" landing. Next.js 16 (App Router),
React 19, Tailwind v4, GSAP. Read `AGENTS.md` first — Next 16 has breaking
changes; the bundled docs live in `node_modules/next/dist/docs/`.

## Commands

```
pnpm install
pnpm dev           # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build
pnpm check:flows   # walks the demo scripts: reachability, clip lengths
```

## Structure

```
src/app/            layout (metadata, Umami), page, not-found, OG image, globals.css
src/components/
  Site.tsx          Nav + Stage + LightZone
  stage/            hero, scroll-scrubbed lockup, narrow MobileTour, phone shell
  demo/             the in-phone app demos
  light/            Story, Security, Faq (+ JSON-LD), FinalCta, MobileCta, Footer
src/stage/          the scroll engine
src/hooks/          reveal, CTA contract, analytics hooks
src/lib/            cards (copy), analytics, prices/tokens/schedule (demo data)
src/styles/         numbered CSS layers, imported in order by globals.css
docs/analytics.md   events, sources, attribution
```

## Two themes

- `/` — Pearl leads: paper-to-blush field, Pearl canvas below, NEAR green on the asks and the rails.
- `/v2` — NEAR leads: the perps landing's green field, paper light zone, #272727 footer. Same components and copy; `app/v2/page.tsx` renders a hidden `.theme-near` marker and `src/styles/41-theme-near.css` scopes every override to `html:has(.theme-near)`. Noindex, canonical `/`.

## Where the copy lives

- `src/lib/cards.tsx` — the headline, the $30B+ proof plate, `RISK_NOTE`,
  the closing plate (`PERM_WORDS` / `PERM_BODY`) and `CTA_URL`.
- `src/components/stage/Hero.tsx` — hidden hero; mirrors the headline.
- `src/components/light/Story.tsx` — the editorial band, from the launch post.
- `src/components/light/Security.tsx`, `Faq.tsx`, `FinalCta.tsx`.
- `src/app/layout.tsx` — title, description, build version.

Keep figures consistent: NEAR Intents is **$30B+** all-time cross-chain volume
everywhere. Describe Proof of Useful Work as what it is *designed* to do. The
ticker on the page is PEARL; the PRL on Coinbase/KuCoin is a different token.

## Campaign doors

`/pearl` and `/r/:source` are rewrites to `/`, read by `lib/analytics.ts` as the
traffic source. See `docs/analytics.md`.

## Open items

- **Tracked CTA link.** `CTA_URL` reuses the perps `ref` with PEARL utm tags;
  the final tracked link/ref is pending from the campaign owner.
- **Umami website id.** Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID`; it falls back to
  the perps landing's id, so both currently share a dashboard.
  `NEXT_PUBLIC_ANALYTICS_DOMAINS` sets the host filter.
- **Deploy.** Vercel project and production domain not set up yet.
- **Marquee CSS.** The testimonial band is gone but its rules remain in
  `08-light.css`, `09-responsive.css`, `10-conversion.css`, `12-motion.css`
  and the `--mgap` / `--mspeed` tokens in `02-tokens.css`; safe to delete.
