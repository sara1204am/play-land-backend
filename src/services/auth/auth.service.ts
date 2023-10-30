/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { pick, random } from 'lodash';
import { LoginDto } from 'src/modules/login/dto';
import { LoginOutputData } from 'src/modules/login/interfaces';
import PasswordFunctions from '../../core-services/functions/password-functions';
import { DatabaseService } from 'src/core-services/prisma/data-base/data-base.service';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs'

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    public readonly prisma: DatabaseService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const filter = {
      where: {},
    };
    if (loginDto.identity_document) {
      filter.where = { OR: [ {identity_document: loginDto.identity_document}, {email: loginDto.identity_document} , {username : loginDto.identity_document} ] , status: true };
    } else {
      filter.where = { username: loginDto.username, status: true };
    }
     const user = await this.prisma.user.findFirst(filter);

    if (
      user &&
      PasswordFunctions.checkPassword(user.password, loginDto.password)
    ) {
      delete user.password;
      return pick(user, [
        'id',
        'first_name',
        'last_name',
        'email'
      ]);
    }
    return false;
  }

  async login(user: any, customTtl?: number): Promise<LoginOutputData> { 
    const ttlToken = customTtl
      ? customTtl + 's'
      : this.configService.get('jwt.expiresIn');
    const accessToken = await this.generateToken(user, ttlToken);

    const accessTokenData: Prisma.access_tokenUncheckedCreateInput = {
      expiresAt: dayjs().add(parseInt(ttlToken), 's').toDate(),
      id: Date.now().toString(), // cambiado para tener multiples seciones 
      userId: user.id,
      token: accessToken,
      createdAt: new Date(),
    };


    const dataLastAccess = await this.prisma.access_token.findFirst({ where: {userId: user.id}});

    // si se quiere comentar tener una sola seccion por usuario descomentar este codigo

    // if(dataLastAccess && dataLastAccess.id) {
    //   const f2: Prisma.access_tokenDeleteArgs = {
    //     where: { token: dataLastAccess.token  }
    //   };
  
    //   await this.prisma.access_token.delete(f2);
    // }

    await this.prisma.access_token.create({
      data: accessTokenData,
    });

    return {
      id: accessToken,
      userId: user.id,
      ttl: ttlToken,
      createdAt: dayjs().add(1000, 's').toDate(),
      user,
      access: true,
    };
  }

  public async generateToken(user: any, ttl: string): Promise<any> { // TODO user
    const payload = { email: user.email, userId: user.id }; 
    return this.jwtService.signAsync(payload, {
      expiresIn: ttl,
    });
  }

  async verifyJwt(jwt: string): Promise<any> {
    if (!jwt) {
      throw new BadRequestException('The token is required');
    }

    return new Promise((resolve, reject) => {
      this.jwtService.verifyAsync(jwt).then(
        (decoded) => {
          resolve(decoded);
        },
        () => {
          reject('Invalid Token')
          throw new UnauthorizedException('Invalid Token');
        },
      );
    });
  }

  async getUserTokenConfig(userId: string): Promise<any> {
    return this.prisma.user_token_config.findFirst({
      where: { userId },
    }); 
  }

  public getRandCoord(): string[] {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const out1 = [];

    while (out1.length < 3) {
      const t =
        letters[Math.floor(Math.random() * letters.length)] + random(1, 10);
      if (!out1.includes(t)) out1.push(t);
    }
    return out1;
  }

  public decodeToken(token: string): any {
    if (!token) {
      return null;
    }
    return this.jwtService.decode(token);
  }
}
