import { Point } from '../util';

class Waypoint extends Point {
    draw(ctx) {
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00FFFF";
        ctx.stroke();
    }

    update() {

    }
}

export default Waypoint;
