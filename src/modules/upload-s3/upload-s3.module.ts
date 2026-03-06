import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core-services/prisma/prisma/prisma.service';
import { S3Controller } from './upload-s3.controller';
import { S3Service } from './upload-s3.service';

@Module({
  controllers: [S3Controller],
  providers: [S3Service, PrismaService],
})
export class UploadS3Module {}
