import { motion } from 'framer-motion';
import { FileDown, Activity, Shield, Download, ArrowLeft, Lock, Layers, CheckCircle } from 'lucide-react';

const f = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

export default function Whitepaper() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          nav, .no-print, footer { display: none !important; }
          body { background: white !important; color: #111 !important; }
          main { padding-top: 0 !important; }
        }
      `}</style>

      <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', background: 'var(--bg-dark)' }}>
        <div style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>

          {/* Back link */}
          <motion.a {...f} href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '3rem' }}>
            <ArrowLeft size={14} /> Back to Platform
          </motion.a>

          {/* Icon */}
          <motion.div {...f} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: '18px', background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.1))', border: '1px solid rgba(6,182,212,0.2)' }}>
              <Activity size={36} style={{ color: 'var(--accent-cyan)' }} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div {...f} transition={{ delay: 0.1 }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1rem' }}>
              DarkWave Studios LLC — Confidential
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              Cox Vehicle Intelligence<br />
              <span style={{ fontSize: '0.55em', color: 'var(--text-muted)', fontWeight: 400 }}>Infrastructure Modernization Platform — Technical Whitepaper</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '550px', margin: '0 auto 2rem' }}>
              Complete technical overview of the deterministic governance, diagnostic, and operational infrastructure layer designed for the Cox Automotive ecosystem.
            </p>
          </motion.div>

          {/* Metadata */}
          <motion.div {...f} transition={{ delay: 0.2 }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
            <span>Version 1.0</span>
            <span>May 2026</span>
            <span>US Patent Pending — 64/032,339</span>
          </motion.div>

          {/* Download Button */}
          <motion.div {...f} transition={{ delay: 0.3 }}>
            <button onClick={handleDownload} className="no-print" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px', background: 'var(--accent-cyan)', color: '#0a0c10',
              border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 24px rgba(6,182,212,0.25)',
            }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(6,182,212,0.35)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(6,182,212,0.25)'; }}>
              <FileDown size={20} /> Download Whitepaper (PDF)
            </button>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginTop: '1rem' }}>
              Saves as PDF via your browser's print dialog
            </p>
          </motion.div>

          {/* What's Inside */}
          <motion.div {...f} transition={{ delay: 0.4 }} style={{ marginTop: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {[
                { icon: <Layers size={18} />, title: 'Fractal Ledger Architecture', desc: 'CAL, VET, and CORE — the complete dual-ledger trust fabric' },
                { icon: <Shield size={18} />, title: 'LUME-V Governance', desc: 'Deterministic substrate that wraps legacy systems without modification' },
                { icon: <Activity size={18} />, title: '42-Node Diagnostics', desc: 'Full OBD-II engine with condition reports, key management, and remote start' },
                { icon: <Lock size={18} />, title: 'Enterprise Security', desc: 'Zero data exposure, hash-only verification, permissioned access' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                  <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div {...f} transition={{ delay: 0.5 }} style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '0.5rem' }}>
              <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Trust Layer Certified</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.65rem', lineHeight: 1.6 }}>
              © 2026 DarkWave Studios LLC · CORE.tlid.io<br />
              US Provisional Patent 64/032,339 · All rights reserved
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
