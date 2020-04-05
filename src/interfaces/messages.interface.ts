import { User } from './users.interface';
import { Reply } from './reply.interface';

export interface Message {
  _id: string;
  text: string;
  author: User;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
}
