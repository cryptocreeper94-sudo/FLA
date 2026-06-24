import { motion } from 'framer-motion';
import { Shield, Layers, FileCheck, Globe } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = 'var(--accent-cyan)';
const accentDim = 'rgba(6,182,212,0.10)';
const accentBorder = 'rgba(6,182,212,0.20)';
const accentBorderHover = 'rgba(6,182,212,0.45)';

export default function VETSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentDim} 0%, transparent 65%)`, transform: 'translate(-50%, -50%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <img src="/assets/images/photos/vet-infrastructure.png" alt="Enterprise visual" style={{ width: '100%', height: '350px', objectFit: 'cover', objectPosition: 'center 30%', margin: '0 auto 2.5rem auto', display: 'block', borderRadius: '16px', opacity: 0.85 }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Shield size={14} style={{ marginRight: 6 }} /> External Verification Ledger
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              FLA-VL <span style={{ fontSize: '0.5em', fontWeight: 400, color: 'var(--text-dim)', verticalAlign: 'middle' }}>FLA Verification Ledger</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              The outward-facing verification ledger that turns internal FLA-PL records into commercially provable certificates — giving buyers, dealers, and financing partners cryptographic confidence in every vehicle's history.
            </p>
          </motion.div>
        </div>

        {/* FLA-PL vs FLA-VL distinction */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="panel" style={{ padding: '2.5rem', marginBottom: '3rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} /> How It Relates to FLA-PL
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#38bdf8' }}>FLA-PL — Internal</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The private operational ledger that FLA controls. Records every event, scan, and workflow internally. Never exposed to the outside world. The enterprise source of truth.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: accent }}>FLA-VL — External</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The commercial verification layer that issues publicly verifiable certificates derived from FLA-PL records. Dealers, buyers, and partners can confirm a vehicle's condition and custody history — without accessing the internal ledger.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What FLA-VL provides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <FileCheck size={22} />, title: 'Verifiable Condition Certificates', desc: 'Every LumeScan diagnostic produces a cryptographically signed certificate. Dealers and buyers can verify authenticity with a hash lookup — no login, no account, no API integration required.' },
            { icon: <Shield size={22} />, title: 'Provenance Without Exposure', desc: 'FLA-VL proves a vehicle was scanned, by whom, and when — without revealing internal operational data, facility workflows, or proprietary diagnostics.' },
            { icon: <Globe size={22} />, title: 'Cross-Platform Portability', desc: 'FLA-VL certificates are portable across marketplace listings, dealer management systems, and financing platforms. The verification travels with the vehicle, not the system.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.15 + i * 0.08 }}
              style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: `1px solid ${accentDim}`, borderRadius: '16px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accentBorderHover}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = accentDim}>
              <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The chain of trust */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="panel" style={{ padding: '2.5rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(56,189,248,0.02) 100%)` }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', color: accent, textAlign: 'center' }}>Chain of Trust</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: '400px', margin: '0 auto' }}>
            {[
              { label: 'OBD-II Scan', sub: 'Raw sensor data captured', color: 'var(--accent-cyan)' },
              { label: 'LumeScan Processing', sub: '42-node deterministic analysis', color: 'var(--accent-emerald)' },
              { label: 'FLA-PL Anchor', sub: 'Tamper-proof record created', color: '#38bdf8' },
              { label: 'FLA-VL Certificate', sub: 'Cryptographic verification issued', color: accent },
              { label: 'Public Verification', sub: 'Independently verifiable by any party', color: '#fb923c' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: '1rem' }}>
                {/* Numbered circle + connecting line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: `${step.color}18`, border: `2px solid ${step.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: step.color, flexShrink: 0,
                  }}>{i + 1}</div>
                  {i < 4 && <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg, ${step.color}40, rgba(255,255,255,0.06))`, minHeight: 20 }} />}
                </div>
                {/* Content */}
                <div style={{ paddingBottom: i < 4 ? '1.25rem' : 0 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: step.color }}>{step.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '2rem auto 0', fontSize: '0.9rem', lineHeight: 1.6, textAlign: 'center' }}>
            Every certificate is traceable from raw sensor data to its final anchored record — end to end, with no gaps in provenance.
          </p>
        </motion.div>

        {/* FLA-VL CTA + Verify Button */}
        <motion.div {...fadeIn} transition={{ delay: 0.35 }} style={{ textAlign: 'center', margin: '3rem 0' }}>
          <a href="https://vet.tlid.io" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: accent, color: '#0a0c10', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 4px 20px ${accentDim}` }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            <Shield size={18} /> Verify a Vehicle
          </a>
          <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '0.75rem' }}>Public verification portal — no login required</p>
        </motion.div>

      </div>
    </section>
  );
}
