import { Controller, Get, Query } from '@nestjs/common';
import { Articulo } from './articulo.entity';
import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  
  @Get('search')
  @ApiOperation({ summary: 'Buscar articulos por palabra' })
  @ApiQuery({ name: 'q', required: true, description: 'Texto a buscar' })
  @ApiQuery({ name: 'all', required: false, description: 'Buscar todos incluyendo inactivos' })
  async search(@Query('q') q: string, @Query('all') all?: string) {
    const search = (q ?? '').trim();

    if (!search) return [];

    const includeInactive = all === 'true' || all === '1';
    return this.articuloService.search(search, includeInactive);
  }
}


