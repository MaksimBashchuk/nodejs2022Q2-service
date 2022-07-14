import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';

export interface IStorage {
  users: User[];
  tracks: Track[];
}
