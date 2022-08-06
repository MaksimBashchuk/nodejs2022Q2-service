import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';

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

  async validate(req: Request, payload: any) {
    const refToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refToken };
  }
}
