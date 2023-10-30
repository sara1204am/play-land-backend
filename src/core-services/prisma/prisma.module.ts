/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './data-base/data-base.service';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService, PrismaService],
})
export class PrismaModule {}
