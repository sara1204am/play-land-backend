import { BaseService } from 'src/core-services/base/base.service';
import { Venta } from './venta.entity';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
export declare class VentaService extends BaseService<Venta> {
    private readonly _databaseService;
    constructor(_databaseService: DatabaseService);
}
