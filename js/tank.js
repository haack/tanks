class Tank extends Entity {
    constructor(position, direction) {
        super(position);

        this.direction = direction;
        this.turretDirection = 0;

        this.bullets = [];
    }

    update() {
        this.navigateTo(new Waypoint(200, 200));

        this.drive(1);
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.direction);

        this.drawBody(ctx);
        this.drawTurret(ctx);
    }

    navigateTo(target) {
        if (!this.at(target)) {
            // get bearing to target
            let bearingToTarget = this.position.getBearingTo(target);

            console.log(bearingToTarget);
            // turn to bearing
            this.rotate(1);
        } else {
            console.log("Target reached...");
        }
    }

    drive(power) {
        power = Math.clamp(power, -1, 1);

        let dx = power * Math.sin(this.direction) * Tank.driveSpeed * Game.delta;
        let dy = -1 * power * Math.cos(this.direction) * Tank.driveSpeed * Game.delta;

        this.position.x += dx;
        this.position.y += dy;
    }

    shoot() {
        if (true) {
            //add bullet to world
        }
    }

    rotate(power) {
        power = Math.clamp(power, -1, 1);
        this.direction += power * Tank.rotationSpeed * Game.delta * (Math.PI /180);
    }

    rotateTurret(power) {
        power = Math.clamp(power, -1, 1);
        this.turretDirection += power * Tank.turretRotationSpeed * Game.delta * (Math.PI /180);;
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
