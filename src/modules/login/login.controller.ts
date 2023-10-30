/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { get } from 'lodash';

import { LoginDto } from './dto';
import { LoginService } from './login.service';
import { AuthService } from '../../services/auth/auth.service';
import { PlatformSeed } from '../../core-services/decoratos/platform-seed.decorator';

import { Public } from '../../core-services/decoratos/public.decorator';
/* import { UserRoleService } from '../user-role/user-role.service'; */

@ApiTags('Login')
@ApiSecurity('platform-seed')
@Controller('/')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}

  /**
   * Login method with simple params.
   *
   * @param {LoginDto} loginDto Login dto model
   * @param {string} ip Ip addres decorator included in request not parameter
   * @param {Request} request
   * @param {string} platformSeed Platform seed included in header
   * @return {*}
   * @memberof LoginController
   */
/*   @Public()
  @Post('/login')
  @ApiOperation({
    summary: 'The login method is used authenticate in application',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Json Object',
    required: true,
    isArray: false,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        userId: {
          type: 'string',
        },
        ttl: {
          type: 'number',
        },
        created: {
          type: 'string',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            country: {
              type: 'string',
            },
            gender: {
              type: 'string',
            },
            otherInformation: {
              type: 'string',
            },
            profileImg: {
              type: 'string',
            },
          },
        },
        refreshToken: {
          type: 'string',
        },
        access: {
          type: 'boolean',
        },
      },
    },
    description: 'Ok',
  })
  @ApiNotFoundResponse({ description: 'Entity does not exist ' })
  @ApiForbiddenResponse({ description: 'Forbiden.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
  @ApiNotAcceptableResponse({ description: 'No Acceptable request' })
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @PlatformSeed() platformSeed: string,
  ): Promise<any> {
   
    const user = await this.authService.validateUser(loginDto);
    const role = await this.userRoleService.findAll({where:{id_user: user.id }})

    if (!user ) {
      throw new UnauthorizedException('invalid credentials');
    }
    if (role.length === 0) {
      throw new UnauthorizedException('missing role');
    }
    const tokenData = await this.authService.login(user, loginDto.ttl);
    const hostInfo = get(request, 'headers.user-agent');
    const platformName = this.loginService.getPlatformName(platformSeed);

    if (tokenData) {
      await this.loginService.saveLoginData(user.id, tokenData.id, hostInfo, platformName);
    }
    return tokenData;
  } */

}
