import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { Venta } from './venta.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class VentaService extends BaseService<Venta> {
    constructor(private readonly _databaseService: DatabaseService) {
      super(_databaseService, 'venta');
    }
}  