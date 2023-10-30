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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let BaseService = class BaseService {
    constructor(genericRepository, modelDefinition) {
        this.genericRepository = genericRepository;
        this.modelDefinition = modelDefinition;
        this.modelInstance = client_1.Prisma.ModelName[modelDefinition];
    }
    async deleteWithWehere(filter, accessToken, internalCall = false) {
        try {
            return this.genericRepository.deleteWithWehere(this.modelInstance, filter, accessToken, internalCall, 'deleteWithWehere');
        }
        catch (error) {
            return new Error(error);
        }
    }
    async findAll(filter, accessToken, internalCall = false) {
        return this.genericRepository.findAll(this.modelInstance, filter || undefined, accessToken, internalCall, 'findAll');
    }
    async findOne(filter, accessToken, internalCall = false) {
        return this.genericRepository.findOne(this.modelInstance, filter, accessToken, internalCall, 'findOne');
    }
    async findById(id, filter = {}, accessToken, internalCall = false) {
        return this.genericRepository.findById(this.modelInstance, id, filter, accessToken, internalCall, 'findById');
    }
    async deleteById(id, accessToken, internalCall = false) {
        return this.genericRepository.deleteById(this.modelInstance, id, accessToken, internalCall, 'deleteById');
    }
    async create(body, accessToken, internalCall = false) {
        return this.genericRepository.create(this.modelInstance, body, accessToken, internalCall, 'create');
    }
    async createBulk(body, accessToken, internalCall = false) {
        return this.genericRepository.createBulk(this.modelInstance, body, accessToken, internalCall, 'createBulk');
    }
    async update(id, body, accessToken, internalCall = false) {
        return this.genericRepository.update(this.modelInstance, id, body, accessToken, internalCall, 'update');
    }
    async patchOrCreate(body, accessToken, internalCall = false) {
        return this.genericRepository.patchOrCreate(this.modelInstance, body, accessToken, internalCall, 'patchOrCreate');
    }
    async upsertWithWhere(filter = null, body, accessToken, internalCall = false) {
        const data = { ...filter, data: body };
        return this.genericRepository.upsertWithWhere(this.modelInstance, data, accessToken, internalCall, 'upsertWithWhere');
    }
    async deleteMany(filter = null, accessToken, internalCall = false) {
        return this.genericRepository.deleteMany(this.modelInstance, filter, accessToken, internalCall, 'deleteMany');
    }
    async count(filter, accessToken, internalCall = false) {
        return await this.genericRepository.count(this.modelInstance, filter, accessToken, internalCall, 'count');
    }
    async exists(id, accessToken, internalCall = false) {
        return await this.genericRepository.exists(this.modelInstance, id, accessToken, internalCall, 'exists');
    }
    async findAllWithPagination(filter = null, page, size, accessToken, internalCall = false) {
        page = Number(page) || 1;
        const perPage = Number(size) || 10;
        const skip = page > 0 ? perPage * (page - 1) : 0;
        const paginatedFilter = {
            ...filter,
            skip,
            take: perPage
        };
        const [total, data] = await Promise.all([
            this.genericRepository.findAll(this.modelInstance, filter || undefined, accessToken, internalCall, 'count'),
            this.genericRepository.findAll(this.modelInstance, paginatedFilter || undefined, accessToken, internalCall, 'findMany')
        ]);
        const lastPage = Math.ceil(total.length / perPage);
        return {
            data,
            recordsTotal: total.length,
            recordsFiltered: total.length,
            currentPage: page,
            pageLength: lastPage
        };
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, String])
], BaseService);
//# sourceMappingURL=base.service.js.map