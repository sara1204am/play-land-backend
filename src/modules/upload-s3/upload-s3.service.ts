import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { extname } from 'path';
import * as streamifier from 'streamifier';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket = 'play-land-images'; // tu bucket

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async uploadImage(file: Express.Multer.File) {
        if (!file) throw new BadRequestException('File required');
        if (!file.mimetype?.startsWith('image/')) throw new BadRequestException('Only images allowed');

        const fileExtension = extname(file.originalname);
        const key = `${Date.now()}${fileExtension}`;

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.s3.send(command);

        const url = `https://${this.bucket}.s3.amazonaws.com/${key}`;
        return { key, url };
    }

    async deleteImage(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        return this.s3.send(command);
    }

    async listAllImages() {
        const command = new ListObjectsV2Command({ Bucket: this.bucket, Prefix: 'play-land/' });
        const response = await this.s3.send(command);

        return response.Contents?.map(file => ({
            key: file.Key,
            url: `https://${this.bucket}.s3.amazonaws.com/${file.Key}`,
        })) || [];
    }
}