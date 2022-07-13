import { IsUUID } from 'class-validator';

export class Params {
  @IsUUID()
  id: string;
}
