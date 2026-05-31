import { motion } from 'framer-motion';
import { Network, ServerOff, Workflow, ShieldCheck, Database, Anchor, Activity } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LumeVSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Background elements */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <img src="/assets/images/photos/cep_cog_integration.png" alt="Cox Operational Governance (COG) NOC Architecture" style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(56,189,248,0.15)' }} />
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <Network size={14} style={{ marginRight: 6 }} /> The Modernization Engine
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              COG: <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #38bdf8, #10b981)' }}>Cox Operational Governance</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
              Powered by the Lume-V Engine, the COG wrapper surrounds Manheim's entire legacy stack in deterministic governance—unifying logic and orchestrating workflows without requiring a multi-million dollar rip-and-replace migration.
            </p>
          </motion.div>
        </div>

        {/* Live SDK Integration */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} style={{ marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.5rem', background: 'rgba(56, 189, 248, 0.02)', borderColor: 'rgba(56, 189, 248, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-cyan)' }}>
                  <Activity size={22} color="var(--accent-cyan)" /> Live Enterprise API Integration
                </h3>
                <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  The Lume-V SDK is already actively provisioned with <strong>COG</strong> specific credentials, ready to instantly wrap any legacy pipeline or AI agent without refactoring backend code.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', padding: '10px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} /> 
                  <span style={{ fontFamily: 'monospace' }}>API: cog_live_manheim_enterprise_xxx</span> 
                  <span style={{ marginLeft: 8, color: '#10b981', fontWeight: 600 }}>[ ACTIVE ]</span>
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: '350px', background: '#0d1117', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                <div style={{ color: '#8b949e', marginBottom: '10px' }}>// Initialize Cox Operational Governance Wrapper</div>
                <div style={{ color: '#c9d1d9' }}><span style={{ color: '#ff7b72' }}>import</span> {'{'} LumeVEnterprise {'}'} <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>'@darkwave/lume-v-sdk'</span>;</div>
                <br/>
                <div style={{ color: '#8b949e' }}>// Connect to the Lume-V Verification Network</div>
                <div style={{ color: '#c9d1d9' }}><span style={{ color: '#ff7b72' }}>const</span> cog <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>LumeVEnterprise</span>({'{'}</div>
                <div style={{ color: '#c9d1d9', paddingLeft: '20px' }}>apiKey: <span style={{ color: '#a5d6ff' }}>'cog_live_manheim_enterprise_key'</span></div>
                <div style={{ color: '#c9d1d9' }}>{'}'});</div>
                <br/>
                <div style={{ color: '#8b949e' }}>// Instantly validate legacy pipeline data</div>
                <div style={{ color: '#c9d1d9' }}><span style={{ color: '#ff7b72' }}>const</span> safePayload <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>await</span> cog.<span style={{ color: '#d2a8ff' }}>validate</span>(legacyExportData);</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The 25-Year Deadlock */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }} style={{ marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.5rem', background: 'rgba(239, 68, 68, 0.02)', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px', color: '#f87171' }}>
              <ServerOff size={22} color="#ef4444" /> The Legacy Modernization Challenge
            </h3>
            <style>{`
              .lumev-challenge-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem 1.5rem; }
              @media (max-width: 768px) { .lumev-challenge-grid { grid-template-columns: 1fr; gap: 0.75rem; } }
            `}</style>
            <div className="lumev-challenge-grid">
              {[
                'Too expensive to rebuild',
                'Too risky to replace',
                'Too slow to migrate',
                'Too disruptive to retrain',
                'Too fragmented to unify',
                'Too siloed to integrate'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 500 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two-Column Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(56,189,248,0.15)', background: 'linear-gradient(180deg, rgba(56,189,248,0.02) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>What LUME-V Is</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              A deterministic modernization wrapper. It is not a new database, and it is not a replacement platform. It is an intelligent governance layer that:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <Database size={18} />, text: 'Wraps your legacy stack in deterministic governance' },
                { icon: <Workflow size={18} />, text: 'Unifies fragmented logic into a single source of truth' },
                { icon: <ShieldCheck size={18} />, text: 'Modernizes behavior without altering source code' },
                { icon: <Activity size={18} />, text: 'Requires zero downtime and zero database migration' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1rem', color: 'var(--text-main)' }}>
                  <div style={{ color: 'var(--accent-cyan)', padding: '6px', background: 'rgba(56,189,248,0.1)', borderRadius: '8px', display: 'flex' }}>
                    {item.icon}
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(56,189,248,0.15)', background: 'linear-gradient(180deg, rgba(56,189,248,0.02) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#c4b5fd' }}>What It Enables</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              LUME-V breaks the chains of vendor lock-in, turning monolithic, isolated databases into an interoperable ecosystem ready for:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { text: 'Modern APIs and unified workflows' },
                { text: 'Deterministic logic & cross-system automation' },
                { text: 'VET & LUME-Auto Integration' },
                { text: 'Future Meridian Integration' },
                { text: 'Modernization without disruption' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1rem', color: 'var(--text-main)' }}>
                  <div style={{ color: '#c4b5fd', padding: '6px', background: 'rgba(56,189,248,0.1)', borderRadius: '8px', display: 'flex' }}>
                    <Anchor size={18} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* SSO & Legacy Integration */}
        <motion.div {...fadeIn} transition={{ delay: 0.35 }} style={{ marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.5rem', background: 'rgba(245, 158, 11, 0.02)', borderColor: 'rgba(245, 158, 11, 0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px', color: '#fbbf24' }}>
              <ShieldCheck size={22} color="#f59e0b" /> Seamless SSO & Legacy Integration
            </h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Transitioning to the Cox Operational Platform requires <strong>zero new credentials</strong> and <strong>zero database migration</strong>. LUME-V acts as a universal translator for your existing enterprise infrastructure.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <h4 style={{ color: '#fbbf24', fontSize: '1rem', marginBottom: '0.5rem' }}>Identity Management</h4>
                <p className="text-dim" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Full native integration with Cox Automotive's existing Okta and Azure Active Directory. Employees log into the COP wrapper exactly as they do today.
                </p>
              </div>
              <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <h4 style={{ color: '#fbbf24', fontSize: '1rem', marginBottom: '0.5rem' }}>Data Persistence</h4>
                <p className="text-dim" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  LUME-V securely connects to your current Oracle, SQL, and mainframe systems. The OS controls the workflows without requiring a multi-year ETL database migration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '3.5rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.3)', background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.01) 100%)', boxShadow: '0 10px 40px rgba(16,185,129,0.05)' }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--accent-emerald)' }}>Why This Layer Matters</h3>
          <p className="text-muted" style={{ maxWidth: '850px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
            LUME-V is the reason none of this requires a rip-and-replace. It sits between Manheim's existing systems and the deterministic governance layer — preserving every database, every workflow, every integration that already works. Nothing breaks. Nothing migrates. The systems Manheim already operates simply gain a new layer of cryptographic auditability, cross-system intelligence, and deterministic enforcement. The infrastructure Manheim builds on this foundation is theirs — permanently.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
