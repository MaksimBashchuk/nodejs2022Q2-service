import { User } from 'src/users/entities/user.entity';

export interface IStorage {
  users: User[];
}
