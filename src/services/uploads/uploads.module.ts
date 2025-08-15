import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { diskStorage } from 'multer';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            cb(
              null,
              `./storage/${configService.get('defaultUploadFolder', 'uploads')}/${req.params.container}/`,
            );
          },
          filename: (req, file, cb) => {
            cb(null, file.originalname);
          },
        }),
        fileFilter: (req, file, cb) => {
          file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          );
          cb(null, true);
        },
        limits: {
          fileSize: configService.get('maxFileSizeUpload', 2097152), // must be in bytes
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService, JwtService],
})
export class UploadsModule {}
