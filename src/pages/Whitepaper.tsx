import { motion } from 'framer-motion';
import { Shield, ArrowLeft, FileDown, CheckCircle } from 'lucide-react';


const f = { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Whitepaper() {


  const handleDownload = () => { window.print(); };

  const hr = <div style={{ height: '1px', background: 'var(--border-light)', margin: '3rem 0' }} />;
  const accent = '#38bdf8';

  return (
    <>
      <style>{`
        @media print {
          nav, .no-print, footer, .wp-toolbar { display: none !important; }
          body { background: white !important; color: #111 !important; }
          .wp-container { max-width: 100% !important; padding: 0 2rem !important; }
          .wp-container * { color: #111 !important; border-color: #ddd !important; background: transparent !important; }
          .wp-container h1, .wp-container h2, .wp-container h3 { color: #0a0a0c !important; }
          .wp-section { page-break-inside: avoid; }
          section { padding: 0 !important; }
          main { padding-top: 0 !important; }
        }
        .wp-body p { font-size: 0.92rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1rem; }
        .wp-body ul, .wp-body ol { color: var(--text-muted); font-size: 0.92rem; line-height: 1.8; margin-bottom: 1rem; padding-left: 1.5rem; }
        .wp-body li { margin-bottom: 0.4rem; }
        .wp-body h2 { font-size: 1.4rem; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
        .wp-body h3 { font-size: 1.05rem; margin: 1.5rem 0 0.75rem; color: ${accent}; }
        .wp-body strong { color: var(--text-main); }
      `}</style>

      <section style={{ padding: '0', background: 'var(--bg-dark)' }}>
        <div className="wp-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>

          {/* Toolbar */}
          <div className="wp-toolbar no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)', position: 'sticky', top: '56px', background: 'var(--bg-dark)', zIndex: 10 }}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.78rem', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Back to Platform
            </a>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleDownload} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: accent, color: '#0a0c10', border: 'none', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                <FileDown size={13} /> Save as PDF
              </button>
            </div>
          </div>

          {/* Cover */}
          <div className="wp-body" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <motion.div {...f}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '14px', background: `linear-gradient(135deg, ${accent}, #0ea5e9)`, marginBottom: '1.5rem' }}>
                <Shield size={28} color="#0a0c10" />
              </div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
                DarkWave Studios LLC — Confidential
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                Fractal Ledger Architecture<br />
                <span style={{ fontSize: '0.5em', color: 'var(--text-muted)', fontWeight: 400 }}>Fractal Ledger Architecture (FLA) for Fractal Ledger Architecture & FLA Enterprise</span>
              </h1>
              <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 2rem', fontSize: '1rem', lineHeight: 1.7 }}>
                A deterministic governance, operational intelligence, and cryptographic trust infrastructure designed exclusively for the FLA enterprise ecosystem.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                <span>Version 1.0</span>
                <span>June 2026</span>
                <span>US Patent Pending — 64/084,465</span>
              </div>

              {/* Correction Note */}
              <div style={{ marginTop: '2rem', padding: '12px 20px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '8px', maxWidth: '550px', margin: '2rem auto 0' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  <strong style={{ color: 'var(--text-muted)' }}>Note:</strong> This document supersedes the general framework paper <em>"A Framework for Deterministic Digital Trust"</em> that was previously accessible from this location. That paper addresses government-sector applications and has been relocated to its appropriate context. This document is the FLA-specific technical reference.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Table of Contents */}
          <motion.div {...f} style={{ padding: '2.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Contents</h2>
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Executive Summary',
                'The Fractal Ledger Architecture (FLA)',
                'FLA Private Ledger (FLA-PL)',
                'FLA Verification Ledger (FLA-VL)',
                'FLA Operating System (FLA-OS)',
                'CORE — Universal Root Fabric',
                'Cognitive Legacy Governance Substrate (FLA-LGS)',
                'LUME-V — Deterministic Governance Substrate',
                'LUME-Scan — Diagnostic Intelligence',
                'Division Separation & Enterprise Scalability',
                'Implementation Path',
                'About DarkWave Studios LLC',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: accent, fontWeight: 600, minWidth: '1.5rem' }}>{i + 1}.</span>{item}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Body */}
          <div className="wp-body">

            {/* 1 */}
            <motion.div {...f} className="wp-section">
              <h2>1. Executive Summary</h2>
              <p>FLA Enterprise operates one of the most complex multi-division corporate ecosystems in the United States. Fractal Ledger Architecture alone processes over 8 million vehicles annually through NetworkNode, provides valuations through Kelley Blue Book, powers dealership operations through Dealer.com, and finances billions in floor plan lending through NextGear Capital.</p>
              <p>Each division runs its own operational systems, its own data infrastructure, and its own compliance workflows. The challenge is not that these systems don't work — they do. The challenge is that there is no unified trust layer connecting them. When a vehicle moves from NetworkNode auction to NextGear financing to an Autotrader listing, the data about that vehicle exists in three separate silos with no cryptographic linkage.</p>
              <p>The Fractal Ledger Architecture solves this with the <strong>Fractal Ledger Architecture (FLA)</strong> — a system where each division maintains complete operational autonomy while anchoring to a shared cryptographic root. No division sees another division’s data. No data crosses boundaries. But every division can <em>verify</em> claims made by any other division, instantly and mathematically.</p>
              <p>The platform consists of six independently deployable components:</p>
              <ul>
                <li><strong>FLA-PL</strong> — FLA Private Ledger. Division-level private cryptographic ledger for operational records.</li>
                <li><strong>FLA-VL</strong> — FLA Verification Ledger. Public-facing verification certificates derived from internal ledger records.</li>
                <li><strong>FLA-OS</strong> — FLA Operating System. Enterprise command center for cross-division visibility.</li>
                <li><strong>CORE</strong> — Universal Root Fabric. The hub that all division ledgers anchor to.</li>
                <li><strong>FLA-LGS</strong> — Cognitive Legacy Governance Substrate. 42-node deterministic processing mesh.</li>
                <li><strong>LUME-V</strong> — Deterministic governance substrate that wraps legacy systems without modification.</li>
              </ul>
              <p>Each component operates independently and delivers measurable value on its own. Together, they form a unified trust infrastructure that no single vendor has previously offered at enterprise scale.</p>
            </motion.div>

            {hr}

            {/* 2 */}
            <motion.div {...f} className="wp-section">
              <h2>2. The Fractal Ledger Architecture (FLA)</h2>
              <p>The word "fractal" is precise. The same architectural pattern repeats at every level of the organization:</p>
              <ul>
                <li><strong>Division level:</strong> Each FLA division (NetworkNode, Autotrader, KBB, Dealer.com, NextGear Capital) operates its own private Proof-of-Authority ledger. The data model, certificate types, and access controls are configured for that division's specific operations.</li>
                <li><strong>Enterprise level:</strong> All division ledgers periodically anchor a Merkle root hash to CORE — the universal root fabric. CORE sees hashes, never content. It proves that each division's chain is intact and unaltered.</li>
                <li><strong>Verification level:</strong> FLA-VL issues publicly verifiable certificates derived from any division's ledger. A buyer can confirm a vehicle's condition report from NetworkNode without accessing NetworkNode's internal systems.</li>
              </ul>
              <p>This architecture solves the fundamental tension in enterprise data: <strong>divisions need autonomy, but the enterprise needs assurance.</strong> The fractal model delivers both. Each division retains full control over its data, its access policies, and its operational workflows. The enterprise gains cryptographic proof that every division's records are intact, consistent, and untampered — without ever accessing the underlying data.</p>
            </motion.div>

            {hr}

            {/* 3 */}
            <motion.div {...f} className="wp-section">
              <h2>3. FLA Private Ledger (FLA-PL)</h2>
              <p>FLA-PL is a private, permissioned Proof-of-Authority cryptographic ledger built for enterprise-grade operational auditability. It is not a public blockchain, not a distributed database, and not a transparency tool. It is a tamper-proof truth layer that anchors operational records with cryptographic proof.</p>
              <h3>What FLA-PL Records</h3>
              <ul>
                <li><strong>Vehicle custody transitions</strong> — every handoff from intake to lot to lane to transport</li>
                <li><strong>Condition certificates</strong> — OBD-II scan results sealed at the moment of diagnosis</li>
                <li><strong>Governance decisions</strong> — workflow verifications anchored immutably</li>
                <li><strong>Arbitration evidence</strong> — deterministic replay data for dispute resolution</li>
                <li><strong>Key programming events</strong> — IMMO key management with full chain of custody</li>
                <li><strong>Workforce events</strong> — time entries, performance records, and safety incidents</li>
              </ul>
              <h3>Data Privacy</h3>
              <p>FLA-PL stores cryptographic hashes (SHA-256 fingerprints) and structured metadata pointers — never cleartext operational data. The underlying records remain in FLA-controlled databases behind existing access controls. This means FLA-PL provides <strong>tamper-proof verification without data exposure</strong>: any authorized party can confirm a record hasn't been altered, but cannot read the record itself without proper access.</p>
              <h3>Live Infrastructure</h3>
              <p>The FLA-PL explorer is operational at <strong>/cal</strong> within this platform. It connects to a live Proof-of-Authority chain with three validator nodes (Nashville, Atlanta, HQ). Blocks, certificates, vehicle passports, and chain integrity verification are all functional and queryable in real time.</p>
            </motion.div>

            {hr}

            {/* 4 */}
            <motion.div {...f} className="wp-section">
              <h2>4. FLA Verification Ledger (FLA-VL)</h2>
              <p>FLA-VL is the outward-facing verification layer. It turns internal FLA-PL records into commercially provable certificates that external parties — buyers, dealers, financing partners, auditors — can verify independently.</p>
              <ul>
                <li><strong>Hash-based verification:</strong> Enter a certificate ID or VIN and receive cryptographic proof of provenance, integrity, and timestamp.</li>
                <li><strong>Zero data exposure:</strong> FLA-VL proves <em>that</em> a record exists and is untampered. It never reveals <em>what</em> the record contains beyond what FLA explicitly chooses to make verifiable.</li>
                <li><strong>Cross-platform portability:</strong> Certificates travel with the vehicle across Autotrader listings, dealer management systems, and financing workflows.</li>
              </ul>
              <p>The FLA-VL verification portal is live at <strong>/vet</strong> within this platform. Certificate lookups and vehicle passport queries are functional against the live chain.</p>
            </motion.div>

            {hr}

            {/* 5 */}
            <motion.div {...f} className="wp-section">
              <h2>5. FLA Operating System (FLA-OS)</h2>
              <p>FLA-OS is the enterprise command center — the single-pane view across all facilities, divisions, and operational workflows. It aggregates real-time data from FLA-PL, FLA-LGS, and facility-level systems into actionable dashboards.</p>
              <ul>
                <li>Facility status monitoring across all NetworkNode locations</li>
                <li>Vehicle status grid with custody state, health scores, and fault alerts</li>
                <li>Certificate distribution analytics and throughput metrics</li>
                <li>Validator node health and chain integrity monitoring</li>
                <li>Live activity feed with real-time event streaming</li>
              </ul>
              <p>The FLA-OS dashboard is live at <strong>/cop</strong> and auto-refreshes every 30 seconds from the operational chain.</p>
            </motion.div>

            {hr}

            {/* 6 */}
            <motion.div {...f} className="wp-section">
              <h2>6. CORE & TLL — The Supreme Court of Truth</h2>
              <p>At the absolute center of the fractal architecture sits the <strong>Trust Layer Ledger (TLL)</strong>. It acts as the "Supreme Court of Truth" between all connected clients, divisions, and partners. Every division's CORE engine anchors its local hashes upward into the universal TLL.</p>
              <p>Crucially, the TLL is completely non-intrusive. It does not do anything but record the master metadata record (the cryptographic hash) and a timestamp. <strong>The TLL never touches, sees, or stores your private operational data.</strong> It is the ultimate source of truth that proves an event happened, without ever exposing the contents of the event itself.</p>
              <p>This design enforces <strong>absolute sovereignty and zero-knowledge privacy</strong>. Only the client entity has access to the actual private information residing on their local FLA-PL. NetworkNode's data stays in NetworkNode's ledger. NextGear's data stays in NextGear's ledger. But the TLL can mathematically prove to the world that both chains are intact and unaltered.</p>
              <p>The CORE topology visualizer is live at <strong>/core</strong>, showing all five FLA divisions as spokes anchoring to the central root fabric.</p>
            </motion.div>

            {hr}

            {/* 7 */}
            <motion.div {...f} className="wp-section">
              <h2>7. Cognitive Legacy Governance Substrate (FLA-LGS)</h2>
              <p>FLA-LGS is the 42-node deterministic processing mesh that powers diagnostics, governance enforcement, and autonomous workflow management. It operates in four layers:</p>
              <ul>
                <li><strong>Perception (12 nodes):</strong> Raw signal ingestion — OBD-II telemetry, GPS, operator inputs, sensor feeds</li>
                <li><strong>Analysis (14 nodes):</strong> Cross-validation against known patterns with disagreement-triggered verification</li>
                <li><strong>Decision (10 nodes):</strong> Deterministic rule application — same inputs always produce the same decision</li>
                <li><strong>Action (6 nodes):</strong> Certified outputs — reports, certificates, workflow triggers, ledger anchoring</li>
              </ul>
              <p>The word "deterministic" is critical. FLA-LGS contains <strong>zero inference, zero probability, zero hallucination surface</strong>. Given the same inputs, every node produces the same output on any hardware, at any time. This is not a feature — it is a mathematical property of the system.</p>
              <p>The FLA-LGS mesh visualizer is live at <strong>/cog</strong> with real-time node health, layer breakdown, and engine pulse monitoring.</p>
            </motion.div>

            {hr}

            {/* 8 */}
            <motion.div {...f} className="wp-section">
              <h2>8. LUME-V — Deterministic Governance Substrate</h2>
              <p>LUME-V is the modernization layer that makes everything possible without a rip-and-replace migration. It wraps existing systems in deterministic governance envelopes — preserving every database, every workflow, every integration that already works.</p>
              <ul>
                <li>Wraps existing systems without modifying source code</li>
                <li>Unifies fragmented logic into a single governance model</li>
                <li>Provides deterministic replay for any historical event</li>
                <li>Requires zero downtime and zero database migration</li>
                <li>Operates across any legacy enterprise stack</li>
              </ul>
              <p>This is the answer to the question every enterprise asks: <em>"How do we modernize without breaking what works?"</em> LUME-V wraps it. It doesn't replace it.</p>
            </motion.div>

            {hr}

            {/* 9 */}
            <motion.div {...f} className="wp-section">
              <h2>9. LUME-Scan — Diagnostic Intelligence</h2>
              <p>LUME-Scan is the field-level diagnostic platform. A 42-node synthetic organism processes real-time OBD-II telemetry and produces cryptographically verifiable condition certificates in 45 seconds.</p>
              <h3>Scanner Capabilities</h3>
              <ul>
                <li>42 real-time signals at 100ms intervals (RPM, MAP, MAF, fuel trims, O2, coolant, intake air, timing, catalyst, battery, and more)</li>
                <li>Read/Clear DTCs (Modes 03/04/07), Freeze Frame (Mode 02), VIN Auto-Read (Mode 09)</li>
                <li>Mode 05: IMMO key management — read, program, and delete transponder keys via CAN bus</li>
                <li>Mode 06: CAN-bus remote start governance with 8 firmware-enforced safety constraints</li>
                <li>WiFi + Bluetooth dual-connectivity with commodity ELM327 adapters</li>
              </ul>
              <h3>Enterprise Value</h3>
              <ul>
                <li>60% of condition reports auto-generated from sensor data before a human inspector touches the vehicle</li>
                <li>Dead-battery detection, cold-start flagging, pending fault catch — before the vehicle reaches a lane</li>
                <li>Every scan anchored to FLA-PL. Every dispute resolvable by deterministic replay.</li>
              </ul>
              <p>The live scan demo is available at <strong>/app</strong> within this platform.</p>
            </motion.div>

            {hr}

            {/* 10 */}
            <motion.div {...f} className="wp-section">
              <h2>10. Division Separation & Enterprise Scalability</h2>
              <p>The fractal architecture is designed for the full FLA Enterprise ecosystem — not just Fractal Ledger Architecture. The same infrastructure extends to any division that generates operational records requiring auditability.</p>
              <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${accent}40` }}>
                      <th style={{ textAlign: 'left', padding: '8px 12px', color: accent, fontWeight: 600 }}>Division</th>
                      <th style={{ textAlign: 'left', padding: '8px 12px', color: accent, fontWeight: 600 }}>Ledger</th>
                      <th style={{ textAlign: 'left', padding: '8px 12px', color: accent, fontWeight: 600 }}>Certificate Types</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['NetworkNode', 'FLA-PL', 'Custody, Condition, Arbitration, Performance, Key Events'],
                      ['NextGear Capital', 'NGC-PL', 'Lien Origination, Payoff Records, Audit Events'],
                      ['Autotrader', 'ATR-PL', 'Listing Verification, Price Anchoring'],
                      ['Kelley Blue Book', 'KBB-PL', 'Valuation Anchoring, Market Data'],
                      ['Dealer.com', 'DLR-PL', 'Dealer Transactions, Inventory Sync'],
                    ].map(([div, ledger, certs], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>{div}</td>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: accent }}>{ledger}</td>
                        <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{certs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>Each division operates its own private chain. All chains anchor to CORE. No division accesses another division's data. Cross-division verification happens through FLA-VL — hash-only, zero exposure.</p>
            </motion.div>

            {hr}

            {/* 11 */}
            <motion.div {...f} className="wp-section">
              <h2>11. Implementation Path</h2>
              <p>Deployment follows a phased approach designed for zero disruption to existing operations.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
                {[
                  { phase: 'Phase 1 — Weeks 1–4', title: 'Pilot Facility Telemetry', desc: 'Deploy OBD-II adapters at one NetworkNode facility. Capture 42-signal telemetry. Generate condition reports. Validate scan accuracy against existing inspection reports.' },
                  { phase: 'Phase 2 — Weeks 4–8', title: 'Operational Intelligence', desc: 'Enable lane readiness dashboards, dead-battery detection, pending fault screening. Integrate transport pre-dispatch health reports. Begin arbitration reduction tracking.' },
                  { phase: 'Phase 3 — Weeks 8–12', title: 'Ledger Activation', desc: 'Activate FLA-PL validators. Anchor condition certificates on-ledger. Deploy LUME-V governance substrate. Issue FLA-VL certificates for buyer-facing verification.' },
                  { phase: 'Phase 4 — Weeks 12–16', title: 'Multi-Facility & Division Expansion', desc: 'Cross-facility benchmarking. NextGear Capital ledger integration. CORE root fabric activation. Expand to additional NetworkNode locations with proven playbook.' },
                ].map((p, i) => (
                  <div key={i} style={{ padding: '1rem 1.25rem', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.68rem', color: accent, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{p.phase}</div>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{p.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {hr}

            {/* 12 */}
            <motion.div {...f} className="wp-section">
              <h2>12. About DarkWave Studios LLC</h2>
              <p>DarkWave Studios LLC is the creator of the Lume deterministic programming language, the Trust Layer verification network, and the complete platform described in this document. The company holds US Provisional Patent 64/084,465 covering the deterministic governance architecture and US Provisional Patent 64/084,465 covering the Meridian wireless energy routing system.</p>
              <p>All platform components — the ledger, the governance substrate, the diagnostic organism, the verification chain, the cognitive engine — are built on the Lume runtime. Every capability described in this document is operational and demonstrable today.</p>
              <p style={{ fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                "We didn't build a pitch. We built the system. The pitch is showing you the system working."
              </p>
            </motion.div>

            {/* Footer */}
            <div style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--border-light)', marginTop: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Trust Layer Certified</span>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.65rem', lineHeight: 1.6 }}>
                © 2026 DarkWave Studios LLC · CORE.tlid.io<br />
                US Provisional Patents 64/084,465 & 64/084,465 · All rights reserved<br />
                This document is confidential and intended for FLA Enterprise authorized recipients only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
