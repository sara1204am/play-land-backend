import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { ConteoFisico } from './conteo-fisico.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class ConteoFisicoService extends BaseService<ConteoFisico> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'conteo_fisico');
  }
}
