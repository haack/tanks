import Entity from './entity';

class Waypoint extends Entity {
    constructor(position) {
        super(position);
    }

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);

        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00FFFF";
        ctx.stroke();
    }

    update() {

    }
}

export default Waypoint;
