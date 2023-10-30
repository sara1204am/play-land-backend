import { BaseServiceInterface } from './interfaces';
import { Prisma } from '@prisma/client';
import { AccessToken } from 'src/modules/login/interfaces';
import { PaginatedResult } from './interfaces/pagination.interface';
export declare abstract class BaseService<T> implements BaseServiceInterface<T> {
    private readonly genericRepository;
    private readonly modelDefinition;
    modelInstance: string;
    constructor(genericRepository: any, modelDefinition: Prisma.ModelName);
    deleteWithWehere(filter: any, accessToken?: AccessToken, internalCall?: boolean): Promise<any>;
    findAll(filter?: any, accessToken?: AccessToken, internalCall?: boolean): Promise<T[]>;
    findOne(filter?: any, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    findById(id: string | number, filter?: any, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    deleteById(id: string | number, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    create(body: any, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    createBulk(body: any, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    update(id: string | number, body: T, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    patchOrCreate(body: T, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    upsertWithWhere<T>(filter: any, body: T, accessToken?: AccessToken, internalCall?: boolean): Promise<T>;
    deleteMany(filter?: any, accessToken?: AccessToken, internalCall?: boolean): Promise<any>;
    count(filter: any, accessToken?: AccessToken, internalCall?: boolean): Promise<any>;
    exists(id: string | number, accessToken?: AccessToken, internalCall?: boolean): Promise<any>;
    findAllWithPagination(filter: any, page: number, size: number, accessToken?: AccessToken, internalCall?: boolean): Promise<PaginatedResult<T>>;
}
