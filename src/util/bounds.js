import { Point } from './';

class Bounds {
    constructor(minX, minY, maxX, maxY) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    scaleBy(factor) {
        let width = this.width;
        let height = this.height;
        let center = this.center;

        this.minX = (this.center.x - ((width / 2) * factor));
        this.minY = (this.center.y - ((height / 2) * factor));
        this.maxX = (this.center.x + ((width / 2) * factor));
        this.maxY = (this.center.y + ((height / 2) * factor));

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

    //TODO: add rotation to bounds and SAT intersection check
    intersects(other) {
        // xintersect
        if (this.maxX > other.minX && this.minX < other.maxX) {
            // yintersect
            return (this.maxY > other.minY && this.minY < other.maxY);
        }

        return false;
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
