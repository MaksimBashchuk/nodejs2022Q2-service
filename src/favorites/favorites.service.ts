import { Injectable } from '@nestjs/common';

import { Favorite } from './entities/favorite.entity';

import { storage } from '../data/storage';

@Injectable()
export class FavoritesService {
  async findAll(): Promise<Favorite> {
    return new Promise((res) => {
      res(storage.favorites);
    });
  }

  async findOne(type: string, id: string): Promise<string> {
    return new Promise((res) => {
      const entityId = storage.favorites[`${type}s`].find(
        (item) => item === id,
      );
      res(entityId);
    });
  }

  async add(type: string, id: string): Promise<void> {
    return new Promise((res) => {
      storage.favorites[`${type}s`].push(id);
      res();
    });
  }

  async remove(type: string, id: string): Promise<void> {
    return new Promise((res) => {
      const result = storage.favorites[`${type}s`].filter(
        (item) => item !== id,
      );
      storage.favorites[`${type}s`] = result;
      res();
    });
  }
}
