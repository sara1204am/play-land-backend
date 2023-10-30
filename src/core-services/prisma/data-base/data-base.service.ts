/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'src/modules/login/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { get } from 'lodash';

/**
 * Database Service, Interceptor method to execute any query to database connection using Prisma Service provider
 *
 * @export
 * @class DatabaseService
 * @extends {PrismaService}
 */
@Injectable()
export class DatabaseService extends PrismaService {
  private useAclValidation =
    this.configService.get('useAclValidation') === 'true';

  constructor(private readonly configService: ConfigService) {
    super();
  }

  /**
   * The deleteWithWehere method is used to delete many rows with a your_model_nameDeleteManyArgs
   *
   * @template T model filter type @example your_model_nameDeleteManyArgs
   * @param {Prisma.ModelName} model model name
   * @param {T} filter You must pass type of your model filter type @example your_model_nameDeleteManyArgs
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async deleteWithWehere<T>(
    model: Prisma.ModelName,
    filter: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'deleteMany',
      remoteMethodName || 'deleteWithWehere',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].deleteMany(filter);
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The findAll method is used to get many rows of a model
   *
   * @template T model filter type @example your_model_nameFindManyArgs
   * @param {Prisma.ModelName} model Model name
   * @param {T} filter You must pass type of your model filter type @example your_model_nameFindManyArgs
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @param {string} [remoteMethodName] Rest remote method name
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async findAll<T>(
    model: Prisma.ModelName,
    filter?: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'findMany',
      remoteMethodName || 'findAll',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].findMany(filter || undefined);
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The findOne method is used to get the first coinsidence according the filter passed
   *
   * @template T model filter type @example your_model_nameFindFirstArgs
   * @param {Prisma.ModelName} model Model name
   * @param {T} filter You must pass type of your model filter type @example your_model_nameFindFirstArgs
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @param {string} [remoteMethodName] Rest remote method name
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async findOne<T>(
    model: Prisma.ModelName,
    filter: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'findFirst',
      remoteMethodName || 'findOne',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].findFirst(filter);
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The findById method is used to get a row by its id
   *
   * @template T model filter type only the select key part @example your_model_nameFindManyArgs = { select: { ... } }
   * @param {Prisma.ModelName} model Model Name
   * @param {(string | number)} id identifier value
   * @param {T} [filter] Use the findManyArgs only the select type key  only the select key part @example Prisma.yourModelNameFindManyArgs = { select: { ... } }
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof TransactionService
   */
  public async findById<T>(
    model: Prisma.ModelName,
    id: string | number,
    filter?: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'findUnique',
      remoteMethodName || 'findById',
      internalCall,
    ); */
    if (validationAcl) {
      const aunxFilter: any = { ...filter };
      let tmpFilter = {
        where: { id },
      };
      if (aunxFilter.where) {
        tmpFilter.where = { ...tmpFilter.where, ...aunxFilter.where };
      }
      tmpFilter = { ...tmpFilter, ...aunxFilter };
      return this[interalModel].findFirst(tmpFilter);
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The deleteById method is used to remove one row by its id value
   *
   * @param {Prisma.ModelName} model Model Name
   * @param {(string | number)} id identifier value
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async deleteById(
    model: Prisma.ModelName,
    id: string | number,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'delete',
      remoteMethodName || 'deleteById',
      internalCall,
    ); */
    if (validationAcl) {
      const tmpFilter = {
        where: { id },
      };
      return this[interalModel].delete(tmpFilter);
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The create method is used to create a new record on database in specific model
   *
   * @template T model create input args @example XOR<your_model_nameCreateInput, your_model_nameUncheckedCreateInput>
   * @param {Prisma.ModelName} model Model Name
   * @param {T} data data to will be store
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async create<T>(
    model: Prisma.ModelName,
    data: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /*  await this.validateAclPermision(
      interalModel,
      accessToken,
      'create',
      remoteMethodName || 'create',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].create({ data: data });
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The createBulk methos is used to store multiple data in specific model
   *
   * @template T model create input args ass array  @example Array<XOR<your_model_nameCreateInput, your_model_nameUncheckedCreateInput>>
   * @param {Prisma.ModelName} model Model name
   * @param {T[]} body data to will be store
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async createBulk<T>(
    model: Prisma.ModelName,
    body: T[],
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'createMany',
      remoteMethodName || 'createBulk',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].createMany({ data: body });
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The update method is used to update some row by its id value
   *
   * @template T model create input args @example XOR<your_model_nameCreateInput, your_model_nameUncheckedCreateInput>
   * @param {Prisma.ModelName} model Model name
   * @param {(string | number)} id identifier value
   * @param {T} body data to will be update
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async update<T>(
    model: Prisma.ModelName,
    id: string | number,
    body: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'update',
      remoteMethodName || 'update',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].update({
        where: { id },
        data: body,
      });
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The patch or create method is used to create or update some data sent NOTE is like upsert method like loopback queries
   *
   * @template T model create input args @example XOR<your_model_nameCreateInput, your_model_nameUncheckedCreateInput>
   * @param {Prisma.ModelName} model Model name
   * @param {T} body data to will be store
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async patchOrCreate<T>(
    model: Prisma.ModelName,
    body: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'upsert',
      remoteMethodName || 'patchOrCreate',
      internalCall,
    ); */
    if (validationAcl) {
      return this[interalModel].upsert({
        where: {
          id: get(body, 'id') ? get(body, 'id') : '',
        },
        update: body,
        create: body,
      });
    }
  }

  /**
   * The upsertWithEhere method is used to update many rows with some filter conditions
   *
   * @template T model updateMany args @example your_model_nameUpdateManyArgs
   * @param {Prisma.ModelName} model
   * @param {T} body to sill be stored {data: {...}, where: {...}}
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async upsertWithWhere<T>(
    model: Prisma.ModelName,
    body: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true/* await this.validateAclPermision(
      interalModel,
      accessToken,
      'updateMany',
      remoteMethodName || 'upsertWithWhere',
      internalCall,
    ); */
    if (validationAcl) {
      const tmpFilter = { ...body };
      return this[interalModel].updateMany(tmpFilter);
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The count method is used to get number of rows selected by a filter
   *
   * @template T model countArgs @example your_model_nameCountArgs
   * @param {Prisma.ModelName} model Model Name
   * @param {T} filter filter data {where: {...}, ...}
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async count<T>(
    model: Prisma.ModelName,
    filter: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true/* await this.validateAclPermision(
      interalModel,
      accessToken,
      'count',
      remoteMethodName || 'count',
      internalCall,
    ); */
    if (validationAcl) {
      const rows = await this[interalModel].count(filter);
      return {
        count: rows | 0,
      };
    }
    return new ForbiddenException('No permission');
  }

  /**
   * The existe method is used to get if a row is persisted on database in specific model, this methos use findUnique method of prisma
   *
   * @param {Prisma.ModelName} model Model name
   * @param {(string | number)} id identifier value to verify existence of row
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async exists(
    model: Prisma.ModelName,
    id: string | number,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    const interalModel: string = Prisma.ModelName[model];
    const validationAcl = true /* await this.validateAclPermision(
      interalModel,
      accessToken,
      'findUnique',
      remoteMethodName || 'exists',
      internalCall,
    ); */
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

  /**
   * The deleteMany method is used to delete rows with a filter
   *
   * @template T model filter type @example your_model_nameDeleteManyArgs
   * @param {Prisma.ModelName} model model name
   * @param {T} filter You must pass type of your model filter type @example your_model_nameDeleteManyArgs
   * @param {AccessToken} [accessToken] The access token data of current request user
   * @param {boolean} [internalCall=false] Internal call flag to detect if a query comes from interal server task or from api request
   * @param {string} [remoteMethodName] Rest method name that comes from crontroller
   * @return {*}  {Promise<any>}
   * @memberof DatabaseService
   */
  public async deleteMany<T>(
    model: Prisma.ModelName,
    filter: T,
    accessToken?: AccessToken,
    internalCall?: boolean,
    remoteMethodName?: string,
  ): Promise<any> {
    try {
      const interalModel: string = Prisma.ModelName[model];
      const validationAcl = true /* await this.validateAclPermision(
        interalModel,
        accessToken,
        'deleteMany',
        remoteMethodName || 'deleteMany',
        internalCall,
      ); */
      if (validationAcl) {
        return this[interalModel].deleteMany(filter);
      }
      return new ForbiddenException('No permission');
    } catch (error) {
      return new Error(error);
    }
  }
}
