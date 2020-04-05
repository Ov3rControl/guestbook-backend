import { IsString } from 'class-validator';

export class CreateMessegeDto {
  @IsString()
  public text: string;

  @IsString()
  public author: string;
}
