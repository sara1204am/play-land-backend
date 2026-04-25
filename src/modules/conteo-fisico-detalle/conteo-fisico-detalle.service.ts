import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { ConteoFisicoDetalle } from './conteo-fisico-detalle.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class ConteoFisicoDetalleService extends BaseService<ConteoFisicoDetalle> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'conteo_fisico_detalle');
  }
}
