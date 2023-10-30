"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const login_controller_1 = require("./login.controller");
const login_service_1 = require("./login.service");
const logout_controller_1 = require("./logout.controller");
const auth_module_1 = require("../../services/auth/auth.module");
const config_1 = require("@nestjs/config");
const data_base_service_1 = require("../../core-services/prisma/data-base/data-base.service");
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, axios_1.HttpModule],
        controllers: [login_controller_1.LoginController, logout_controller_1.LogoutController],
        providers: [login_service_1.LoginService, data_base_service_1.DatabaseService, config_1.ConfigService],
    })
], LoginModule);
//# sourceMappingURL=login.module.js.map