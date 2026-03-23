export const GAME_PHASE = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost'
};

export const PALLET_STATE = {
  INBOUND: 'inbound',
  DRAGGING: 'dragging',
  SNAPPING: 'snapping',
  PLACED: 'placed'
};

export const GAME_CONFIG = {
  ROUND_TIME: 24,
  SNAP_DISTANCE: 1.8,
  PERFECT_DISTANCE: 0.55,
  INVALID_TIME_PENALTY: 3,
  BASE_SCORE: 100,
  PERFECT_BONUS: 50,
  FINISH_BONUS: 400,
  MAX_COMBO_MULTIPLIER: 5,
  PALLET_HEIGHT: 0.8,
  PALLET_Y: 0.4,
  DRAG_HEIGHT: 0.55,
  CAMERA_DEFAULT: {
    x: 17,
    y: 17,
    z: 14
  }
};
