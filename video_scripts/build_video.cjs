/**
 * Cox Enterprise Platform — Hero Video Builder
 * 
 * Pipeline: 5 scene PNGs → Ken Burns zoompan → crossfade transitions → narration + ambient → final MP4
 * 
 * KEY: Video outlasts narration. The last scene holds extra time so the
 *      video continues playing after the voice-over ends (ambient drone continues).
 */
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const workDir = __dirname;
const assetsDir = path.join(workDir, 'assets');
const ffmpegExe = path.join('D:\\video_build\\ffmpeg\\bin\\ffmpeg.exe');
const ffprobeExe = path.join('D:\\video_build\\ffmpeg\\bin\\ffprobe.exe');
const outputFile = path.join('D:\\CEP\\public\\assets\\videos\\cep_hero.mp4');

const FPS = 30;
const W = 1920;
const H = 1080;
const TRANSITION = 1.0;
const TAIL_PAD = 6; // seconds of video AFTER narration ends

const scenes = [
  { file: 'scene1.png', duration: 16, zStart: 1.15, zEnd: 1.0,  xMode: 'center' },
  { file: 'scene2.png', duration: 16, zStart: 1.0,  zEnd: 1.15, xMode: 'sweep' },
  { file: 'scene3.png', duration: 16, zStart: 1.15, zEnd: 1.0,  xMode: 'center' },
  { file: 'scene4.png', duration: 16, zStart: 1.0,  zEnd: 1.15, xMode: 'sweep' },
  { file: 'scene5.png', duration: 22, zStart: 1.0,  zEnd: 1.08, xMode: 'center' }, // Extra long — holds after VO
];

