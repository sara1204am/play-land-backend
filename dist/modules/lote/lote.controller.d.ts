import { Lote } from './lote.entity';
import { LoteService } from './lote.service';
declare const BaseController: any;
export declare class LoteController extends BaseController<Lote> {
    private readonly loteService;
    constructor(loteService: LoteService);
}
export {};
