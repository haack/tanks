import Game from '../../game';
import Spawner from '../../world/spawner';
import Entity from '../entity';
import { Bearing, Point } from '../../util';
import { Waypoint } from '../';

class Tank extends Entity {
    constructor(position, direction, color) {
        super(position, new Bearing(direction));

        this.turretDirection = new Bearing(direction);

        this.color = color;

        this.remainingTimeToReload = 0;
    }

    update() {
        this.updateReload();
    }

    updateReload() {
        if (this.remainingTimeToReload > 0) {
            this.remainingTimeToReload -= Game.delta;
            this.remainingTimeToReload = Math.max(this.remainingTimeToReload, 0);
        }
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);

        this.drawRing(ctx);

        ctx.rotate(this.direction.getRadians());

        this.drawBody(ctx);
        this.drawTracks(ctx);
        this.drawTurret(ctx);
    }

    turnTo(target) {
        // get bearing to target
        let bearingToTarget = this.position.getBearingBetween(target);

        let theta = bearingToTarget
            .addRadians(-this.direction.getRadians())
            .getRadians();

        let thetaDifference = Math.PI - theta;
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
        if (this.remainingTimeToReload <= 0) {
            Spawner.bullet(this.position, this.direction.getRadians() + this.turretDirection.getRadians());
            this.remainingTimeToReload += Tank.timeToReload;
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

        ctx.restore();
    }

    drawRing(ctx) {
        if (this.color) {
            ctx.save();

            ctx.lineWidth = 3;
            ctx.strokeStyle = this.color;

            ctx.beginPath();

            ctx.globalAlpha = 0.3;
            ctx.arc(0, 0, 27, 0, 2 * Math.PI);
            ctx.arc(0, 0, 33, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.closePath();

            ctx.beginPath();
            ctx.globalAlpha = 0.7;
            ctx.arc(0, 0, 30, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.closePath();

            ctx.restore();
        }
    }
}

Tank.bodyWidth = 20;
Tank.bodyLength = 22;
Tank.rotationSpeed = 60;
Tank.driveSpeed = 100;

Tank.trackWidth = 7;
Tank.trackLength = 27;
Tank.trackSpacing = 14;

Tank.turretWidth = 6;
Tank.turretLength = 20;
Tank.turretRotationSpeed = 90;

Tank.turretBaseWidth = 10;

Tank.timeToReload = 1;

export default Tank;
