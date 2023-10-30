import { BaseFactoryInterface } from './interfaces/base-factory.interface';
import { NotFoundException } from '@nestjs/common';
export declare class PostNotFoundException extends NotFoundException {
    constructor(postId: number);
}
export declare function abstractControllerFactory<T>(options: BaseFactoryInterface<T>): any;
