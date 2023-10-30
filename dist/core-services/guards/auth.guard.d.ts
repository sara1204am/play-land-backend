import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/services/auth/auth.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly authService;
    constructor(reflector: Reflector, authService: AuthService);
    private getTokenFromRequest;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
