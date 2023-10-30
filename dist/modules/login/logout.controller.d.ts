import { LogoutDto } from './dto';
import { LoginService } from './login.service';
export declare class LogoutController {
    private loginService;
    constructor(loginService: LoginService);
    logoutToken(logoutDto: LogoutDto): Promise<boolean>;
}
