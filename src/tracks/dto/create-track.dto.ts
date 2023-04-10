import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsUUID('4')
  @IsOptional()
  artistId: string | null;

  @IsUUID('4')
  @IsOptional()
  albumId: string | null;
}
