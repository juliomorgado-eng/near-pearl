import { ImageResponse } from 'next/og';

/**
 * THE SHARE CARD, GENERATED, NOT SHIPPED AS A FILE.
 *
 * It was a static JPG of the night skyline with The Rollup's lockup on it —
 * two things this page no longer is. A generated image cannot go stale the
 * same way: it is drawn from the same two marks (`NearGlyph`, `NearMark` in
 * `components/marks`) the header and the hero eyebrow use, on the same field
 * colour as the hero and the footer, so there is nothing here to fall out of
 * step with the page it is a card for.
 *
 * DELIBERATELY BARE. The brief was "only the logotype and the field" — no
 * headline, no proof stat, no city. PEARL: the field is the hero's paper →
 * blush sweep with its white sheen, and the lockup gains "× " and a PEARL
 * token disc (canvas #080807, a pearl inside it). A share card is read at thumbnail
 * size, where a page's own hierarchy of claim-then-detail has no room to
 * work; the mark and the colour are the two things that still read at 40px
 * tall in a timeline.
 *
 * BUILT AT REQUEST TIME, ONCE. There are no route params here, so Next
 * renders this once at build and serves the same PNG after that — the same
 * caching behaviour the static file had.
 */
export const alt = 'near.com — Trade PEARL, confidentially.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F0EFEA',
          backgroundImage:
            'radial-gradient(58% 52% at 74% 22%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0) 72%), linear-gradient(150deg, #F0EFEA 0%, #F0EFEA 45%, #f0c3ae 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {/* NearGlyph, the N ribbon — same mark as the account avatar and
              the nav's icon, recoloured from currentColor to the hero's own
              ink so it reads dark on this field. */}
          <svg width="140" height="140" viewBox="0 0 351 351" fill="#1F1F1F">
            <path d="m313.61,0c-13,0-25.07,6.74-31.88,17.82l-73.37,108.93c-2.39,3.59-1.42,8.43,2.17,10.82,2.91,1.94,6.76,1.7,9.41-.58l72.22-62.64c1.2-1.08,3.05-.97,4.13.23.49.55.75,1.26.75,1.99v196.12c0,1.62-1.31,2.92-2.93,2.92-.87,0-1.69-.38-2.24-1.05L73.56,13.24C66.46,4.84,56.02,0,45.02,0h-7.63C16.74,0,0,16.74,0,37.39v276.22c0,20.65,16.74,37.39,37.39,37.39,13,0,25.07-6.74,31.88-17.82l73.37-108.93c2.39-3.59,1.42-8.43-2.17-10.82-2.91-1.94-6.76-1.7-9.41.58l-72.22,62.64c-1.2,1.08-3.05.97-4.13-.23-.49-.55-.75-1.26-.74-1.99V78.27c0-1.62,1.31-2.92,2.93-2.92.86,0,1.69.38,2.24,1.05l218.28,261.37c7.11,8.39,17.55,13.23,28.54,13.24h7.63c20.65.01,37.4-16.72,37.42-37.37V37.39C351,16.74,334.26,0,313.61,0Z" />
          </svg>
          {/* NearMark, the near.com wordmark — same paths the header brand
              and the hero's eyebrow draw. */}
          <svg width="430" height="118" viewBox="452 40 988 272" fill="#1F1F1F">
            <path d="m595.42,49.72c-26.61,0-45.96,6.29-62.4,20.8l-29.03,25.15c-2.42,1.94-7.26,3.39-10.64.48-3.39-2.9-3.87-6.77-.97-10.64l15.48-23.22c2.42-3.39.49-7.74-3.87-7.74h-37.25c-4.35,0-7.74,3.39-7.74,7.74v226.4c0,4.35,3.39,7.74,7.74,7.74h38.7c4.35,0,7.74-3.39,7.74-7.74v-127.71c0-58.53,48.86-67.72,67.24-67.72,39.18,0,53.21,28.06,53.21,49.34v146.09c0,4.35,3.39,7.74,7.74,7.74h38.7c4.35,0,7.74-3.39,7.74-7.74v-150.93c0-54.18-35.32-88.04-92.4-88.04Z" />
            <path d="m845.5,48.75c-74.98,0-122.87,45.96-122.87,108.36v34.35c0,65.79,47.89,110.78,122.87,110.78,66.27,0,112.71-34.35,117.55-80.79.49-4.84-2.9-8.22-7.74-8.22h-37.73c-3.39,0-6.29,1.94-7.26,5.32-4.84,15.48-27.57,38.7-64.82,38.7s-72.08-27.09-71.6-65.79l.49-43.05c.48-32.41,34.35-54.66,71.11-54.66,33.38,0,65.79,18.87,69.17,49.83h0c.28,3.58-2.18,6.81-5.71,7.49l-108.46,21.05c-4.35.97-7.74,4.84-7.74,9.67v.48c0,4.35,4.35,8.22,10.64,8.22h155.77c4.28,0,7.74-3.47,7.74-7.74v-30.47c0-57.56-49.83-103.52-121.42-103.52Z" />
            <path d="m1115.42,48.75c-60.47,0-112.71,35.31-112.71,81.75,0,3.87,3.39,6.77,7.74,6.77h39.18c3.87,0,6.77-2.9,7.26-6.77,3.87-21.28,29.51-36.76,57.08-36.76,32.89,0,55.15,20.32,55.15,55.15v42.09c0,43.05-31.93,64.82-71.6,64.82-30.96,0-48.86-11.61-48.86-30.48,0-16.45,8.71-30.48,44.5-38.7l51.76-14.03c5.32-1.45,7.26-5.81,6.29-10.64-.48-3.87-4.83-5.81-8.71-5.81h-53.69c-45.47,0-91.43,29.02-91.43,71.59v6.77c0,43.54,41.12,66.27,88.04,66.27,29.99,0,55.63-11.61,71.59-25.15l23.71-20.32c3.87-3.39,7.74-3.39,11.12,0,2.9,2.9,1.93,7.26-.49,10.64l-14.51,22.74c-2.42,3.39-.49,7.74,3.87,7.74h34.83c4.35,0,7.74-3.39,7.74-7.74v-146.58c0-56.11-40.15-93.36-107.88-93.36Z" />
            <path d="m1432.26,54.56h-54.18c-18.86,0-37.25,11.61-50.31,22.74l-21.28,18.38c-2.42,1.94-6.78,3.39-9.68.97-3.39-2.42-4.84-7.26-1.93-11.13l15.48-23.22c2.42-3.39.49-7.74-3.87-7.74h-36.28c-4.35,0-7.74,3.39-7.74,7.74v226.4c0,4.35,3.39,7.74,7.74,7.74h39.67c4.35,0,7.74-3.39,7.74-7.74v-116.1c0-49.83,20.32-72.08,64.34-72.08h50.31c4.35,0,7.74-3.39,7.74-7.74v-30.48c0-4.35-3.39-7.74-7.74-7.74Z" />
          </svg>
          {/* × — drawn, not typed, so it does not depend on the fallback font */}
          <svg width="44" height="44" viewBox="0 0 44 44" stroke="#1F1F1F" strokeWidth="5" strokeLinecap="round">
            <path d="M8 8 L36 36 M36 8 L8 36" />
          </svg>
          {/* the PEARL token disc: canvas, with a lustrous pearl in it */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              background: '#080807',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundImage:
                  'radial-gradient(circle at 34% 30%, #ffffff 0%, #f6f2ed 26%, #f0c3ae 64%, #79c2bf 100%)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
