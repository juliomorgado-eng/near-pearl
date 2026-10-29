import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* `X-Powered-By: Next.js` tells a scanner which advisories to try first and
     tells a reader nothing. */
  poweredByHeader: false,

  /**
   * THE BASELINE SECURITY HEADERS, ON EVERY RESPONSE.
   *
   * NONE OF THESE CHANGE WHAT THE PAGE DRAWS. They constrain what a browser
   * will do AROUND it: no sniffing a response into a type it was not served as,
   * no framing by another site (clickjacking — the CTAs are links a framing
   * page could overlay), no full referrer handed to third parties, and no
   * powerful features the page never asks for.
   *
   * THERE IS NO Content-Security-Policy HERE YET, deliberately. The page runs
   * inline scripts (the curtain's gate in `layout.tsx`, the FAQ's JSON-LD,
   * Next's own hydration payload) and loads Umami from its own host; a policy
   * written without watching real traffic would break one of those silently.
   * It belongs in a `Content-Security-Policy-Report-Only` pass first.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },

  /**
   * CAMPAIGN DOORS.
   *
   * An external link points at a PATH here rather than at `/` with a query,
   * because a path cannot be stripped: no "clean url" tool removes it, and a
   * reader who copies the address bar and sends it to somebody carries the
   * attribution with them.
   *
   * REWRITES, NOT REDIRECTS, AND THE DIFFERENCE IS THE ENTIRE MECHANISM. A
   * redirect to `/` would tidy the address bar and erase the only signal there
   * was, before any script ran. A rewrite serves the homepage while leaving
   * `location.pathname` saying `/perps`, which is what `lib/analytics.ts`
   * reads. There is no second copy of the page and no route file to keep in
   * step — `/` is whatever `app/page.tsx` renders that week, holding page or
   * tour.
   *
   * TWO SHAPES. `/perps` is the named door in the brief; `/r/:source` is the
   * namespace every later one should use, because a bare name competes with
   * the site's own routes and `/r/` never will. Adding a bare name here means
   * adding it to `SOURCE_PATHS` in `lib/analytics.ts` as well — the allowlist
   * there is what stops `/preview` being read as a campaign.
   */
  async rewrites() {
    return [
      { source: '/perps', destination: '/' },
      { source: '/r/:source', destination: '/' },
    ];
  },

  /**
   * `/preview` WAS THE TOUR WHILE THE HOLDING PAGE HELD `/`, and links to it
   * went out. The route is gone, so without this they 404 — a worse answer
   * than the page they were promised, which now lives one path up.
   *
   * PERMANENT, and that is the honest status: `/preview` existed for one
   * reason and that reason has ended. A 308 also tells a crawler which url is
   * canonical, which matters because that route carried `robots: noindex` for
   * exactly as long as it existed and nothing should now be weighing the two
   * against each other.
   */
  async redirects() {
    return [{ source: '/preview', destination: '/', permanent: true }];
  },
};

export default nextConfig;
