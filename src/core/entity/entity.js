class Entity {
  constructor(position, direction) {
    this.position = position;
    this.direction = direction;
    this.type = this.constructor.name;
    this.id = Entity.nextId++;
  }

  update() {}

  draw(ctx) {}

  at(targetPosition) {
    if (this.position.distanceTo(targetPosition) < 5) {
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
      type: this.type,
      direction: this.direction
    };
  }

  bounds() {
    return this.constructor.bounds
      .clone()
      .translateToCenter({ x: this.position.x, y: this.position.y });
  }
}

Entity.nextId = 1;
Entity.passable = true;

export default Entity;
