import * as THREE from 'three';
import { BayZone } from './BayZone.js';
import { PalletFactory } from './PalletFactory.js';
import { GhostPreview } from './GhostPreview.js';

export class WarehouseWorld {
  constructor(scene) {
    this.scene = scene;
    this.palletFactory = new PalletFactory();
    this.bays = [];
    this.pallets = [];
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.ghostPreview = new GhostPreview();
    this.scene.add(this.ghostPreview.mesh);
    this.buildEnvironment();
  }

  clearDynamic() {
    this.bays.forEach((bay) => this.group.remove(bay.mesh));
    this.pallets.forEach((pallet) => this.group.remove(pallet));
    this.bays = [];
    this.pallets = [];
  }

  loadLevel(level) {
    this.clearDynamic();

    level.bays.forEach((bayDef) => {
      const bay = new BayZone(bayDef);
      this.bays.push(bay);
      this.group.add(bay.mesh);
    });

    level.pallets.forEach((palletDef) => {
      const pallet = this.palletFactory.create(palletDef);
      this.pallets.push(pallet);
      this.group.add(pallet);
    });
  }

  buildEnvironment() {
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(34, 0.5, 22),
      new THREE.MeshStandardMaterial({ color: '#232834', roughness: 0.95, metalness: 0.04 })
    );
    floor.position.y = -0.55;
    floor.receiveShadow = true;
    this.group.add(floor);

    const inbound = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 0.06, 15.4),
      new THREE.MeshStandardMaterial({
        color: '#2a3645',
        emissive: '#2a3645',
        emissiveIntensity: 0.14,
        roughness: 0.8,
        metalness: 0.03
      })
    );
    inbound.position.set(-5.2, -0.24, 0.5);
    this.group.add(inbound);

    const outbound = new THREE.Mesh(
      new THREE.BoxGeometry(11.8, 0.06, 15.8),
      new THREE.MeshStandardMaterial({
        color: '#293041',
        emissive: '#293041',
        emissiveIntensity: 0.1,
        roughness: 0.82,
        metalness: 0.03
      })
    );
    outbound.position.set(11.7, -0.24, -0.35);
    this.group.add(outbound);

    const divider = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.1, 18),
      new THREE.MeshStandardMaterial({ color: '#b4c6ff', emissive: '#6b93ff', emissiveIntensity: 0.24 })
    );
    divider.position.set(2.2, -0.18, 0);
    this.group.add(divider);

    const lanes = [-7.5, -4.1, -0.7, 2.7, 6.1];
    lanes.forEach((z) => {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(20, 0.03, 0.08),
        new THREE.MeshStandardMaterial({ color: '#b9c6d8', emissive: '#a7d6ff', emissiveIntensity: 0.05 })
      );
      line.position.set(5.8, -0.2, z);
      this.group.add(line);
    });

    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(34, 8, 0.4),
      new THREE.MeshStandardMaterial({ color: '#1d2330', roughness: 0.92, metalness: 0.03 })
    );
    leftWall.position.set(0, 3.3, -11);
    this.group.add(leftWall);

    const rightWall = leftWall.clone();
    rightWall.position.z = 11;
    this.group.add(rightWall);

    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 8, 22),
      new THREE.MeshStandardMaterial({ color: '#202736', roughness: 0.92, metalness: 0.03 })
    );
    backWall.position.set(17, 3.3, 0);
    this.group.add(backWall);

    const props = [
      [-12.5, 1.2, -7.5],
      [-12.5, 1.2, 7.5],
      [13.4, 1.2, -8.7],
      [13.4, 1.2, 8.7]
    ];

    props.forEach(([x, y, z]) => {
      const stack = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 2.4, 2.1),
        new THREE.MeshStandardMaterial({ color: '#2b3546', roughness: 0.86, metalness: 0.05 })
      );
      stack.position.set(x, y, z);
      stack.castShadow = true;
      stack.receiveShadow = true;
      this.group.add(stack);
    });
  }
}
