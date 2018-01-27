class Entity {
    constructor(position) {
        this.position = position;
    }

    update() {}

    draw(ctx) {}

    at(targetPosition) {
        if (this.position.distanceTo(targetPosition) < 1.) {
            return true;
        }
    }

    getBearingTo(targetPosition) {
        return this.position.getBearingTo(targetPosition);
    }
}
