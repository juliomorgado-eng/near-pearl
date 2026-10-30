import { Nav } from '@/components/Nav';
import { Footer } from '@/components/light/Footer';
import { Hero } from '@/components/hero/Hero';

/**
 * `/` — the announcement: the header, one hero over deep water, the footer.
 * Layout and ink are 44-hero.css; the curtain is `Splash`, from the layout.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
