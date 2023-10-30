import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import { get } from 'lodash';
import { AuthService } from 'src/services/auth/auth.service';
  

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    public constructor(
      private readonly reflector: Reflector,
      private readonly authService: AuthService,
    ) {}
  
    private getTokenFromRequest(request: any): string | null {
      const token = get(request, 'headers.authorization', null);
      if (token) {
        return token;
      } else if (request.query && request.query.access_token) {
        return request.query.access_token;
      }
      return null;
    }
  
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );
  
      if (isPublic) {
        return true;
      }
      const requestToken = this.getTokenFromRequest(request);
      if(requestToken){
        try {
          this.authService.jwtService.verifyAsync(requestToken).catch((e)=>{
            // throw new UnauthorizedException('Invalid token');  
            return false;
          });
        } catch (error) {
          return false;
          // throw new UnauthorizedException('Invalid token');

        }
  
        const f1: Prisma.access_tokenFindFirstArgs = {
          where: {
            token: requestToken,
          },
        };
        const tokenData = await this.authService.prisma.access_token.findFirst(f1);
    
        if (!tokenData || dayjs(tokenData.expiresAt).isBefore(dayjs())) {
          throw new UnauthorizedException('Invalid token');
        }
        if (tokenData && tokenData.userId) {
          request.user = { ...tokenData, ...{ id: requestToken } };
        }
    
        return true;
      } else {
        throw new UnauthorizedException('No existe token');
      }
     
    }
  }
  