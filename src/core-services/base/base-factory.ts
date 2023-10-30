/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BaseService } from './base.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseAbstractController } from './base-abstract.controller';
import { BaseFactoryInterface } from './interfaces/base-factory.interface';
import { Response as ResponseExp } from 'express';

import { NotFoundException } from '@nestjs/common';
import { AccessToken } from 'src/modules/login/interfaces';
import { AccessTokenData } from '../decoratos/access-token-data.decorator';
import { isArray, isString } from 'lodash';

import StringFunctions from '../functions/string-functions';
import ValidationFunctions from '../functions/validation-functions';

import * as dayjs from 'dayjs';
import { Public } from '../decoratos/public.decorator';

export class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`);
  }
}
export function abstractControllerFactory<T>(
  options: BaseFactoryInterface<T>,
): any {
  const { modelEntity, modelName } = options;
  abstract class AbstractController extends BaseAbstractController<T> {
    private logger: Logger = new Logger(AbstractController.name);
    protected readonly _service: BaseService<T>;
    protected constructor(service: BaseService<T>) {
      super();
      this._service = service;
    }

    @Get()
    @ApiOperation({
      summary: `Get all  ${modelName} Data`,
    })
    @ApiQuery({
      name: 'filter',
      required: false,
      type: String,
      description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
      example: '({"where": {"something": "value"}})',
    })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: true })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async findAll(
      @Query('filter') filter: string,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T[]> {
      return await this._service.findAll(
        StringFunctions.parseJsonSafe(filter),
        accessToken,
      );
    }


    @Get('pagination')
    @ApiOperation({
      summary: `Get all  ${modelName} pagination data`,
    })
    @ApiQuery({
      name: 'filter',
      required: false,
      type: String,
      description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
      example: '({"where": {"something": "value"}})',
    })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: true })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async findPaginationAll(
      @Query('page') page: number,
      @Query('size') size: number,
      @Query('filter') filter: string,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<any> {
      return await this._service.findAllWithPagination(
        StringFunctions.parseJsonSafe(filter),
        page,
        size,
        accessToken,
      );
    }

    @Get('find-one')
    @ApiOperation({
      summary: `Get one  ${modelName} Data`,
    })
    @ApiQuery({
      name: 'filter',
      required: true,
      type: String,
      description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
      example: '({"where": {"something": "value"}})',
    })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: false })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async findOne(
      @Query('filter') filter: string,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      return await this._service.findOne(
        StringFunctions.parseJsonSafe(filter),
        accessToken,
      );
    }

    @Delete(':id')
    @ApiOperation({
      summary: `Delete a ${modelName} By Id`,
    })
    @ApiParam({ name: 'id', required: true, description: 'Set id target' })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: false })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async deleteById(
      @Param('id') id: string | number,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      return await this._service.deleteById(id, accessToken);
    }

    @Post()
    @ApiOperation({
      summary: `Create new ${modelName} record`,
    })
    @ApiBody({
      type: modelEntity,
      description: 'Json Object',
      required: true,
      isArray: false,
    })
    @ApiCreatedResponse({
      type: modelEntity,
      description: 'The record has been successfully created ',
    })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async create(
      @Body() body: T,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      return await this._service.create(this.cleanData(body), accessToken);
    }

    @Post('create-bulk')
    @ApiOperation({
      summary: `Create many ${modelName} records`,
    })
    @ApiBody({
      type: modelEntity,
      description: 'Json Object',
      required: true,
      isArray: true,
    })
    @ApiCreatedResponse({
      type: modelEntity,
      description: 'The records has been successfully created ',
      isArray: true,
    })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async createBulk(
      @Body() body: T[],
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      const cleanData = body.map((item) => this.cleanData(item));

      return await this._service.createBulk(cleanData, accessToken);
    }

    @Put(':id')
    @ApiOperation({
      summary: `Update a ${modelName} record by id`,
    })
    @ApiBody({
      type: modelEntity,
      description: 'Json Object',
      required: true,
      isArray: false,
    })
    @ApiParam({ name: 'id', required: true, description: 'Set id target' })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: true })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async update(
      @Param('id') id: string | number,
      @Body() body: T,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      let idParse: any = id;
      idParse = !isNaN(idParse) ? parseFloat(idParse): id;
      return await this._service.update(idParse, this.cleanData(body), accessToken);
    }

    @Patch()
    @ApiOperation({
      summary: `Update a ${modelName} based on their data`,
    })
    @ApiBody({
      type: modelEntity,
      description: 'Json Object',
      required: true,
      isArray: false,
    })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: true })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async updateWithPatch(
      @Body() body: T,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      const tmp: any = body as any;
      if (!tmp.id) {
        throw new BadRequestException('id is required');
      }
      return await this._service.update(
        tmp.id,
        this.cleanData(body),
        accessToken,
      );
    }

    @Patch('/patch-or-create')
    @ApiOperation({
      summary: `Update or create a ${modelName} record`,
    })
    @ApiBody({
      type: modelEntity,
      description: 'Json Object',
      required: true,
      isArray: false,
    })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: true })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async patchOrCreate(
      @Body() body: T,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      return await this._service.patchOrCreate(
        this.cleanData(body),
        accessToken,
      );
    }

    @Patch('/upsert-with-where')
    @ApiOperation({
      summary: `Update  ${modelName} records with a filter condition`,
    })
    @ApiBody({
      type: modelEntity,
      description: 'Json Object',
      required: true,
      isArray: false,
    })
    @ApiQuery({
      name: 'filter',
      required: true,
      type: String,
      description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
      example: '({"where": {"something": "value"}})',
    })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: true })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async upsertWithWhere(
      @Query('filter') filter: string,
      @Body() body: T,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      return await this._service.upsertWithWhere(
        StringFunctions.parseJsonSafe(filter),
        this.cleanData(body),
        accessToken,
      );
    }

    @Get('count')
    @ApiOperation({
      summary: `Count instances of the model ${modelName} matched by where from the data source`,
    })
    @ApiQuery({
      name: 'filter',
      required: true,
      type: String,
      description: `Filter defining fields, where, select, etc. must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">Prisma Filter</a> for more details`,
      example: '({"where": {"something": "value"}})',
    })
    @ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          count: {
            type: 'number',
          },
        },
      },
      description: 'Ok',
    })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async count(
      @Query('filter') filter: string,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<any> {
      return await this._service.count(
        StringFunctions.parseJsonSafe(filter),
        accessToken,
      );
    }

    @Get(':id/exists')
    @ApiOperation({
      summary: `Check whether a model  ${modelName} instance exists in the data source`,
    })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Set id target',
      allowEmptyValue: false,
    })
    @ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          exists: {
            type: 'boolean',
          },
        },
      },
      description: 'Ok',
    })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async exists(
      @Param('id') id: string | number,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<any> {
      return await this._service.exists(id, accessToken);
    }

    @Get(':id')
    @ApiOperation({
      summary: `Find a ${modelName} By Id`,
    })
    @ApiQuery({
      name: 'filter',
      required: false,
      // type: String,
      description: `filter defining fields must be a JSON-encoded string see <a href="https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting">filter Filter</a> for more details`,
      // example: '({"filter": {"something": "value"}})',
    })
    @ApiParam({ name: 'id', required: true, description: 'Set id target' })
    @ApiOkResponse({ type: modelEntity, description: 'Ok', isArray: false })
    @ApiNotFoundResponse({ description: 'Entity does not exist ' })
    @ApiForbiddenResponse({ description: 'Forbiden.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
    public async findById(
      @Param('id') id: string | number,
      @Query('filter') filter: any,
      @Res({ passthrough: true }) response: ResponseExp,
      @AccessTokenData() accessToken?: AccessToken,
    ): Promise<T> {
      let idParse: any = id;
      idParse = !isNaN(idParse) ? parseFloat(idParse): id;
      return await this._service.findById(
        idParse,
        StringFunctions.parseJsonSafe(filter) || {},
        accessToken,
      );
    }

    // Available methods ['findAll','findOne','findById','deleteById','create','createBulk','update','updateWithPatch','patchOrCreate','upsertWithWhere','count','exists']
    public disableMethodByName(nameMethod: string): void {
      delete AbstractController.prototype[nameMethod];
    }

    public disableMethodsByName(nameMethod: Array<string>): void {
      nameMethod.forEach((name) => {
        delete AbstractController.prototype[name];
      });
    }

    private cleanData(data: any): any {
      const modelName = this._service.modelInstance;
      const appModels = Prisma.dmmf.datamodel.models;
      const targetModel = appModels.find((v) => v.name == modelName);

      if (!targetModel?.fields?.length) {
        return data;
      }

      const printError = (fieldName: string) => {
        this.logger.error(
          `Invalid data for the field ${modelName}, ${fieldName}: `,
          data[fieldName],
        );
      };

      targetModel.fields.forEach((v) => {
        if (
          v.type === 'Json' &&
          !(isArray(data[v.name]) || ValidationFunctions.isLiteralObject(data[v.name]))
        ) {
          printError(v.name);
          data[v.name] = undefined;
        } else if (v.type === 'DateTime' && !dayjs(data[v.name]).isValid()) {
          printError(v.name);
          data[v.name] = null;
        } else if (v.type === 'DateTime' && isString(data[v.name])) {
          data[v.name] = dayjs(data[v.name]).toDate();
        } else if (v.type === 'Int' && data[v.name] > 2147483647) {
          printError(v.name);
          data[v.name] = null;
        }
      });

      return data;
    }
  }

  return AbstractController;
}
