/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { configuration } from './config/configuration.config';

import { PrismaService } from './core-services/prisma/prisma/prisma.service';
import { ImagenesModule } from './modules/imagenes/imagenes.module';
import { VentaModule } from './modules/venta/venta.module';
import { ArticuloModule } from './modules/articulo/articulo.module';
import { LoteModule } from './modules/lote/lote.module';
import { LoginModule } from './modules/login/login.module';
import { UploadsModule } from './services/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.cwd() + `../${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    ArticuloModule,
    VentaModule,
    LoteModule,
    ImagenesModule,
    LoginModule,
    UploadsModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
