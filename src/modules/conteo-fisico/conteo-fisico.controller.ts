import { Controller } from '@nestjs/common';
import { ConteoFisico } from './conteo-fisico.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiTags } from '@nestjs/swagger';
import { ConteoFisicoService } from './conteo-fisico.service';

const BaseController = abstractControllerFactory<ConteoFisico>({
  modelEntity: ConteoFisico,
  modelName: 'ConteoFisico',
});

@Controller('conteo-fisico')
@ApiTags('conteo-fisico')
export class ConteoFisicoController extends BaseController<ConteoFisico> {
  constructor(private readonly conteoFisicoService: ConteoFisicoService) {
    super(conteoFisicoService);
  }
}
