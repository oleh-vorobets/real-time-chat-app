import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/types/message.type';
import { MessageDto } from './dtos/message.dto';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<Message>,
    private roomService: RoomService,
  ) {}

  async create(messageDto: MessageDto, roomId: string) {
    const room = await this.roomService.findOne(roomId);
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    const newMessage = new this.messageModel({
      message: messageDto.message,
      senderId: messageDto.senderId,
      roomId,
    });

    const savedMessage = await newMessage.save();

    //@ts-ignore
    room.messages.push(savedMessage._id);
    await room.save();
    return savedMessage;
  }

  async getMessages(roomId: string) {
    const room = await this.roomService.findOne(roomId);
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    let messagePromises: any = [];
    for (let messageId of room.messages) {
      messagePromises.push(this.messageModel.findById(messageId));
    }

    const messages = await Promise.all(messagePromises);
    return messages;
  }
}
