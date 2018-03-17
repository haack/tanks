import { Point } from './';

class Bounds {
    constructor(minX, minY, maxX, maxY) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    scaleBy(factor) {
        this.minX += (this.width * (factor / 2));
        this.minY += (this.height * (factor / 2));
        this.maxX -= (this.width * (factor / 2));
        this.maxY -= (this.height * (factor / 2));

        return this;
    }

    translateToCenter(newCenter) {
        let dx = newCenter.x - this.center.x;
        let dy = newCenter.y - this.center.y;

        this.minX += dx;
        this.minY += dy;
        this.maxX += dx;
        this.maxY += dy;

        return this;
    }

    clone() {
        return new Bounds(this.minX, this.minY, this.maxX, this.maxY);
    }

    get width() {
        return this.maxX - this.minX;
    }

    get height() {
        return this.maxY - this.minY;
    }

    get center() {
        let x = (this.maxX + this.minX) / 2;
        let y = (this.maxY + this.minY) / 2;
        return new Point(x, y);
    }
}

export default Bounds;
