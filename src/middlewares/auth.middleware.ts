import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import {
  DataStoredInToken,
  RequestWithUser,
} from '../interfaces/auth.interface';
import userModel from '../models/users.model';

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const jwtHeader = req.headers['authorization'];

  const secret = process.env.JWT_SECRET;

  try {
    const verificationResponse = jwt.verify(
      jwtHeader,
      secret
    ) as DataStoredInToken;
    const userId = verificationResponse._id;
    const findUser = await userModel.findById(userId);

    if (findUser) {
      res.locals.user = findUser;
      next();
    } else {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
}

export default authMiddleware;
