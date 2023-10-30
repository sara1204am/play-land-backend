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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const data_base_service_1 = require("../../core-services/prisma/data-base/data-base.service");
let LoginService = class LoginService {
    constructor(configService, databaseService) {
        this.configService = configService;
        this.databaseService = databaseService;
    }
    async saveLoginData(userId, token, hostInfo, platform) {
        const data = {
            userId,
            token,
            hostInfo,
            loggedOutAt: null,
            platform,
        };
        return this.databaseService.user_login_log.create({ data });
    }
    async logout(logoutDto) {
        const f1 = {
            where: { token: logoutDto.token },
            data: { loggedOutAt: new Date() },
        };
        const f2 = {
            where: { token: logoutDto.token },
        };
        try {
            await this.databaseService.access_token.delete(f2);
            const updatedRecords = await this.databaseService.user_login_log.updateMany(f1);
            if (!updatedRecords?.count) {
                throw new common_1.NotFoundException('Token not found');
            }
            return updatedRecords;
        }
        catch (error) {
            return {};
        }
    }
    getPlatformName(platformSeed) {
        const platformsConfiguration = this.configService.get('platformsList', []);
        const platformConfig = platformsConfiguration.find((x) => x.platformSeed === platformSeed);
        return platformConfig.name;
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        data_base_service_1.DatabaseService])
], LoginService);
//# sourceMappingURL=login.service.js.map