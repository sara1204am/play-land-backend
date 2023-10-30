import { User } from './entities/user.entity';
import { UserService } from './user.service';
declare const BaseController: any;
export declare class UserController extends BaseController<User> {
    private readonly userService;
    constructor(userService: UserService);
}
export {};
