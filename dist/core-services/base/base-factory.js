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
exports.abstractControllerFactory = exports.PostNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const base_abstract_controller_1 = require("./base-abstract.controller");
const common_2 = require("@nestjs/common");
const interfaces_1 = require("../../modules/login/interfaces");
const access_token_data_decorator_1 = require("../decoratos/access-token-data.decorator");
const lodash_1 = require("lodash");
const string_functions_1 = require("../functions/string-functions");
const validation_functions_1 = require("../functions/validation-functions");
const dayjs = require("dayjs");
class PostNotFoundException extends common_2.NotFoundException {
    constructor(postId) {
        super(`Post with id ${postId} not found`);
    }
}
exports.PostNotFoundException = PostNotFoundException;
function abstractControllerFactory(options) {
    const { modelEntity, modelName } = options;
    class AbstractController extends base_abstract_controller_1.BaseAbstractController {
        constructor(service) {
            super();
            this.logger = new common_1.Logger(AbstractController.name);
            this._service = service;
        }
        async findAll(filter, response, accessToken) {
            return await this._service.findAll(string_functions_1.default.parseJsonSafe(filter), accessToken);
        }
        async findPaginationAll(page, size, filter, response, accessToken) {
            return await this._service.findAllWithPagination(string_functions_1.default.parseJsonSafe(filter), page, size, accessToken);
        }
        async findOne(filter, response, accessToken) {
            return await this._service.findOne(string_functions_1.default.parseJsonSafe(filter), accessToken);
        }
        async deleteById(id, response, accessToken) {
            return await this._service.deleteById(id, accessToken);
        }
        async create(body, response, accessToken) {
            return await this._service.create(this.cleanData(body), accessToken);
        }
        async createBulk(body, response, accessToken) {
            const cleanData = body.map((item) => this.cleanData(item));
            return await this._service.createBulk(cleanData, accessToken);
        }
        async update(id, body, response, accessToken) {
            let idParse = id;
            idParse = !isNaN(idParse) ? parseFloat(idParse) : id;
            return await this._service.update(idParse, this.cleanData(body), accessToken);
        }
        async updateWithPatch(body, response, accessToken) {
            const tmp = body;
            if (!tmp.id) {
                throw new common_1.BadRequestException('id is required');
            }
            return await this._service.update(tmp.id, this.cleanData(body), accessToken);
        }
        async patchOrCreate(body, response, accessToken) {
            return await this._service.patchOrCreate(this.cleanData(body), accessToken);
        }
        async upsertWithWhere(filter, body, response, accessToken) {
            return await this._service.upsertWithWhere(string_functions_1.default.parseJsonSafe(filter), this.cleanData(body), accessToken);
        }
        async count(filter, response, accessToken) {
            return await this._service.count(string_functions_1.default.parseJsonSafe(filter), accessToken);
        }
        async exists(id, response, accessToken) {
            return await this._service.exists(id, accessToken);
        }
        async findById(id, filter, response, accessToken) {
            let idParse = id;
            idParse = !isNaN(idParse) ? parseFloat(idParse) : id;
            return await this._service.findById(idParse, string_functions_1.default.parseJsonSafe(filter) || {}, accessToken);
        }
        disableMethodByName(nameMethod) {
            delete AbstractController.prototype[nameMethod];
        }
        disableMethodsByName(nameMethod) {
            nameMethod.forEach((name) => {
                delete AbstractController.prototype[name];
            });
        }
        cleanData(data) {
            const modelName = this._service.modelInstance;
            const appModels = client_1.Prisma.dmmf.datamodel.models;
            const targetModel = appModels.find((v) => v.name == modelName);
            if (!targetModel?.fields?.length) {
                return data;
            }
            const printError = (fieldName) => {
                this.logger.error(`Invalid data for the field ${modelName}, ${fieldName}: `, data[fieldName]);
            };
            targetModel.fields.forEach((v) => {
                if (v.type === 'Json' &&
                    !((0, lodash_1.isArray)(data[v.name]) || validation_functions_1.default.isLiteralObject(data[v.name]))) {
                    printError(v.name);
                    data[v.name] = undefined;
                }
                else if (v.type === 'DateTime' && !dayjs(data[v.name]).isValid()) {
                    printError(v.name);
                    data[v.name] = null;
                }
                else if (v.type === 'DateTime' && (0, lodash_1.isString)(data[v.name])) {
                    data[v.name] = dayjs(data[v.name]).toDate();
                }
                else if (v.type === 'Int' && data[v.name] > 2147483647) {
                    printError(v.name);
                    data[v.name] = null;
                }
            });
            return data;
        }
    }
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({
            summary: `Get all  ${modelName} Data`,
        }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            required: false,
            type: String,
            description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
            example: '({"where": {"something": "value"}})',
        }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: true }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Query)('filter')),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)('pagination'),
        (0, swagger_1.ApiOperation)({
            summary: `Get all  ${modelName} pagination data`,
        }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            required: false,
            type: String,
            description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
            example: '({"where": {"something": "value"}})',
        }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: true }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Query)('page')),
        __param(1, (0, common_1.Query)('size')),
        __param(2, (0, common_1.Query)('filter')),
        __param(3, (0, common_1.Res)({ passthrough: true })),
        __param(4, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, String, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "findPaginationAll", null);
    __decorate([
        (0, common_1.Get)('find-one'),
        (0, swagger_1.ApiOperation)({
            summary: `Get one  ${modelName} Data`,
        }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            required: true,
            type: String,
            description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
            example: '({"where": {"something": "value"}})',
        }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: false }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Query)('filter')),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "findOne", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, swagger_1.ApiOperation)({
            summary: `Delete a ${modelName} By Id`,
        }),
        (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Set id target' }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: false }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "deleteById", null);
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiOperation)({
            summary: `Create new ${modelName} record`,
        }),
        (0, swagger_1.ApiBody)({
            type: modelEntity,
            description: 'Json Object',
            required: true,
            isArray: false,
        }),
        (0, swagger_1.ApiCreatedResponse)({
            type: modelEntity,
            description: 'The record has been successfully created ',
        }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "create", null);
    __decorate([
        (0, common_1.Post)('create-bulk'),
        (0, swagger_1.ApiOperation)({
            summary: `Create many ${modelName} records`,
        }),
        (0, swagger_1.ApiBody)({
            type: modelEntity,
            description: 'Json Object',
            required: true,
            isArray: true,
        }),
        (0, swagger_1.ApiCreatedResponse)({
            type: modelEntity,
            description: 'The records has been successfully created ',
            isArray: true,
        }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "createBulk", null);
    __decorate([
        (0, common_1.Put)(':id'),
        (0, swagger_1.ApiOperation)({
            summary: `Update a ${modelName} record by id`,
        }),
        (0, swagger_1.ApiBody)({
            type: modelEntity,
            description: 'Json Object',
            required: true,
            isArray: false,
        }),
        (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Set id target' }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: true }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __param(2, (0, common_1.Res)({ passthrough: true })),
        __param(3, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "update", null);
    __decorate([
        (0, common_1.Patch)(),
        (0, swagger_1.ApiOperation)({
            summary: `Update a ${modelName} based on their data`,
        }),
        (0, swagger_1.ApiBody)({
            type: modelEntity,
            description: 'Json Object',
            required: true,
            isArray: false,
        }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: true }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "updateWithPatch", null);
    __decorate([
        (0, common_1.Patch)('/patch-or-create'),
        (0, swagger_1.ApiOperation)({
            summary: `Update or create a ${modelName} record`,
        }),
        (0, swagger_1.ApiBody)({
            type: modelEntity,
            description: 'Json Object',
            required: true,
            isArray: false,
        }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: true }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "patchOrCreate", null);
    __decorate([
        (0, common_1.Patch)('/upsert-with-where'),
        (0, swagger_1.ApiOperation)({
            summary: `Update  ${modelName} records with a filter condition`,
        }),
        (0, swagger_1.ApiBody)({
            type: modelEntity,
            description: 'Json Object',
            required: true,
            isArray: false,
        }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            required: true,
            type: String,
            description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
            example: '({"where": {"something": "value"}})',
        }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: true }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Query)('filter')),
        __param(1, (0, common_1.Body)()),
        __param(2, (0, common_1.Res)({ passthrough: true })),
        __param(3, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "upsertWithWhere", null);
    __decorate([
        (0, common_1.Get)('count'),
        (0, swagger_1.ApiOperation)({
            summary: `Count instances of the model ${modelName} matched by where from the data source`,
        }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            required: true,
            type: String,
            description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
            example: '({"where": {"something": "value"}})',
        }),
        (0, swagger_1.ApiOkResponse)({
            schema: {
                type: 'object',
                properties: {
                    count: {
                        type: 'number',
                    },
                },
            },
            description: 'Ok',
        }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Query)('filter')),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "count", null);
    __decorate([
        (0, common_1.Get)(':id/exists'),
        (0, swagger_1.ApiOperation)({
            summary: `Check whether a model  ${modelName} instance exists in the data source`,
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            required: true,
            description: 'Set id target',
            allowEmptyValue: false,
        }),
        (0, swagger_1.ApiOkResponse)({
            schema: {
                type: 'object',
                properties: {
                    exists: {
                        type: 'boolean',
                    },
                },
            },
            description: 'Ok',
        }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "exists", null);
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_1.ApiOperation)({
            summary: `Find a ${modelName} By Id`,
        }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            required: false,
            description: `filter defining fields must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">filter Filter</a> for more details`,
        }),
        (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Set id target' }),
        (0, swagger_1.ApiOkResponse)({ type: modelEntity, description: 'Ok', isArray: false }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'Entity does not exist ' }),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbiden.' }),
        (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal Server error' }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Query)('filter')),
        __param(2, (0, common_1.Res)({ passthrough: true })),
        __param(3, (0, access_token_data_decorator_1.AccessTokenData)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object, interfaces_1.AccessToken]),
        __metadata("design:returntype", Promise)
    ], AbstractController.prototype, "findById", null);
    return AbstractController;
}
exports.abstractControllerFactory = abstractControllerFactory;
//# sourceMappingURL=base-factory.js.map