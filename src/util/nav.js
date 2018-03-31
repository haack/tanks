import { Bearing } from '.';

class Nav {
    constructor(host) {
        this.host = host;
    }

	turnTo(target) {
        // get bearing to target
        let bearingToTarget = Bearing.between(this.host.position, target);

        let theta = bearingToTarget
            .addRadians(-this.host.direction.rad)
            .getRadians();

        let thetaDifference = Math.PI - theta;
        let rotationPower = Math.sign(thetaDifference);

        // turn to bearing
        this.host.rotate(rotationPower);
    }

    pointingAt(target) {
		let epsilon = 0.1;
		let delta = Bearing.between(this.host.position, target);

		return (Math.abs(delta.rad - this.host.direction.rad)) < epsilon;
	}
}

export default Nav;
