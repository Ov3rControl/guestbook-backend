import { IsString, IsObject } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  public text: string;

  @IsString()
  public author: string;

  @IsObject()
  public message: string;
}
