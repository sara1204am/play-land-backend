/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';


@Module({
  controllers: [ UserController ],
  providers: [ UserService, DatabaseService ],
})
export class UserModule {}
