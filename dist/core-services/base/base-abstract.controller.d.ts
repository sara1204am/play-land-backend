import { BaseAbstractControllerInterface } from './interfaces';
import { Response as ResponseExpress } from 'express';
import { AccessToken } from 'src/modules/login/interfaces';
export declare abstract class BaseAbstractController<T> implements BaseAbstractControllerInterface<T> {
    abstract findAll(filter: string, response: ResponseExpress, userData?: AccessToken): Promise<T[]>;
    abstract findOne(filter: string, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract findById(id: string | number, select: string, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract create(body: T, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract createBulk(body: T[], response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract update(id: string | number, body: T, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract updateWithPatch(body: T, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract patchOrCreate(body: T, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract upsertWithWhere(filter: string, body: T, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract deleteById(id: string | number, response: ResponseExpress, userData?: AccessToken): Promise<T>;
    abstract disableMethodByName(nameMethod: string): void;
    abstract disableMethodsByName(nameMethod: string[]): void;
    abstract count(filter: string, response: ResponseExpress, userData?: AccessToken): Promise<any>;
    abstract exists(id: string | number, response: ResponseExpress, userData?: AccessToken): Promise<any>;
}
