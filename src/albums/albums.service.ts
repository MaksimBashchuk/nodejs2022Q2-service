import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { storage } from '../data/storage';

@Injectable()
export class AlbumsService {
  async create(createAlbumDto: CreateAlbumDto) {
    return new Promise<Album>((res) => {
      const { artistId, name, year } = createAlbumDto;

      const newAlbum: Album = {
        id: v4(),
        name,
        year,
        artistId: artistId || null,
      };

      storage.albums.push(newAlbum);

      res(newAlbum);
    });
  }

  async findAll(): Promise<Album[]> {
    return new Promise((res) => {
      res(storage.albums);
    });
  }

  async findOne(id: string): Promise<Album> {
    return new Promise((res) => {
      const album = storage.albums.find((album) => id === album.id);
      album ? res(album) : res(null);
    });
  }

  async update(album: Album, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return new Promise((res) => {
      Object.assign(album, updateAlbumDto);

      res(album);
    });
  }

  async remove(id: string): Promise<void> {
    return new Promise((res) => {
      storage.albums = storage.albums.filter((album) => id !== album.id);
      res();
    });
  }
}
