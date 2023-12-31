/* eslint-disable prettier/prettier */
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: exception.message.replace(/\n/g, ''),
        });
        break;
      default:
        super.catch(exception, host);
    }
  }
}
