import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { storage } from '../data/storage';

@Injectable()
export class ArtistsService {
  async create(createArtistDto: CreateArtistDto) {
    return new Promise<Artist>((res) => {
      const {} = createArtistDto;

      const newArtist: Artist = {
        id: v4(),
        ...createArtistDto,
      };

      storage.artists.push(newArtist);

      res(newArtist);
    });
  }

  async findAll(): Promise<Artist[]> {
    return new Promise((res) => {
      res(storage.artists);
    });
  }

  async findOne(id: string): Promise<Artist> {
    return new Promise((res) => {
      const artist = storage.artists.find((artist) => id === artist.id);
      artist ? res(artist) : res(null);
    });
  }

  async update(
    artist: Artist,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return new Promise((res) => {
      Object.assign(artist, updateArtistDto);

      res(artist);
    });
  }

  async remove(id: string): Promise<void> {
    return new Promise((res) => {
      storage.artists = storage.artists.filter((artist) => id !== artist.id);
      res();
    });
  }
}
