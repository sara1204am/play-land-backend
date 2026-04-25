import { Controller } from '@nestjs/common';
import { ConteoFisicoDetalle } from './conteo-fisico-detalle.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiTags } from '@nestjs/swagger';
import { ConteoFisicoDetalleService } from './conteo-fisico-detalle.service';

const BaseController = abstractControllerFactory<ConteoFisicoDetalle>({
  modelEntity: ConteoFisicoDetalle,
  modelName: 'ConteoFisicoDetalle',
});

@Controller('conteo-fisico-detalle')
@ApiTags('conteo-fisico-detalle')
export class ConteoFisicoDetalleController extends BaseController<ConteoFisicoDetalle> {
  constructor(private readonly conteoFisicoDetalleService: ConteoFisicoDetalleService) {
    super(conteoFisicoDetalleService);
  }
}
