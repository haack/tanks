export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  update(): void {
    console.log("Starting game...");
    
    this.scene.start("GameScene");
  }
}