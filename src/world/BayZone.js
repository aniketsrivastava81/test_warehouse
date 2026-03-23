import * as THREE from 'three';
import { PALLET_TYPES } from '../data/palletTypes.js';

export class BayZone {
  constructor({ id, type, position }) {
    this.id = id;
    this.type = type;
    this.position = new THREE.Vector3(position[0], position[1], position[2]);
    this.occupied = false;

    const accent = PALLET_TYPES[type].color;
    const group = new THREE.Group();

    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.1, 2.2),
      new THREE.MeshStandardMaterial({
        color: accent,
        transparent: true,
        opacity: 0.22,
        roughness: 0.52,
        metalness: 0.04
      })
    );
    pad.position.y = -0.34;
    group.add(pad);

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.85, 0.12, 2.25)),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.92 })
    );
    frame.position.y = -0.34;
    group.add(frame);

    const indicator = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.06, 24),
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.45,
        metalness: 0.18,
        roughness: 0.28
      })
    );
    indicator.position.set(0.9, -0.14, -0.72);
    group.add(indicator);

    group.position.copy(this.position);
    group.userData.kind = 'bay';
    group.userData.bayId = id;
    group.userData.type = type;

    this.mesh = group;
    this.pad = pad;
    this.frame = frame;
    this.indicator = indicator;
  }

  setHighlight(mode = 'idle') {
    const palette = {
      idle: { opacity: 0.18, frame: 0.78, scale: 1 },
      valid: { opacity: 0.36, frame: 1, scale: 1.04 },
      invalid: { opacity: 0.2, frame: 0.4, scale: 1 },
      done: { opacity: 0.28, frame: 1, scale: 1.02 }
    };

    const next = palette[mode] ?? palette.idle;
    this.pad.material.opacity = next.opacity;
    this.frame.material.opacity = next.frame;
    this.mesh.scale.setScalar(next.scale);
  }
}
