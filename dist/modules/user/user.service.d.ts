import { BaseService } from 'src/core-services/base/base.service';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { User } from './entities/user.entity';
export declare class UserService extends BaseService<User> {
    private readonly _databaseService;
    constructor(_databaseService: DatabaseService);
}
