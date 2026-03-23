export class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = true;
  }

  beep({ frequency = 440, duration = 0.08, type = 'sine', gain = 0.025, ramp = 'exponential' }) {
    if (!this.enabled) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const amp = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain[ramp === 'linear' ? 'linearRampToValueAtTime' : 'exponentialRampToValueAtTime'](gain, now + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(amp).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  snap() {
    this.beep({ frequency: 560, duration: 0.06, type: 'triangle', gain: 0.04 });
    this.beep({ frequency: 860, duration: 0.04, type: 'sine', gain: 0.02 });
  }

  invalid() {
    this.beep({ frequency: 240, duration: 0.08, type: 'sawtooth', gain: 0.03 });
  }

  combo(level = 2) {
    this.beep({ frequency: 640 + level * 30, duration: 0.05, type: 'square', gain: 0.025 });
  }

  warning() {
    this.beep({ frequency: 320, duration: 0.05, type: 'triangle', gain: 0.02 });
  }

  finish() {
    this.beep({ frequency: 520, duration: 0.1, type: 'sine', gain: 0.03 });
    setTimeout(() => this.beep({ frequency: 780, duration: 0.12, type: 'sine', gain: 0.03 }), 80);
  }
}
