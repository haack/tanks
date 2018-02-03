class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.resetTransform();

        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.closePath();
    }
}

export default Map;
