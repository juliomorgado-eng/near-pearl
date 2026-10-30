'use client';
import { useAcquisition } from '@/hooks/useAcquisition';
import { useCtaViews } from '@/hooks/useCtaViews';

/**
 * THE TWO HOOKS THAT NEED A CLIENT, MOUNTED ONCE.
 *
 * IT LIVES IN THE LAYOUT, so the acquisition cookie is written wherever a
 * reader lands. `useCtaViews` watches any `[data-umami-event-pos]` button,
 * which every ask on the page is.
 *
 * IT RENDERS NOTHING. No wrapper, no provider — the hooks talk to the document
 * and to `window.umami`, neither of which is React's to hold.
 */
export function Analytics() {
  useAcquisition();
  useCtaViews();
  return null;
}
