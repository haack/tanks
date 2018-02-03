class Tank extends Entity {
    constructor(position, direction) {
        super(position);

        this.direction = new Bearing(direction);
        this.turretDirection = new Bearing(direction);

        this.bullets = [];
    }

    update() {
        this.navigateTo(new Waypoint(300, 300));
        this.rotateTurret(Tank.turretRotationSpeed);
        this.drive(1);
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);

        this.drawTargetLine(ctx);

        ctx.rotate(this.direction.getRadians());

        this.drawBody(ctx);
        this.drawTracks(ctx);
        this.drawTurret(ctx);
        this.drawDirectionLine(ctx);
    }

    navigateTo(target) {
        if (!this.at(target)) {
            this.turnTo(target);
        } else {
            console.log("Target reached...");
        }
    }

    turnTo(target) {
        // get bearing to target
        let bearingToTarget = this.position.getBearingBetween(target);

        let theta = bearingToTarget
            .addRadians(-this.direction.getRadians())
            .getDegrees();
        let thetaDifference = 180 - theta;
        let rotationPower = Math.sign(thetaDifference);

        // turn to bearing
        this.rotate(rotationPower);
    }

    drive(power) {
        power = Math.clamp(power, -1, 1);

        let dx = power * Math.sin(this.direction.getRadians()) * Tank.driveSpeed * Game.delta;
        let dy = -1 * power * Math.cos(this.direction.getRadians()) * Tank.driveSpeed * Game.delta;

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
        this.direction.addDegrees(power * Tank.rotationSpeed * Game.delta);
    }

    rotateTurret(power) {
        power = Math.clamp(power, -1, 1);
        this.turretDirection.addDegrees(power * Tank.turretRotationSpeed * Game.delta);
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

    drawTracks(ctx) {
        ctx.beginPath();
        ctx.rect((-Tank.trackSpacing / 2) - Tank.trackWidth, -(Tank.trackLength / 2), Tank.trackWidth, Tank.trackLength);
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#888888";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect((Tank.trackSpacing / 2), -(Tank.trackLength / 2), Tank.trackWidth, Tank.trackLength);
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#888888";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    drawTurret(ctx) {
        ctx.save();

        ctx.rotate(this.turretDirection.getRadians());

        ctx.beginPath();
        ctx.rect(-Tank.turretBaseWidth / 2, -Tank.turretBaseWidth / 2, Tank.turretBaseWidth, Tank.turretBaseWidth);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(-Tank.turretWidth / 2, 0, Tank.turretWidth, -Tank.turretLength);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -100);
        ctx.strokeStyle = "#6666FF";
        ctx.stroke();

        ctx.restore();
    }

    drawDirectionLine(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -200);
        ctx.strokeStyle = "#00FF00";
        ctx.stroke();

        ctx.restore();
    }

    drawTargetLine(ctx) {
        ctx.save();

        ctx.rotate(this.position.getBearingBetween(new Waypoint(300, 300)).getRadians());

        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -200);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();

        ctx.restore();
    }
}

Tank.bodyWidth = 20;
Tank.bodyLength = 22;
Tank.rotationSpeed = 30;
Tank.driveSpeed = 50;

Tank.trackWidth = 7;
Tank.trackLength = 27;
Tank.trackSpacing = 14;

Tank.turretWidth = 6;
Tank.turretLength = 18;
Tank.turretRotationSpeed = 90;

Tank.turretBaseWidth = 10;
