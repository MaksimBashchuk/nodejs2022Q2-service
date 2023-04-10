import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { storage } from '../data/storage';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    return new Promise<User>((res) => {
      const newUser: User = {
        id: v4(),
        login: createUserDto.login,
        password: createUserDto.password,
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

  async update(user: User, { newPassword }: UpdatePasswordDto): Promise<User> {
    return new Promise((res) => {
      user.updatedAt = Date.now();
      user.password = newPassword;
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
}
