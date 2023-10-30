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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const lodash_1 = require("lodash");
const password_functions_1 = require("../../core-services/functions/password-functions");
const data_base_service_1 = require("../../core-services/prisma/data-base/data-base.service");
const dayjs = require("dayjs");
let AuthService = class AuthService {
    constructor(jwtService, configService, prisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
    }
    async validateUser(loginDto) {
        const filter = {
            where: {},
        };
        if (loginDto.identity_document) {
            filter.where = { OR: [{ identity_document: loginDto.identity_document }, { email: loginDto.identity_document }, { username: loginDto.identity_document }], status: true };
        }
        else {
            filter.where = { username: loginDto.username, status: true };
        }
        const user = await this.prisma.user.findFirst(filter);
        if (user &&
            password_functions_1.default.checkPassword(user.password, loginDto.password)) {
            delete user.password;
            return (0, lodash_1.pick)(user, [
                'id',
                'first_name',
                'last_name',
                'email'
            ]);
        }
        return false;
    }
    async login(user, customTtl) {
        const ttlToken = customTtl
            ? customTtl + 's'
            : this.configService.get('jwt.expiresIn');
        const accessToken = await this.generateToken(user, ttlToken);
        const accessTokenData = {
            expiresAt: dayjs().add(parseInt(ttlToken), 's').toDate(),
            id: Date.now().toString(),
            userId: user.id,
            token: accessToken,
            createdAt: new Date(),
        };
        const dataLastAccess = await this.prisma.access_token.findFirst({ where: { userId: user.id } });
        await this.prisma.access_token.create({
            data: accessTokenData,
        });
        return {
            id: accessToken,
            userId: user.id,
            ttl: ttlToken,
            createdAt: dayjs().add(1000, 's').toDate(),
            user,
            access: true,
        };
    }
    async generateToken(user, ttl) {
        const payload = { email: user.email, userId: user.id };
        return this.jwtService.signAsync(payload, {
            expiresIn: ttl,
        });
    }
    async verifyJwt(jwt) {
        if (!jwt) {
            throw new common_1.BadRequestException('The token is required');
        }
        return new Promise((resolve, reject) => {
            this.jwtService.verifyAsync(jwt).then((decoded) => {
                resolve(decoded);
            }, () => {
                reject('Invalid Token');
                throw new common_1.UnauthorizedException('Invalid Token');
            });
        });
    }
    async getUserTokenConfig(userId) {
        return this.prisma.user_token_config.findFirst({
            where: { userId },
        });
    }
    getRandCoord() {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const out1 = [];
        while (out1.length < 3) {
            const t = letters[Math.floor(Math.random() * letters.length)] + (0, lodash_1.random)(1, 10);
            if (!out1.includes(t))
                out1.push(t);
        }
        return out1;
    }
    decodeToken(token) {
        if (!token) {
            return null;
        }
        return this.jwtService.decode(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        data_base_service_1.DatabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map