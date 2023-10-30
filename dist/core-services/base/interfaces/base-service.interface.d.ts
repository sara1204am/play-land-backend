import { AccessToken } from "src/modules/login/interfaces";
import { PaginatedResult } from "./pagination.interface";
export interface BaseServiceInterface<T> {
    findAll(filter: any): Promise<T[]>;
    findAllWithPagination(filter: any, page?: number, size?: number, accessToken?: AccessToken, internalCall?: boolean): Promise<PaginatedResult<T>>;
    findById(id: string | number): Promise<T>;
    create(data: T): Promise<T>;
    createBulk(body: T[]): Promise<T>;
    update(id: string | number, body: T): Promise<T>;
    patchOrCreate(body: T): Promise<T>;
    deleteById(id: string | number): Promise<T>;
    deleteWithWehere(filter: any): Promise<any>;
    findOne(filter: any): Promise<T>;
    upsertWithWhere<T>(filter: any, body: T): Promise<T>;
    deleteMany(filter: any): Promise<any>;
    count(filter: any): Promise<any>;
    exists(id: string | number): Promise<any>;
}
