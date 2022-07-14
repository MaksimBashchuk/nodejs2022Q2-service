import { IsUUID } from 'class-validator';

export class Params {
  @IsUUID('4')
  id: string;
}
