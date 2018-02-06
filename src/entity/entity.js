class Entity {
    constructor(position, direction, bounds) {
        this.position = position;
        this.direction = direction;
        this.bounds = bounds;
    }

    update() {}

    draw(ctx) {}

    at(targetPosition) {
        if (this.position.distanceTo(targetPosition) < 5.) {
            return true;
        }
    }

    getBearingBetween(targetPosition) {
        return this.position.getBearingBetween(targetPosition);
    }
}

export default Entity;
