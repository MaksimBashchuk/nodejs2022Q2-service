import { IsUUID } from 'class-validator';

import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

export class FavoriteResponseDto {
  @IsUUID('4', { each: true })
  artists: Artist[];

  @IsUUID('4', { each: true })
  albums: Album[];

  @IsUUID('4', { each: true })
  tracks: Track[];
}
