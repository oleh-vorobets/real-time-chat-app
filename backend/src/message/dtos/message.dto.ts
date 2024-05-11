import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  senderId: Types.ObjectId;
}
