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
import { User } from '../user/entities/user.entity';
/* import { UserRoleService } from '../user-role/user-role.service'; */

@ApiTags('Login')
@Controller('/')
@Public()
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}

  @Public()
  @Post('/login')
  @ApiOperation({
    summary: 'The login method is used authenticate in application',
  })
  public async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
  ): Promise<any> {
    const user = (await this.authService.validateUser(loginDto)) as User;

    if (!user) {
      throw new UnauthorizedException('There is not a valid user');
    }


    const tokenData = await this.authService.login(user, loginDto.ttl);

    if (tokenData) {
      await this.loginService.saveLoginData(
        user.id,
        tokenData.id,
        request?.headers?.['user-agent'],
        'web',
      );
    }
    
    return tokenData;
  }
}
