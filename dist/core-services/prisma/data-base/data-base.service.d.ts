import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'src/modules/login/interfaces';
import { PrismaService } from '../prisma/prisma.service';
export declare class DatabaseService extends PrismaService {
    private readonly configService;
    private useAclValidation;
    constructor(configService: ConfigService);
    deleteWithWehere<T>(model: Prisma.ModelName, filter: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    findAll<T>(model: Prisma.ModelName, filter?: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    findOne<T>(model: Prisma.ModelName, filter: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    findById<T>(model: Prisma.ModelName, id: string | number, filter?: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    deleteById(model: Prisma.ModelName, id: string | number, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    create<T>(model: Prisma.ModelName, data: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    createBulk<T>(model: Prisma.ModelName, body: T[], accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    update<T>(model: Prisma.ModelName, id: string | number, body: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    patchOrCreate<T>(model: Prisma.ModelName, body: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    upsertWithWhere<T>(model: Prisma.ModelName, body: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    count<T>(model: Prisma.ModelName, filter: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    exists(model: Prisma.ModelName, id: string | number, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
    deleteMany<T>(model: Prisma.ModelName, filter: T, accessToken?: AccessToken, internalCall?: boolean, remoteMethodName?: string): Promise<any>;
}
