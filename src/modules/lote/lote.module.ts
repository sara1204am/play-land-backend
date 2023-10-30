import { Module } from '@nestjs/common';
import { LoteController } from './lote.controller';
import { LoteService } from './lote.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService, DatabaseService]
})
export class LoteModule {}
