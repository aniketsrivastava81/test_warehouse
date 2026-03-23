import { formatTime, getRank, lerpLabel } from '../utils/helpers.js';

export class HUD {
  constructor(root) {
    this.root = root;
    this.build();
  }

  build() {
    this.container = document.createElement('div');
    this.container.className = 'hud';
    this.container.innerHTML = `
      <div class="hud__top">
        <div class="hud-card"><span class="hud-label">Timer</span><strong class="hud-value" data-time>0:24</strong></div>
        <div class="hud-card"><span class="hud-label">Score</span><strong class="hud-value" data-score>0</strong></div>
        <div class="hud-card"><span class="hud-label">Progress</span><strong class="hud-value" data-progress>0 / 12</strong></div>
        <div class="hud-card"><span class="hud-label">Rank Pace</span><strong class="hud-value" data-rank>C</strong></div>
      </div>
      <div class="hud__combo" data-combo>Perfect x2</div>
      <div class="hud__bottom">
        <div class="hud__hint"><strong>How to play:</strong> drag each pallet to a matching color bay. Wrong drops cost time.</div>
        <div class="hud__status" data-status><strong>Status:</strong> waiting for shift start.</div>
      </div>
    `;
    this.root.appendChild(this.container);

    this.timeEl = this.container.querySelector('[data-time]');
    this.scoreEl = this.container.querySelector('[data-score]');
    this.progressEl = this.container.querySelector('[data-progress]');
    this.rankEl = this.container.querySelector('[data-rank]');
    this.statusEl = this.container.querySelector('[data-status]');
    this.comboEl = this.container.querySelector('[data-combo]');

    this.startOverlay = this.createOverlay({
      title: 'End of Shift',
      subtitle: 'Bay Sort Challenge',
      body: `
        <p>Clear the inbound backlog before the truck window closes. Every pallet has a color and every bay has a matching slot. Snap them in fast, keep the combo alive, and chase an S rank.</p>
        <ul>
          <li>12 pallets per round</li>
          <li>Wrong drop: -3 seconds</li>
          <li>Perfect snaps build score faster</li>
        </ul>
      `,
      actions: `<button class="button" data-action="start">Start Shift</button>`
    });

    this.endOverlay = this.createOverlay({
      title: 'Shift Complete',
      subtitle: 'Results',
      body: `
        <p data-summary>You cleared the floor.</p>
        <div class="results-grid">
          <div class="results-card"><span class="results-card__label">Score</span><span class="results-card__value" data-result-score>0</span></div>
          <div class="results-card"><span class="results-card__label">Rank</span><span class="results-card__value" data-result-rank>C</span></div>
          <div class="results-card"><span class="results-card__label">Accuracy</span><span class="results-card__value" data-result-accuracy>0%</span></div>
          <div class="results-card"><span class="results-card__label">Perfect</span><span class="results-card__value" data-result-perfect>0</span></div>
        </div>
      `,
      actions: `
        <button class="button" data-action="restart">Run It Back</button>
        <button class="button button--secondary" data-action="close">Close</button>
      `
    });

    this.endOverlay.hidden = true;

    this.endSummaryEl = this.endOverlay.querySelector('[data-summary]');
    this.endScoreEl = this.endOverlay.querySelector('[data-result-score]');
    this.endRankEl = this.endOverlay.querySelector('[data-result-rank]');
    this.endAccuracyEl = this.endOverlay.querySelector('[data-result-accuracy]');
    this.endPerfectEl = this.endOverlay.querySelector('[data-result-perfect]');
  }

  createOverlay({ title, subtitle, body, actions }) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay__panel">
        <span class="eyebrow">${subtitle}</span>
        <h1>${title}</h1>
        ${body}
        <div class="overlay__actions">${actions}</div>
      </div>
    `;
    this.root.appendChild(overlay);
    return overlay;
  }

  on(action, handler) {
    this.root.addEventListener('click', (event) => {
      const target = event.target.closest(`[data-action="${action}"]`);
      if (target) handler(event);
    });
  }

  update(state) {
    this.timeEl.textContent = formatTime(state.timeLeft);
    this.scoreEl.textContent = state.score.toString();
    this.progressEl.textContent = `${state.placedCount} / ${state.totalCount}`;
    this.rankEl.textContent = getRank(state.score);
    this.statusEl.innerHTML = `<strong>Status:</strong> ${state.statusText}`;

    this.timeEl.classList.remove('hud-value--warn', 'hud-value--danger');
    if (state.timeLeft <= 8) this.timeEl.classList.add('hud-value--warn');
    if (state.timeLeft <= 4) this.timeEl.classList.add('hud-value--danger');

    const progress = state.totalCount ? state.placedCount / state.totalCount : 0;
    this.statusEl.innerHTML = `<strong>${lerpLabel(progress)}:</strong> ${state.statusText}`;
  }

  showCombo(text) {
    this.comboEl.textContent = text;
    this.comboEl.classList.add('is-visible');
    clearTimeout(this.comboTimeout);
    this.comboTimeout = window.setTimeout(() => {
      this.comboEl.classList.remove('is-visible');
    }, 650);
  }

  showStart() {
    this.startOverlay.hidden = false;
    this.endOverlay.hidden = true;
  }

  hideStart() {
    this.startOverlay.hidden = true;
  }

  showEnd(state, didWin) {
    this.endOverlay.hidden = false;
    this.endScoreEl.textContent = String(state.score);
    this.endRankEl.textContent = getRank(state.score);
    this.endAccuracyEl.textContent = `${Math.round(state.accuracy)}%`;
    this.endPerfectEl.textContent = String(state.perfectDrops);
    this.endSummaryEl.textContent = didWin
      ? 'Warehouse cleared. Nice. That one is ready for a screen recording.'
      : 'Time ran out. The floor is still jammed — retry and chase the clean run.';
    this.endOverlay.querySelector('h1').textContent = didWin ? 'Shift Complete' : 'Truck Window Missed';
  }

  hideEnd() {
    this.endOverlay.hidden = true;
  }
}
