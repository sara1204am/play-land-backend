import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { Articulo } from './articulo.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class ArticuloService extends BaseService<Articulo> {
    constructor(private readonly _databaseService: DatabaseService) {
      super(_databaseService, 'articulo');
    }
}  