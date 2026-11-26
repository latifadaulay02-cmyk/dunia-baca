let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.08,
  delay = 0
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const startTime = ctx.currentTime + delay;

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

export const soundFX = {
  click(enabled: boolean) {
    if (!enabled) return;
    playTone(540, 0.07, 'sine', 0.06);
  },
  pageTurn(enabled: boolean) {
    if (!enabled) return;
    playTone(440, 0.08, 'triangle', 0.05, 0);
    playTone(587, 0.1, 'triangle', 0.05, 0.05);
  },
  success(enabled: boolean) {
    if (!enabled) return;
    playTone(523.25, 0.12, 'sine', 0.08, 0);
    playTone(659.25, 0.14, 'sine', 0.08, 0.08);
    playTone(783.99, 0.2, 'sine', 0.08, 0.16);
  },
  error(enabled: boolean) {
    if (!enabled) return;
    playTone(280, 0.14, 'triangle', 0.07, 0);
    playTone(220, 0.18, 'triangle', 0.07, 0.1);
  },
  victory(enabled: boolean) {
    if (!enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      playTone(n, 0.22, 'sine', 0.09, idx * 0.09);
    });
  },
};
