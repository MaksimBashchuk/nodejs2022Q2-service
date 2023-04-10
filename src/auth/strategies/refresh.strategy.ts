import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthPayload, RefreshPayload } from '../types';

config();

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthPayload): RefreshPayload {
    const refToken = req?.get('Authorization')?.replace('Bearer', '').trim();

    if (!refToken) throw new ForbiddenException('Refresh token malformed');

    return { ...payload, refToken };
  }
}
