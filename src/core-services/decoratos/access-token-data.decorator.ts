/* eslint-disable prettier/prettier */
import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  
  export interface CurrentUserOptions {
    required?: boolean;
  }
  
  export const AccessTokenData: (
    options?: CurrentUserOptions,
  ) => ParameterDecorator = createParamDecorator(
    (options: CurrentUserOptions = {}, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const { user } = request;
      if (options.required && !user) {
        throw new UnauthorizedException();
      }
      return user;
    },
  );
  