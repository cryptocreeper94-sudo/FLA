import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Database, CheckCircle, Link2, RefreshCw, Globe, Lock, ArrowRight } from 'lucide-react';

const API = 'https://fla-ledger.onrender.com';
const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

const DIVISIONS = [
  { id: 'networknode', name: 'NetworkNode', desc: 'Wholesale Auction & Remarketing', color: '#38bdf8', ledger: 'FLA-PL', certs: ['CUSTODY_TRANSFER', 'CONDITION_REPORT', 'DRIVER_PERFORMANCE', 'ARBITRATION_PROOF'] },
  { id: 'tradevault', name: 'TradeVault', desc: 'Consumer Vehicle Marketplace', color: '#10b981', ledger: 'TVT-PL', certs: ['LISTING_VERIFICATION', 'PRICE_ANCHOR'] },
  { id: 'priceaxis', name: 'PriceAxis', desc: 'Asset Valuation & Data', color: '#f59e0b', ledger: 'PAX-PL', certs: ['VALUATION_ANCHOR', 'MARKET_DATA'] },
  { id: 'dealergrid', name: 'DealerGrid', desc: 'Dealer Digital Solutions', color: '#8b5cf6', ledger: 'DGR-PL', certs: ['DEALER_TRANSACTION', 'INVENTORY_SYNC'] },
  { id: 'ledgercapital', name: 'LedgerCapital', desc: 'Floor Plan Financing', color: '#ec4899', ledger: 'LCP-PL', certs: ['LIEN_ORIGINATION', 'PAYOFF_RECORD', 'AUDIT_EVENT'] },
];

export default function COREExplorer() {
  const [stats, setStats] = useState<any>(null);
  const [integrity, setIntegrity] = useState<any>(null);
  const [validators, setValidators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [s, i, v] = await Promise.all([
        fetch(`${API}/api/stats`).then(r => r.json()),
        fetch(`${API}/api/verify`).then(r => r.json()),
        fetch(`${API}/api/validators`).then(r => r.json()),
      ]);
      if (s.blockHeight <= 1) {
        await fetch(`${API}/api/demo/seed`, { method: 'POST' });
        const [s2, i2, v2] = await Promise.all([
          fetch(`${API}/api/stats`).then(r => r.json()), fetch(`${API}/api/verify`).then(r => r.json()),
          fetch(`${API}/api/validators`).then(r => r.json()),
        ]);
        setStats(s2); setIntegrity(i2); setValidators(v2);
      } else {
        setStats(s); setIntegrity(i); setValidators(v);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const panel: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem' };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><RefreshCw size={32} style={{ color: '#8b5cf6' }} /></motion.div>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Loading CORE Root Fabric...</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', marginBottom: '1rem' }}>
          <Layers size={32} color="#fff" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>CORE Root Fabric</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          The universal trust anchor for the entire FLA Enterprise ecosystem. Every division operates its own private ledger — all anchor to CORE.
        </p>
      </motion.div>

      {/* Integrity Banner */}
      <motion.div {...fadeIn} style={{ ...panel, borderColor: integrity?.valid ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)', background: integrity?.valid ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CheckCircle size={28} color={integrity?.valid ? '#10b981' : '#ef4444'} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: integrity?.valid ? '#10b981' : '#ef4444' }}>
              {integrity?.valid ? 'Root Fabric Integrity Verified' : 'Integrity Check Failed'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              Block Height: {integrity?.blockHeight} · Last verified: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'Blocks', value: stats?.blockHeight || 0 },
            { label: 'Certificates', value: stats?.totalCertificates || 0 },
            { label: 'Validators', value: validators.length },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fractal Architecture Visualization */}
      <motion.div {...fadeIn} style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.25rem', textAlign: 'center' }}>FLA — FRACTAL LEDGER TOPOLOGY</h3>
        
        {/* CORE Hub */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))', border: '2px solid rgba(139,92,246,0.4)', borderRadius: '12px' }}>
            <Layers size={20} color="#8b5cf6" />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#8b5cf6' }}>CORE</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Root Fabric</span>
          </div>
        </div>

        {/* Connector Lines */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <div style={{ width: '2px', height: '24px', background: 'linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.1))' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ width: '80%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), rgba(139,92,246,0.3), transparent)' }} />
        </div>

        {/* Division Spokes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {DIVISIONS.map((div, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02, y: -2 }} onClick={() => setSelectedDivision(selectedDivision === div.id ? null : div.id)}
              style={{ ...panel, padding: '1.25rem', cursor: 'pointer', borderColor: selectedDivision === div.id ? `${div.color}60` : 'var(--border-light)', transition: 'border-color 0.3s', position: 'relative', overflow: 'hidden' }}>
              {/* Connector dot at top */}
              <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: div.color, boxShadow: `0 0 8px ${div.color}` }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Database size={16} color={div.color} />
                <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{div.name}</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: '0 0 0.75rem', lineHeight: 1.4 }}>{div.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem' }}>
                <div style={{ padding: '2px 8px', borderRadius: '4px', background: `${div.color}15`, color: div.color, fontWeight: 700, fontFamily: 'monospace' }}>{div.ledger}</div>
                <ArrowRight size={10} color="var(--text-dim)" />
                <span style={{ color: '#8b5cf6', fontWeight: 600 }}>CORE</span>
              </div>

              {selectedDivision === div.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '6px', fontWeight: 600 }}>Certificate Types:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {div.certs.map((c, ci) => (
                      <span key={ci} style={{ padding: '2px 6px', background: `${div.color}10`, color: div.color, borderRadius: '4px', fontSize: '0.6rem', fontFamily: 'monospace' }}>{c}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How CORE Works */}
      <motion.div {...fadeIn} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>HOW THE FLA WORKS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { icon: <Database size={22} />, title: 'Division Autonomy', desc: 'Each FLA tenant operates its own private Proof-of-Authority ledger. NetworkNode\'s FLA-PL records auction events. LedgerCapital\'s LCP-PL records financing events. Data never crosses division boundaries.', color: '#38bdf8' },
            { icon: <Link2 size={22} />, title: 'Hash Anchoring', desc: 'Every division ledger periodically anchors a Merkle root hash to CORE. This proves the division\'s chain is intact without revealing any operational data. CORE sees hashes — never content.', color: '#8b5cf6' },
            { icon: <Shield size={22} />, title: 'Cross-Division Verification', desc: 'When NetworkNode sells a vehicle financed by LedgerCapital, FLA-VL issues a cross-division certificate. Both divisions can verify the transaction without accessing each other\'s internal records.', color: '#10b981' },
            { icon: <Lock size={22} />, title: 'Zero Data Exposure', desc: 'CORE is a trust anchor, not a data store. It proves that division chains are intact and unaltered. The operational data stays in each division\'s private ledger under their own access controls.', color: '#f59e0b' },
          ].map((item, i) => (
            <div key={i} style={{ ...panel }}>
              <div style={{ color: item.color, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Validator Nodes */}
      <motion.div {...fadeIn}>
        <h3 style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>CORE VALIDATOR NODES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {validators.map((v, i) => (
            <div key={i} style={{ ...panel, display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Globe size={20} color="#8b5cf6" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{v.name || v.id}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{v.facility || v.id}</div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  <span>{v.blocksProduced || 0} blocks</span>
                  <span>{v.certificatesSigned || 0} certs</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
                <span style={{ fontSize: '0.55rem', color: '#10b981', fontWeight: 600 }}>ONLINE</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
