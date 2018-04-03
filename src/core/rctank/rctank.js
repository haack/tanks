import Game from '../game';
import Spawner from '../world/spawner';

import { Tank, Waypoint } from '../entity';
import { Point } from '../../util';

//TODO: load with secure headers
//TODO: seperate worker for each rctank
let worker = new Worker("/build/sandbox-bundle.js");

// Remote controlled tank
class RCTank extends Tank {
    constructor(position, bearing, code) {
        super(position, bearing, RCTank.color);

        this.lastCommands = {};
        this.marker = null;

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

        let updateState = {
            ...Game.world.getState(),
            tank: this.getBaseState(),
        }
        updateState.entities = updateState
            .entities.filter(entity => entity.id !== this.id);

        worker.postMessage(["update", updateState]);
    }

    draw(ctx) {
        ctx.save();
            super.draw(ctx);
        ctx.restore();

        // will restore to world perspective
        // so only do after drawing any rctank stuff
        // TODO: request world to draw this as a temp entity
        this.drawMarker(ctx);
    }

    drawMarker(ctx) {
        ctx.restore();

        if (this.marker) {
            ctx.save();
            this.marker.draw(ctx);
            ctx.restore();
        }

        ctx.save();
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

        if (tankCommands.marker) {
            this.marker = new Waypoint(tankCommands.marker);
        }

        this.lastCommands = tankCommands;
    }
}

RCTank.color = 'rgba(94, 155, 255, 0.8)';

export default RCTank;
