import Game from '../game';
import Spawner from '../world/spawner';

import { Tank, Waypoint } from '../entity';
import { Point } from '../util';

class Bot extends Tank {
    constructor(position, bearing) {
        super(position, bearing, 'rgba(94, 155, 255, 0.8)');

        this.target = null;
    }

    update() {
        if (!this.target) {
            this.target = Spawner.randomWaypoint(new Point(600, 600));
        }

        if (this.at(this.target.position)) {
            Spawner.removeEntity(this.target);
            this.target = null;
        } else {
            this.turnTo(this.target.position);
            this.drive(1);
            this.rotateTurret(1);
        }

        if (Game.loopCount % 20 == 0) {
            // this.shoot();
        }
    }
}

export default Bot;
