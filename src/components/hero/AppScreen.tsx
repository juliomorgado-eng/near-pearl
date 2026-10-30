'use client';
import { useDeck } from '@/components/demo/shell/deck';
import { Phone } from '@/components/demo/swapv5/Phone';
import { swapV5Flow } from '@/components/demo/swapv5/script';

/**
 * THE PHONE'S SCREEN: near.com's swap, USD Coin into PEARL, playing its own
 * scripted flow on its own clock (`useDeck`). It is the page's whole argument
 * in one screen; `Hero` mounts it on the client only.
 */
export function AppScreen() {
  const d = useDeck(swapV5Flow);
  return <Phone d={d} />;
}
