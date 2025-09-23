import { Injectable, BadRequestException } from '@nestjs/common';
import { cloudinary } from './cloudinary.provider';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File required');
    if (!file.mimetype?.startsWith('image/')) throw new BadRequestException('Only images allowed');

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'play-land',
          public_id: Date.now().toString(),
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string) {
    // publicId es el public_id que te devuelve Cloudinary (sin extensión)
    return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  }
}
