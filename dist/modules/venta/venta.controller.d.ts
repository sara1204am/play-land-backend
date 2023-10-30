import { Venta } from './venta.entity';
import { VentaService } from './venta.service';
declare const BaseController: any;
export declare class VentaController extends BaseController<Venta> {
    private readonly ventaService;
    constructor(ventaService: VentaService);
}
export {};
