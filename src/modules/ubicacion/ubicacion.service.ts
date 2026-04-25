import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { Ubicacion } from './ubicacion.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class UbicacionService extends BaseService<Ubicacion> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'ubicacion');
  }
}
