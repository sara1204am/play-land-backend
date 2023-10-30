"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class StringFunctions {
    static parseJsonSafe(jsonString, defaultValue = null) {
        if (!jsonString) {
            return defaultValue;
        }
        if (!(0, lodash_1.isString)(jsonString)) {
            return jsonString;
        }
        try {
            return JSON.parse(jsonString);
        }
        catch (e) {
            console.error(e);
            return defaultValue;
        }
    }
    static camelCase(str) {
        return (str.slice(0, 1).toLowerCase() + str.slice(1))
            .replace(/([-_ ]){1,}/g, ' ')
            .split(/[-_ ]/)
            .reduce((cur, acc) => {
            return cur + acc[0].toUpperCase() + acc.substring(1);
        });
    }
}
exports.default = StringFunctions;
//# sourceMappingURL=string-functions.js.map