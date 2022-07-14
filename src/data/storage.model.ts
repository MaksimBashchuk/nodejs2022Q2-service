import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';

export interface IStorage {
  users: User[];
  tracks: Track[];
  artists: Artist[];
}
