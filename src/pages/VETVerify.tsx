import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Search, Hash, FileCheck, Fingerprint } from 'lucide-react';

const API = 'https://cox-automotive-ledger.onrender.com';
const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

export default function VETVerify() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [passport, setPassport] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'cert' | 'vin'>('cert');

  const verify = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true); setError(''); setResult(null); setPassport(null);
    try {
      if (mode === 'vin') {
        const res = await fetch(`${API}/api/passport/${encodeURIComponent(query.trim())}`);
        if (!res.ok) { setError('No records found for this VIN.'); setLoading(false); return; }
        setPassport(await res.json());
      } else {
        const res = await fetch(`${API}/api/verify/cert/${encodeURIComponent(query.trim())}`);
        if (!res.ok) { setError('Certificate not found. Verify the ID and try again.'); setLoading(false); return; }
        setResult(await res.json());
      }
    } catch { setError('Unable to reach verification network. Try again.'); }
    setLoading(false);
  }, [query, mode]);

  const panel: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem' };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', marginBottom: '1rem' }}>
          <Shield size={32} color="#0a0c10" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>COX Verification Ledger</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          Public verification portal for COX Private Ledger certificates. Enter a certificate ID or VIN to verify provenance and integrity.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>Verification Network Online</span>
        </div>
      </motion.div>

      {/* Mode Toggle */}
      <motion.div {...fadeIn} style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
        <button onClick={() => setMode('cert')} style={{ padding: '8px 20px', background: mode === 'cert' ? 'rgba(16,185,129,0.15)' : 'transparent', border: `1px solid ${mode === 'cert' ? 'rgba(16,185,129,0.3)' : 'var(--border-light)'}`, borderRadius: '8px', color: mode === 'cert' ? '#10b981' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
          <FileCheck size={14} style={{ marginRight: 6 }} />Certificate ID
        </button>
        <button onClick={() => setMode('vin')} style={{ padding: '8px 20px', background: mode === 'vin' ? 'rgba(56,189,248,0.15)' : 'transparent', border: `1px solid ${mode === 'vin' ? 'rgba(56,189,248,0.3)' : 'var(--border-light)'}`, borderRadius: '8px', color: mode === 'vin' ? '#38bdf8' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
          <Fingerprint size={14} style={{ marginRight: 6 }} />Vehicle Passport (VIN)
        </button>
      </motion.div>

      {/* Search */}
      <motion.div {...fadeIn} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && verify()}
              placeholder={mode === 'cert' ? 'Enter certificate ID...' : 'Enter full 17-character VIN...'}
              style={{ width: '100%', padding: '14px 14px 14px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', color: 'var(--text-main)', fontSize: '0.95rem', fontFamily: 'monospace', outline: 'none', letterSpacing: '0.02em' }}
            />
          </div>
          <button onClick={verify} disabled={loading} style={{ padding: '14px 28px', background: '#10b981', color: '#0a0c10', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div {...fadeIn} style={{ ...panel, borderColor: 'rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
          <XCircle size={20} color="#ef4444" />
          <span style={{ color: '#f87171' }}>{error}</span>
        </motion.div>
      )}

      {/* Certificate Verification Result */}
      {result && (
        <motion.div {...fadeIn}>
          {/* Verified Banner */}
          <div style={{ ...panel, borderColor: 'rgba(16,185,129,0.3)', background: 'linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 100%)', textAlign: 'center', marginBottom: '1.5rem' }}>
            <CheckCircle size={48} color="#10b981" style={{ marginBottom: '0.75rem' }} />
            <h2 style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem' }}>Certificate Verified</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', margin: 0 }}>This certificate is cryptographically sealed and untampered on the COX Private Ledger.</p>
            <div style={{ marginTop: '1rem', padding: '8px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', display: 'inline-block' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.05em' }}>{result.serial}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={panel}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>CERTIFICATE</h4>
              {detailRow('Type', result.certificate.type.replace(/_/g, ' '))}
              {detailRow('Issued', new Date(result.certificate.timestamp).toLocaleString())}
              {detailRow('Facility', result.certificate.facilityId)}
              {detailRow('Agent', result.certificate.agentId)}
              {detailRow('Fingerprint', result.fingerprint, true)}
            </div>
            <div style={panel}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>BLOCK ANCHOR</h4>
              {detailRow('Block', `#${result.block.index}`)}
              {detailRow('Validator', result.block.validatorId)}
              {detailRow('Block Hash', result.block.hash?.slice(0, 20) + '...', true)}
              {detailRow('Merkle Root', result.block.merkleRoot?.slice(0, 20) + '...', true)}
              {detailRow('Chain Valid', result.hallmark.chainIntegrity ? '✓ Verified' : '✗ Failed')}
            </div>
          </div>

          {/* Hallmark */}
          <div style={{ ...panel, borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.03)' }}>
            <h4 style={{ color: '#8b5cf6', fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>HALLMARK STAMP</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {detailRow('Network', result.hallmark.network)}
              {detailRow('Consensus', result.hallmark.consensus)}
              {detailRow('Hash Algorithm', result.hallmark.hashAlgorithm)}
              {detailRow('Merkle', result.hallmark.merkleTree)}
            </div>
          </div>
        </motion.div>
      )}

      {/* Vehicle Passport */}
      {passport && (
        <motion.div {...fadeIn}>
          <div style={{ ...panel, borderColor: 'rgba(56,189,248,0.3)', background: 'linear-gradient(180deg, rgba(56,189,248,0.06) 0%, transparent 100%)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Fingerprint size={28} color="#38bdf8" />
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, fontFamily: 'monospace', letterSpacing: '0.03em' }}>{passport.vin}</h2>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Vehicle Digital Passport · {passport.totalEvents} events on-ledger</div>
              </div>
              <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>{passport.currentState}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
              {[
                { label: 'First Seen', value: new Date(passport.firstSeen).toLocaleDateString() },
                { label: 'Last Activity', value: timeAgo(passport.lastActivity) },
                { label: 'Custody Moves', value: passport.custodyChain?.length || 0 },
                { label: 'Condition Scans', value: passport.conditionReports?.length || 0 },
                { label: 'Health Score', value: passport.healthSnapshot?.overall ? `${passport.healthSnapshot.overall}%` : '—' },
                { label: 'Arbitrations', value: passport.arbitrations?.length || 0 },
              ].map((s, i) => (
                <div key={i} style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{s.value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Custody Chain */}
          {passport.custodyChain?.length > 0 && (
            <div style={{ ...panel, marginBottom: '1rem' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>CUSTODY CHAIN</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {passport.custodyChain.map((c: any, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '0.78rem' }}>
                    <span style={{ fontWeight: 700, color: '#38bdf8', minWidth: '100px' }}>{c.from} → {c.to}</span>
                    <span style={{ color: 'var(--text-dim)' }}>by {c.agent}</span>
                    {c.location && <span style={{ color: 'var(--text-dim)' }}>@ {c.location}</span>}
                    <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-dim)' }}>{timeAgo(c.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Certificates */}
          {passport.allCertificates?.length > 0 && (
            <div style={panel}>
              <h4 style={{ color: '#10b981', fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>ALL CERTIFICATES</h4>
              {passport.allCertificates.map((c: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: i < passport.allCertificates.length - 1 ? '1px solid var(--border-light)' : 'none', fontSize: '0.75rem' }}>
                  <span style={{ fontWeight: 600, color: '#10b981', minWidth: '130px' }}>{c.type.replace(/_/g, ' ')}</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--text-dim)', fontSize: '0.65rem' }}>{c.payloadHash.slice(0, 16)}...</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: '0.68rem' }}>{timeAgo(c.timestamp)}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* How it works footer */}
      {!result && !passport && !error && (
        <motion.div {...fadeIn} style={{ marginTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: <Hash size={20} />, title: 'Hash Verification', desc: 'Every certificate contains a SHA-256 hash of the original data. If a single bit changes, the hash fails.' },
              { icon: <Shield size={20} />, title: 'Chain Anchored', desc: 'Certificates are sealed in Proof-of-Authority blocks. The chain cannot be rewritten without all validators agreeing.' },
              { icon: <Fingerprint size={20} />, title: 'Zero Data Exposure', desc: 'COX-VL proves provenance without revealing internal operational data. The hash proves integrity — the source stores content.' },
            ].map((item, i) => (
              <div key={i} style={{ ...panel, textAlign: 'center' }}>
                <div style={{ color: '#10b981', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function detailRow(label: string, value: string | number | undefined, mono = false) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.8rem' }}>
      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span style={{ fontWeight: 600, fontFamily: mono ? 'monospace' : 'inherit', fontSize: mono ? '0.72rem' : '0.8rem' }}>{value || '—'}</span>
    </div>
  );
}
