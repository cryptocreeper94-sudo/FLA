import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Link2, Eye, Cpu, Activity, ChevronLeft, ChevronRight, X } from 'lucide-react';

const HERO_IMAGES = [
  '/assets/images/photos/hero_auction.png',
  '/assets/images/photos/hero_diagnostic.png',
  '/assets/images/photos/hero_lotops.png',
  '/assets/images/photos/hero_infrastructure.png',
];

const STATS = [
  { icon: <Shield size={18}/>, val: '45s', label: 'Full Vehicle Scan', color: '#10b981', desc: "Instead of manually checking systems, our hardware reads the entire vehicle's diagnostic health in under 45 seconds, instantly identifying hidden issues and maintenance needs before a vehicle goes to the lot." },
  { icon: <Link2 size={18}/>, val: '100%', label: 'Tamper-Proof Records', color: '#38bdf8', desc: "Every piece of data is cryptographically sealed the moment it is recorded. It cannot be altered, deleted, or manipulated by anyone—not even system administrators. What happens on the lot is exactly what is reported." },
  { icon: <Eye size={18}/>, val: '42', label: 'Validator Nodes', color: '#22d3ee', desc: "A decentralized network of 42 independent servers constantly double-checks every piece of data. This ensures there is no single point of failure and makes the system mathematically impossible to hack or manipulate." },
  { icon: <Cpu size={18}/>, val: 'OBD-II', label: 'Deep Diagnostics', color: '#f59e0b', desc: "We plug directly into the vehicle's onboard computer port (OBD-II) to pull raw, unfiltered data straight from the engine, transmission, and internal sensors—bypassing human error entirely." },
  { icon: <Activity size={18}/>, val: 'Real-Time', label: 'Fleet Intelligence', color: '#38bdf8', desc: "Stop waiting for end-of-day reports. As vehicles are scanned and moved, data flows instantly to the command center, giving managers a live, down-to-the-second view of fleet health and lot operations." },
];

export default function HeroSection() {
  const [imgIndex, setImgIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);
  const [selectedStat, setSelectedStat] = useState<number | null>(null);

  // Background slideshow
  useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % HERO_IMAGES.length), 9000);
    return () => clearInterval(t);
  }, []);

  // Stat carousel auto-advance
  useEffect(() => {
    const t = setInterval(() => setStatIndex(i => (i + 1) % STATS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const prevStat = useCallback(() => setStatIndex(i => (i - 1 + STATS.length) % STATS.length), []);
  const nextStat = useCallback(() => setStatIndex(i => (i + 1) % STATS.length), []);

  return (
    <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imgIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${HERO_IMAGES[imgIndex]})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transformOrigin: 'center center',
          }}
        />
      </AnimatePresence>

      {/* Lightened overlay — lets the photo show through more */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.70) 50%, rgba(10,10,12,0.88) 100%)',
      }} />

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <Shield size={14} style={{ marginRight: 6 }} /> Cox Enterprise Platform
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
            Fractal Trust Architecture.<br/>
            <span className="text-gradient">Built for the Enterprise.</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '800px', marginBottom: '2rem' }}>
            A deterministic operations platform that delivers verifiable, tamper-proof records of every physical event. Designed as a universal architecture for global operators, this deployment features a fractal ledger architecture — CAL, VET, and CORE — that structurally isolates data across every division of the Cox ecosystem. Powered by the universal CORE root fabric and Lume-V governance substrate, the system brings cryptographic condition reports, deterministic lot workflows via Lot Ops Pro, and mathematical proof to Manheim and the Cox Enterprise family as a whole.
          </p>

          {/* Enterprise Pitch Video Embed */}
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center' }}>
            <video 
              controls 
              playsInline 
              style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', display: 'block', backgroundColor: '#000' }}
              src="/assets/videos/cep_hero.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* ═══ STATS: Carousel ═══ */}
          <div style={{ marginBottom: '3rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div>
              <div style={{
                position: 'relative',
                background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'relative', height: '90px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={statIndex}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedStat(statIndex)}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center', padding: '0.75rem 1rem',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        fontSize: '1.8rem', fontWeight: 800,
                        color: STATS[statIndex].color,
                        fontFamily: 'var(--font-mono)', lineHeight: 1.2,
                      }}>
                        {STATS[statIndex].val}
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        fontSize: '0.65rem', color: 'var(--text-dim)',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        marginTop: '4px',
                      }}>
                        <span style={{ color: STATS[statIndex].color }}>{STATS[statIndex].icon}</span>
                        {STATS[statIndex].label}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Internal nav */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '6px 12px 10px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <button onClick={prevStat} aria-label="Previous stat" style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    <ChevronLeft size={12} />
                  </button>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    {STATS.map((_, i) => (
                      <button key={i} onClick={() => setStatIndex(i)} aria-label={`Stat ${i + 1}`}
                        style={{
                          width: statIndex === i ? '14px' : '5px', height: '5px',
                          borderRadius: '3px', border: 'none', cursor: 'pointer',
                          background: statIndex === i ? STATS[statIndex].color : 'rgba(255,255,255,0.15)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  <button onClick={nextStat} aria-label="Next stat" style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Interactive Modal Overlay */}
      <AnimatePresence>
        {selectedStat !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStat(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '450px',
                width: '100%',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column', gap: '1rem'
              }}
            >
              <button 
                onClick={() => setSelectedStat(null)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'transparent', border: 'none', color: 'var(--text-muted)',
                  cursor: 'pointer', padding: '4px'
                }}
              >
                <X size={20} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: STATS[selectedStat].color }}>
                {STATS[selectedStat].icon}
                <span style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {STATS[selectedStat].label}
                </span>
              </div>
              
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: STATS[selectedStat].color, fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
                {STATS[selectedStat].val}
              </div>
              
              <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-main)', margin: 0 }}>
                {STATS[selectedStat].desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
