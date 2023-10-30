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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const lodash_1 = require("lodash");
let DatabaseService = class DatabaseService extends prisma_service_1.PrismaService {
    constructor(configService) {
        super();
        this.configService = configService;
        this.useAclValidation = this.configService.get('useAclValidation') === 'true';
    }
    async deleteWithWehere(model, filter, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].deleteMany(filter);
        }
        return new common_1.ForbiddenException('No permission');
    }
    async findAll(model, filter, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].findMany(filter || undefined);
        }
        return new common_1.ForbiddenException('No permission');
    }
    async findOne(model, filter, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].findFirst(filter);
        }
        return new common_1.ForbiddenException('No permission');
    }
    async findById(model, id, filter, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            const aunxFilter = { ...filter };
            let tmpFilter = {
                where: { id },
            };
            if (aunxFilter.where) {
                tmpFilter.where = { ...tmpFilter.where, ...aunxFilter.where };
            }
            tmpFilter = { ...tmpFilter, ...aunxFilter };
            return this[interalModel].findFirst(tmpFilter);
        }
        return new common_1.ForbiddenException('No permission');
    }
    async deleteById(model, id, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            const tmpFilter = {
                where: { id },
            };
            return this[interalModel].delete(tmpFilter);
        }
        return new common_1.ForbiddenException('No permission');
    }
    async create(model, data, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].create({ data: data });
        }
        return new common_1.ForbiddenException('No permission');
    }
    async createBulk(model, body, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].createMany({ data: body });
        }
        return new common_1.ForbiddenException('No permission');
    }
    async update(model, id, body, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].update({
                where: { id },
                data: body,
            });
        }
        return new common_1.ForbiddenException('No permission');
    }
    async patchOrCreate(model, body, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            return this[interalModel].upsert({
                where: {
                    id: (0, lodash_1.get)(body, 'id') ? (0, lodash_1.get)(body, 'id') : '',
                },
                update: body,
                create: body,
            });
        }
    }
    async upsertWithWhere(model, body, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            const tmpFilter = { ...body };
            return this[interalModel].updateMany(tmpFilter);
        }
        return new common_1.ForbiddenException('No permission');
    }
    async count(model, filter, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            const rows = await this[interalModel].count(filter);
            return {
                count: rows | 0,
            };
        }
        return new common_1.ForbiddenException('No permission');
    }
    async exists(model, id, accessToken, internalCall, remoteMethodName) {
        const interalModel = client_1.Prisma.ModelName[model];
        const validationAcl = true;
        if (validationAcl) {
            const filter = {
                where: { id },
            };
            const existRow = await this[interalModel].findUnique(filter);
            return {
                exists: existRow ? true : false,
            };
        }
    }
    async deleteMany(model, filter, accessToken, internalCall, remoteMethodName) {
        try {
            const interalModel = client_1.Prisma.ModelName[model];
            const validationAcl = true;
            if (validationAcl) {
                return this[interalModel].deleteMany(filter);
            }
            return new common_1.ForbiddenException('No permission');
        }
        catch (error) {
            return new Error(error);
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
//# sourceMappingURL=data-base.service.js.map