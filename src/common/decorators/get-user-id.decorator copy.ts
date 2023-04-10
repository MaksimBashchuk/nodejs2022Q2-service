import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../../auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = <AuthPayload>req.user;
    return user.sub;
  },
);
