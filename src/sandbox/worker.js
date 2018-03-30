import Bot from './bot';

self.Bot = Bot;
self.module = {};

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
