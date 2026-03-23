import * as THREE from 'three';

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const distanceXZ = (a, b) => {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
};

export const vec3FromArray = (value) => new THREE.Vector3(value[0], value[1], value[2]);

export const round = (value, precision = 0) => {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};
