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

import { AlbumsService } from './albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Params } from '../shared/params.dto';

import { APP_ROUTES, ID_FIELDS } from '../common/constants';
import { generateNotFoundException } from '../common/utils';

@Controller(APP_ROUTES.ALBUM)
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: Params) {
    const album = await this.albumsService.findOne(id);

    if (!album) generateNotFoundException(APP_ROUTES.ALBUM);

    return album;
  }

  @Put(':id')
  async update(
    @Param() { id }: Params,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.findOne(id);

    if (!album) generateNotFoundException(APP_ROUTES.ALBUM);

    await this.albumsService.update(album, updateAlbumDto);
    return album;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: Params) {
    const album = await this.albumsService.findOne(id);

    if (!album) generateNotFoundException(APP_ROUTES.ALBUM);
    await this.tracksService.setIdFieldToNull(ID_FIELDS.ALBUM, id);
    await this.favoritesService.remove(APP_ROUTES.ALBUM, id);
    return await this.albumsService.remove(id);
  }
}
