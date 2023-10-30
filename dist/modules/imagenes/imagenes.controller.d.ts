import { Imagenes } from './imagenes.entity';
import { ImagenesService } from './imagenes.service';
declare const BaseController: any;
export declare class ImagenesController extends BaseController<Imagenes> {
    private readonly imagenesService;
    constructor(imagenesService: ImagenesService);
}
export {};
