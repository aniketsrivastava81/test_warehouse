import * as THREE from 'three';
import { PALLET_TYPES } from '../data/palletTypes.js';
import { PALLET_STATE } from '../utils/constants.js';

export class PalletFactory {
  create(definition) {
    const group = new THREE.Group();
    const accent = PALLET_TYPES[definition.type].color;

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.2, 1.45),
      new THREE.MeshStandardMaterial({
        color: '#9a6a40',
        roughness: 0.9,
        metalness: 0.02
      })
    );
    base.position.y = -0.26;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const cargo = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.88, 1.08),
      new THREE.MeshStandardMaterial({
        color: accent,
        roughness: 0.46,
        metalness: 0.08,
        emissive: accent,
        emissiveIntensity: 0.08
      })
    );
    cargo.position.y = 0.28;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    group.add(cargo);

    const wrap = new THREE.Mesh(
      new THREE.BoxGeometry(1.58, 0.92, 1.16),
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.12,
        roughness: 0.3,
        metalness: 0.02
      })
    );
    wrap.position.y = 0.28;
    group.add(wrap);

    const tag = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.28, 0.06),
      new THREE.MeshStandardMaterial({ color: '#f7fbff', roughness: 0.2, metalness: 0.06 })
    );
    tag.position.set(0.53, 0.52, 0.58);
    group.add(tag);

    group.position.set(...definition.position);
    group.userData = {
      id: definition.id,
      kind: 'pallet',
      type: definition.type,
      label: PALLET_TYPES[definition.type].label,
      state: PALLET_STATE.INBOUND,
      placed: false,
      homePosition: new THREE.Vector3(...definition.position)
    };

    return group;
  }
}
