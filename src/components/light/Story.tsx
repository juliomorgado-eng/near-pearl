/**
 * THE EDITORIAL BAND — why PEARL, and why here. Condensed from the launch
 * post ("Pearl Is Live on NEAR Intents and near.com"); keep the post's voice
 * and its hedges. Proof of Useful Work is described as what it is DESIGNED
 * to do, never as a claim that every block serves real AI demand.
 *
 * It replaces the testimonial marquee. Reveal hooks are the light zone's
 * shared `.rv` (see `useReveal`, run once by `LightZone`), so there is no
 * motion code here. Styles: 40-story.css.
 */

const CONNECTIONS = [
  {
    title: 'The Pearl network on the 1Click API.',
    body:
      'Wallets, apps and agents that already use NEAR Intents can offer PEARL ' +
      'cross-chain swaps through the integration they already have. One more ' +
      'supported asset on the same API, not a new integration project.',
  },
  {
    title: 'PEARL on near.com.',
    body:
      'Swap supported assets from other chains into PEARL, or take PEARL out to ' +
      'the wider onchain economy, from one interface. near.com has been ' +
      'confidential by default since September, so these swaps happen out of ' +
      'public view.',
  },
];

const HOLDERS = [
  {
    title: 'For the people who earn it.',
    body:
      'Most PEARL goes to operators of GPU capacity, whose bills are paid in ' +
      'electricity, hardware leases and payroll. Convert PEARL into stablecoins ' +
      'on the chain those bills are paid from, without broadcasting the trade.',
  },
  {
    title: 'For the agents that spend it.',
    body:
      'An agent buying inference can pay in PEARL, or in whatever its ' +
      'counterparty prefers, and let solvers handle the conversion. An agent ' +
      'that earns PEARL can route part of it into any asset, on any chain, under ' +
      'limits its owner set in advance.',
  },
];

const FACTS = ['2.1B hard cap', '~3 min blocks', 'No pre-mine', 'Mainnet April 2026'];

export function Story() {
  return (
    <section className="band story" id="pearl">
      <div className="shell">
        <div className="copy rv st-intro">
          <h2 className="h1">An asset born from AI work. Now it can reach everything else.</h2>
          <p className="lead">
            PEARL is live on NEAR Intents, and near.com is the first confidential
            venue for it. One integration instead of many: every chain and app
            that supports Intents can reach PEARL, and PEARL can reach them.
          </p>
        </div>

        <div className="st-blocks">
          <article className="st-block rv">
            <p className="st-num" aria-hidden="true">01</p>
            <h3 className="h4">The work underneath the asset</h3>
            <div className="st-body">
              <p>
                The arithmetic underneath every large language model is matrix
                multiplication. Training is matrix multiplication. Inference is
                matrix multiplication.
              </p>
              <p>
                Pearl&rsquo;s Proof of Useful Work is designed to let GPUs run those
                same AI workloads while producing the proofs that secure the chain
                and issue its native asset, PEARL. The ambition: the work of
                securing a network is the same work that powers AI.
              </p>
            </div>
          </article>

          <article className="st-block rv">
            <p className="st-num" aria-hidden="true">02</p>
            <h3 className="h4">Two connections</h3>
            <div className="st-body">
              {CONNECTIONS.map((c) => (
                <p key={c.title}>
                  <b>{c.title}</b> {c.body}
                </p>
              ))}
            </div>
          </article>

          <article className="st-block rv">
            <p className="st-num" aria-hidden="true">03</p>
            <h3 className="h4">What changes for holders</h3>
            <div className="st-body">
              {HOLDERS.map((c) => (
                <p key={c.title}>
                  <b>{c.title}</b> {c.body}
                </p>
              ))}
            </div>
          </article>
        </div>

        <div className="st-facts rv">
          <ul aria-label="Pearl network facts">
            {FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="st-src">Network parameters as published by Pearl Research.</p>
        </div>
      </div>
    </section>
  );
}
