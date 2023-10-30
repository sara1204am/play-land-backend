"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenData = void 0;
const common_1 = require("@nestjs/common");
exports.AccessTokenData = (0, common_1.createParamDecorator)((options = {}, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    if (options.required && !user) {
        throw new common_1.UnauthorizedException();
    }
    return user;
});
//# sourceMappingURL=access-token-data.decorator.js.map