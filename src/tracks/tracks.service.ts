import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { storage } from '../data/storage';

@Injectable()
export class TracksService {
  async create(createTrackDto: CreateTrackDto) {
    return new Promise<Track>((res) => {
      const { albumId, artistId, duration, name } = createTrackDto;

      const newTrack: Track = {
        id: v4(),
        name,
        duration,
        albumId: albumId || null,
        artistId: artistId || null,
      };

      storage.tracks.push(newTrack);

      res(newTrack);
    });
  }

  async findAll(): Promise<Track[]> {
    return new Promise((res) => {
      res(storage.tracks);
    });
  }

  async findOne(id: string): Promise<Track> {
    return new Promise((res) => {
      const track = storage.tracks.find((track) => id === track.id);
      track ? res(track) : res(null);
    });
  }

  async update(track: Track, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return new Promise((res) => {
      Object.assign(track, updateTrackDto);

      res(track);
    });
  }

  async remove(id: string): Promise<void> {
    return new Promise((res) => {
      storage.tracks = storage.tracks.filter((track) => id !== track.id);
      res();
    });
  }

  async setIdFieldToNull(fieldName: string, id: string): Promise<void> {
    return new Promise((res) => {
      storage.tracks.forEach((track) => {
        if (id === track[fieldName]) {
          track[fieldName] = null;
        }
      });
      res();
    });
  }
}
