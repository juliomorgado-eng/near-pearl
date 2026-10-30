import type { Metadata } from 'next';
import { Site } from '@/components/Site';

/**
 * `/v2` — the same page as `/`, with near.com's colours leading instead of
 * Pearl's. The hidden marker is the whole switch: 41-theme-near.css scopes
 * every rule to `html:has(.theme-near)`. `variant` swaps the light zone's
 * content (LightZone.tsx). Kept out of the index; it is a
 * variant for review, and `/v1` is the canonical page.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: '/v1' },
};

export default function NearTheme() {
  return (
    <>
      <span className="theme-near" hidden />
      <Site variant="v2" />
    </>
  );
}
