import { Articulo } from './articulo.entity';
import { ArticuloService } from './articulo.service';
declare const BaseController: any;
export declare class ArticuloController extends BaseController<Articulo> {
    private readonly articuloService;
    constructor(articuloService: ArticuloService);
}
export {};
