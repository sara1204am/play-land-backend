import { Request } from 'express';
import { LoginDto } from './dto';
import { LoginService } from './login.service';
import { AuthService } from '../../services/auth/auth.service';
export declare class LoginController {
    private readonly authService;
    private readonly loginService;
    constructor(authService: AuthService, loginService: LoginService);
    login(loginDto: LoginDto, request: Request): Promise<any>;
}
