/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';


import { abstractControllerFactory } from 'src/core-services/base/base-factory';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Public } from 'src/core-services/decoratos/public.decorator';
import { AccessTokenData } from 'src/core-services/decoratos/access-token-data.decorator';
import { AccessToken } from '../login/interfaces';



const BaseController = abstractControllerFactory<User>({
  modelEntity: User,
  modelName: 'User',
});

@Controller('user')
@ApiTags('user')
@ApiSecurity('basic')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

 
}
