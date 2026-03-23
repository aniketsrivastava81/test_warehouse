import * as THREE from 'three';
import { isBayEligible, getDropDistance, isWithinSnapDistance, isPerfectDrop } from '../game/rules.js';
import { PALLET_STATE } from '../utils/constants.js';

export class SnapController {
  constructor({ world, tweenManager }) {
    this.world = world;
    this.tweenManager = tweenManager;
  }

  getNearestBay(pallet) {
    let nearest = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    this.world.bays.forEach((bay) => {
      const distance = getDropDistance(pallet.position, bay.position);
      if (distance < nearestDistance) {
        nearest = bay;
        nearestDistance = distance;
      }
    });

    return { bay: nearest, distance: nearestDistance };
  }

  getPreview(pallet) {
    const result = this.getNearestBay(pallet);
    if (!result.bay) return null;
    const valid = isBayEligible(pallet, result.bay) && isWithinSnapDistance(result.distance);
    return {
      ...result,
      valid,
      perfect: valid && isPerfectDrop(result.distance)
    };
  }

  async tryPlace(pallet) {
    const preview = this.getPreview(pallet);
    if (!preview || !preview.valid) return { placed: false, preview };

    preview.bay.occupied = true;
    pallet.userData.placed = true;
    pallet.userData.state = PALLET_STATE.SNAPPING;

    await this.tweenManager.snapPallet(pallet, preview.bay.position);

    pallet.userData.state = PALLET_STATE.PLACED;
    pallet.userData.snappedBayId = preview.bay.id;
    return {
      placed: true,
      bay: preview.bay,
      perfect: preview.perfect,
      distance: preview.distance
    };
  }

  async returnHome(pallet) {
    pallet.userData.state = PALLET_STATE.SNAPPING;
    await this.tweenManager.returnPallet(pallet, pallet.userData.homePosition);
    pallet.userData.state = PALLET_STATE.INBOUND;
  }

  resetAll() {
    this.world.bays.forEach((bay) => {
      bay.occupied = false;
      bay.setHighlight('idle');
    });

    this.world.pallets.forEach((pallet) => {
      pallet.userData.placed = false;
      pallet.userData.state = PALLET_STATE.INBOUND;
      pallet.userData.snappedBayId = null;
      pallet.position.copy(pallet.userData.homePosition);
      pallet.rotation.set(0, 0, 0);
      pallet.scale.setScalar(1);
    });
  }
}
