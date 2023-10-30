import { LogoutDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
export declare class LoginService {
    private readonly configService;
    private readonly databaseService;
    constructor(configService: ConfigService, databaseService: DatabaseService);
    saveLoginData(userId: string, token: string, hostInfo: string, platform: string): Promise<any>;
    logout(logoutDto: LogoutDto): Promise<any>;
    getPlatformName(platformSeed: string): string;
}
