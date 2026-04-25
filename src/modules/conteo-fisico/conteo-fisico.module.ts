import { Module } from '@nestjs/common';
import { ConteoFisicoService } from './conteo-fisico.service';
import { ConteoFisicoController } from './conteo-fisico.controller';

@Module({
  controllers: [ConteoFisicoController],
  providers: [ConteoFisicoService],
  exports: [ConteoFisicoService],
})
export class ConteoFisicoModule {}
