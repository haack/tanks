import settings from './settings';

import World from './world/world';

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.initialise();

        this.world = new World(this.canvas.width, this.canvas.height);

        this.delta = 0;
        this.loopCount = 0
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

        this.update();
        this.draw();

        this.gameStats();

        // loop with fixed timestep
        // the game will slow down as updates take longer (the space invaders effect)
        setTimeout(() => this.loop(settings.timestep), settings.timestep * 1000);
    }

    update() {
        this.world.update();
    }

    draw() {
        this.ctx.save();
        this.world.draw(this.ctx);
        this.ctx.restore();
    }

    gameStats() {
        if (this.loopCount % 500 === 0) {
            console.log(`=========STATS=========`);
            console.log(`Loop count: ${this.loopCount}`);
            console.log(`Entity count: ${this.world.entities.length}`);
            console.log(`=======================`);
        }
    }
}

export default (new Game);
