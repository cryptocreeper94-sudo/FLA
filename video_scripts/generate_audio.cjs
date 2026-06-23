const https = require('https');
const fs = require('fs');
const path = require('path');

const ELEVENLABS_API_KEY = 'sk_aacd9b4aea77f8fcf050661d33b7a2337eec8bacd80608fb';
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Sarah - sharp, professional female

const SCRIPT = `The greatest challenge in automotive enterprise modernization is not software. It's legacy infrastructure. Billions of dollars are locked in auction systems, dealer networks, and fleet operations that cannot be ripped and replaced. Enter the Fractal Ledger Architecture. A deterministic operations layer that structurally embeds legacy systems in a modern, zero-trust governance fabric, without replacing them.

But governing operations is only half the battle. Fractal Ledger Architecture manages millions of vehicles across NetworkNode, Autotrader, Kelley Blue Book, and dozens of interconnected divisions. Each division needs its own secure operational record, but the enterprise needs unified trust.

The Fractal Ledger Architecture solves this with a Fractal Ledger Architecture. At the center sits CORE, the Certified Operational Root Engine, the universal enterprise backbone. Connected to CORE, every division operates its own isolated dual-ledger. A private Fractal Ledger Architecture Ledger for internal operations. A public Verified Enterprise Trust layer for external verification. Private but verified.

Every vehicle scan, every custody transfer, every condition report is sealed as a cryptographic record. Deterministic. Immutable. Tamper-proof. To be absolutely clear, this is not blockchain, not cryptocurrency, and not AI-dependent. This is rules-based trust infrastructure. Same inputs, same outputs, every time.

A unified, verifiable trust fabric across the entire Fractal Ledger Architecture portfolio. No rip and replace. Welcome to the Fractal Ledger Architecture.`;

const outDir = path.join(__dirname, 'assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outputPath = path.join(outDir, 'narration.mp3');

const body = JSON.stringify({
  text: SCRIPT,
  model_id: 'eleven_multilingual_v2',
  voice_settings: { stability: 0.45, similarity_boost: 0.80, style: 0.15, use_speaker_boost: true },
});

const options = {
  hostname: 'api.elevenlabs.io',
  path: `/v1/text-to-speech/${VOICE_ID}`,
  method: 'POST',
  headers: {
    'xi-api-key': ELEVENLABS_API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log('🎙️ Generating FLA Enterprise narration via ElevenLabs (Sarah)...');
const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    let err = '';
    res.on('data', d => err += d);
    res.on('end', () => { console.error(`❌ API error ${res.statusCode}:`, err); process.exit(1); });
    return;
  }
  const out = fs.createWriteStream(outputPath);
  res.pipe(out);
  out.on('finish', () => {
    console.log(`✅ narration.mp3 saved (${(fs.statSync(outputPath).size / 1024).toFixed(0)} KB)`);
  });
});

req.on('error', e => { console.error('❌ Request error:', e.message); process.exit(1); });
req.write(body);
req.end();
