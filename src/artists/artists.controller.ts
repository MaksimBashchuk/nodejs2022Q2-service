import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { ArtistsService } from './artists.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Params } from '../shared/params.dto';

import { APP_ROUTES, ID_FIELDS } from '../common/constants';
import { generateNotFoundException } from '../common/utils';

@Controller(APP_ROUTES.ARTIST)
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: Params) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) generateNotFoundException(APP_ROUTES.ARTIST);

    return artist;
  }

  @Put(':id')
  async update(
    @Param() { id }: Params,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) generateNotFoundException(APP_ROUTES.ARTIST);

    await this.artistsService.update(artist, updateArtistDto);
    return artist;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: Params) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) generateNotFoundException(APP_ROUTES.ARTIST);
    await this.tracksService.setIdFieldToNull(ID_FIELDS.ARTIST, id);
    await this.albumsService.setIdFieldToNull(ID_FIELDS.ARTIST, id);
    await this.favoritesService.remove(APP_ROUTES.ARTIST, id);
    return await this.artistsService.remove(id);
  }
}
