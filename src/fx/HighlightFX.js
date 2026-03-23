export class HighlightFX {
  constructor(world) {
    this.world = world;
  }

  clearBays() {
    this.world.bays.forEach((bay) => {
      if (!bay.occupied) bay.setHighlight('idle');
      else bay.setHighlight('done');
    });
  }

  showPreview(preview) {
    this.clearBays();
    if (!preview?.bay) {
      this.world.ghostPreview.hide();
      return;
    }

    const mode = preview.valid ? 'valid' : 'invalid';
    preview.bay.setHighlight(mode);
    this.world.ghostPreview.show(preview.bay.position, mode);
  }

  markPlaced(bay) {
    bay.setHighlight('done');
    this.world.ghostPreview.hide();
  }

  hidePreview() {
    this.clearBays();
    this.world.ghostPreview.hide();
  }
}
