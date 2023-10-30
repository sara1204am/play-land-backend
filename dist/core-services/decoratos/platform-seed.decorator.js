"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformSeed = void 0;
const common_1 = require("@nestjs/common");
exports.PlatformSeed = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const platformSeed = request.headers['platform-seed'];
    if (!platformSeed) {
        throw new common_1.NotAcceptableException('Platform seed is required');
    }
    return platformSeed;
});
//# sourceMappingURL=platform-seed.decorator.js.map