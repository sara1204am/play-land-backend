/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseServiceInterface } from './interfaces';
import { Prisma } from '@prisma/client';
import { AccessToken } from 'src/modules/login/interfaces';
import { PaginatedResult } from './interfaces/pagination.interface';

@Injectable()
export abstract class BaseService<T>
  implements BaseServiceInterface<T>
{
  public modelInstance: string;
  constructor(
    private readonly genericRepository: any,
    private readonly modelDefinition: Prisma.ModelName,
  ) {
    this.modelInstance = Prisma.ModelName[modelDefinition];
  }

  /**
   * The deleteWithWehere method is used to delete some rows with a prisma filter
   *
   * @param {*} filter filter to apply in query
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<any>}
   * @memberof BaseService
   */
  async deleteWithWehere(
    filter: any,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<any> {
    try {
      return this.genericRepository.deleteWithWehere(
        this.modelInstance,
        filter,
        accessToken,
        internalCall,
        'deleteWithWehere',
      );
    } catch (error) {
      return new Error(error);
    }
  }

  /**
   * The findAll method is used to get many rows of a model
   *
   * @param {*} [filter] Filter to apply in query
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T[]>}
   * @memberof BaseService
   */
  async findAll(
    filter?: any,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T[]> {
    return this.genericRepository.findAll(
      this.modelInstance,
      filter || undefined,
      accessToken,
      internalCall,
      'findAll',
    );
  }

  /**
   * The findOne method is used to get the first coinsidence according the filter passed
   *
   * @param {*} [filter] filter to apply in query
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async findOne(
    filter?: any,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.findOne(
      this.modelInstance,
      filter,
      accessToken,
      internalCall,
      'findOne',
    );
  }

  /**
   * The findById method is used to get a row by its id
   *
   * @param {(string | number)} id identifier value
   * @param {*} [filter={}] filter to apply in query only select key
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async findById(
    id: string | number,
    filter: any = {},
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.findById(
      this.modelInstance,
      id,
      filter,
      accessToken,
      internalCall,
      'findById',
    );
  }

  /**
   * The deleteById method is used to remove one row by its id value
   *
   * @param {(string | number)} id indetifier
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async deleteById(
    id: string | number,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.deleteById(
      this.modelInstance,
      id,
      accessToken,
      internalCall,
      'deleteById',
    );
  }

  /**
   * The create method is used to create a new record on database in specific model
   *
   * @param {*} body data to store
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async create(
    body: any,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.create(
      this.modelInstance,
      body,
      accessToken,
      internalCall,
      'create',
    );
  }

  /**
   * The createBulk methos is used to store multiple data in specific model
   *
   * @param {T[]} body data to store
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async createBulk(
    body: any,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.createBulk(
      this.modelInstance,
      body,
      accessToken,
      internalCall,
      'createBulk',
    );
  }

  /**
   * The update method is used to update some row by its id value
   *
   * @param {(string | number)} id indetifier
   * @param {T} body data to store
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async update(
    id: string | number,
    body: T,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.update(
      this.modelInstance,
      id,
      body,
      accessToken,
      internalCall,
      'update',
    );
  }

  /**
   * The patch or create method is used to create or update some data sent NOTE this method is like upsert loopback method
   *
   * @param {T} body data to store
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async patchOrCreate(
    body: T,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    return this.genericRepository.patchOrCreate(
      this.modelInstance,
      body,
      accessToken,
      internalCall,
      'patchOrCreate',
    );
  }

  /**
   * The upsertWithEhere method is used to update many rows with some filter conditions NOTE this method is like updateMany records
   *
   * @template T
   * @param {*} [filter=null]
   * @param {T} body
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<T>}
   * @memberof BaseService
   */
  async upsertWithWhere<T>(
    filter: any = null,
    body: T,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<T> {
    const data = { ...filter, data: body };
    return this.genericRepository.upsertWithWhere(
      this.modelInstance,
      data,
      accessToken,
      internalCall,
      'upsertWithWhere',
    );
  }

  /**
   * The deleteMany method is used to delete some rows with a filter params
   *
   * @param {*} [filter=null] filter to apply in query
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<any>}
   * @memberof BaseService
   */
  async deleteMany(
    filter: any = null,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<any> {
    return this.genericRepository.deleteMany(
      this.modelInstance,
      filter,
      accessToken,
      internalCall,
      'deleteMany',
    );
  }

  /**
   * The count method is used to get number of rows selected by a filter
   *
   * @param {*} filter filter to apply in query
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<any>}
   * @memberof BaseService
   */
  async count(
    filter: any,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<any> {
    return await this.genericRepository.count(
      this.modelInstance,
      filter,
      accessToken,
      internalCall,
      'count',
    );
  }

  /**
   * The existe method is used to get if a row is persisted on database in specific model, this methos use findUnique method of prisma
   *
   * @param {(string | number)} id identifier value
   * @param {AccessToken} accessToken User Data of current user
   * @param {boolean} [internalCall=false] Flag to handle if request comes from a cron or internal service task
   * @return {*}  {Promise<any>}
   * @memberof BaseService
   */
  async exists(
    id: string | number,
    accessToken?: AccessToken,
    internalCall = false,
  ): Promise<any> {
    return await this.genericRepository.exists(
      this.modelInstance,
      id,
      accessToken,
      internalCall,
      'exists',
    );
  }


  async findAllWithPagination(
    filter: any = null,
    page: number,
    size: number,
    accessToken?: AccessToken,
    internalCall = false,
    ): Promise<PaginatedResult<T>> {
      page = Number(page) || 1;
      const perPage = Number(size) || 10;
      const skip = page > 0 ? perPage * (page - 1) : 0;
      const paginatedFilter = {
        ...filter,
        skip,
        take:perPage
      }

      const [total, data] = await Promise.all([
        this.genericRepository.findAll(
          this.modelInstance,
          filter || undefined,
          accessToken,
          internalCall,
          'count',
        ),
        this.genericRepository.findAll(
          this.modelInstance,
          paginatedFilter || undefined,
          accessToken,
          internalCall,
          'findMany',
        )
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
}
