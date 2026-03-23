import { gsap } from 'gsap';

export class CameraFX {
  constructor(cameraManager) {
    this.cameraManager = cameraManager;
  }

  punch() {
    const camera = this.cameraManager.instance;
    gsap.killTweensOf(camera.position);
    gsap.fromTo(
      camera.position,
      { x: camera.position.x + 0.15, y: camera.position.y + 0.1, z: camera.position.z + 0.18 },
      { x: this.cameraManager.defaultPosition.x, y: this.cameraManager.defaultPosition.y, z: this.cameraManager.defaultPosition.z, duration: 0.24, ease: 'power2.out' }
    );
  }
}
