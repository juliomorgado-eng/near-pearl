'use client';
import { type ComponentType, type ReactNode } from 'react';
import { live, press } from '@/components/stage/phone/ui/tap';
import { EarnIcon, HomeIcon, MenuIcon, SwapIcon, WalletIcon, type IconProps } from '@/components/demo/icons';

/* ---- the device's own chrome ------------------------------------------ */

export type TabName = 'Home' | 'Assets' | 'Swap' | 'Earn' | 'Menu';

/**
 * THE FIVE TAB GLYPHS, from the phone's icon set — see `demo/icons.tsx`.
 *
 * `fl` IS GONE, AND WITH IT THE FILL WASH. The five icons used to be
 * hand-drawn here, and three of them tagged their closed shapes with `.fl` so
 * that `.dtab[aria-current] .fl` (17-demo.css) could flood them with 22%
 * green. Two never could: Swap is an open arrow and Assets' wallet body runs
 * back along its own top edge, so filling either paints a wedge across the
 * opening. The effect was therefore already true of three tabs out of five.
 *
 * A drawn set has no such marks and should not be given them — every glyph in
 * it is a stroke, and stroke icons fill badly for exactly the reason the two
 * exceptions above document. So the wash goes, and the active tab is what it
 * already was for Swap and Assets: the whole icon in `--near-green`, which
 * `.dtab[aria-current]` does through `color`. Five tabs behaving alike, rather
 * than three of one kind and two of another.
 */
const TAB_ICONS: Record<TabName, ComponentType<IconProps>> = {
  Home: HomeIcon,
  Assets: WalletIcon,
  Swap: SwapIcon,
  Earn: EarnIcon,
  Menu: MenuIcon,
};

/* EARN WHERE PERPS WAS. The app's bar carries Perps fourth; this page is about
   PEARL, near.com offers no PEARL perps, and a Perps tab under the swap is the
   one place the device would still be selling a product the page is not. */
const TABS: TabName[] = ['Home', 'Assets', 'Swap', 'Earn', 'Menu'];

/**
 * `on` may be a tab, or `'None'` — which is what the bar looks like on a screen
 * the bar has no item for. The earn page is one: it is reached from a balance
 * row on the home screen, and every item in the row is dim there. Lighting Home
 * would be the bar claiming you are somewhere you left.
 */
export function Tabs({ on, go, lit }: {
  on: TabName | 'None';
  /**
   * WHAT A TAB DOES, for the chapters that are reached through one.
   *
   * The bar was drawn and inert everywhere — the app's own furniture, correct
   * and untouchable. The swap chapter starts on the account and gets to its
   * screen the way anybody would: by pressing Swap down here. So a tab may now
   * carry a handler, and the ones that do not are what they always were.
   */
  go?: Partial<Record<TabName, (() => void) | null>>;
  /** which tab is being held down — see the note in 24-demo-app.css */
  lit?: string | null;
}) {
  return (
    <nav className="dtabs" aria-label="App sections">
      {TABS.map((t) => {
        const fn = go?.[t] ?? null;
        return (
          <span className={'dtab' + live(fn)} key={t} {...press(fn)}
                aria-current={t === on ? 'page' : undefined}
                data-tap={fn ? 'tab:' + t : undefined}
                data-lit={lit === 'tab:' + t ? '1' : undefined}>
            {/* 1.7, the weight the hand-drawn set was carrying here. The
                icons ship at 1.5, which reads thin at 21px against the label
                under it. */}
            {(() => { const Glyph = TAB_ICONS[t]; return <Glyph strokeWidth={1.7} />; })()}
            <em>{t}</em>
          </span>
        );
      })}
    </nav>
  );
}

/**
 * The layer every sheet rides on. It clips, so a closed sheet slides clear of
 * the phone rather than fading — a sheet that fades while it slides is
 * transparent for the length of the slide, and what shows through is the
 * screen it is leaving behind.
 */
export function Layer({ open, onScrim, children }: {
  open: boolean;
  /** what tapping outside does; null makes the sheet modal, as the app does */
  onScrim: (() => void) | null;
  children: ReactNode;
}) {
  return (
    <div className={'dlayer' + (open ? ' open' : '')} aria-hidden={!open}>
      <span className={'dscrim' + live(onScrim)} {...press(open ? onScrim : null)} />
      {children}
    </div>
  );
}
