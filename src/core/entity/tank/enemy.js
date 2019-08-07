import Game from "../../game";

import Tank from "./tank";

class BasicEnemy extends Tank {
  constructor(position, direction) {
    super(position, direction, BasicEnemy.color);
  }

  update() {
    super.update();

    this.drive(0.5);

    if (!this.rotationPower || Game.loopCount % 100 === 0) {
      this.rotationPower = Math.random() - 0.5;
    }

    if (Math.random() < 0.01) {
      this.shoot();
    }

    this.rotate(this.rotationPower);
  }
}

BasicEnemy.color = "#f22";

export default BasicEnemy;
