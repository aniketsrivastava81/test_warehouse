import * as THREE from 'three';
import { GAME_CONFIG, PALLET_STATE } from '../utils/constants.js';

export class DragController {
  constructor({ domElement, camera, world, picker, pointer, snapController, onDragStart, onDragEnd, onPreview, canDrag }) {
    this.domElement = domElement;
    this.camera = camera;
    this.world = world;
    this.picker = picker;
    this.pointer = pointer;
    this.snapController = snapController;
    this.onDragStart = onDragStart;
    this.onDragEnd = onDragEnd;
    this.onPreview = onPreview;
    this.canDrag = canDrag ?? (() => true);

    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -GAME_CONFIG.PALLET_Y);
    this.dragOffset = new THREE.Vector3();
    this.dragTarget = new THREE.Vector3();
    this.activePallet = null;

    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
  }

  attach() {
    this.domElement.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
  }

  detach() {
    this.domElement.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
  }

  handlePointerDown(event) {
    if (!this.canDrag()) return;
    this.pointer.updateFromEvent(event);
    this.picker.setFromPointer(this.pointer.ndc);
    const hits = this.picker.pick(this.world.pallets);
    const first = hits.find((hit) => hit.object.parent?.userData?.kind === 'pallet' || hit.object.userData?.kind === 'pallet');
    if (!first) return;

    const pallet = first.object.userData?.kind === 'pallet' ? first.object : first.object.parent;
    if (!pallet || pallet.userData.placed) return;

    this.activePallet = pallet;
    pallet.userData.state = PALLET_STATE.DRAGGING;
    pallet.position.y = GAME_CONFIG.DRAG_HEIGHT;

    const point = this.picker.intersectPlane(this.dragPlane, new THREE.Vector3());
    this.dragOffset.copy(pallet.position).sub(point);
    this.onDragStart?.(pallet);
  }

  handlePointerMove(event) {
    if (!this.activePallet) return;
    this.pointer.updateFromEvent(event);
    this.picker.setFromPointer(this.pointer.ndc);
    const point = this.picker.intersectPlane(this.dragPlane, this.dragTarget);
    if (!point) return;

    this.activePallet.position.copy(point.add(this.dragOffset));
    this.activePallet.position.y = GAME_CONFIG.DRAG_HEIGHT;

    const preview = this.snapController.getPreview(this.activePallet);
    this.onPreview?.(this.activePallet, preview);
  }

  async handlePointerUp() {
    if (!this.activePallet) return;
    const pallet = this.activePallet;
    this.activePallet = null;
    await this.onDragEnd?.(pallet);
  }
}
