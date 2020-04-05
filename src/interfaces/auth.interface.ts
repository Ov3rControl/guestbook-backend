import { Request } from 'express';
import { User } from './users.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
}
export interface RequestWithUser extends Request {
  user: User;
}
