import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './strategies/auth.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UsersService, AuthStrategy, RefreshStrategy],
})
export class AuthModule {}
