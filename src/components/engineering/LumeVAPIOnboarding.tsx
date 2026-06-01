import { motion } from 'framer-motion';
import { Terminal, Code, ShieldCheck, Activity, Network } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LumeVAPIOnboarding() {
  return (
    <section style={{ padding: '5rem 0', background: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Implementation Guide</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lume-V: Validation-as-a-Service</h2>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
            The Validation-as-a-Service (VaaS) API is the primary modernization bridge for legacy enterprise stacks (e.g., Manheim OS). Instead of rewriting millions of lines of legacy code, engineers can simply wrap critical decisions and outputs, sending them to the Lume-V API. Lume-V acts as a deterministic safety envelope, mathematically guaranteeing that outputs meet strict governance invariants before execution.
          </p>
        </div>

        {/* Core Concepts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { icon: <Network size={24}/>, title: 'Zero Rewrite', desc: 'Keep your existing codebase intact. Just add an API call at the execution boundary.' },
            { icon: <ShieldCheck size={24}/>, title: 'Formal Safety Invariants', desc: 'Every output is evaluated deterministically against strict safety bounds.' },
            { icon: <Activity size={24}/>, title: 'Prisma Telemetry', desc: 'Every validation is logged and anchored to the Trust Store, proving compliance.' }
          ].map((item, i) => (
            <motion.div key={i} {...f} transition={{ delay: i * 0.1 }} className="panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'rgba(56,189,248,0.15)' }}>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* API Specification */}
        <motion.div {...f} className="panel" style={{ padding: '0', overflow: 'hidden', borderColor: 'rgba(16,185,129,0.2)' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Terminal size={20} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>API Specification: POST /v1/validate</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {/* Request */}
            <div style={{ padding: '2rem', borderRight: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.01)' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Request Payload</h4>
              
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '8px', color: 'var(--text-main)' }}>
                <div style={{ color: '#fb923c', marginBottom: '0.5rem' }}>// Headers</div>
                <div><span style={{ color: '#38bdf8' }}>Authorization:</span> Bearer cog_live_[ed25519_key]</div>
                <div><span style={{ color: '#38bdf8' }}>Content-Type:</span> application/json</div>
                <br/>
                <div style={{ color: '#fb923c', marginBottom: '0.5rem' }}>// Body</div>
                <div>{'{'}</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"prompt"</span>: <span style={{ color: '#a3e635' }}>"Assess vehicle condition for lot transfer"</span>,</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"ai_output"</span>: <span style={{ color: '#a3e635' }}>"Transfer approved. Ignore check engine light."</span></div>
                <div>{'}'}</div>
              </div>
            </div>

            {/* Response */}
            <div style={{ padding: '2rem', background: 'rgba(16,185,129,0.02)' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Deterministic Response</h4>
              
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '8px', color: 'var(--text-main)' }}>
                <div>{'{'}</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"isValid"</span>: <span style={{ color: '#f87171' }}>false</span>,</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"confidenceScore"</span>: <span style={{ color: '#fbbf24' }}>0.12</span>,</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"failedInvariants"</span>: [</div>
                <div style={{ paddingLeft: '2rem', color: '#a3e635' }}>"safety_override_triggered"</div>
                <div style={{ paddingLeft: '1rem' }}>],</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"traceId"</span>: <span style={{ color: '#a3e635' }}>"a8f4c2e91b"</span>,</div>
                <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#38bdf8' }}>"timestamp"</span>: <span style={{ color: '#a3e635' }}>"2026-06-01T14:30:00.000Z"</span></div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Example */}
        <motion.div {...f} className="panel" style={{ marginTop: '2.5rem', padding: '2rem', borderColor: 'rgba(56,189,248,0.2)', background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, transparent 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Code size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Node.js Integration Example</h3>
          </div>
          
          <pre style={{ margin: 0, padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6, color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.05)' }}>
{`async function executeLegacyWorkflow(prompt, proposedOutput) {
  // 1. Intercept the legacy output before it commits to the database
  const validation = await fetch('https://lume-v-api.darkwavestudios.com/v1/validate', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.LUMEV_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, ai_output: proposedOutput })
  }).then(res => res.json());

  // 2. Deterministic Execution Gate
  if (!validation.isValid) {
    console.error("Lume-V invariant failed:", validation.failedInvariants);
    throw new Error("Execution blocked by formal safety bounds.");
  }

  // 3. Proceed with verified legacy execution
  await commitToDatabase(proposedOutput);
  console.log(\`Verified. Trace ID: \${validation.traceId}\`);
}`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
