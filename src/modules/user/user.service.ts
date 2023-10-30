/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';


import { BaseService } from 'src/core-services/base/base.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';

import { User } from './entities/user.entity';
import PasswordFunctions from 'src/core-services/functions/password-functions';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly _databaseService: DatabaseService) {
    super(_databaseService, 'user');
  }

}
