import Game from '../game';

import Spawner from './spawner';
import { Entity, Waypoint } from '../entity';
import { Point, Bearing } from '../../util';

import RCTank from '../rctank/rctank';

class World {
    constructor(width, height) {
        this.width = width / World.scale;
        this.height = height / World.scale;
    }

    initialise() {
        this.entities = [];
    }

    addBot(code) {
        let bot = new RCTank(new Point(100, 100), Math.PI / 3 * 2, code);
        this.entities.push(bot);
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

    getState() {
        return {
            delta: Game.delta,
            entities: this.entities.map(entity => entity.getBaseState()), //TODO: filter to reduce size sent to worker
        };
    }

    draw(ctx) {
        ctx.scale(World.scale, World.scale);

        ctx.clearRect(0, 0, this.width, this.height);

        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "#272822";
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
            entity.update();

            if ((entity.position.x < -100 || entity.position.x > this.width) || (entity.position.y < -100 || entity.position.y > this.height)) {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }
}

World.scale = 0.8;

export default World;
