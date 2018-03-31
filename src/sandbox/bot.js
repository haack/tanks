class Bot {
    constructor() {
        this.__commands = {
            drivePower: 0,
            rotatePower: 0,
            turretRotatePower: 0,
            shootRequest: false,
        };
    }

    get position() {
        return this.__state.tank.position;
    }

    get direction() {
        return this.__state.tank.direction;
    }

    drive(power) {
        this.__commands.drivePower = power;
    }

    shoot() {
        this.__commands.shootRequest = true;
    }

    rotate(power) {
        this.__commands.rotatePower = power;
    }

    rotateTurret(power) {
        this.__commands.turretRotatePower = power;
    }

    scan() {
        return this.__state.entities;
    }

    __cacheState(update) {
        // merge already cached state with new updates (TODO: does this do a deep merge???)
        this.__state = {
            ...this.__state,
            ...update,
        };
    }

    __getState() {
        return this.__commands;
    }
}

export default Bot;
