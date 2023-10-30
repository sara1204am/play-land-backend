import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMsgInitial(): string {
    return 'Bienvenido al servidor del Sistema Play Land Sucre'+ new Date();
  }
}
