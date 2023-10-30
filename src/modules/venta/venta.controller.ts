import { Controller } from '@nestjs/common';
import { Venta } from './venta.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core-services/decoratos/public.decorator';
import { VentaService } from './venta.service';

const BaseController = abstractControllerFactory<Venta>({
    modelEntity: Venta,
    modelName: 'Venta',
  });

@Controller('venta')
@ApiTags('venta')
@Public()
export class VentaController extends BaseController<Venta> {
    constructor(private readonly ventaService: VentaService) {
      super(ventaService);
    }
}