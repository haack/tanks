import { Bearing } from '.';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo(otherPoint) {
        let dx = (this.x - otherPoint.x);
        let dy = (this.y - otherPoint.y);

        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    getBearingBetween(otherPoint) {
        let dx = otherPoint.x - this.x;
        let dy = this.y - otherPoint.y;

        let theta = Math.atan2(dx, dy);

        return new Bearing(theta);
    }
}

export default Point;
