import { Module } from '@nestjs/common';
import { ImagenesController } from './imagenes.controller';
import { ImagenesService } from './imagenes.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Module({
  controllers: [ImagenesController],
  providers: [ImagenesService, DatabaseService]
})
export class ImagenesModule {}
