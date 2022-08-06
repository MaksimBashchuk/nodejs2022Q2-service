import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { compare, hash } from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import {
  LOGIN_ALREADY_EXISTS,
  REPLACE_TOKEN,
  WRONG_LOGIN,
  WRONG_PASS_RESPONSE,
} from '../common/constants';
import { storage } from '../data/storage';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    if (!this.isLoginUnique(createUserDto.login)) {
      const message = LOGIN_ALREADY_EXISTS.message.replace(
        REPLACE_TOKEN,
        createUserDto.login,
      );
      throw new BadRequestException({ ...LOGIN_ALREADY_EXISTS, message });
    }

    const hashedPass = await this.hashPass(createUserDto.password);

    return new Promise<User>((res) => {
      const newUser: User = {
        id: v4(),
        login: createUserDto.login,
        password: hashedPass,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      storage.users.push(newUser);

      res(newUser);
    });
  }

  async findAll(): Promise<User[]> {
    return new Promise((res) => {
      const users = storage.users;
      res(users);
    });
  }

  async findOne(id: string): Promise<User> {
    return new Promise((res) => {
      const user = storage.users.find((user) => id === user.id);
      user ? res(user) : res(null);
    });
  }

  async update(
    user: User,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const isPassMatch = await compare(oldPassword, user.password);
    if (!isPassMatch) throw new ForbiddenException(WRONG_PASS_RESPONSE);

    const hashedNewPass = await this.hashPass(newPassword);

    return new Promise((res) => {
      user.updatedAt = Date.now();
      user.password = hashedNewPass;
      user.version++;

      res(user);
    });
  }

  async remove(id: string): Promise<void> {
    return new Promise((res) => {
      storage.users = storage.users.filter((user) => id !== user.id);
      res();
    });
  }

  isLoginUnique = (login: string) => {
    return !storage.users.find((user) => user.login === login);
  };

  findOneByLogin = (login: string) => {
    const user = storage.users.find((user) => user.login === login);

    if (!user) {
      const message = WRONG_LOGIN.message.replace(REPLACE_TOKEN, login);
      throw new ForbiddenException({ ...WRONG_LOGIN, message });
    }

    return user;
  };

  async hashPass(pass: string) {
    return await hash(pass, +process.env.CRYPT_SALT);
  }
}
