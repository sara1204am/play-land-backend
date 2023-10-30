"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationFunctions {
    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    static validateUrlString(url) {
        const regex = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/;
        return regex.test(url);
    }
    static isLiteralObject(value) {
        return !!value && value.constructor === Object;
    }
}
exports.default = ValidationFunctions;
//# sourceMappingURL=validation-functions.js.map