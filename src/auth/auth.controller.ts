import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types/tokens';
import { GetCurrentUser } from 'src/common/decorators/get-user.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-user-id.decorator copy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto): Promise<Tokens> {
    return await this.authService.signUp(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: CreateUserDto): Promise<Tokens> {
    return this.authService.login(body);
  }

  @Post('logout')
  async logout(@GetCurrentUserId() userId: string) {
    await this.authService.logout(userId);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('hashedRefToken') token: string,
  ) {
    this.authService.refresh(userId, token);
  }
}
