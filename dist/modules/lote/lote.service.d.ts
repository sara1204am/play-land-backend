import { BaseService } from 'src/core-services/base/base.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { Lote } from './lote.entity';
export declare class LoteService extends BaseService<Lote> {
    private readonly _databaseService;
    constructor(_databaseService: DatabaseService);
}
