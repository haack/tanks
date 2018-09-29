import { Tank, TankParams } from '../objects/tank';

export class GameScene extends Phaser.Scene {
  private player: Tank

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init() : void {

  }

  create() : void {
    const params: TankParams = {
      scene: this,
      opt: {},
      initialState: {
        x: 120,
        y: 600
      }
    };

    this.player = new Tank(params);
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta);
  }
}