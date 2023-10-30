import { BaseService } from 'src/core-services/base/base.service';
import { Articulo } from './articulo.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
export declare class ArticuloService extends BaseService<Articulo> {
    private readonly _databaseService;
    constructor(_databaseService: DatabaseService);
}
