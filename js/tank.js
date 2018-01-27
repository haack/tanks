class Tank {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction; //Math.PI;
        this.turretDirection = 0;
    }

    draw(ctx) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction);

        this.drawBody(ctx);
        this.drawTurret(ctx);

        ctx.resetTransform();
    }

    rotate(rad) {
        this.direction += rad;
    }

    rotateTurret(rad) {
        this.turretDirection += rad;
    }

    drawBody(ctx) {
        ctx.beginPath();
        ctx.rect(-(Tank.bodyWidth / 2), -(Tank.bodyLength / 2), Tank.bodyWidth, Tank.bodyLength);
        ctx.fillStyle = "#888888";
        ctx.strokeStyle = "#FFFFFF";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    drawTurret(ctx) {
        ctx.beginPath();
        ctx.rotate(this.turretDirection);
        ctx.rect(-(Tank.turretWidth / 2), 0, Tank.turretWidth, -Tank.turretLength);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }
}

Tank.bodyWidth = 20;
Tank.bodyLength = 22;
Tank.turretWidth = 3;
Tank.turretLength = 20;
