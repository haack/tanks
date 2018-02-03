import Game from '../game';
import { Bullet } from '../entity/';

class Spawner {
    constructor() {}

    bullet(point, direction) {
        let bullet = new Bullet(point.clone(), direction);
        Game.addEntity(bullet);
    }
}

export default (new Spawner);
