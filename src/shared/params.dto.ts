import { IsIn, IsOptional, IsUUID } from 'class-validator';

import { APP_ROUTES } from '../common/constants';

export class Params {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsIn([APP_ROUTES.ALBUM, APP_ROUTES.ARTIST, APP_ROUTES.TRACK])
  route: string;
}
