import type { Metadata } from 'next';
import { Site } from '@/components/Site';

/**
 * `/v1` — the Pearl-led landing. It was `/` until the review menu took the
 * root (app/page.tsx); it is still the canonical landing the other two point at.
 *
 * `<Site />` is Nav, the static hero, the ask, and the light zone
 * (the PEARL story, security, FAQ, closing plate, footer) — see the note on
 * `Site.tsx` for what that replaced.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/v1' },
};

export default function Home() {
  return <Site />;
}
