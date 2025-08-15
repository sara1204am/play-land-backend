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
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
let UploadsController = class UploadsController {
    constructor(configService) {
        this.configService = configService;
        this.uploadFolder = this.configService.get('defaultUploadFolder', 'uploads');
    }
    uploadFile(file) {
        return {
            fileName: file.filename,
            originalName: file.originalname,
        };
    }
    uploadFiles(files) {
        return files.map((v) => ({
            fileName: v.filename,
            originalName: v.originalname,
        }));
    }
    downloadFile(container, file, res) {
        const fileName = file;
        const filePath = this.buildPath(true, 'storage', this.uploadFolder, container, fileName);
        if ((0, fs_extra_1.existsSync)(filePath)) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.attachment(fileName);
            res.download(filePath);
        }
        else {
            throw new common_1.NotFoundException('fileNotFound');
        }
    }
    deleteFile(container, file, res) {
        const filePath = this.buildPath(true, 'storage', this.uploadFolder, container, file);
        if ((0, fs_extra_1.existsSync)(filePath)) {
            (0, fs_extra_1.unlinkSync)(filePath);
            res.status(common_1.HttpStatus.OK);
            return { success: true };
        }
        res.status(common_1.HttpStatus.NOT_FOUND);
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: 'fileNotFound',
        };
    }
    buildPath(includeCwd = false, ...paths) {
        const validPaths = paths.filter(Boolean);
        return (0, path_1.normalize)((0, path_1.join)(includeCwd ? process.cwd() : '', ...validPaths));
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)(':container/upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({
        name: 'container',
        required: true,
        description: 'Sets the folder name to store the file (eg: library, profiles/user-1, etc.).',
        example: 'CUSTOM_FOLDER_NAME/...',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns the file name and the original name.',
        status: common_1.HttpStatus.OK,
        schema: {
            type: 'object',
            properties: {
                fileName: { type: 'string' },
                originalName: { type: 'string' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fieldSize: 50,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UploadsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('multiple/:container/upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({
        name: 'container',
        required: true,
        description: 'Sets the folder name to store the file (eg: library, profiles/user-1, etc.).',
        example: 'CUSTOM_FOLDER_NAME/...',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns the file names and the original names.',
        status: common_1.HttpStatus.OK,
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    fileName: { type: 'string' },
                    originalName: { type: 'string' },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Array)
], UploadsController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Get)(':container/download/:file'),
    (0, swagger_1.ApiParam)({
        name: 'container',
        required: true,
        description: 'Sets the folder name to download the file (eg: library, profiles/user-1, etc.).',
        example: 'CUSTOM_FOLDER_NAME/...',
    }),
    (0, swagger_1.ApiParam)({
        name: 'file',
        required: true,
        description: 'Set name of the file with its extension',
        example: 'fooFileName.txt',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Download the file.',
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Param)('container')),
    __param(1, (0, common_1.Param)('file')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Delete)(':container/delete/:file'),
    (0, swagger_1.ApiParam)({
        name: 'container',
        required: true,
        description: 'Sets the folder name to download the file (eg: library, profiles/user-1, etc.).',
        example: 'CUSTOM_FOLDER_NAME/...',
    }),
    (0, swagger_1.ApiParam)({
        name: 'file',
        required: true,
        description: 'Set name of the file with its extension',
        example: 'fooFileName.txt',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete the file.',
        status: common_1.HttpStatus.OK,
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('container')),
    __param(1, (0, common_1.Param)('file')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Object)
], UploadsController.prototype, "deleteFile", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    (0, swagger_1.ApiTags)('Uploads'),
    (0, swagger_1.ApiSecurity)('basic'),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map