import { Module } from '@nestjs/common';
import { ConteoFisicoDetalleService } from './conteo-fisico-detalle.service';
import { ConteoFisicoDetalleController } from './conteo-fisico-detalle.controller';

@Module({
  controllers: [ConteoFisicoDetalleController],
  providers: [ConteoFisicoDetalleService],
  exports: [ConteoFisicoDetalleService],
})
export class ConteoFisicoDetalleModule {}
