import Entity from '../entity';
import { Bearing, Bounds } from '../../../util';

class Waypoint extends Entity {
    constructor(position) {
        super(position, new Bearing(0));
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);

        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.arc(0, 0, Waypoint.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00FFFF";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.globalAlpha = "0.3";
        ctx.arc(0, 0, Waypoint.radius + 3, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00FFFF";
        ctx.stroke();
        ctx.closePath();

        ctx.closePath();
    }

    update() {

    }
}

Waypoint.radius = 5;
Waypoint.bounds = new Bounds(0, 0, Waypoint.radius, Waypoint.radius)

export default Waypoint;
