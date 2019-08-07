import Game from "../../game";
import Entity from "../entity";
import Spawner from "../../world/spawner";
import { Bearing, Bounds } from "../../../util";

class Bullet extends Entity {
  constructor(position, direction, parentId) {
    super(position, new Bearing(direction));

    this.parentId = parentId;
  }

  update() {
    let dx = Math.sin(this.direction.getRadians()) * Bullet.speed * Game.delta;
    let dy =
      -1 * Math.cos(this.direction.getRadians()) * Bullet.speed * Game.delta;

    this.position.x += dx;
    this.position.y += dy;
  }

  draw(ctx) {
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.direction.getRadians());

    ctx.beginPath();
    ctx.rect(-1, -1, Bullet.width, Bullet.height);
    ctx.strokeStyle = "#00fffa";
    ctx.fillStyle = "#00fffa";
    ctx.stroke();
    ctx.fill();

    ctx.closePath();
  }

  onCollision(other) {
    if (other.id !== this.parentId) {
      // do damage if appropriate

      // remove bullet
      Spawner.removeEntity(this);
    }
  }
}

Bullet.width = 3;
Bullet.height = 9;

Bullet.speed = 300;

Bullet.bounds = new Bounds(0, 0, Bullet.width, Bullet.height);

export default Bullet;
