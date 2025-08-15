"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const multer_1 = require("multer");
const uploads_controller_1 = require("./uploads.controller");
const uploads_service_1 = require("./uploads.service");
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useFactory: async (configService) => ({
                    storage: (0, multer_1.diskStorage)({
                        destination: (req, file, cb) => {
                            cb(null, `./storage/${configService.get('defaultUploadFolder', 'uploads')}/${req.params.container}/`);
                        },
                        filename: (req, file, cb) => {
                            cb(null, file.originalname);
                        },
                    }),
                    fileFilter: (req, file, cb) => {
                        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
                        cb(null, true);
                    },
                    limits: {
                        fileSize: configService.get('maxFileSizeUpload', 2097152),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [uploads_controller_1.UploadsController],
        providers: [uploads_service_1.UploadsService, jwt_1.JwtService],
    })
], UploadsModule);
//# sourceMappingURL=uploads.module.js.map