import Game from "../game";
import { Bullet, Waypoint, Enemy } from "../entity/";
import { Point } from "../../util";

class Spawner {
  constructor() {}

  bullet(position, direction, parentId) {
    let bullet = new Bullet(position.clone(), direction, parentId);
    Game.world.addEntity(bullet);
    return bullet;
  }

  waypoint(position) {
    let waypoint = new Waypoint(position.clone());
    Game.world.addEntity(waypoint);
    return waypoint;
  }

  randomWaypoint() {
    let point = this.randomPosition();

    return this.waypoint(point);
  }

  randomPosition() {
    let x =
      Math.floor(Math.random() * Math.floor(Game.world.width - 100)) + 100;
    let y =
      Math.floor(Math.random() * Math.floor(Game.world.height - 100)) + 100;

    return new Point(x, y);
  }

  randomDirection() {
    return Math.random() * (Math.PI * 2);
  }

  randomEnemyTank() {
    let point = this.randomPosition();
    let direction = this.randomDirection();
    let tank = new Enemy(point, direction);

    Game.world.addEntity(tank);
  }

  removeEntity(entity) {
    Game.world.removeEntity(entity);
  }
}

export default new Spawner();
