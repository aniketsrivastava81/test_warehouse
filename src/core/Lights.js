import * as THREE from 'three';

export function createLights(scene) {
  const ambient = new THREE.AmbientLight('#cfe2ff', 1.7);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight('#d9ecff', '#273040', 1.15);
  hemi.position.set(0, 18, 0);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#ffffff', 2.3);
  sun.position.set(12, 20, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -25;
  sun.shadow.camera.right = 25;
  sun.shadow.camera.top = 25;
  sun.shadow.camera.bottom = -25;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 60;
  scene.add(sun);

  const rim = new THREE.DirectionalLight('#7fb2ff', 0.55);
  rim.position.set(-10, 8, -14);
  scene.add(rim);

  return { ambient, hemi, sun, rim };
}
