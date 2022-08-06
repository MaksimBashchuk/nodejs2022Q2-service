import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const newUser = await this.authService.signUp(body);
    return new User(newUser);
  }

  @Post('/login')
  login() {
    // this.authService.login();
  }

  @Post('/refresh')
  refresh() {
    // this.authService.refresh();
  }
}
