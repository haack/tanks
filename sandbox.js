let userBotContext = null;

//TODO: pull into seperate file
class Bot {
    constructor() {
        this.drivePower = 0;
        this.rotatePower = 0;
        this.turretRotatePower = 0;
    }

    drive(power) {
        this.drivePower = power;
    }

    rotate(power) {
        this.rotatePower = power;
    }

    rotateTurret(power) {
        this.turretRotatePower = power;
    }

    getState() {
        return {
            drivePower: this.drivePower,
            rotatePower: this.rotatePower,
            turretRotatePower: this.turretRotatePower
        }
    }
}

onmessage = e => {
    let action = e.data[0];
    let code = e.data[1];

    var e = null;

    switch (action) {
        case "start":
            userBotContext = eval(`
                new ${code};
            `);
            //TODO: handle bad stuff here

            userBotContext.start();
            break;
        case "update":
            userBotContext.update();
            break;
        default:
            throw new Error("Invalid action");
    }

    self.postMessage(userBotContext.getState());
};
