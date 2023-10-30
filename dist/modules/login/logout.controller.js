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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const login_service_1 = require("./login.service");
const public_decorator_1 = require("../../core-services/decoratos/public.decorator");
let LogoutController = class LogoutController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async logoutToken(logoutDto) {
        return this.loginService.logout(logoutDto);
    }
};
exports.LogoutController = LogoutController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBody)({
        type: dto_1.LogoutDto,
        description: 'Json Object',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'The logoutToken method is used to log out current user',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: 'boolean',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
    (0, swagger_1.ApiNotAcceptableResponse)({ description: 'No Acceptable request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], LogoutController.prototype, "logoutToken", null);
exports.LogoutController = LogoutController = __decorate([
    (0, swagger_1.ApiTags)('Logout'),
    (0, common_1.Controller)('logout'),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LogoutController);
//# sourceMappingURL=logout.controller.js.map