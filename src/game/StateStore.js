import { GAME_PHASE } from '../utils/constants.js';

export class StateStore {
  constructor() {
    this.reset();
  }

  reset() {
    this.phase = GAME_PHASE.IDLE;
    this.timeLeft = 0;
    this.score = 0;
    this.combo = 0;
    this.placedCount = 0;
    this.totalCount = 0;
    this.moves = 0;
    this.perfectDrops = 0;
    this.accuracy = 100;
    this.statusText = 'Match every pallet with its color-coded bay before the shift ends.';
    this.activePalletId = null;
  }
}
