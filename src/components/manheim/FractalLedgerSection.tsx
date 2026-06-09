import { motion } from 'framer-motion';
import { Network, Shield, Layers, Lock, Globe, Fingerprint, Server } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accentGold = '#fb923c';
const accentCyan = 'var(--accent-cyan)';
const accentBlue = '#38bdf8';
const accentEmerald = 'var(--accent-emerald)';
const goldDim = 'rgba(251,146,60,0.10)';
const goldBorder = 'rgba(251,146,60,0.20)';
const goldBorderHover = 'rgba(251,146,60,0.45)';

export default function FractalLedgerSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '900px', height: '900px', background: `radial-gradient(circle, ${goldDim} 0%, transparent 65%)`, transform: 'translate(-50%, -50%)' }} />
      {/* Subtle diagonal pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: `repeating-linear-gradient(135deg, ${accentGold}44 0px, transparent 2px, transparent 24px, ${accentGold}44 26px)`, backgroundSize: '34px 34px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <img src="/assets/images/photos/fractal_ledger.png" alt="Enterprise visual" style={{ width: '100%', height: '350px', objectFit: 'cover', objectPosition: 'center 30%', margin: '0 auto 2.5rem auto', display: 'block', borderRadius: '16px', opacity: 0.85 }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: goldDim, border: `1px solid ${goldBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accentGold, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Network size={14} style={{ marginRight: 6 }} /> Hub & Spoke Topology
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Fractal Ledger <span style={{ fontSize: '0.5em', fontWeight: 400, color: 'var(--text-dim)', verticalAlign: 'middle' }}>Architecture (FLA)</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              The Fractal Ledger Architecture (FLA) — a hub-and-spoke topology designed for maximum security and absolute compartmentalization. At the center is the universal CORE root. Connected to CORE, every division operates its own isolated dual-ledger system.
            </p>
            <p className="text-dim" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.85rem', lineHeight: 1.6 }}>
              The same architectural pattern repeats at every level of scope — self-similar, infinitely scalable, and compartmentalized by design.
            </p>
          </motion.div>
        </div>

        {/* The Three Tiers */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="panel" style={{ padding: '2.5rem', marginBottom: '3rem', borderColor: goldBorder, background: `linear-gradient(180deg, ${goldDim} 0%, transparent 100%)` }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: accentGold, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} /> The Three Tiers of Trust
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: accentGold }}>1. Cox CORE</h4>
              <p className="text-dim" style={{ fontSize: '0.7rem', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' as const }}>Certified Operational Root Engine</p>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The universal master root hub for the entire Cox Automotive enterprise. CORE does not hold division-level data itself — it is the highly secure, immutable central backbone that all division ledgers anchor into.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: accentBlue }}>2. COX-PL — Division Private Ledger</h4>
              <p className="text-dim" style={{ fontSize: '0.7rem', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' as const }}>COX Private Ledger</p>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The internal, private operational ledger <em>specific to each division</em>. This private half of the division's dual-ledger tracks every vehicle event, scan, and workflow without ever exposing data to other divisions or outside parties.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: accentCyan }}>3. COX-VL — Division Verification Ledger</h4>
              <p className="text-dim" style={{ fontSize: '0.7rem', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' as const }}>COX Verification Ledger</p>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The external, public-facing verification ledger <em>specific to each division</em>. This public half of the dual-ledger issues verifiable certificates to dealers, buyers, and financing partners on demand.
              </p>
            </div>
          </div>
        </motion.div>

        {/* The Fractal Pattern — Division breakdown */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }} style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: accentGold, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Network size={20} /> The Fractal Pattern
          </h3>
          <div className="panel" style={{ padding: '2.5rem', borderColor: goldBorder, background: `linear-gradient(180deg, ${goldDim} 0%, transparent 100%)` }}>
            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.92rem' }}>
              Every Cox Automotive division operates its own isolated dual-ledger — a private operational ledger (COX-PL) and a public verification ledger (COX-VL). All dual-ledgers securely anchor into the universal <strong style={{ color: accentGold }}>CORE</strong> root fabric. The pattern is self-similar at every level: division, facility, and asset.
            </p>
            {/* Visual hub-and-spoke */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* CORE root */}
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 28px', background: `linear-gradient(135deg, ${goldDim}, rgba(251,146,60,0.02))`,
                  border: `2px solid ${accentGold}`, borderRadius: '14px',
                  boxShadow: `0 0 30px ${goldDim}, 0 0 60px rgba(251,146,60,0.05)`,
                }}>
                  <Server size={20} style={{ color: accentGold }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: accentGold, letterSpacing: '-0.02em' }}>Cox CORE</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>ENTERPRISE ROOT FABRIC</div>
                  </div>
                </div>
              </div>
              {/* Connector lines */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 2, height: 32, background: `linear-gradient(180deg, ${accentGold}60, rgba(255,255,255,0.06))` }} />
              </div>
              {/* Division branches */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                {[
                  { name: 'Manheim', desc: 'Auction integrity & vehicle custody', private: 'COX-PL', public: 'COX-VL', active: true },
                  { name: 'Autotrader', desc: 'Verified listing provenance', private: 'ATL', public: 'ATV', active: false },
                  { name: 'Kelley Blue Book', desc: 'Cryptographic valuation anchoring', private: 'KBL', public: 'KBV', active: false },
                  { name: 'Dealer.com', desc: 'Dealership transaction records', private: 'DTL', public: 'DTV', active: false },
                  { name: 'NextGear Capital', desc: 'Financing audit trails', private: 'NGL', public: 'NGV', active: false },
                ].map((div, i) => (
                  <motion.div key={i} {...fadeIn} transition={{ delay: 0.25 + i * 0.06 }}
                    style={{
                      padding: '1.25rem',
                      background: div.active ? 'rgba(251,146,60,0.03)' : 'rgba(255,255,255,0.015)',
                      border: `1px solid ${div.active ? goldBorder : 'var(--border-light)'}`,
                      borderRadius: '14px',
                      transition: 'border-color 0.3s, transform 0.2s',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1 1 200px',
                      maxWidth: '300px',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = goldBorderHover}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = div.active ? goldBorder : 'var(--border-light)'}
                  >
                    {div.active && (
                      <div style={{ position: 'absolute', top: 10, right: 12, fontSize: '0.55rem', color: accentEmerald, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>● ACTIVE</div>
                    )}
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem', color: div.active ? '#fff' : 'var(--text-muted)' }}>{div.name}</div>
                    <div className="text-dim" style={{ fontSize: '0.72rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>{div.desc}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <div style={{ flex: 1, padding: '6px 8px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: '2px' }}>PRIVATE</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accentBlue }}>{div.private}</div>
                      </div>
                      <div style={{ flex: 1, padding: '6px 8px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: '2px' }}>PUBLIC</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accentCyan }}>{div.public}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Fractal — three cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <Lock size={22} />, title: 'Absolute Compartmentalization', desc: 'No division ever sees another division\'s operational data. Each dual-ledger is cryptographically isolated. A breach of one division\'s ledger cannot propagate to any other — or to CORE.' },
            { icon: <Shield size={22} />, title: 'Independent Auditability', desc: 'Each division\'s COX-VL issues its own verification certificates independently. Auditors, dealers, and financing partners verify against the specific division — not a monolithic enterprise ledger.' },
            { icon: <Globe size={22} />, title: 'Infinite Scalability', desc: 'Adding a new division, subsidiary, or partner is architecturally trivial — spin up a new dual-ledger pair, connect it to CORE, and the fractal pattern continues. No re-architecture required.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.15 + i * 0.08 }}
              style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: `1px solid ${goldDim}`, borderRadius: '16px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = goldBorderHover}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = goldDim}>
              <div style={{ color: accentGold, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Chain of Trust — Updated for Fractal */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="panel" style={{ padding: '2.5rem', borderColor: goldBorder, background: `linear-gradient(180deg, ${goldDim} 0%, rgba(251,146,60,0.02) 100%)` }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', color: accentGold, textAlign: 'center' }}>FLA Chain of Trust</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: '450px', margin: '0 auto' }}>
            {[
              { label: 'OBD-II / Edge Scan', sub: 'Raw sensor data captured at the asset', color: accentCyan },
              { label: 'Deterministic Processing', sub: '42-node organism analysis', color: accentEmerald },
              { label: 'COX-PL Anchor', sub: 'Division private ledger record sealed', color: accentBlue },
              { label: 'COX-VL Certificate', sub: 'Division verification certificate issued', color: accentCyan },
              { label: 'CORE Root Anchor', sub: 'Universal enterprise fabric — final anchoring', color: accentGold },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: `${step.color}18`, border: `2px solid ${step.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: step.color, flexShrink: 0,
                  }}>{i + 1}</div>
                  {i < 4 && <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg, ${step.color}40, rgba(255,255,255,0.06))`, minHeight: 20 }} />}
                </div>
                <div style={{ paddingBottom: i < 4 ? '1.25rem' : 0 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: step.color }}>{step.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '2rem auto 0', fontSize: '0.9rem', lineHeight: 1.6, textAlign: 'center' }}>
            Every record flows from raw field data through the division's dual-ledger and anchors into the universal CORE root — end to end, with no gaps in provenance.
          </p>
        </motion.div>

        {/* Bottom distinction callout */}
        <motion.div {...fadeIn} transition={{ delay: 0.35 }} style={{ marginTop: '3rem', padding: '1.5rem 2rem', background: 'rgba(251,146,60,0.03)', border: `1px solid ${goldBorder}`, borderRadius: '14px', borderLeft: `4px solid ${accentGold}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <Fingerprint size={24} style={{ color: accentGold, flexShrink: 0, marginTop: 2 }} />
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: accentGold }}>Why "Fractal"?</h4>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                The architecture is fractal because the <strong>same dual-ledger pattern repeats at every level of scope</strong> — enterprise, division, facility, and asset. Each node is a self-similar replica of the whole system. This is not a monolithic ledger with access controls bolted on. It is a structurally compartmentalized trust fabric where isolation is a <em>mathematical property</em> of the topology, not a policy decision.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
