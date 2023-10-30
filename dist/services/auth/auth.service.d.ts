import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/modules/login/dto';
import { LoginOutputData } from 'src/modules/login/interfaces';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
export declare class AuthService {
    readonly jwtService: JwtService;
    private readonly configService;
    readonly prisma: DatabaseService;
    constructor(jwtService: JwtService, configService: ConfigService, prisma: DatabaseService);
    validateUser(loginDto: LoginDto): Promise<any>;
    login(user: any, customTtl?: number): Promise<LoginOutputData>;
    generateToken(user: any, ttl: string): Promise<any>;
    verifyJwt(jwt: string): Promise<any>;
    getUserTokenConfig(userId: string): Promise<any>;
    getRandCoord(): string[];
    decodeToken(token: string): any;
}
