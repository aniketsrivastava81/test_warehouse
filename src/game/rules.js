import { GAME_CONFIG } from '../utils/constants.js';
import { distanceXZ } from '../utils/math.js';

export function isBayEligible(pallet, bay) {
  return Boolean(pallet && bay && pallet.userData.type === bay.type && !bay.occupied);
}

export function getDropDistance(palletPosition, bayPosition) {
  return distanceXZ(palletPosition, bayPosition);
}

export function isWithinSnapDistance(distance) {
  return distance <= GAME_CONFIG.SNAP_DISTANCE;
}

export function isPerfectDrop(distance) {
  return distance <= GAME_CONFIG.PERFECT_DISTANCE;
}
