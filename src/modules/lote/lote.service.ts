import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { Lote } from './lote.entity';

@Injectable()
export class LoteService extends BaseService<Lote> {
    constructor(private readonly _databaseService: DatabaseService) {
      super(_databaseService, 'lote');
    }
}  