import { gsap } from 'gsap';
import { GAME_CONFIG } from '../utils/constants.js';

export class TweenManager {
  async snapPallet(pallet, targetPosition) {
    return new Promise((resolve) => {
      gsap.killTweensOf([pallet.position, pallet.rotation, pallet.scale]);
      const timeline = gsap.timeline({ onComplete: resolve });
      timeline.to(pallet.position, {
        x: targetPosition.x,
        y: GAME_CONFIG.PALLET_Y,
        z: targetPosition.z,
        duration: 0.22,
        ease: 'back.out(1.5)'
      }, 0);
      timeline.to(pallet.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.18,
        ease: 'power2.out'
      }, 0);
      timeline.to(pallet.scale, {
        x: 1.06,
        y: 0.96,
        z: 1.06,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      }, 0.02);
    });
  }

  async returnPallet(pallet, targetPosition) {
    return new Promise((resolve) => {
      gsap.killTweensOf([pallet.position, pallet.rotation, pallet.scale]);
      gsap.to(pallet.position, {
        x: targetPosition.x,
        y: GAME_CONFIG.PALLET_Y,
        z: targetPosition.z,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: resolve
      });
      gsap.to(pallet.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.16,
        ease: 'power2.out'
      });
    });
  }

  popCombo(element) {
    if (!element) return;
    gsap.killTweensOf(element);
    gsap.fromTo(element, { y: -8, scale: 0.96 }, { y: 0, scale: 1, duration: 0.18, ease: 'back.out(2)' });
  }
}
