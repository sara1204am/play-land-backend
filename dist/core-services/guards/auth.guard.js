"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const dayjs = require("dayjs");
const lodash_1 = require("lodash");
const auth_service_1 = require("../../services/auth/auth.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    getTokenFromRequest(request) {
        const token = (0, lodash_1.get)(request, 'headers.authorization', null);
        if (token) {
            return token;
        }
        else if (request.query && request.query.access_token) {
            return request.query.access_token;
        }
        return null;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.get('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        const requestToken = this.getTokenFromRequest(request);
        if (requestToken) {
            try {
                this.authService.jwtService.verifyAsync(requestToken).catch((e) => {
                    return false;
                });
            }
            catch (error) {
                return false;
            }
            const f1 = {
                where: {
                    token: requestToken,
                },
            };
            const tokenData = await this.authService.prisma.access_token.findFirst(f1);
            if (!tokenData || dayjs(tokenData.expiresAt).isBefore(dayjs())) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            if (tokenData && tokenData.userId) {
                request.user = { ...tokenData, ...{ id: requestToken } };
            }
            return true;
        }
        else {
            throw new common_1.UnauthorizedException('No existe token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map