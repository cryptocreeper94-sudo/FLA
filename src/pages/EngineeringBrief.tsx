import { motion } from 'framer-motion';
import { Cpu, FileText, Layers, Activity, Download, Monitor } from 'lucide-react';
import ManheimTabs from '../components/ManheimTabs';
import StackComparison from '../components/engineering/StackComparison';
import TechDeepDive from '../components/engineering/TechDeepDive';
import LumeVAPIOnboarding from '../components/engineering/LumeVAPIOnboarding';

export default function EngineeringBrief() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />

      {/* Hero */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg, rgba(56,189,248,0.08) 0%, var(--bg-dark) 50%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <Cpu size={14} style={{ marginRight: 6 }} /> Engineering Reference Document
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
              Full Technical Architecture<br/>
              <span style={{ color: 'var(--accent-cyan)' }}>For Engineering Review.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              This document details the complete system architecture — from OBD-II protocol parsing to governance mesh topology to the native Lume build migration path. It covers every operational subsystem, live platform section, and integration point. The intent is simple: any qualified engineer should be able to read this document, review the published research, and independently verify every claim.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', maxWidth: '520px', margin: '0 auto' }}>
              {[
                { icon: <Layers size={14}/>, val: '14', label: 'Subsystems' },
                { icon: <FileText size={14}/>, val: '42', label: 'OBD-II PIDs' },
                { icon: <Monitor size={14}/>, val: '6', label: 'Live Sections' },
                { icon: <Cpu size={14}/>, val: '2', label: 'Build Targets' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ padding: '14px 12px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{s.val}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>{s.icon}{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Platform Sections */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(245,158,11,0.02) 0%, var(--bg-dark) 100%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Live Platform Architecture</p>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Operational Sections — All Live</h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Every section below is deployed and operational on cox.tlid.io. Each one is powered by the Cox Automotive Ledger backend and anchored to the CORE Root Fabric.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'COP — Core Operating Platform', desc: 'Enterprise command center with real-time KPIs, facility status, vehicle state grid, and live activity feed. Auto-refreshes every 30 seconds from the CAL backend. 8 operational metrics tracked in real-time.', color: '#f59e0b', link: '/cop' },
              { title: 'CAL — Cox Automotive Ledger', desc: 'Full on-chain block explorer. Browse blocks, certificates, and vehicles. Search by VIN, certificate ID, agent, or hash. Real-time chain integrity verification with validator node status.', color: '#38bdf8', link: '/cal' },
              { title: 'VET — Verified Enterprise Trust', desc: 'Public verification portal. Enter any certificate ID to verify cryptographic integrity, or enter a VIN to view the complete vehicle digital passport with custody chain, condition scans, and health scores.', color: '#10b981', link: '/vet' },
              { title: 'CORE — Root Fabric', desc: 'Fractal ledger topology visualization. Shows all five Cox divisions (Manheim, Autotrader, KBB, Dealer.com, NextGear) and how each operates its own private ledger while anchoring to the CORE root via hash anchoring.', color: '#8b5cf6', link: '/core' },
              { title: 'COG — Governance Engine', desc: 'Real-time governance health monitoring. Certificate compliance rates, policy violation tracking, governance score computation, and automated policy enforcement across all divisions.', color: '#06b6d4', link: '/cog' },
              { title: 'Lot Ops Pro — Workforce Platform', desc: 'Full operational workforce management via lotopspro.com. Command Center, Operations Manager, Driver Dashboard, Scanner, Live Map, Analytics, Crew Manager, Lane Config, Smart Lot Planner, and Safety Dashboard.', color: '#ec4899', link: 'https://lotopspro.com' },
            ].map((section, i) => (
              <motion.a key={i} href={section.link} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${section.color}60`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-light)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: section.color, boxShadow: `0 0 8px ${section.color}60` }} />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: section.color }}>{section.title}</h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{section.desc}</p>
              </motion.a>
            ))}
          </div>

          {/* COP Desktop */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(56,189,248,0.03)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Monitor size={28} style={{ color: '#38bdf8' }} />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.25rem', color: '#38bdf8' }}>COP Desktop — Native Electron Client</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Windows desktop application wrapping all platform sections + Lot Ops Pro as a native app. Keyboard shortcuts (Ctrl+1–8 for CEP sections, Ctrl+Shift+1–3 for Lot Ops). Branded "Cox Operational Platform" throughout. Downloadable from the Download page.
              </p>
            </div>
            <a href="/download" style={{ padding: '10px 20px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              <Download size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Download .EXE
            </a>
          </motion.div>
        </div>
      </section>

      <StackComparison />
      <TechDeepDive />
      <LumeVAPIOnboarding />

      {/* Footer */}
      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            The architecture documented above is production-ready and verifiable. The React build is live and available for deployment. The native Lume build is architecturally complete and migration-ready. Both share the same 4-layer, 42-node mesh topology — the upgrade path requires no rearchitecture, only a deeper level of runtime enforcement. Every technical claim in this document is backed by published research with verifiable DOIs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', margin: '1.5rem 0' }}>
            <a href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--accent-cyan)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
              <Activity size={15} /> Try It Live
            </a>
            <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--accent-emerald)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
              <Download size={15} /> Download App
            </a>
          </div>
          <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}>
            © 2026 DarkWave Studios LLC / Lume42 Labs · 6 U.S. Provisional Patents Pending · Published Research on Zenodo
          </p>
        </div>
      </section>
    </div>
  );
}
