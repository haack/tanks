import Game from '../game';
import { Bullet, Waypoint } from '../entity/';
import { Point } from '../../util';

class Spawner {
    constructor() {}

    bullet(position, direction) {
        let bullet = new Bullet(position.clone(), direction);
        Game.world.addEntity(bullet);
        return bullet;
    }

    waypoint(position) {
        let waypoint = new Waypoint(position.clone());
        Game.world.addEntity(waypoint);
        return waypoint;
    }

    randomWaypoint() {
        let x = Math.floor(Math.random() * Math.floor(Game.world.width - 100)) + 100;
        let y = Math.floor(Math.random() * Math.floor(Game.world.height - 100)) + 100;

        return this.waypoint(new Point(x, y));
    }

    removeEntity(entity) {
        Game.world.removeEntity(entity);
    }
}

export default (new Spawner);
