import settings from './settings';

import Map from './world/map';
import { Tank, Waypoint } from './entity';
import { Point } from './util';

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.initialise();

        this.map = new Map(this.canvas.width, this.canvas.height);

        this.delta = 0;
        this.loopCount = 0

        this.entities = [
            new Tank(new Point(100, 500), Math.PI / 2),
            new Waypoint(300, 300)
        ];
    }

    initialise() {
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        this.loop(settings.timestep);
    }

    loop(delta) {
        this.delta = delta;
        this.loopCount = this.loopCount + 1;
        console.log(`Loop: ${this.loopCount}`);

        this.update();
        this.draw();

        // loop with fixed timestep
        // the game will slow down as updates take longer (the space invaders effect)
        setTimeout(() => this.loop(settings.timestep), settings.timestep * 1000);
    }

    update(delta) {
        // update all entities
        for (let entity of this.entities) {
            entity.update(delta);
        }
    }

    draw() {
        this.ctx.save();
        this.map.draw(this.ctx);

        // draw all entities
        for (let entity of this.entities) {
            this.ctx.save();
            entity.draw(this.ctx);
            this.ctx.restore();
        }
    }
}

export default (new Game);
