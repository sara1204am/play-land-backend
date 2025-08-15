import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  HttpStatus,
  Get,
  Res,
  Delete,
  NotFoundException,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { existsSync, unlinkSync } from 'fs-extra';
import { join, normalize } from 'path';



@Controller('uploads')
@ApiTags('Uploads')
@ApiSecurity('basic')
export class UploadsController {
  private uploadFolder = this.configService.get(
    'defaultUploadFolder',
    'uploads',
  );


  constructor(
    private readonly configService: ConfigService,
  ) { }



  @Post(':container/upload')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'container',
    required: true,
    description:
      'Sets the folder name to store the file (eg: library, profiles/user-1, etc.).',
    example: 'CUSTOM_FOLDER_NAME/...',
  })
  @ApiOkResponse({
    description: 'Returns the file name and the original name.',
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
        originalName: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fieldSize: 50,
      },
    }),
  )
  public uploadFile(@UploadedFile() file: Express.Multer.File): {
    fileName: string;
    originalName: string;
  } {
    return {
      fileName: file.filename,
      originalName: file.originalname,
    };
  }


  @Post('multiple/:container/upload')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'container',
    required: true,
    description:
      'Sets the folder name to store the file (eg: library, profiles/user-1, etc.).',
    example: 'CUSTOM_FOLDER_NAME/...',
  })
  @ApiOkResponse({
    description: 'Returns the file names and the original names.',
    status: HttpStatus.OK,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fileName: { type: 'string' },
          originalName: { type: 'string' },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  public uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): { fileName: string; originalName: string }[] {
    return files.map((v) => ({
      fileName: v.filename,
      originalName: v.originalname,
    }));
  }



  @Get(':container/download/:file')
  @ApiParam({
    name: 'container',
    required: true,
    description:
      'Sets the folder name to download the file (eg: library, profiles/user-1, etc.).',
    example: 'CUSTOM_FOLDER_NAME/...',
  })
  @ApiParam({
    name: 'file',
    required: true,
    description: 'Set name of the file with its extension',
    example: 'fooFileName.txt',
  })
  @ApiOkResponse({
    description: 'Download the file.',
    status: HttpStatus.OK,
  })
  public downloadFile(
    @Param('container') container: string,
    @Param('file') file: string,
    @Res() res: Response,
  ): void {
    const fileName = file;
    const filePath = this.buildPath(
      true,
      'storage',
      this.uploadFolder,
      container,
      fileName,
    );

    if (existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.attachment(fileName);
      res.download(filePath);
    } else {
      throw new NotFoundException(
        'fileNotFound',
      );
    }
  }


  @Delete(':container/delete/:file')
  @ApiParam({
    name: 'container',
    required: true,
    description:
      'Sets the folder name to download the file (eg: library, profiles/user-1, etc.).',
    example: 'CUSTOM_FOLDER_NAME/...',
  })
  @ApiParam({
    name: 'file',
    required: true,
    description: 'Set name of the file with its extension',
    example: 'fooFileName.txt',
  })
  @ApiOkResponse({
    description: 'Delete the file.',
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  })

  public deleteFile(
    @Param('container') container: string,
    @Param('file') file: string,
    @Res({ passthrough: true }) res: Response,
  ): any {
    const filePath = this.buildPath(
      true,
      'storage',
      this.uploadFolder,
      container,
      file,
    );

    if (existsSync(filePath)) {
      unlinkSync(filePath);
      res.status(HttpStatus.OK);
      return { success: true };
    }
    res.status(HttpStatus.NOT_FOUND);
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'fileNotFound',
    };
  }

  buildPath(includeCwd: boolean = false, ...paths: string[]): string {
    const validPaths = paths.filter(Boolean);

    return normalize(join(includeCwd ? process.cwd() : '', ...validPaths));
  }
}
