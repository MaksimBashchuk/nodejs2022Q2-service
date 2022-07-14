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

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Params } from '../shared/params.dto';

import { APP_ROUTES } from '../common/constants';
import { generateNotFoundException } from '../common/utils';

@Controller(APP_ROUTES.TRACK)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: Params) {
    const track = await this.tracksService.findOne(id);

    if (!track) generateNotFoundException(APP_ROUTES.TRACK);

    return track;
  }

  @Put(':id')
  async update(
    @Param() { id }: Params,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) generateNotFoundException(APP_ROUTES.TRACK);

    await this.tracksService.update(track, updateTrackDto);
    return track;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: Params) {
    const track = await this.tracksService.findOne(id);

    if (!track) generateNotFoundException(APP_ROUTES.TRACK);
    return await this.tracksService.remove(id);
  }
}
