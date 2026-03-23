import { GAME_PHASE, GAME_CONFIG } from '../utils/constants.js';
import { getRank } from '../utils/helpers.js';
import { LevelManager } from './LevelManager.js';
import { StateStore } from './StateStore.js';
import { ScoreManager } from './ScoreManager.js';
import { TimerManager } from './TimerManager.js';
import { ComboManager } from './ComboManager.js';

export class GameManager {
  constructor({ world, hud, audio, tweenManager, highlightFX, cameraFX, snapController, level }) {
    this.world = world;
    this.hud = hud;
    this.audio = audio;
    this.tweenManager = tweenManager;
    this.highlightFX = highlightFX;
    this.cameraFX = cameraFX;
    this.snapController = snapController;
    this.level = level;

    this.state = new StateStore();
    this.levelManager = new LevelManager(this.world, this.state);
    this.scoreManager = new ScoreManager(this.state);
    this.comboManager = new ComboManager(this.state);
    this.timerManager = new TimerManager(this.state, () => this.loseGame());

    this.hasWarned = false;
  }

  init() {
    this.levelManager.load(this.level);
    this.resetState();
    this.hud.update(this.state);
    this.hud.showStart();
  }

  resetState() {
    this.state.reset();
    this.state.totalCount = this.level.pallets.length;
    this.state.statusText = 'Match every pallet with its color-coded bay before the shift ends.';
    this.snapController.resetAll();
    this.scoreManager.reset();
    this.comboManager.reset();
    this.hasWarned = false;
  }

  startGame() {
    this.audio.ensureContext();
    this.resetState();
    this.state.phase = GAME_PHASE.PLAYING;
    this.state.statusText = 'Shift live. Clear the inbound side.';
    this.timerManager.start(this.level.timeLimit ?? GAME_CONFIG.ROUND_TIME);
    this.hud.hideStart();
    this.hud.hideEnd();
    this.highlightFX.clearBays();
    this.hud.update(this.state);
  }

  async handleDrop(pallet) {
    if (this.state.phase !== GAME_PHASE.PLAYING) return;

    this.state.moves += 1;
    const result = await this.snapController.tryPlace(pallet);

    if (result.placed) {
      this.state.placedCount += 1;
      const multiplier = this.comboManager.success();
      const points = this.scoreManager.addPlacement({ isPerfect: result.perfect, multiplier });
      if (result.perfect) this.state.perfectDrops += 1;
      this.highlightFX.markPlaced(result.bay);
      this.audio.snap();
      if (multiplier > 1) this.audio.combo(multiplier);
      this.cameraFX.punch();
      this.state.statusText = `${result.bay.type.toUpperCase()} bay locked. +${points} points.`;
      this.hud.showCombo(result.perfect ? `Perfect x${multiplier}` : `Clean x${multiplier}`);
      this.tweenManager.popCombo(this.hud.comboEl);

      if (this.state.placedCount >= this.state.totalCount) {
        this.scoreManager.addFinishBonus();
        this.winGame();
      }
    } else {
      this.comboManager.fail();
      this.timerManager.addPenalty(GAME_CONFIG.INVALID_TIME_PENALTY);
      this.audio.invalid();
      this.state.statusText = `Wrong bay. -${GAME_CONFIG.INVALID_TIME_PENALTY}s penalty.`;
      this.highlightFX.hidePreview();
      await this.snapController.returnHome(pallet);
      if (this.state.timeLeft <= 0) {
        this.loseGame();
      }
    }

    this.updateAccuracy();
    this.hud.update(this.state);
  }

  update(delta) {
    if (this.state.phase !== GAME_PHASE.PLAYING) {
      this.hud.update(this.state);
      return;
    }

    this.timerManager.update(delta);
    if (this.state.timeLeft <= 5 && !this.hasWarned) {
      this.audio.warning();
      this.hasWarned = true;
      this.state.statusText = 'Final seconds. Snap clean and do not throw away time.';
    }

    this.hud.update(this.state);
  }

  winGame() {
    if (this.state.phase !== GAME_PHASE.PLAYING) return;
    this.timerManager.stop();
    this.state.phase = GAME_PHASE.WON;
    this.state.statusText = `Warehouse cleared. ${getRank(this.state.score)} rank pace secured.`;
    this.audio.finish();
    this.updateAccuracy();
    this.hud.update(this.state);
    this.hud.showEnd(this.state, true);
  }

  loseGame() {
    if (this.state.phase === GAME_PHASE.LOST || this.state.phase === GAME_PHASE.WON) return;
    this.timerManager.stop();
    this.state.phase = GAME_PHASE.LOST;
    this.state.statusText = 'Truck window missed. Reset and run it back.';
    this.updateAccuracy();
    this.hud.update(this.state);
    this.hud.showEnd(this.state, false);
  }

  updateAccuracy() {
    if (!this.state.moves) {
      this.state.accuracy = 100;
      return;
    }
    this.state.accuracy = (this.state.placedCount / this.state.moves) * 100;
  }
}
