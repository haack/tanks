import Game from '../game';

import Spawner from './spawner';
import { Entity, Tank, Waypoint } from '../entity';
import { Point } from '../util';

class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.entities = [
            new Tank(new Point(100, 500), Math.PI / 2),
            new Waypoint(new Point(300, 300))
        ];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.resetTransform();

        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.closePath();

        // draw all entities
        for (let entity of this.entities) {
            ctx.save();
            entity.draw(ctx);
            ctx.restore();
        }
    }

    update() {
        // update all entities
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            entity.update(Game.delta);

            if ((entity.position.x < 0 || entity.position.x > this.width) || (entity.position.y < 0 || entity.position.y > this.height)) {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }
}

export default World;
