import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { config } from 'dotenv';

config();

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { WRONG_PASS_RESPONSE } from '../common/constants';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto): Promise<Tokens> {
    const newUser = await this.userService.create(body);

    const tokens = await this.signUser(newUser.id, newUser.login);
    await this.updateRefTokenHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login(body: CreateUserDto): Promise<Tokens> {
    const user = this.userService.findOneByLogin(body.login);

    const isPassMatch = await compare(body.password, user.password);
    if (!isPassMatch) throw new ForbiddenException(WRONG_PASS_RESPONSE);

    const tokens = await this.signUser(user.id, user.login);
    await this.updateRefTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    const user = await this.userService.findOne(userId);
    user.hashedRefToken = null;
  }

  async refresh(userId: string, refToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefToken)
      throw new ForbiddenException('Access Denied');

    const isTokenMatch = await compare(refToken, user?.hashedRefToken);

    if (!isTokenMatch || !user.hashedRefToken)
      throw new ForbiddenException("Tokens don't match");

    const tokens = await this.signUser(user.id, user.login);
    await this.updateRefTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  hashData(data: string) {
    return hash(data, +process.env.CRYPT_SALT);
  }

  async signUser(userId: string, login: string): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        login,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        login,
      },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updateRefTokenHash(userId: string, refToken: string) {
    const hash = await this.hashData(refToken);
    const user = await this.userService.findOne(userId);
    user.hashedRefToken = hash;
  }
}
