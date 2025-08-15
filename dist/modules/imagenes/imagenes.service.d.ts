import { BaseService } from 'src/core-services/base/base.service';
import { Imagenes } from './imagenes.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
export declare class ImagenesService extends BaseService<Imagenes> {
    private readonly _databaseService;
    constructor(_databaseService: DatabaseService);
}
