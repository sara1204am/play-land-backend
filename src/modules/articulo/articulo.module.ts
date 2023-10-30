import { Module } from '@nestjs/common';
import { ArticuloController } from './articulo.controller';
import { ArticuloService } from './articulo.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Module({
  controllers: [ArticuloController],
  providers: [ArticuloService, DatabaseService]
})
export class ArticuloModule {}
