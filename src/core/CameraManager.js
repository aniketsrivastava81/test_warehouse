import * as THREE from 'three';
import { GAME_CONFIG } from '../utils/constants.js';

export class CameraManager {
  constructor() {
    this.instance = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.defaultPosition = new THREE.Vector3(
      GAME_CONFIG.CAMERA_DEFAULT.x,
      GAME_CONFIG.CAMERA_DEFAULT.y,
      GAME_CONFIG.CAMERA_DEFAULT.z
    );
    this.lookTarget = new THREE.Vector3(4.5, 0, 0.2);
    this.reset();
  }

  reset() {
    this.instance.position.copy(this.defaultPosition);
    this.instance.lookAt(this.lookTarget);
  }

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }
}
