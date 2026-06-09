import { motion } from 'framer-motion';
import { Radio, ArrowRight, Beaker } from 'lucide-react';

/**
 * FutureHorizons — Compact footnote replacing the full MeridianTeaser section.
 * Acknowledges the research exists without presenting it as a near-term deliverable.
 * Links to /meridian for anyone who wants the full specs.
 *
 * DarkWave Studios LLC — Copyright 2026
 */
export default function FutureHorizons() {
  return (
    <section style={{ padding: '3rem 0 4rem', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: '2rem 2.5rem',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle top accent */}
          <div style={{
            position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.15), transparent)',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Beaker size={20} color="#dc2626" />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{
                fontSize: '0.65rem', color: 'rgba(220,38,38,0.7)', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.5rem',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <Radio size={10} /> Future R&D Horizon
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                Meridian Energy Architecture
              </h3>

              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0, marginBottom: '1rem' }}>
                Beyond the operational platform described above, DarkWave Studios is developing a deterministic 
                wireless energy routing architecture designed for lot-scale EV charging and powered infrastructure. 
                The research is published, the patent is filed (U.S. Provisional 64/084,465), and the engineering 
                specifications are documented. This is a future capability layer — not part of the current deployment — 
                but the governance integration points are already built into the platform architecture.
              </p>

              <a
                href="/meridian"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.8rem', color: 'rgba(220,38,38,0.7)', fontWeight: 600,
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#dc2626'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(220,38,38,0.7)'}
              >
                View Research & Specifications <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
