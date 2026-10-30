import type { Metadata } from 'next';
import { Footer } from '@/components/light/Footer';
import { HeroV3 } from '@/components/v3/HeroV3';

/**
 * `/v3` — the announcement page: v2's colours (the `.theme-near` marker) and
 * nothing but the hero and the footer. `.theme-v3` scopes 42-v3.css. Kept out
 * of the index, like /v2.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: '/v1' },
};

export default function Announcement() {
  return (
    <>
      <span className="theme-near" hidden />
      <span className="theme-v3" hidden />
      <main>
        <HeroV3 />
      </main>
      <Footer />
    </>
  );
}
