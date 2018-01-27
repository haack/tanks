class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.initialise();

        this.map = new Map(this.canvas.width, this.canvas.height);

        this.entities = [
            new Tank(new Point(500, 500), 0),
            // new Tank(new Point(100, 500), Math.PI / 2)
            new Waypoint(200, 200)
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
        Game.delta = delta;
        Game.loopCount = Game.loopCount + 1;
        console.log(`Loop: ${Game.loopCount}`);

        this.update();
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
        this.map.draw(this.ctx);

        // draw all entities
        for (let entity of this.entities) {
            entity.draw(this.ctx);
            this.ctx.resetTransform();
        }
    }
}

Game.timestep = 30 / 1000;
Game.delta = 0;
Game.loopCount = 0;
