import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';

@Module({
  controllers: [UbicacionController],
  providers: [UbicacionService],
  exports: [UbicacionService],
})
export class UbicacionModule {}
