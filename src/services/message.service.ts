import { Message } from '../interfaces/messages.interface';
import messageModel from '../models/messages.model';
import { CreateMessegeDto } from '../dtos/messages.dto';
import HttpException from '../exceptions/HttpException';
import { isEmptyObject } from '../utils/util';
import { CreateReplyDto } from 'dtos/reply.dto';

class MessageService {
  public messages = messageModel;

  public async findAllMessages(): Promise<Message[]> {
    const allmessages: Message[] = await this.messages
      .find()
      .populate('replies.author', 'email')
      .populate('author', 'email');
    return allmessages;
  }

  public async createMessage(messageData: CreateMessegeDto): Promise<Message> {
    if (isEmptyObject(messageData))
      throw new HttpException(400, "You're not userData");

    const createMessageData: Message = await this.messages.create({
      ...messageData,
    });
    return createMessageData;
  }

  public async createReply(replyData: CreateReplyDto): Promise<Message> {
    if (isEmptyObject(replyData))
      throw new HttpException(400, "You're not userData");
    const createReplyData: Message = await this.messages.update(
      { _id: replyData.message },
      { $push: { replies: replyData } }
    );

    return createReplyData;
  }

  public async deleteMessageData(messageId: string): Promise<Message> {
    const deleteMessageById: Message = await this.messages.findByIdAndDelete(
      messageId
    );
    if (!deleteMessageById)
      throw new HttpException(409, "Message Doesn't Exsist");

    return deleteMessageById;
  }

  public async updateMessage(
    messageId: string,
    messageData: Message
  ): Promise<Message> {
    if (isEmptyObject(messageData))
      throw new HttpException(400, "You're not userData");

    const updateMessageById: Message = await this.messages.findByIdAndUpdate(
      messageId,
      { ...messageData }
    );
    if (!updateMessageById)
      throw new HttpException(409, "Message Doesn't Exsist");

    return updateMessageById;
  }
}

export default MessageService;
