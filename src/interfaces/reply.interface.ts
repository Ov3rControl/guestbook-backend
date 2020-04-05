import { User } from './users.interface';

export interface Reply {
  _id: string;
  text: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}
