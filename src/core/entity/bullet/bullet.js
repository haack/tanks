import Game from '../../game';
import Entity from '../entity';
import { Bearing } from '../../../util';

class Bullet extends Entity {
    constructor(position, direction) {
        super(position, new Bearing(direction));
    }

    update() {
        let dx =  Math.sin(this.direction.getRadians()) * Bullet.speed * Game.delta;
        let dy = -1 * Math.cos(this.direction.getRadians()) * Bullet.speed * Game.delta;

        this.position.x += dx;
        this.position.y += dy;
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.direction.getRadians());

        ctx.beginPath();
        ctx.rect(-1, -1, 2, 8);
        ctx.strokeStyle = "#00fffa";
        ctx.fillStyle = "#00fffa";
        ctx.stroke();
        ctx.fill();

        ctx.closePath();
    }
}

Bullet.speed = 250;

export default Bullet;
