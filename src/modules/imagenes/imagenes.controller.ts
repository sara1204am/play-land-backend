import { Controller } from '@nestjs/common';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { Imagenes } from './imagenes.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core-services/decoratos/public.decorator';
import { ImagenesService } from './imagenes.service';

const BaseController = abstractControllerFactory<Imagenes>({
    modelEntity: Imagenes,
    modelName: 'Imagenes',
  });

@Controller('imagenes')
@ApiTags('imagenes')
@Public()
export class ImagenesController extends BaseController<Imagenes> {
    constructor(private readonly imagenesService: ImagenesService) {
      super(imagenesService);
    }
}  