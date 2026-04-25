/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { configuration } from './config/configuration.config';

import { PrismaModule } from './core-services/prisma/prisma.module';
import { ImagenesModule } from './modules/imagenes/imagenes.module';
import { VentaModule } from './modules/venta/venta.module';
import { ArticuloModule } from './modules/articulo/articulo.module';
import { LoteModule } from './modules/lote/lote.module';
import { LoginModule } from './modules/login/login.module';
import { UploadsModule } from './services/uploads/uploads.module';
import { UploadCloudinaryModule } from './modules/upload-cloudinary/cloudinary.module';
import { UploadS3Module } from './modules/upload-s3/upload-s3.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';
import { StockFisicoModule } from './modules/stock-fisico/stock-fisico.module';
import { ConteoFisicoModule } from './modules/conteo-fisico/conteo-fisico.module';
import { ConteoFisicoDetalleModule } from './modules/conteo-fisico-detalle/conteo-fisico-detalle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.cwd() + `../${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    ArticuloModule,
    VentaModule,
    LoteModule,
    ImagenesModule,
    LoginModule,
    UploadsModule,
    UploadCloudinaryModule,
    UploadS3Module,
    UbicacionModule,
    StockFisicoModule,
    ConteoFisicoModule,
    ConteoFisicoDetalleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
