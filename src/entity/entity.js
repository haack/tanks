class Entity {
    constructor(position) {
        this.position = position;
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
