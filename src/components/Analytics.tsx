'use client';
import { useAcquisition } from '@/hooks/useAcquisition';
import { useChapterViews } from '@/hooks/useChapterViews';
import { useCtaViews } from '@/hooks/useCtaViews';

/**
 * THE THREE HOOKS THAT NEED A CLIENT, MOUNTED ONCE.
 *
 * IT LIVES IN THE LAYOUT, NOT IN `Site`, so the acquisition cookie is written
 * wherever a reader lands.
 *
 * `useChapterViews` READS `@/stage/bus`, which `/`'s own stage engine writes
 * to — one chapter now, not four, but still a chapter with dwell worth
 * measuring. On `/v2` this same call is inert: that route's engine writes to
 * its own `@/v2/stage/bus` instead, so this one observes nothing there, same
 * as it would on any page with no stage at all. `useCtaViews` watches any
 * `[data-umami-event-pos]` button, which every ask on the page still is.
 *
 * IT RENDERS NOTHING. No wrapper, no provider — the hooks talk to the document
 * and to `window.umami`, neither of which is React's to hold.
 */
export function Analytics() {
  useAcquisition();
  useCtaViews();
  useChapterViews();
  return null;
}
