import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Activity, Search, RefreshCw, ChevronDown, ChevronRight, CheckCircle, Clock, Hash, Link2, FileCheck, User, MapPin } from 'lucide-react';

const API = 'https://cox-automotive-ledger.onrender.com';
const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const accent = '#38bdf8';
const accentDim = 'rgba(56,189,248,0.12)';

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

function truncHash(h: string) { return h ? h.slice(0, 8) + '···' + h.slice(-6) : '—'; }

export default function CALExplorer() {
  const [stats, setStats] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [integrity, setIntegrity] = useState<any>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'blocks' | 'activity' | 'vehicles' | 'search'>('blocks');

  const fetchAll = useCallback(async () => {
    try {
      const [statsRes, blocksRes, activityRes, integrityRes, vehiclesRes] = await Promise.all([
        fetch(`${API}/api/stats`), fetch(`${API}/api/blocks`), fetch(`${API}/api/activity?limit=30`),
        fetch(`${API}/api/verify`), fetch(`${API}/api/vehicles`),
      ]);
      const [s, b, a, i, v] = await Promise.all([statsRes.json(), blocksRes.json(), activityRes.json(), integrityRes.json(), vehiclesRes.json()]);
      setStats(s); setBlocks(b.reverse()); setActivity(a); setIntegrity(i); setVehicles(v);
      
      // Auto-seed if chain is empty
      if (s.blockHeight <= 1) {
        await fetch(`${API}/api/demo/seed`, { method: 'POST' });
        // Re-fetch after seeding
        const [s2, b2, a2, i2, v2] = await Promise.all([
          fetch(`${API}/api/stats`).then(r => r.json()), fetch(`${API}/api/blocks`).then(r => r.json()),
          fetch(`${API}/api/activity?limit=30`).then(r => r.json()), fetch(`${API}/api/verify`).then(r => r.json()),
          fetch(`${API}/api/vehicles`).then(r => r.json()),
        ]);
        setStats(s2); setBlocks(b2.reverse()); setActivity(a2); setIntegrity(i2); setVehicles(v2);
      }
    } catch (e) { console.error('API fetch error:', e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const doSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`${API}/api/search?q=${encodeURIComponent(searchQuery)}&limit=20`);
      setSearchResults(await res.json());
      setTab('search');
    } catch (e) { console.error(e); }
  };

  const panelStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem' };
  const statCard = (label: string, value: string | number, icon: React.ReactNode, color: string) => (
    <div style={{ ...panelStyle, display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>{icon}</div>
      <div><div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</div><div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div></div>
    </div>
  );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><RefreshCw size={32} style={{ color: accent }} /></motion.div>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Connecting to Cox Automotive Ledger...</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div {...fadeIn} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
          <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${accent}, #0ea5e9)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Database size={20} color="#0a0c10" /></div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>Cox Automotive Ledger</h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', margin: 0, letterSpacing: '0.08em' }}>MANHEIM DIVISION · PRIVATE PROOF-OF-AUTHORITY CHAIN</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.75rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: integrity?.valid ? '#10b981' : '#ef4444', boxShadow: integrity?.valid ? '0 0 8px #10b981' : '0 0 8px #ef4444' }} />
          <span style={{ fontSize: '0.75rem', color: integrity?.valid ? '#10b981' : '#ef4444', fontWeight: 600 }}>
            {integrity?.valid ? 'Chain Integrity Verified' : 'Chain Integrity Failed'}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: '8px' }}>Node: NASH-001 (Manheim Nashville)</span>
          <button onClick={fetchAll} style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${accentDim}`, borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', color: accent, fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw size={12} /> Refresh</button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {stats && (
        <motion.div {...fadeIn} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {statCard('Block Height', stats.blockHeight, <Database size={18} />, accent)}
          {statCard('Certificates', stats.totalCertificates, <FileCheck size={18} />, '#10b981')}
          {statCard('Vehicles Tracked', vehicles.length, <Activity size={18} />, '#f59e0b')}
          {statCard('Validators', stats.validators?.length || 3, <Shield size={18} />, '#8b5cf6')}
        </motion.div>
      )}

      {/* Search Bar */}
      <motion.div {...fadeIn} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()}
              placeholder="Search by VIN, certificate ID, agent, or hash..."
              style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
          <button onClick={doSearch} style={{ padding: '10px 20px', background: accent, color: '#0a0c10', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>Search</button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '2px' }}>
        {(['blocks', 'activity', 'vehicles', 'search'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', background: tab === t ? accentDim : 'transparent', border: 'none', borderBottom: tab === t ? `2px solid ${accent}` : '2px solid transparent', color: tab === t ? accent : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'all 0.2s' }}>{t}</button>
        ))}
      </div>

      {/* Block Explorer */}
      {tab === 'blocks' && (
        <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {blocks.map((block, i) => (
            <div key={i} style={{ ...panelStyle, padding: '0', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setExpandedBlock(expandedBlock === block.index ? null : block.index)}>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: block.index === 0 ? 'rgba(251,191,36,0.15)' : accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center', color: block.index === 0 ? '#fbbf24' : accent, fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
                  {block.index === 0 ? '⛓️' : `#${block.index}`}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{block.index === 0 ? 'Genesis Block' : `Block #${block.index}`}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>{truncHash(block.hash)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    <span><Clock size={10} style={{ marginRight: 3 }} />{timeAgo(block.timestamp)}</span>
                    <span><FileCheck size={10} style={{ marginRight: 3 }} />{block.certificateCount} certs</span>
                    <span><User size={10} style={{ marginRight: 3 }} />{block.validatorId}</span>
                  </div>
                </div>
                {expandedBlock === block.index ? <ChevronDown size={16} color="var(--text-dim)" /> : <ChevronRight size={16} color="var(--text-dim)" />}
              </div>
              {expandedBlock === block.index && block.certificates.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-light)', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.15)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: accent, letterSpacing: '0.08em', marginBottom: '8px' }}>CERTIFICATES IN BLOCK</div>
                  {block.certificates.map((cert: any, ci: number) => (
                    <div key={ci} style={{ padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: '6px', marginBottom: '6px', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600, color: typeColor(cert.type) }}>{cert.type.replace(/_/g, ' ')}</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'var(--text-dim)' }}>{cert.id.slice(0, 12)}...</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                        <span>Facility: {cert.facilityId}</span>
                        <span>Agent: {cert.agentId}</span>
                        {cert.payload?.vin && <span>VIN: ...{cert.payload.vin.slice(-6)}</span>}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                        <Hash size={10} style={{ marginRight: 3 }} />{cert.payloadHash}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Activity Feed */}
      {tab === 'activity' && (
        <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {activity.map((evt, i) => (
            <div key={i} style={{ ...panelStyle, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${typeColor(evt.type)}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {typeIcon(evt.type)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{evt.summary}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <span>{evt.type.replace(/_/g, ' ')}</span>·<span>{evt.facilityId}</span>·<span>{evt.agentId}</span>
                </div>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{timeAgo(evt.timestamp)}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Vehicles */}
      {tab === 'vehicles' && (
        <motion.div {...fadeIn}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {vehicles.map((v, i) => (
              <div key={i} style={{ ...panelStyle }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.02em' }}>{v.vin}</span>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600, background: stateColor(v.currentState) + '20', color: stateColor(v.currentState) }}>{v.currentState}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem' }}>
                  <div><span style={{ color: 'var(--text-dim)' }}>Events:</span> <strong>{v.totalEvents}</strong></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>Transfers:</span> <strong>{v.custodyTransfers}</strong></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>Scans:</span> <strong>{v.conditionReports}</strong></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>Health:</span> <strong style={{ color: v.lastHealthScore > 80 ? '#10b981' : '#f59e0b' }}>{v.lastHealthScore || '—'}%</strong></div>
                </div>
                {v.faultCodes?.length > 0 && (
                  <div style={{ marginTop: '6px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {v.faultCodes.map((code: string, fi: number) => (
                      <span key={fi} style={{ padding: '2px 6px', background: 'rgba(239,68,68,0.15)', color: '#f87171', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'monospace' }}>{code}</span>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '6px' }}>Last activity: {timeAgo(v.lastActivity)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {tab === 'search' && searchResults && (
        <motion.div {...fadeIn}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>{searchResults.total} results found</p>
          {searchResults.results?.map((r: any, i: number) => (
            <div key={i} style={{ ...panelStyle, padding: '0.75rem 1rem', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: typeColor(r.type), fontSize: '0.82rem' }}>{r.type.replace(/_/g, ' ')}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{timeAgo(r.timestamp)}</span>
              </div>
              <div style={{ fontSize: '0.78rem', marginBottom: '4px' }}>{r.summary}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>Block #{r.blockIndex} · {r.certId.slice(0, 16)}... · Hash: {truncHash(r.payloadHash)}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Validators */}
      {stats?.validators && (
        <motion.div {...fadeIn} style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: accent, fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>VALIDATOR NODES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {stats.validators.map((v: any, i: number) => (
              <div key={i} style={{ ...panelStyle, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.5)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{v.name || v.id}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}><MapPin size={10} style={{ marginRight: 3 }} />{v.facility || v.id} · {v.id}</div>
                </div>
                <CheckCircle size={16} style={{ marginLeft: 'auto', color: '#10b981' }} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function typeColor(type: string): string {
  switch (type) {
    case 'CUSTODY_TRANSFER': return '#38bdf8';
    case 'CONDITION_REPORT': return '#10b981';
    case 'ARBITRATION_PROOF': return '#f87171';
    case 'DRIVER_PERFORMANCE': return '#f59e0b';
    case 'GOVERNANCE_CERT': return '#8b5cf6';
    case 'KEY_PROGRAMMING': return '#ec4899';
    default: return '#94a3b8';
  }
}

function typeIcon(type: string) {
  const color = typeColor(type);
  switch (type) {
    case 'CUSTODY_TRANSFER': return <Link2 size={14} style={{ color }} />;
    case 'CONDITION_REPORT': return <FileCheck size={14} style={{ color }} />;
    case 'ARBITRATION_PROOF': return <Shield size={14} style={{ color }} />;
    case 'DRIVER_PERFORMANCE': return <User size={14} style={{ color }} />;
    default: return <Activity size={14} style={{ color }} />;
  }
}

function stateColor(state: string): string {
  switch (state) {
    case 'INTAKE': return '#38bdf8';
    case 'LOT_STAGED': return '#f59e0b';
    case 'LANE_ASSIGNED': return '#8b5cf6';
    case 'IN_AUCTION': return '#ec4899';
    case 'SOLD': return '#10b981';
    case 'TRANSPORT': return '#06b6d4';
    default: return '#94a3b8';
  }
}
