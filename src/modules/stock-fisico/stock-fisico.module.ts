import { Module } from '@nestjs/common';
import { StockFisicoService } from './stock-fisico.service';
import { StockFisicoController } from './stock-fisico.controller';

@Module({
  controllers: [StockFisicoController],
  providers: [StockFisicoService],
  exports: [StockFisicoService],
})
export class StockFisicoModule {}
