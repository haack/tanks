class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");

        this.initialise();

        this.entities = [
            new Tank(500, 500, 0),
            new Tank(100, 500, Math.PI / 2)
        ];

        this.loop(Game.timestep);
    }

    initialise() {
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    loop(delta) {
        this.loopCount = (this.loopCount || 0) + 1;
        console.log(`Loop: ${this.loopCount}`);

        this.update(delta);

        this.draw();

        // loop with fixed timestep
        // the game will slow down as updates take longer (the space invaders effect)
        setTimeout(() => this.loop(Game.timestep), Game.timestep * 1000);
    }

    update(delta) {
        // update all entities
        for (let entity of this.entities) {
            entity.update(delta);
        }
    }

    draw() {
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.resetTransform();

        ctx.beginPath();
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.closePath();

        // draw all entities
        for (let entity of this.entities) {
            entity.draw(ctx);
            ctx.resetTransform();
        }
    }
}

Game.timestep = 30 / 1000;
