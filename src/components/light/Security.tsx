import { BattleTestedArt, PasskeySigningArt, QuantumReadyArt, VolumeArt } from '@/components/marks';

const BOXES = [
  {
    Art: BattleTestedArt,
    title: <>Battle-tested infrastructure</>,
    body: 'near.com runs on NEAR Protocol, live for over 5 years with 100% mainnet uptime.',
  },
  {
    Art: PasskeySigningArt,
    title: <>Confidential by default</>,
    body: 'Your PEARL swaps happen out of public view. No public trail tying the trade to your wallet.',
  },
  {
    Art: VolumeArt,
    title: <><span className="sfig" style={{ color: 'var(--l-fg)' }}>$30B+</span> in volume</>,
    body: 'Over $30B in all-time cross-chain volume has moved through NEAR Intents, the settlement layer near.com runs on.',
  },
  {
    Art: QuantumReadyArt,
    title: <>Quantum-ready</>,
    body: 'Your account is protected by post-quantum signing, built to withstand quantum attacks.',
  },
];

export function Security() {
  return (
    <section className="band" id="security">
      <div className="shell split top flip">
        <div className="copy rv">
          <h2 className="h1">Secure by design</h2>
          <p className="lead" style={{ color: 'var(--l-fg-2)' }}>
            Every swap is signed on your device with a passkey and settled
            onchain through NEAR Intents, the universal liquidity layer used by
            leading DeFi protocols.
          </p>
        </div>
        <div className="secgrid rv">
          {BOXES.map(({ Art, title, body }, i) => (
            <article className="sbox" key={i}>
              <div className="sart" aria-hidden="true"><Art /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
