/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LogoutController } from './logout.controller';

import { AuthModule } from '../../services/auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';


@Module({
  imports: [AuthModule, HttpModule],
  controllers: [LoginController, LogoutController],
  providers: [LoginService, DatabaseService, ConfigService],
})
export class LoginModule {}
