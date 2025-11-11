import { Controller, Post, UploadedFile, UseInterceptors, Delete, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload-cloudinary')
export class CloudinaryController {
  constructor(private readonly uploadService: CloudinaryService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadImage(file) as any;
    return {
      url: result.secure_url,
      public_id: result.public_id,
      raw: result,
    };
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    return this.uploadService.deleteImage(publicId);
  }

  @Get('all')
  async getAllImages() {
    return this.uploadService.listAllImages();
  }
}
