import { Controller } from '@nestjs/common';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { Lote } from './lote.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core-services/decoratos/public.decorator';
import { LoteService } from './lote.service';

const BaseController = abstractControllerFactory<Lote>({
    modelEntity: Lote,
    modelName: 'Lote',
  });

@Controller('lote')
@ApiTags('lote')
@Public()
export class LoteController extends BaseController<Lote> {
    constructor(private readonly loteService: LoteService) {
      super(loteService);
    }
}
