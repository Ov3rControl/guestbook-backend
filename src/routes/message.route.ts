import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import MessageController from '../controllers/messegas.controller';
import authMiddleware from '../middlewares/auth.middleware';

class MessageRoute implements Route {
  public path = '/message';
  public router = Router();
  public messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/allmessages`,
      authMiddleware,
      this.messageController.getMessages
    );
    this.router.post(
      `${this.path}/createmessage`,
      authMiddleware,
      this.messageController.createMessage
    );
    this.router.post(
      `${this.path}/createreply`,
      authMiddleware,
      this.messageController.createReply
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.messageController.deleteMessage
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      this.messageController.updateMessage
    );
  }
}

export default MessageRoute;
