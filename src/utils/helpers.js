export function formatTime(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getRank(score) {
  if (score >= 1900) return 'S';
  if (score >= 1450) return 'A';
  if (score >= 1050) return 'B';
  return 'C';
}

export function lerpLabel(progress) {
  if (progress >= 1) return 'Shift cleared';
  if (progress >= 0.66) return 'Almost sorted';
  if (progress >= 0.33) return 'Keep stacking';
  return 'Inbound backlog';
}
