import { Module } from '@nestjs/common';

import { AlbumsService } from './albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService, FavoritesService],
})
export class AlbumsModule {}
