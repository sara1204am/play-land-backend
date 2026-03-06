import { Controller, Post, UploadedFile, UseInterceptors, Delete, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { S3Service } from './upload-s3.service';


@Controller('upload-s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const result = await this.s3Service.uploadImage(file);
    return result;
  }

  @Delete(':key')
  async delete(@Param('key') key: string) {
    return this.s3Service.deleteImage(key);
  }

  @Get('all')
  async getAllImages() {
    return this.s3Service.listAllImages();
  }
}