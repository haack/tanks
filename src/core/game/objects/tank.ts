import * as Phaser from 'phaser';

const CONST : any = {
  SHIP_SIZE: 10
};

export type TankParams = {
  scene: Phaser.Scene,
  opt: any,
  initialState: TankInitialState
};

type TankInitialState = {
  x: number,
  y: number,
  rotation?: number
};

export class Tank extends Phaser.GameObjects.Graphics {
  private currentScene: Phaser.Scene;
  private velocity: Phaser.Math.Vector2;

  constructor(params: TankParams) {
    super(params.scene, params.opt);

    this.currentScene = params.scene;

    this.init(params.initialState);

    this.currentScene.add.existing(this);
  }

  update(time: number, delta: number) : void {
    // this.body.setVelocityX(delta);
    // this.body.setAngularVelocity(delta);
  }

  init(initialState: TankInitialState) : void {
    this.x = initialState.x;
    this.y = initialState.y;
    this.rotation = initialState.rotation || 0;
    
    this.currentScene.physics.world.enable(this);

    this.body.allowGravity = false;
    this.body.setSize(CONST.SHIP_SIZE * 2, CONST.SHIP_SIZE * 2);
    this.body.setOffset(-CONST.SHIP_SIZE, -CONST.SHIP_SIZE);
    
    this.lineStyle(3, 0xffffff);

    this.strokeTriangle(
      -CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      0,
      -CONST.SHIP_SIZE
    );
  }
}
