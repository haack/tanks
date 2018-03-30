let botEnv = null;

//TODO: pull into seperate file
class Bot {
    constructor() {
        this.__drivePower = 0;
        this.__rotatePower = 0;
        this.__turretRotatePower = 0;
    }

    drive(power) {
        this.__drivePower = power;
    }

    shoot() {
        this.__shootRequest = true;
    }

    rotate(power) {
        this.__rotatePower = power;
    }

    rotateTurret(power) {
        this.__turretRotatePower = power;
    }

    __getState() {
        return {
            drivePower: this.__drivePower || 0,
            rotatePower: this.__rotatePower || 0,
            turretRotatePower: this.__turretRotatePower || 0,
            shootRequest: this.__shootRequest || false,
        }
    }
}

onmessage = e => {
    let action = e.data[0];
    let code = e.data[1];

    var e = null;

    switch (action) {
        case "load":
            botEnv = eval(`
                new ${code};
            `);
            //TODO: handle bad stuff here

            break;
        case "update":
            botEnv.update();
            break;
        default:
            throw new Error("Invalid action");
    }

    self.postMessage(botEnv.__getState());
};
