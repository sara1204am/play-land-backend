/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { LogoutDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { Prisma } from '@prisma/client';

/**
 * LoginService
 *
 * @export
 * @class LoginService
 */
@Injectable()
export class LoginService {
  /**
   * Creates an instance of LoginService.
   * @param {DatabaseService} databaseService
   * @memberof LoginService
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  /**
   * The save lgin data method is used to store user login log of current auth request
   *
   * @param {string} userId
   * @param {string} ip
   * @param {string} token
   * @param {string} hostInfo
   * @param {string} platform
   * @return {*}  {Promise<any>}
   * @memberof LoginService
   */
  public async saveLoginData(
    userId: string,
    token: string,
    hostInfo: string,
    platform: string,
  ): Promise<any> {

    const data: any = {
      userId,
      token,
      hostInfo,
      loggedOutAt: null,
      platform,
    };
    return this.databaseService.user_login_log.create({ data });
  }

  /**
   * The logout method is used to store logout action for user
   *
   * @param {LogoutDto} logoutDto
   * @return {*}  {Promise<any>}
   * @memberof LoginService
   */
  public async logout(logoutDto: LogoutDto): Promise<any> {
    const f1: Prisma.user_login_logUpdateManyArgs = {
      where: { token: logoutDto.token },
      data: { loggedOutAt: new Date() },
    };
    const f2: Prisma.access_tokenDeleteArgs = {
      where: { token: logoutDto.token },
    };

    try {
     await this.databaseService.access_token.delete(f2);

      const updatedRecords = await this.databaseService.user_login_log.updateMany(f1);

      if (!updatedRecords?.count) {
        throw new NotFoundException('Token not found');
      } 

      return updatedRecords;
    } catch (error) {
      return {};
    }
  }

    /**
   * The getPlatformName method is used to get plfatformName from current request
   *
   * @param {string} platformSeed
   * @return {*}  {string}
   * @memberof LoginService
   */
    public getPlatformName(platformSeed: string): string {
      const platformsConfiguration = this.configService.get('platformsList', []);
      const platformConfig = platformsConfiguration.find(
        (x: { platformSeed: string }) => x.platformSeed === platformSeed,
      );
      return platformConfig.name;
    }
}
