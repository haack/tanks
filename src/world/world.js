import Game from '../game';

import Spawner from './spawner';
import { Entity, Waypoint } from '../entity';
import RCTank from '../rctank/rctank';
import { Point } from '../util';

class World {
    constructor(width, height) {
        this.width = width / World.scale;
        this.height = height / World.scale;

        this.bot = new RCTank(new Point(100, 500), 0);

        this.entities = [
            this.bot
        ];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        for (let i in this.entities) {
            if (this.entities[i] === entity) {
                this.entities.splice(i, 1);
                break;
            }
        }
    }

    draw(ctx) {
        ctx.scale(World.scale, World.scale);

        ctx.clearRect(0, 0, this.width, this.height);

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

            if ((entity.position.x < -100 || entity.position.x > this.width) || (entity.position.y < -100 || entity.position.y > this.height)) {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }
}

World.scale = 0.8;

export default World;
