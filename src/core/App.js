import * as THREE from 'three';
import { Renderer } from './Renderer.js';
import { CameraManager } from './CameraManager.js';
import { createLights } from './Lights.js';
import { Loop } from './Loop.js';
import { WarehouseWorld } from '../world/WarehouseWorld.js';
import { PointerController } from '../input/PointerController.js';
import { RaycastPicker } from '../input/RaycastPicker.js';
import { DragController } from '../input/DragController.js';
import { SnapController } from '../input/SnapController.js';
import { TweenManager } from '../fx/TweenManager.js';
import { HighlightFX } from '../fx/HighlightFX.js';
import { CameraFX } from '../fx/CameraFX.js';
import { AudioManager } from '../fx/AudioManager.js';
import { HUD } from '../ui/HUD.js';
import { GameManager } from '../game/GameManager.js';
import { level01 } from '../data/level01.js';
import { GAME_PHASE, PALLET_STATE } from '../utils/constants.js';

export class App {
  constructor(root) {
    this.root = root;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog('#090b11', 26, 48);

    this.renderer = new Renderer();
    this.cameraManager = new CameraManager();
    this.lights = createLights(this.scene);

    root.appendChild(this.renderer.domElement);

    this.world = new WarehouseWorld(this.scene);
    this.pointer = new PointerController(this.renderer.domElement);
    this.picker = new RaycastPicker(this.cameraManager.instance);
    this.tweenManager = new TweenManager();
    this.highlightFX = new HighlightFX(this.world);
    this.cameraFX = new CameraFX(this.cameraManager);
    this.audio = new AudioManager();
    this.hud = new HUD(root);
    this.snapController = new SnapController({ world: this.world, tweenManager: this.tweenManager });

    this.gameManager = new GameManager({
      world: this.world,
      hud: this.hud,
      audio: this.audio,
      tweenManager: this.tweenManager,
      highlightFX: this.highlightFX,
      cameraFX: this.cameraFX,
      snapController: this.snapController,
      level: level01
    });

    this.dragController = new DragController({
      domElement: this.renderer.domElement,
      camera: this.cameraManager.instance,
      world: this.world,
      picker: this.picker,
      pointer: this.pointer,
      snapController: this.snapController,
      onDragStart: (pallet) => this.handleDragStart(pallet),
      onPreview: (_pallet, preview) => this.handlePreview(preview),
      onDragEnd: (pallet) => this.handleDrop(pallet),
      canDrag: () => this.gameManager.state.phase === GAME_PHASE.PLAYING
    });

    this.loop = new Loop((delta) => this.update(delta), () => this.render());

    this.bindUI();
    this.onResize = this.onResize.bind(this);
  }

  bindUI() {
    this.hud.on('start', () => this.gameManager.startGame());
    this.hud.on('restart', () => this.gameManager.startGame());
    this.hud.on('close', () => this.hud.hideEnd());
  }

  handleDragStart(pallet) {
    if (this.gameManager.state.phase !== GAME_PHASE.PLAYING) return;
    this.gameManager.state.activePalletId = pallet.userData.id;
    pallet.rotation.y = 0.08;
    pallet.scale.setScalar(1.03);
    pallet.userData.state = PALLET_STATE.DRAGGING;
    this.gameManager.state.statusText = `Moving ${pallet.userData.label}. Find the ${pallet.userData.type.toUpperCase()} bay.`;
    this.hud.update(this.gameManager.state);
  }

  handlePreview(preview) {
    if (this.gameManager.state.phase !== GAME_PHASE.PLAYING) return;
    this.highlightFX.showPreview(preview);
  }

  async handleDrop(pallet) {
    if (this.gameManager.state.phase !== GAME_PHASE.PLAYING) return;
    this.highlightFX.hidePreview();
    this.gameManager.state.activePalletId = null;
    await this.gameManager.handleDrop(pallet);
  }

  mount() {
    this.gameManager.init();
    this.dragController.attach();
    window.addEventListener('resize', this.onResize);
    this.loop.start();
  }

  onResize() {
    this.renderer.resize();
    this.cameraManager.resize();
  }

  update(delta) {
    this.gameManager.update(delta);
  }

  render() {
    this.renderer.render(this.scene, this.cameraManager.instance);
  }
}
