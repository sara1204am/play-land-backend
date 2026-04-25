import { Controller } from '@nestjs/common';
import { Ubicacion } from './ubicacion.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiTags } from '@nestjs/swagger';
import { UbicacionService } from './ubicacion.service';

const BaseController = abstractControllerFactory<Ubicacion>({
  modelEntity: Ubicacion,
  modelName: 'Ubicacion',
});

@Controller('ubicacion')
@ApiTags('ubicacion')
export class UbicacionController extends BaseController<Ubicacion> {
  constructor(private readonly ubicacionService: UbicacionService) {
    super(ubicacionService);
  }
}
