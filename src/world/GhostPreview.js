import * as THREE from 'three';

export class GhostPreview {
  constructor() {
    this.mesh = new THREE.Group();

    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(1.95, 1.06, 1.48),
      new THREE.MeshStandardMaterial({
        color: '#64ff8b',
        emissive: '#64ff8b',
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.16,
        roughness: 0.25,
        metalness: 0.08
      })
    );
    pad.position.y = 0.24;

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 1.1, 1.52)),
      new THREE.LineBasicMaterial({ color: '#64ff8b', transparent: true, opacity: 0.96 })
    );
    wire.position.y = 0.24;

    this.mesh.add(pad, wire);
    this.mesh.visible = false;
    this.pad = pad;
    this.wire = wire;
  }

  show(position, mode = 'valid') {
    const palette = mode === 'valid'
      ? { color: '#64ff8b', opacity: 0.18 }
      : { color: '#ff5f7a', opacity: 0.14 };

    this.pad.material.color.set(palette.color);
    this.pad.material.emissive.set(palette.color);
    this.pad.material.opacity = palette.opacity;
    this.wire.material.color.set(palette.color);
    this.mesh.position.copy(position);
    this.mesh.visible = true;
  }

  hide() {
    this.mesh.visible = false;
  }
}
