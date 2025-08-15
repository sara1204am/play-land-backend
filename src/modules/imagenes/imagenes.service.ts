import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core-services/base/base.service';
import { Imagenes } from './imagenes.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Injectable()
export class ImagenesService extends BaseService<Imagenes> {
       constructor(private readonly _databaseService: DatabaseService) {
          super(_databaseService, 'imagenes');
        }
}
