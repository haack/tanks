let botEnv = null;

//TODO: pull into seperate file
class Bot {
    constructor() {
        this.__commands = {
            drivePower: 0,
            rotatePower: 0,
            turretRotatePower: 0,
            shootRequest: false,
        };
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

onmessage = e => {
    let action = e.data[0];
    let stateUpdate = e.data[1];
    let code = e.data[2];
    var e = null;

    switch (action) {
        case "load":

            let userExport = eval(`
                let module = {};
                ${code};
                module.exports;
            `);

            botEnv = new userExport();
            
            //TODO: handle bad stuff here

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
