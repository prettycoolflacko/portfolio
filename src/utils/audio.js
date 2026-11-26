/**
 * Pure Web Audio API Sound Generator for Frutiger Aero tactile feedback
 * Zero external audio assets, zero bundle bloat, 100% resilient
 */
let audioCtx = null;
let isAudioActive = false;

export function toggleAudio(force) {
  isAudioActive = force !== undefined ? force : !isAudioActive;
  return isAudioActive;
}

export function isAudioEnabled() {
  return isAudioActive;
}

export function playBubblePop(freq = 520) {
  if (!isAudioActive) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.085);
  } catch (err) {
    if (typeof console !== 'undefined') console.debug(err);
  }
}

export function playChime() {
  if (!isAudioActive) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    [659.25, 830.61, 987.77].forEach((pitch, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime + i * 0.06);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.06);
      osc.stop(audioCtx.currentTime + i * 0.06 + 0.26);
    });
  } catch (err) {
    if (typeof console !== 'undefined') console.debug(err);
  }
}
