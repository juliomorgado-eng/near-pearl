import { Nav } from '@/components/Nav';
import { Stage } from '@/components/stage/Stage';
import { LightZone } from '@/components/light/LightZone';

/**
 * The page.
 *
 * NO `QuoteBand`. It repeated the stage's own proof stat a second time right
 * after the stage — harmless at four chapters' worth of scroll between the
 * two, redundant at one. `LightZone`'s editorial band (`Story`) carries the
 * why-PEARL job from here.
 */
export function Site({ variant = 'v1' }: { variant?: 'v1' | 'v2' }) {
  return (
    <>
      <Nav />
      <Stage />
      <LightZone variant={variant} />
    </>
  );
}
