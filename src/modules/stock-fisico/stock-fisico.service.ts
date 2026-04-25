import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { StockFisico } from './stock-fisico.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class StockFisicoService extends BaseService<StockFisico> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'stock_fisico');
  }
}
