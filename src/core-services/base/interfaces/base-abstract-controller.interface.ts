/* eslint-disable prettier/prettier */
import { Response as ResponseExpress } from 'express';
import { AccessToken } from 'src/modules/login/interfaces';
export interface BaseAbstractControllerInterface<T> {
  findAll(
    filter: string,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T[]>;
  findById(
    id: string | number,
    select: string,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  create(
    body: T,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  createBulk(
    body: T[],
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  update(
    id: string | number,
    body: T,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  updateWithPatch(
    body: T,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  patchOrCreate(
    body: T,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  upsertWithWhere(
    filter: string,
    body: T,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  deleteById(
    id: string | number,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  findOne(
    filter: string,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<T>;
  count(
    filter: string,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<any>;
  exists(
    id: string | number,
    response: ResponseExpress,
    userData?: AccessToken,
  ): Promise<any>;
  disableMethodByName(nameMethod: string): void;
  disableMethodsByName(nameMethod: string[]): void;
}
