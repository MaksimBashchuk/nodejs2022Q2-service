import { Module } from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistsController } from './artists.controller';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, TracksService, FavoritesService],
})
export class ArtistsModule {}
