import { Module } from '@nestjs/common';
import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Module({
  controllers: [VentaController],
  providers: [VentaService, DatabaseService]
})
export class VentaModule {}
