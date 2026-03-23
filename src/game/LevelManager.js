export class LevelManager {
  constructor(world, state) {
    this.world = world;
    this.state = state;
    this.activeLevel = null;
  }

  load(level) {
    this.activeLevel = level;
    this.world.loadLevel(level);
    this.state.totalCount = level.pallets.length;
    this.state.placedCount = 0;
  }
}
