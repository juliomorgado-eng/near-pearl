/**
 * THE PEARL ISLAND, SIMPLIFIED — /v2's version of `Story`. Three points, one
 * sentence each, each over a drawing of NEAR meeting Pearl: the rails in
 * NEAR green, the asset as a lit pearl in Pearl's cream, blush and teal.
 * Same hedge as `Story`: Proof of Useful Work is what Pearl is DESIGNED to do.
 *
 * The drawings are inline so they share the plate's variables; their strokes
 * draw in once when `.rv` turns `.in` (41-theme-near.css), and sit still under
 * reduced motion. Gradient ids are per drawing — three SVGs share one document.
 */

function Pearl({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-b`} cx="40%" cy="36%" r="70%">
          <stop offset="0" stopColor="#f6f2ed" />
          <stop offset=".34" stopColor="#f0d9cc" />
          <stop offset=".6" stopColor="#f0c3ae" />
          <stop offset=".82" stopColor="#c99a86" />
          <stop offset="1" stopColor="#6f8f8a" />
        </radialGradient>
        <radialGradient id={`${id}-s`} cx="34%" cy="28%" r="22%">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 7} fill="#00EC97" opacity=".10" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-b)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-s)`} />
      <circle cx={cx} cy={cy} r={r - .6} fill="none" stroke="#79c2bf" strokeOpacity=".55" strokeWidth="1.2" />
    </>
  );
}

/* 01 — a matrix of cream cells; the diagonal the GPU computes lights green
   and runs into the pearl it secures */
function ArtWork() {
  const cells = [];
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 6; c++) {
      const on = r === c;
      cells.push(
        <rect
          key={`${r}${c}`}
          x={22 + c * 17} y={28 + r * 17} width="11" height="11" rx="2.5"
          fill={on ? '#00EC97' : '#f6f2ed'} opacity={on ? 1 : .14 + ((r + c) % 3) * .05}
        />,
      );
    }
  return (
    <svg className="st-art" viewBox="0 0 240 160" aria-hidden="true">
      <rect x="14" y="20" width="114" height="114" rx="10" fill="none" stroke="#f6f2ed" strokeOpacity=".18" />
      {cells}
      <path className="draw" d="M120 124 C 150 124, 150 80, 172 80" fill="none" stroke="#3FEFAD" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M128 28 h8 M128 134 h8" stroke="#f6f2ed" strokeOpacity=".3" strokeWidth="1.2" />
      <Pearl id="sv1" cx={192} cy={80} r={26} />
    </svg>
  );
}

/* 02 — chains on the left, one green rail through NEAR's hub, the pearl on
   the far side; the solvers are the dashed arcs racing to fill it */
function ArtRail() {
  const ys = [34, 62, 98, 126];
  return (
    <svg className="st-art" viewBox="0 0 240 160" aria-hidden="true">
      {ys.map((y) => (
        <g key={y}>
          <path className="draw" d={`M34 ${y} C 70 ${y}, 78 80, 108 80`} fill="none" stroke="#f6f2ed" strokeOpacity=".38" strokeWidth="1.2" />
          <circle cx="26" cy={y} r="8" fill="none" stroke="#f6f2ed" strokeOpacity=".55" strokeWidth="1.2" />
          <circle cx="26" cy={y} r="2.6" fill="#f6f2ed" opacity=".7" />
        </g>
      ))}
      <path className="draw" d="M134 80 H 160" stroke="#00EC97" strokeWidth="2" strokeLinecap="round" />
      <path d="M118 62 C 140 40, 170 44, 182 58" fill="none" stroke="#3FEFAD" strokeOpacity=".7" strokeDasharray="3 5" strokeLinecap="round" />
      <path d="M118 98 C 140 120, 170 116, 182 102" fill="none" stroke="#3FEFAD" strokeOpacity=".7" strokeDasharray="3 5" strokeLinecap="round" />
      <rect x="104" y="66" width="28" height="28" rx="8" fill="#00EC97" />
      {/* NEAR's N, drawn: two stems and the diagonal */}
      <path d="M112 87 V73 L124 87 V73" fill="none" stroke="#080807" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <Pearl id="sv2" cx={192} cy={80} r={24} />
    </svg>
  );
}

/* 03 — the pearl behind a veil of rings, a lock on the veil; value goes in
   and comes back out without the trade being seen */
function ArtVeil() {
  return (
    <svg className="st-art" viewBox="0 0 240 160" aria-hidden="true">
      <circle cx="120" cy="80" r="62" fill="none" stroke="#f6f2ed" strokeOpacity=".16" strokeDasharray="2 6" />
      <circle cx="120" cy="80" r="48" fill="none" stroke="#f6f2ed" strokeOpacity=".28" strokeDasharray="4 6" />
      <circle className="sv-spin" cx="120" cy="80" r="36" fill="none" stroke="#3FEFAD" strokeOpacity=".75" strokeWidth="1.4" strokeDasharray="10 5" />
      <Pearl id="sv3" cx={120} cy={80} r={24} />
      <path d="M22 62 H 52 m-7 -6 l7 6 l-7 6" fill="none" stroke="#f6f2ed" strokeOpacity=".6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M188 98 H 218 m-7 -6 l7 6 l-7 6" fill="none" stroke="#3FEFAD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(150 30)">
        <rect x="0" y="8" width="20" height="16" rx="4" fill="#00EC97" />
        <path d="M4.5 8 V5 a5.5 5.5 0 0 1 11 0 V8" fill="none" stroke="#00EC97" strokeWidth="2.2" />
        <circle cx="10" cy="15" r="2" fill="#080807" />
      </g>
    </svg>
  );
}

const POINTS = [
  {
    Art: ArtWork,
    title: 'Mined by AI math.',
    body: 'GPUs run the matrix multiplication behind AI, and Pearl is designed to turn that work into the proofs that secure the chain.',
  },
  {
    Art: ArtRail,
    title: 'One rail to every chain.',
    body: 'PEARL is live on NEAR Intents, so any wallet or app on the 1Click API can offer it.',
  },
  {
    Art: ArtVeil,
    title: 'Out of public view.',
    body: 'Swap into PEARL, or out to stablecoins, on near.com. Confidential by default.',
  },
];

export function StoryV2() {
  return (
    <section className="band story story-v2" id="pearl">
      <div className="shell">
        <div className="copy rv st-intro">
          <h2 className="h1">Useful work in. Every chain out.</h2>
          <p className="lead">
            <span className="k-pearl">PEARL</span> is live on{' '}
            <span className="k-near">NEAR Intents</span> and{' '}
            <span className="k-near">near.com</span>.
          </p>
        </div>

        <div className="sv-points">
          {POINTS.map(({ Art, title, body }) => (
            <article className="sv-point rv" key={title}>
              <Art />
              <h3 className="h4">{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
