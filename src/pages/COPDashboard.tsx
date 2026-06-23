import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Truck, MapPin, AlertTriangle, CheckCircle, ChevronRight, BarChart3, Layers, Zap, RefreshCw } from 'lucide-react';

const API = 'https://fla-ledger.onrender.com';
const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

const FACILITIES = [
  { id: 'NASH-001', name: 'NetworkNode Nashville', city: 'Nashville, TN', lanes: 12, capacity: 8500, status: 'operational' },
  { id: 'ATL-002', name: 'NetworkNode Atlanta', city: 'Atlanta, GA', lanes: 16, capacity: 12000, status: 'operational' },
  { id: 'HQ-003', name: 'FLA Enterprise HQ', city: 'Atlanta, GA', lanes: 0, capacity: 0, status: 'operational' },
];

export default function COPDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [s, m, v, a] = await Promise.all([
        fetch(`${API}/api/stats`).then(r => r.json()),
        fetch(`${API}/api/metrics`).then(r => r.json()),
        fetch(`${API}/api/vehicles`).then(r => r.json()),
        fetch(`${API}/api/activity?limit=15`).then(r => r.json()),
      ]);
      
      if (s.blockHeight <= 1) {
        await fetch(`${API}/api/demo/seed`, { method: 'POST' });
        const [s2, m2, v2, a2] = await Promise.all([
          fetch(`${API}/api/stats`).then(r => r.json()), fetch(`${API}/api/metrics`).then(r => r.json()),
          fetch(`${API}/api/vehicles`).then(r => r.json()), fetch(`${API}/api/activity?limit=15`).then(r => r.json()),
        ]);
        setStats(s2); setMetrics(m2); setVehicles(v2); setActivity(a2);
      } else {
        setStats(s); setMetrics(m); setVehicles(v); setActivity(a);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); const i = setInterval(fetchAll, 30000); return () => clearInterval(i); }, [fetchAll]);

  const panel: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.25rem' };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><RefreshCw size={32} style={{ color: '#f59e0b' }} /></motion.div>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Initializing Command Center...</p>
    </div>
  );

  const totalVehiclesInLot = vehicles.filter(v => ['LOT_STAGED', 'LANE_ASSIGNED', 'IN_AUCTION'].includes(v.currentState)).length;
  const vehiclesInTransit = vehicles.filter(v => v.currentState === 'TRANSPORT').length;
  const vehiclesSold = vehicles.filter(v => v.currentState === 'SOLD').length;
  const faultAlerts = vehicles.filter(v => v.faultCodes?.length > 0).length;

  return (
    <div style={{ padding: '1.5rem 1rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div {...fadeIn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Layers size={22} color="#0a0c10" /></div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>FLA Operating System</h1>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)', margin: 0, letterSpacing: '0.08em' }}>FLA AUTOMOTIVE · ENTERPRISE COMMAND CENTER</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>All Systems Operational</span>
          <button onClick={fetchAll} style={{ background: 'none', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', color: '#f59e0b', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw size={11} /> Live</button>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div {...fadeIn} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'On-Lot Vehicles', value: totalVehiclesInLot, icon: <Truck size={16} />, color: '#38bdf8' },
          { label: 'In Transit', value: vehiclesInTransit, icon: <ChevronRight size={16} />, color: '#8b5cf6' },
          { label: 'Sold Today', value: vehiclesSold, icon: <CheckCircle size={16} />, color: '#10b981' },
          { label: 'Fault Alerts', value: faultAlerts, icon: <AlertTriangle size={16} />, color: faultAlerts > 0 ? '#ef4444' : '#10b981' },
          { label: 'Active Agents', value: metrics?.agents?.uniqueAgents || 0, icon: <Users size={16} />, color: '#f59e0b' },
          { label: 'Chain Height', value: stats?.blockHeight || 0, icon: <Shield size={16} />, color: '#06b6d4' },
          { label: 'Certs Issued', value: stats?.totalCertificates || 0, icon: <BarChart3 size={16} />, color: '#10b981' },
          { label: 'Chain Integrity', value: stats?.chainValid ? 'VALID' : 'FAIL', icon: <Zap size={16} />, color: stats?.chainValid ? '#10b981' : '#ef4444' },
        ].map((kpi, i) => (
          <div key={i} style={{ ...panel, padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color, flexShrink: 0 }}>{kpi.icon}</div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{kpi.value}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Facility Cards */}
        <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, letterSpacing: '0.08em', margin: 0 }}>FACILITIES</h3>
          {FACILITIES.map((f, i) => (
            <div key={i} style={{ ...panel, padding: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.4)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{f.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}>
                  <span><MapPin size={10} style={{ marginRight: 2 }} />{f.city}</span>
                  {f.lanes > 0 && <span>{f.lanes} lanes</span>}
                  {f.capacity > 0 && <span>{f.capacity.toLocaleString()} capacity</span>}
                </div>
              </div>
              <span style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 600, textTransform: 'uppercase' }}>{f.status}</span>
            </div>
          ))}

          {/* Certificate Distribution */}
          {metrics?.distribution && (
            <div style={panel}>
              <h4 style={{ fontSize: '0.7rem', color: '#f59e0b', letterSpacing: '0.08em', margin: '0 0 0.75rem' }}>CERTIFICATE DISTRIBUTION</h4>
              {Object.entries(metrics.distribution).map(([type, count], i) => {
                const total = Object.values(metrics.distribution).reduce((a: number, b: any) => a + (b as number), 0) as number;
                const pct = total > 0 ? ((count as number) / total * 100) : 0;
                return (
                  <div key={i} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '2px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{type.replace(/_/g, ' ')}</span>
                      <span style={{ fontWeight: 600 }}>{count as number}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: '#f59e0b', borderRadius: '2px', transition: 'width 0.5s' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, letterSpacing: '0.08em', margin: 0 }}>LIVE ACTIVITY</h3>
          <div style={{ ...panel, padding: '0', maxHeight: '500px', overflowY: 'auto' }}>
            {activity.map((evt, i) => (
              <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: typeColor(evt.type), flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{evt.summary}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{evt.agentId} · {evt.facilityId}</div>
                </div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{timeAgo(evt.timestamp)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Vehicle Status Grid */}
      <motion.div {...fadeIn}>
        <h3 style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.75rem' }}>VEHICLE STATUS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {vehicles.slice(0, 12).map((v, i) => (
            <div key={i} style={{ ...panel, padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8rem' }}>...{v.vin.slice(-8)}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 600, background: stateColor(v.currentState) + '20', color: stateColor(v.currentState) }}>{v.currentState}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                <span>{v.totalEvents} events</span>·
                <span>Health: {v.lastHealthScore ? `${v.lastHealthScore}%` : '—'}</span>
                {v.faultCodes?.length > 0 && <span style={{ color: '#ef4444' }}>⚠ {v.faultCodes.length} faults</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function typeColor(type: string): string {
  switch (type) {
    case 'CUSTODY_TRANSFER': return '#38bdf8';
    case 'CONDITION_REPORT': return '#10b981';
    case 'ARBITRATION_PROOF': return '#f87171';
    case 'DRIVER_PERFORMANCE': return '#f59e0b';
    default: return '#94a3b8';
  }
}

function stateColor(state: string): string {
  switch (state) {
    case 'INTAKE': return '#38bdf8'; case 'LOT_STAGED': return '#f59e0b';
    case 'LANE_ASSIGNED': return '#8b5cf6'; case 'IN_AUCTION': return '#ec4899';
    case 'SOLD': return '#10b981'; case 'TRANSPORT': return '#06b6d4';
    default: return '#94a3b8';
  }
}
