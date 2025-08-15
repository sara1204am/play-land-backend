/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class UploadsController {
    private readonly configService;
    private uploadFolder;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): {
        fileName: string;
        originalName: string;
    };
    uploadFiles(files: Express.Multer.File[]): {
        fileName: string;
        originalName: string;
    }[];
    downloadFile(container: string, file: string, res: Response): void;
    deleteFile(container: string, file: string, res: Response): any;
    buildPath(includeCwd?: boolean, ...paths: string[]): string;
}
