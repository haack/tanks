class Tank extends Entity {
    constructor(position, direction) {
        super(position);

        this.direction = direction;
        this.turretDirection = 0;
    }

    update(delta) {
        this.rotate(Tank.rotationSpeed * delta * (Math.PI /180));
        this.rotateTurret(Tank.turretRotationSpeed * delta * (Math.PI /180));

        this.drive(delta);
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.direction);

        this.drawBody(ctx);
        this.drawTurret(ctx);
    }

    drive(delta) {
        //move in direction
        let dx = Math.sin(this.direction) * Tank.driveSpeed * delta;
        let dy = -1 * Math.cos(this.direction) * Tank.driveSpeed * delta;

        this.position.x += dx;
        this.position.y += dy;
    }

    shoot() {
        if (true) {
            //add bullet to world
        }
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
Tank.rotationSpeed = 30;
Tank.driveSpeed = 50;

Tank.turretWidth = 3;
Tank.turretLength = 20;
Tank.turretRotationSpeed = 90;
