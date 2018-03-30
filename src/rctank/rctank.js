import Game from '../game';
import Spawner from '../world/spawner';

import { Tank, Waypoint } from '../entity';
import { Point } from '../util';

//TODO: load with secure headers
//TODO: seperate worker for each rctank
let worker = new Worker("../sandbox.js");

// Remote controlled tank
class RCTank extends Tank {
    constructor(position, bearing, code) {
        super(position, bearing, 'rgba(94, 155, 255, 0.8)');

        let initialState = {
            tank: this.getBaseState(),
            world: {
                width: Game.world.width,
                height: Game.world.height,
            }
        };

        worker.postMessage(["load", initialState, code]);
        worker.onmessage = (res) => this.sandboxResponse(res);
    }

    update() {
        super.update();

        let updateState = Game.world.getState();
        updateState.entities = updateState
            .entities.filter(entity => entity.id !== this.id);
        worker.postMessage(["update", updateState]);
    }

    sandboxResponse(res) {
        //TODO: handle different responses
        let tankCommands = res.data;

        this.drive(tankCommands.drivePower);
        this.rotate(tankCommands.rotatePower);
        this.rotateTurret(tankCommands.turretRotatePower);

        if (tankCommands.shootRequest) {
            this.shoot();
        }
    }
}

export default RCTank;
