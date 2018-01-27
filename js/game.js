class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");

        this.initialise();

        this.player = new Tank(50, 50, 0);
        this.player2 = new Tank(100, 50, Math.PI / 2);

        this.loop();
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

        this.draw();

        setTimeout(() => this.loop(), 1000);
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

        this.player.draw(ctx);
        this.player2.draw(ctx);
    }
}
