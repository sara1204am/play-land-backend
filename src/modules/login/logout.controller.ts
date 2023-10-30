/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LogoutDto } from './dto';
import { LoginService } from './login.service';
import { Public } from '../../core-services/decoratos/public.decorator';


/**
 * LogoutController
 *
 * @export
 * @class LogoutController
 */
@ApiTags('Logout')
@Controller('logout')
export class LogoutController {
  /**
   * Creates an instance of LogoutController.
   * @param {LoginService} loginService
   * @memberof LogoutController
   */
  constructor(private loginService: LoginService) {}
  /**
   * The logoutToken method is used to log out current user
   *
   * @param {LogoutDto} logoutDto
   * @return {*}  {Promise<boolean>}
   * @memberof LogoutController
   */
  @Post()
  @Public()
  @ApiBody({
    type: LogoutDto,
    description: 'Json Object',
    required: true,
  })
  @ApiOperation({
    summary: 'The logoutToken method is used to log out current user',
  })
  @ApiOkResponse({
    type: 'boolean',
  })
  @ApiNotFoundResponse({ description: 'Entity does not exist ' })
  @ApiForbiddenResponse({ description: 'Forbiden.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
  @ApiNotAcceptableResponse({ description: 'No Acceptable request' })
  async logoutToken(@Body() logoutDto: LogoutDto): Promise<boolean> {
    return this.loginService.logout(logoutDto);
  }
}
