"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
class PasswordFunctions {
    static hashPassword(password, rounds = null) {
        const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
        if (rounds) {
            return bcrypt.hashSync(password, rounds);
        }
        return bcrypt.hashSync(password, saltRounds);
    }
    static checkPassword(hashedPassword, plainPassword) {
        if (hashedPassword && plainPassword) {
            return bcrypt.compareSync(plainPassword, hashedPassword);
        }
        return false;
    }
}
exports.default = PasswordFunctions;
//# sourceMappingURL=password-functions.js.map