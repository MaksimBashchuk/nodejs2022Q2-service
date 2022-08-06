import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(body: CreateUserDto) {
    const newUser = await this.userService.create(body);
    return new User(newUser);
  }

  // login() {}

  // refresh() {}
}
