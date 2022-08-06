import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { GetCurrentUser } from '../common/decorators/get-user.decorator';
import { GetCurrentUserId } from '../common/decorators/get-user-id.decorator copy';
import { Public } from '../common/decorators/public.decorator';
import { RefreshGuard } from '../common/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() body: CreateUserDto): Promise<Tokens> {
    const tokens = await this.authService.signUp(body);
    return tokens;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: CreateUserDto): Promise<Tokens> {
    return this.authService.login(body);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string) {
    await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refToken') token: string,
  ) {
    return this.authService.refresh(userId, token);
  }
}
