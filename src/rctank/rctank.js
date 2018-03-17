import Game from '../game';
import Spawner from '../world/spawner';

import { Tank, Waypoint } from '../entity';
import { Point } from '../util';

let worker = new Worker("../sandbox.js");

let code = `
    class MyBot extends Bot {
        start() {
            //
        }

        update() {
            this.drive(0.5);
        }
    }
`;

// Remote controlled tank
class RCTank extends Tank {
    constructor(position, bearing) {
        super(position, bearing, 'rgba(94, 155, 255, 0.8)');
        worker.postMessage(["start", code]);
        worker.onmessage = (res) => this.sandboxResponse(res);
    }

    update() {
        setTimeout(() => worker.postMessage(["update"]), 1000/30);
    }

    sandboxResponse(res) {
        //TODO: handle different responses
        let tankCommands = res.data;

        this.drive(tankCommands.drivePower);
        this.rotate(tankCommands.rotatePower);
        this.rotateTurret(tankCommands.turretRotatePower);
    }
}

export default RCTank;
