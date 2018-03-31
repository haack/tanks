class Entity {
    constructor(position, direction, type) {
        this.position = position;
        this.direction = direction;
        this.type = type;
        this.id = Entity.nextId++;
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

    getBaseState() {
        return {
            position: this.position,
            id: this.id,
            type: this.constructor.name,
            direction: this.direction,
        }
    }
}

Entity.nextId = 1;

export default Entity;
