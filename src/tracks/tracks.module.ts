import { Module } from '@nestjs/common';

import { TracksService } from './tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FavoritesService],
})
export class TracksModule {}
