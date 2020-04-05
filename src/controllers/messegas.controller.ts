import { NextFunction, Request, Response } from 'express';
import MessageService from '../services/message.service';
import { Message } from 'interfaces/messages.interface';
import { CreateMessegeDto } from 'dtos/messages.dto';
import { CreateReplyDto } from 'dtos/reply.dto';
import { Reply } from 'interfaces/reply.interface';

class MessageController {
  public messageService = new MessageService();

  public getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllMessagesData: Message[] = await this.messageService.findAllMessages();
      res
        .status(200)
        .json({ data: findAllMessagesData, message: 'allmessages' });
    } catch (error) {
      next(error);
    }
  };

  public createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const messageData: CreateMessegeDto = req.body;
    messageData['author'] = res.locals.user.id; //Alter the Author value in the DTO

    try {
      const createMessageData: Message = await this.messageService.createMessage(
        messageData
      );
      res
        .status(201)
        .json({ data: createMessageData, message: 'messageCreated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const messageId: string = req.params.id;

    try {
      const deleteMessageData: Message = await this.messageService.deleteMessageData(
        messageId
      );
      res.status(200).json({ data: deleteMessageData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const messageId: string = req.params.id;
    const messageData: Message = req.body;

    try {
      const updateMessageData: Message = await this.messageService.updateMessage(
        messageId,
        messageData
      );
      res.status(200).json({ data: updateMessageData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public createReply = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const replyData: CreateReplyDto = req.body;
    replyData['author'] = res.locals.user.id; //Alter the Author value in the DTO

    try {
      const createReplyData: Reply = await this.messageService.createReply(
        replyData
      );
      res.status(201).json({ data: createReplyData, message: 'replyCreated' });
    } catch (error) {
      next(error);
    }
  };
}

export default MessageController;
