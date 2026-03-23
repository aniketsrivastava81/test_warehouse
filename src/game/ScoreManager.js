import { GAME_CONFIG } from '../utils/constants.js';

export class ScoreManager {
  constructor(state) {
    this.state = state;
  }

  reset() {
    this.state.score = 0;
  }

  addPlacement({ isPerfect, multiplier }) {
    let points = GAME_CONFIG.BASE_SCORE * multiplier;
    if (isPerfect) points += GAME_CONFIG.PERFECT_BONUS;
    this.state.score += points;
    return points;
  }

  addFinishBonus() {
    this.state.score += GAME_CONFIG.FINISH_BONUS;
    return GAME_CONFIG.FINISH_BONUS;
  }
}
