import Bot from './bot';
import { Point, Bearing, Nav } from '../util';

self.Bot = Bot;
self.module = {};
self.lib = {
    Point,
    Bearing,
    Nav,
};

let botEnv = null;

onmessage = e => {
    let action = e.data[0];
    let stateUpdate = e.data[1];
    let code = e.data[2];
    var e = null;

    switch (action) {
        case "load":

            eval(`
                ${code};
                self.module = module;
            `);

            const UserBotClass = self.module.exports;
            //TODO: handle bad stuff here

            botEnv = new UserBotClass();


            botEnv.__cacheState(stateUpdate);
            botEnv.create();
            break;

        case "update":
            botEnv.__cacheState(stateUpdate);

            botEnv.update();
            break;

        default:
            throw new Error("Invalid action");
    }

    self.postMessage(botEnv.__getState());
};
