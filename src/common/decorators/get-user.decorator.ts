import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RefreshPayload } from '../../auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof RefreshPayload | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!data) return req.user;
    return req.user[data];
  },
);
