import { Controller } from '@nestjs/common';
import { Articulo } from './articulo.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core-services/decoratos/public.decorator';
import { ArticuloService } from './articulo.service';

const BaseController = abstractControllerFactory<Articulo>({
    modelEntity: Articulo,
    modelName: 'Articulo',
  });
  
@Controller('articulo')
@ApiTags('articulo')
@Public()

export class ArticuloController extends BaseController<Articulo> {
    constructor(private readonly articuloService: ArticuloService) {
      super(articuloService);
    }
    
}


