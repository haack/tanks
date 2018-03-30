import settings from './settings';

import World from './world/world';

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.initialise();

        this.world = new World(this.canvas.width, this.canvas.height);

        this.delta = 0;
        this.loopCount = 0;

        this.loopTimeout = null;
    }

    initialise() {
        let computedStyle = getComputedStyle(this.canvas);

        this.canvas.width = parseInt(computedStyle.getPropertyValue('width'), 10);
        this.canvas.height = parseInt(computedStyle.getPropertyValue('height'), 10);
    }

    addBot(code) {
        this.world.initialise();
        this.world.addBot(code);
    }

    start() {
        if (!this.loopTimeout) {
            this.loop(settings.timestep);
        }
    }

    stop() {
        if (this.loopTimeout) {
            clearTimeout(this.loopTimeout);
            this.loopTimeout = null;
        }
    }

    loop(delta) {
        if (this.loopTimeout) {
            clearTimeout(this.loopTimeout);
        }

        this.delta = delta;
        this.loopCount = this.loopCount + 1;

        this.update();
        this.draw();

        this.gameStats();

        // loop with fixed timestep
        // the game will slow down as updates take longer (the space invaders effect), especially with complex bot logic
        this.loopTimeout = setTimeout(() => this.loop(settings.timestep), settings.timestep * 1000);
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