function runFFmpeg(args, label) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶ [${label}]`);
    const proc = spawn(ffmpegExe, args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr?.on('data', (d) => {
      const t = d.toString();
      stderr += t;
      if (t.includes('time=') || t.includes('frame=')) {
        process.stdout.write('\r  ' + t.trim().slice(0, 80));
      }
    });
    proc.on('close', (code) => {
      process.stdout.write('\n');
      if (code === 0) return resolve();
      reject(new Error(`[${label}] code ${code}:\n${stderr.slice(-1000)}`));
    });
  });
}

function getAudioDuration(filePath) {
  try {
    const result = execSync(`"${ffprobeExe}" -v error -show_entries format=duration -of csv=p=0 "${filePath}"`, { encoding: 'utf-8' });
    return parseFloat(result.trim());
  } catch (e) {
    console.warn('⚠ Could not probe audio duration, using default');
    return 70;
  }
}

async function main() {
  console.log('🎬 Building Cox Enterprise Platform Hero Video');
  const narr = path.join(assetsDir, 'narration.mp3');

  if (!fs.existsSync(narr)) {
    console.error('❌ narration.mp3 not found. Run generate_audio.cjs first.');
    process.exit(1);
  }

  // Get narration duration and ensure video exceeds it
  const narrDuration = getAudioDuration(narr);
  const totalSceneDuration = scenes.reduce((a, s) => a + s.duration, 0);
  const totalTransitions = (scenes.length - 1) * TRANSITION;
  const videoDuration = totalSceneDuration - totalTransitions;
  const targetDuration = narrDuration + TAIL_PAD;

  console.log(`\n📊 Narration: ${narrDuration.toFixed(1)}s | Video: ${videoDuration.toFixed(1)}s | Target: ${targetDuration.toFixed(1)}s`);

  // If video is shorter than narration + pad, extend the last scene
  if (videoDuration < targetDuration) {
    const deficit = targetDuration - videoDuration;
    scenes[scenes.length - 1].duration += Math.ceil(deficit);
    console.log(`📐 Extended last scene by ${Math.ceil(deficit)}s to ensure video outlasts narration`);
  }

  // Generate ambient drone
  console.log('\n🎵 Generating command center ambient drone...');
  const ambientPath = path.join(assetsDir, 'ambient.mp3');
  const finalVideoDuration = scenes.reduce((a, s) => a + s.duration, 0) - totalTransitions;
  await runFFmpeg([
    '-y', '-f', 'lavfi', '-i', `anoisesrc=d=${Math.ceil(finalVideoDuration) + 5}:c=brown:r=44100:a=0.5`,
    '-filter:a', 'lowpass=f=150',
    '-c:a', 'libmp3lame', ambientPath
  ], 'Ambient Drone');

  const clipPaths = [];

  for (let i = 0; i < scenes.length; i++) {
    const sc = scenes[i];
    const clipOut = path.join(assetsDir, `clip_${i}.mp4`);
    clipPaths.push(clipOut);

    // Always regenerate clips (scene durations may have changed)
    const totalFrames = sc.duration * FPS;
    const zRange = (sc.zEnd - sc.zStart).toFixed(4);

    const zExpr = `${sc.zStart}+on/${totalFrames}*${zRange}`;
    const xExpr = sc.xMode === 'sweep' ? `on/${totalFrames}*(iw-iw/zoom)` : `(iw-iw/zoom)/2`;
    const yExpr = `(ih-ih/zoom)/2`;

    const fc = [
      `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}[scaled]`,
      `[scaled]zoompan=z='${zExpr}':x='${xExpr}':y='${yExpr}':d=${totalFrames}:s=${W}x${H}:fps=${FPS}[out]`
    ].join(';');

    await runFFmpeg([
      '-y', '-loop', '1', '-framerate', String(FPS),
      '-i', path.join(assetsDir, sc.file),
      '-filter_complex', fc,
      '-map', '[out]', '-t', String(sc.duration),
      '-c:v', 'libx264', '-preset', 'fast', '-crf', '18',
      '-pix_fmt', 'yuv420p', '-an', clipOut,
    ], `Scene ${i+1} (${sc.duration}s)`);
  }

  console.log('\n🔗 Merging with crossfade transitions...');
  const inputs = [];
  clipPaths.forEach(p => { inputs.push('-i', p); });

  const filterParts = [];
  let offset = 0;
  let prevLabel = '[0:v]';
  for (let i = 1; i < clipPaths.length; i++) {
    offset += scenes[i-1].duration - TRANSITION;
    const outLabel = i < clipPaths.length - 1 ? `[v${i}]` : '[vout]';
    filterParts.push(
      `${prevLabel}[${i}:v]xfade=transition=fade:duration=${TRANSITION}:offset=${offset.toFixed(3)}${outLabel}`
    );
    prevLabel = outLabel;
  }

  const mergedPath = path.join(assetsDir, 'merged_video.mp4');
  await runFFmpeg([
    '-y', ...inputs,
    '-filter_complex', filterParts.join(';'),
    '-map', '[vout]',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '18',
    '-pix_fmt', 'yuv420p', mergedPath,
  ], 'Merge');

  console.log('\n🎙️ Mixing Audio (Narration + Ambient Drone)...');
  // Narration fades in, ambient plays full duration (outlasts narration)
  const mixedAudio = path.join(assetsDir, 'mixed_audio.mp3');
  await runFFmpeg([
    '-y', '-i', narr, '-i', ambientPath,
    '-filter_complex',
    `[0:a]volume=1.2,apad=whole_dur=${Math.ceil(finalVideoDuration)}[a0];[1:a]volume=0.35,atrim=0:${Math.ceil(finalVideoDuration)}[a1];[a0][a1]amix=inputs=2:duration=longest[aout]`,
    '-map', '[aout]', '-c:a', 'libmp3lame', '-t', String(Math.ceil(finalVideoDuration)), mixedAudio
  ], 'Audio Mix');

  console.log('\n🎙️ Muxing Video + Final Audio...');
  await runFFmpeg([
    '-y', '-i', mergedPath, '-i', mixedAudio,
    '-map', '0:v', '-map', '1:a',
    '-c:v', 'copy', '-c:a', 'copy',
    '-shortest', '-movflags', '+faststart',
    outputFile,
  ], 'Mux Final');

  console.log(`\n🎉 DONE: ${outputFile}`);
  
  // Report final durations
  const finalVidDur = getAudioDuration(outputFile);
  console.log(`\n📊 Final Report:`);
  console.log(`   Narration: ${narrDuration.toFixed(1)}s`);
  console.log(`   Video:     ${finalVidDur.toFixed(1)}s`);
  console.log(`   Tail pad:  ${(finalVidDur - narrDuration).toFixed(1)}s after voice-over ends`);
}

main().catch(console.error);
