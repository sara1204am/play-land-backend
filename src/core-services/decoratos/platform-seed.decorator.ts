/* eslint-disable prettier/prettier */
import {
  createParamDecorator,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';

export const PlatformSeed = createParamDecorator(
  (data, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const platformSeed = request.headers['platform-seed'];
    if (!platformSeed) {
      throw new NotAcceptableException('Platform seed is required');
    }

    return platformSeed;
  },
);
