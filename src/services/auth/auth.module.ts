/* eslint-disable prettier/prettier */
import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaClient, DatabaseService],
  exports: [AuthService],
  controllers: [],
})
export class AuthModule {}
