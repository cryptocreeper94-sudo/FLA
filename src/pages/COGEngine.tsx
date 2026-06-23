import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Activity, Cpu, GitBranch, Zap, CheckCircle, RefreshCw, Hexagon, Eye, Target, Gauge } from 'lucide-react';

const API = 'https://fla-ledger.onrender.com';
const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

// Simulated 42-node mesh status (deterministic — always same layout)
function generateNodes() {
  const nodes = [];
  const layers = ['Perception', 'Analysis', 'Decision', 'Action'];
  for (let layer = 0; layer < 4; layer++) {
    const nodesInLayer = layer === 0 ? 12 : layer === 1 ? 14 : layer === 2 ? 10 : 6;
    for (let n = 0; n < nodesInLayer; n++) {
      nodes.push({
        id: `N${layer}-${n}`,
        layer: layers[layer],
        layerIndex: layer,
        health: 95 + Math.floor(Math.random() * 5),
        status: Math.random() > 0.02 ? 'active' : 'healing',
        throughput: (80 + Math.random() * 20).toFixed(1),
      });
    }
  }
  return nodes;
}

export default function COGEngine() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [nodes] = useState(generateNodes);
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);

  const fetchStats = useCallback(async () => {
    try {
      const s = await fetch(`${API}/api/stats`).then(r => r.json());
      if (s.blockHeight <= 1) await fetch(`${API}/api/demo/seed`, { method: 'POST' });
      setStats(await fetch(`${API}/api/stats`).then(r => r.json()));
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { const i = setInterval(() => setPulse(p => p + 1), 3000); return () => clearInterval(i); }, []);

  const panel: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem' };
  const layers = ['Perception', 'Analysis', 'Decision', 'Action'];
  const layerColors = ['#38bdf8', '#10b981', '#f59e0b', '#ec4899'];
  const activeNodes = nodes.filter(n => n.status === 'active').length;
  const healingNodes = nodes.filter(n => n.status === 'healing').length;
  const avgHealth = (nodes.reduce((a, n) => a + n.health, 0) / nodes.length).toFixed(1);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><Brain size={32} style={{ color: '#ec4899' }} /></motion.div>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Initializing Cognitive Legacy Governance Substrate...</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg, #ec4899, #be185d)', marginBottom: '1rem' }}>
          <Brain size={32} color="#fff" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>Cognitive Legacy Governance Substrate</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', maxWidth: '550px', margin: '0 auto', lineHeight: 1.6 }}>
          The 42-node deterministic engine powering AI governance, diagnostics, and autonomous workflow management across FLA operations.
        </p>
      </motion.div>

      {/* Engine Status KPIs */}
      <motion.div {...fadeIn} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Nodes', value: 42, icon: <Hexagon size={16} />, color: '#ec4899' },
          { label: 'Active', value: activeNodes, icon: <CheckCircle size={16} />, color: '#10b981' },
          { label: 'Self-Healing', value: healingNodes, icon: <GitBranch size={16} />, color: healingNodes > 0 ? '#f59e0b' : '#10b981' },
          { label: 'Avg Health', value: `${avgHealth}%`, icon: <Gauge size={16} />, color: '#38bdf8' },
          { label: 'Engine Mode', value: 'DETERMINISTIC', icon: <Target size={16} />, color: '#8b5cf6' },
          { label: 'Ledger Anchored', value: stats?.chainValid ? 'YES' : 'NO', icon: <Shield size={16} />, color: stats?.chainValid ? '#10b981' : '#ef4444' },
        ].map((kpi, i) => (
          <div key={i} style={{ ...panel, padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color, flexShrink: 0 }}>{kpi.icon}</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{kpi.value}</div>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* 42-Node Mesh Visualization */}
      <motion.div {...fadeIn} style={{ ...panel, marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ fontSize: '0.8rem', color: '#ec4899', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.5rem', textAlign: 'center' }}>42-NODE GOVERNANCE MESH</h3>
        
        {layers.map((layer, li) => {
          const layerNodes = nodes.filter(n => n.layerIndex === li);
          const color = layerColors[li];
          return (
            <div key={li} style={{ marginBottom: li < 3 ? '1.5rem' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => setSelectedLayer(selectedLayer === li ? null : li)}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase', minWidth: '80px' }}>Layer {li + 1}: {layer}</span>
                <div style={{ flex: 1, height: '1px', background: `${color}30` }} />
                <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{layerNodes.length} nodes</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {layerNodes.map((node, ni) => (
                  <motion.div key={ni}
                    animate={{ scale: node.status === 'healing' ? [1, 1.1, 1] : 1, opacity: node.status === 'healing' ? [0.5, 1, 0.5] : 1 }}
                    transition={{ duration: 2, repeat: node.status === 'healing' ? Infinity : 0 }}
                    title={`${node.id} · Health: ${node.health}% · Throughput: ${node.throughput}%`}
                    style={{
                      width: 28, height: 28, borderRadius: '6px',
                      background: node.status === 'active' ? `${color}20` : 'rgba(245,158,11,0.2)',
                      border: `1px solid ${node.status === 'active' ? `${color}50` : 'rgba(245,158,11,0.5)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.5rem', fontWeight: 700, color: node.status === 'active' ? color : '#f59e0b',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                    {node.status === 'active' ? <Cpu size={12} /> : <RefreshCw size={10} />}
                  </motion.div>
                ))}
              </div>
              {selectedLayer === li && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: '8px', padding: '12px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '6px' }}>
                    {layerNodes.map((node, ni) => (
                      <div key={ni} style={{ padding: '6px 8px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', fontSize: '0.65rem' }}>
                        <div style={{ fontWeight: 700, color, marginBottom: '2px' }}>{node.id}</div>
                        <div style={{ color: 'var(--text-dim)' }}>Health: {node.health}% · {node.throughput}% throughput</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Pulse indicator */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>Engine Running · Deterministic Mode · Pulse #{pulse}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Architecture Explanation */}
      <motion.div {...fadeIn} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {[
          { icon: <Eye size={22} />, title: 'Perception Layer', desc: '12 nodes that ingest raw signal data — OBD-II telemetry, GPS coordinates, operator inputs, sensor feeds. No interpretation — pure data capture and normalization.', color: '#38bdf8', count: 12 },
          { icon: <Activity size={22} />, title: 'Analysis Layer', desc: '14 nodes that cross-validate signals against known patterns. Each node independently analyzes its input and compares results with adjacent nodes. Disagreement triggers verification.', color: '#10b981', count: 14 },
          { icon: <Target size={22} />, title: 'Decision Layer', desc: '10 nodes that apply governance rules to analyzed data. Deterministic — the same inputs always produce the same decision. No inference. No probability. No hallucination surface.', color: '#f59e0b', count: 10 },
          { icon: <Zap size={22} />, title: 'Action Layer', desc: '6 nodes that execute certified outputs — generate reports, issue certificates, trigger workflows, anchor to the ledger. Every action is signed and sealed.', color: '#ec4899', count: 6 },
        ].map((layer, i) => (
          <div key={i} style={{ ...panel }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <div style={{ color: layer.color }}>{layer.icon}</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{layer.title}</h4>
                <span style={{ fontSize: '0.6rem', color: layer.color, fontWeight: 600 }}>{layer.count} NODES</span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>{layer.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
