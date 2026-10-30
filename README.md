# near.com — PEARL is now on near.com

Campaign page for PEARL on near.com. PEARL is the native asset of Pearl, a
Proof of Useful Work Layer 1 by Pearl Research, now live on NEAR Intents. The
page is one announcement: swap into and out of PEARL across supported chains,
confidential by default, powered by NEAR Intents.

One hero over deep water — an underwater photograph whose water ripples and
whose light shimmers (a WebGL shader), a pearl that floats on its own layer,
drifting motes, and a scene that leans a little toward the cursor — with the
phone running the swap demo beside the copy.

Next.js 16 (App Router), React 19, Tailwind v4. Read `AGENTS.md` first —
Next 16 has breaking changes; the bundled docs live in
`node_modules/next/dist/docs/`.

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
src/app/            layout (metadata, curtain gate, Umami), page, not-found, OG image, globals.css
src/components/
  hero/             Hero (copy, asks, phone), DeepWater (the field), water-gl (shader), AppScreen
  Splash.tsx        the 2s curtain: a pearl rising through deep water, CSS only
  Nav.tsx           header: Sign in, Start trading (muted green)
  light/Footer.tsx  footer
  brand/Cobrand.tsx the `× Pearl` mark in the eyebrow
  demo/             the in-phone app (swap flow, account holdings, shell, icons)
  stage/phone/      the phone's flow machine and UI primitives
src/hooks/          analytics hooks, reduced motion
src/lib/            cards (risk note, CTA and blog links), analytics, prices/tokens (demo data)
src/styles/         numbered CSS layers, imported in order by globals.css;
                    44-hero.css is the page, 32-splash.css the curtain
public/img/water/   the water (pearl painted out) at 1280/2048/3200, and the pearl cut-out
docs/analytics.md   events, sources, attribution
```

The field's motion all stops under `prefers-reduced-motion`, and nothing
follows the cursor on a touch screen. Without WebGL the photograph stays still
with CSS light shafts over it.

## Where the copy lives

- `src/components/hero/Hero.tsx` — headline, lead, asks.
- `src/lib/cards.tsx` — `RISK_NOTE`, `CTA_URL`, `BLOG_URL`.
- `src/app/layout.tsx` — title and description (the hero's own words; change
  them together).

Describe Proof of Useful Work as what it is *designed* to do. The ticker on the
page is PEARL; the PRL on Coinbase/KuCoin is a different token.

## Campaign doors

`/pearl` and `/r/:source` are rewrites to `/`, read by `lib/analytics.ts` as the
traffic source. See `docs/analytics.md`. The retired drafts and review menu
(`/v1`–`/v4`, `/versions`) and `/preview` redirect to `/`.

## Open items

- **Blog link.** `BLOG_URL` points at the near.com blog index until the launch
  post has its own URL.
- **Tracked CTA link.** `CTA_URL` reuses the perps `ref` with PEARL utm tags;
  the final tracked link/ref is pending from the campaign owner.
- **Umami website id.** Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID`; it falls back to
  the perps landing's id, so both currently share a dashboard.
  `NEXT_PUBLIC_ANALYTICS_DOMAINS` sets the host filter.
- **404 and share image.** `not-found.tsx` and `opengraph-image.tsx` still wear
  the earlier pastel/green look.
- **Legacy CSS.** The older layers (07–31) still hold rules for the retired
  tour and light zone. The phone's screens and the nav, buttons and footer
  depend on parts of them, so they were kept whole rather than trimmed blind.
