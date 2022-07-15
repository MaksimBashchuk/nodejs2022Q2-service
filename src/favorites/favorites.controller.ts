import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { FavoritesService } from './favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { Params } from '../shared/params.dto';

import { APP_ROUTES } from '../common/constants';
import { generateNotFoundException } from '../common/utils';

@Controller(APP_ROUTES.FAVORITES)
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  getServiceByName(name: string) {
    switch (name) {
      case APP_ROUTES.ALBUM:
        return this.albumsService;
      case APP_ROUTES.ARTIST:
        return this.artistsService;
      case APP_ROUTES.TRACK:
        return this.tracksService;
    }
  }

  @Get()
  async findAll() {
    const { albums, artists, tracks } = await this.favoritesService.findAll();

    const favs: FavoriteResponseDto = {
      albums: await Promise.all(
        albums.map(
          async (albumId) => await this.albumsService.findOne(albumId),
        ),
      ),
      artists: await Promise.all(
        artists.map(
          async (artistId) => await this.artistsService.findOne(artistId),
        ),
      ),
      tracks: await Promise.all(
        tracks.map(
          async (trackId) => await this.tracksService.findOne(trackId),
        ),
      ),
    };

    return favs;
  }

  @Post(':route/:id')
  async create(@Param() { id, route }: Params) {
    const service = this.getServiceByName(route);
    const entity = await service.findOne(id);

    if (!entity) throw new UnprocessableEntityException();

    return this.favoritesService.add(route, id);
  }

  @Delete(':route/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id, route }: Params) {
    const entityId = await this.favoritesService.findOne(route, id);

    if (!entityId) generateNotFoundException(route);

    return this.favoritesService.remove(route, id);
  }
}
