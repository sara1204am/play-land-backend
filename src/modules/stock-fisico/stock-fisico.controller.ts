import { Controller } from '@nestjs/common';
import { StockFisico } from './stock-fisico.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiTags } from '@nestjs/swagger';
import { StockFisicoService } from './stock-fisico.service';

const BaseController = abstractControllerFactory<StockFisico>({
  modelEntity: StockFisico,
  modelName: 'StockFisico',
});

@Controller('stock-fisico')
@ApiTags('stock-fisico')
export class StockFisicoController extends BaseController<StockFisico> {
  constructor(private readonly stockFisicoService: StockFisicoService) {
    super(stockFisicoService);
  }
}
