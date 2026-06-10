import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Mail, Lock, LogIn, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';
import { signInWithEmail, registerWithEmail, signInWithGoogle } from '../lib/firebase';

interface LoginScreenProps {
  brand: 'manheim' | 'cal';
}

const brands = {
  manheim: {
    icon: <Shield size={28} color="#0a0a0c" />,
    title: 'Cox Enterprise Platform',
    subtitle: 'Sign in with your authorized Cox Automotive email address.',
    gradient: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
    accent: 'var(--accent-cyan)',
  },
  cal: {
    icon: <Database size={28} color="#0a0a0c" />,
    title: 'COX Private Ledger',
    subtitle: 'Cryptographic vehicle provenance explorer — authorized access only.',
    gradient: 'linear-gradient(135deg, #22d3ee, #38bdf8)',
    accent: '#38bdf8',
  },
};

export default function LoginScreen({ brand }: LoginScreenProps) {
  const b = brands[brand];
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [authType, setAuthType] = useState<'pin' | 'password'>('pin');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    // Auto-advance to next input
    if (digit && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newPin = [...pin];
      for (let i = 0; i < 6; i++) {
        newPin[i] = pasted[i] || '';
      }
      setPin(newPin);
      // Focus last filled or the next empty
      const focusIdx = Math.min(pasted.length, 5);
      pinRefs.current[focusIdx]?.focus();
    }
  };

  const getCredential = (): string => {
    if (authType === 'pin') {
      return pin.join('');
    }
    return password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const credential = getCredential();
    if (authType === 'pin' && credential.length !== 6) {
      setError('Please enter all 6 digits of your PIN.');
      return;
    }
    if (authType === 'password' && credential.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        await registerWithEmail(email, credential);
      } else {
        await signInWithEmail(email, credential);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setError(authType === 'pin' ? 'Invalid email or PIN.' : 'Invalid email or password.');
      } else if (msg.includes('email-already-in-use')) {
        setError('This email is already registered. Switch to Sign In.');
      } else if (msg.includes('weak-password')) {
        setError('Password must be at least 6 characters.');
      } else if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (msg.includes('user-not-found')) {
        setError('No account found. Create one below.');
      } else if (msg.includes('Access restricted')) {
        setError('Access restricted to authorized @coxautoinc.com email addresses.');
      } else {
        setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)/, '').trim());
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem',
    background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)',
    borderRadius: '8px', color: '#fff', fontSize: '0.9rem',
  };

  const pinBoxStyle: React.CSSProperties = {
    width: '44px', height: '52px', textAlign: 'center',
    fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)',
    background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)',
    borderRadius: '10px', color: '#fff', caretColor: 'transparent',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg-dark)',
      display: 'flex', overflowY: 'auto',
      padding: '1.5rem', zIndex: 100,
    }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: `radial-gradient(circle, ${brand === 'manheim' ? 'rgba(56,189,248,0.06)' : 'rgba(34,211,238,0.06)'} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%', maxWidth: '420px', position: 'relative', zIndex: 2,
          margin: 'auto',
        }}
      >
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: b.gradient,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: `0 8px 32px ${brand === 'manheim' ? 'rgba(56,189,248,0.2)' : 'rgba(34,211,238,0.2)'}`,
          }}>
            {b.icon}
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{b.title}</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{b.subtitle}</p>
        </div>

        {/* Login card */}
        <div className="panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>

          {/* Google SSO */}
          <button
            onClick={async () => {
              setError('');
              setGoogleLoading(true);
              try {
                await signInWithGoogle();
              } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : 'Google sign-in failed';
                if (msg.includes('popup-closed')) return;
                if (msg.includes('Access restricted')) {
                  setError('Access restricted to authorized @coxautoinc.com email addresses.');
                } else {
                  setError('Google sign-in failed. Use an authorized @coxautoinc.com account.');
                }
              } finally {
                setGoogleLoading(false);
              }
            }}
            disabled={googleLoading || loading}
            style={{
              width: '100%', padding: '0.85rem', borderRadius: '10px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.2s', opacity: (googleLoading || loading) ? 0.6 : 1,
              marginBottom: '0.5rem',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = b.accent; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {googleLoading ? 'Signing in…' : 'Continue with Google'}
          </button>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', margin: '0 0 1rem' }}>
            Use your @coxautoinc.com Google account
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or use email</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
          </div>

          {/* Mode header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>
              {mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>
              {mode === 'register'
                ? `Enter your @coxautoinc.com email and create a ${authType === 'pin' ? '6-digit PIN' : 'password'}.`
                : `Sign in with your email and ${authType === 'pin' ? '6-digit PIN' : 'password'}.`}
            </p>
          </div>

          {/* Auth type toggle */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '1.25rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
            <button
              type="button"
              onClick={() => { setAuthType('pin'); setError(''); }}
              style={{
                flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: authType === 'pin' ? 'rgba(56,189,248,0.12)' : 'rgba(0,0,0,0.2)',
                color: authType === 'pin' ? '#38bdf8' : 'var(--text-dim)',
                transition: 'all 0.2s',
              }}
            >
              <KeyRound size={14} /> 6-Digit PIN
            </button>
            <button
              type="button"
              onClick={() => { setAuthType('password'); setError(''); }}
              style={{
                flex: 1, padding: '8px', border: 'none', borderLeft: '1px solid var(--border-light)', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: authType === 'password' ? 'rgba(56,189,248,0.12)' : 'rgba(0,0,0,0.2)',
                color: authType === 'password' ? '#38bdf8' : 'var(--text-dim)',
                transition: 'all 0.2s',
              }}
            >
              <Lock size={14} /> Password
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Email field */}
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="email"
                placeholder={brand === 'manheim' ? 'your.name@coxautoinc.com' : 'Email address'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* PIN input */}
            {authType === 'pin' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '0.5rem 0' }} onPaste={handlePinPaste}>
                  {pin.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { pinRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handlePinChange(i, e.target.value)}
                      onKeyDown={e => handlePinKeyDown(i, e)}
                      onFocus={e => e.target.select()}
                      style={{
                        ...pinBoxStyle,
                        borderColor: digit ? '#38bdf8' : 'var(--border-light)',
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', margin: '0.5rem 0 0' }}>
                  {mode === 'register' ? 'Choose a 6-digit PIN you\'ll remember' : 'Enter your 6-digit PIN'}
                </p>
              </div>
            )}

            {/* Password input */}
            {authType === 'password' && (
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'Create a password (min 6 characters)' : 'Password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.7rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px' }}>
                <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#fca5a5' }}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.85rem', borderRadius: '10px',
                background: b.gradient, border: 'none',
                color: '#0a0a0c', fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s',
                marginTop: '0.25rem',
              }}
            >
              <LogIn size={16} />
              {loading ? 'Authenticating…' : mode === 'register' ? '→ Create Account' : '→ Sign In'}
            </button>
          </form>

          {/* Toggle mode */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
              {mode === 'login'
                ? "First time here? Create an account with your Cox email."
                : "Already registered? Sign in to your existing account."}
            </p>
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setPin(['', '', '', '', '', '']); setPassword(''); }}
              style={{ background: 'none', border: `1px solid ${b.accent}33`, padding: '6px 16px', borderRadius: '8px', color: b.accent, fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${b.accent}15`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
            >
              {mode === 'login' ? '→ Create New Account' : '← Back to Sign In'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            Cox Enterprise Platform<br />
            Authentication secured by Firebase · Access restricted to @coxautoinc.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}
