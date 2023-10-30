"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const basic_config_1 = require("./basic.config");
async function configuration() {
    const tmpEnv = {
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    };
    return {
        ...basic_config_1.environmentDefault,
        ...tmpEnv,
    };
}
exports.configuration = configuration;
//# sourceMappingURL=configuration.config.js.map