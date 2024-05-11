import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Room } from 'src/types/room.type';
import { CreateRoomDto } from './dtos/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    private userService: UserService,
    @InjectModel('Room') private roomModel: Model<Room>,
  ) {}

  async addMember(roomId: Types.ObjectId, userEmail: string) {
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new HttpException(
        `This room doesn't exist!`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userService.addRoom(roomId, userEmail);

    const user = await this.userService.findByEmail(userEmail);
    room.users.push(user._id);

    return await room.save();
  }

  async addMembers(roomId: string, userIds: string[]) {
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new HttpException(
        `This room doesn't exist!`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const addPromises: Promise<any>[] = [];
    for (let userId of userIds) {
      addPromises.push(this.userService.addRoom(roomId, userId));
    }
    await Promise.all(addPromises);

    const ids: any = [];
    for (let userId of userIds) {
      ids.push((await this.userService.findById(userId))._id); // FIX
    }

    room.users = ids;
    return await room.save();
  }

  async create(payload: CreateRoomDto) {
    const userPromises: Promise<any>[] = []; // check if all users exist
    for (let user of payload.users) {
      userPromises.push(this.userService.findById(user));
    }
    await Promise.all(userPromises);

    const room = await new this.roomModel({
      name: payload.name,
      messages: [],
      users: payload.users,
    }).save();

    const promises: Promise<any>[] = [];
    for (let userId of payload.users) {
      promises.push(this.userService.addRoom(room._id, userId));
    }
    await Promise.all(promises);
    return room._id;
  }

  async getUserRooms(userId: string) {
    const user = await this.userService.findById(userId);
    const promises: Promise<any>[] = [];
    for (let room of user.rooms) {
      promises.push(this.roomModel.findById(room));
    }
    const rooms = await Promise.all(promises);
    return rooms.reverse();
  }

  async findOne(roomId: Types.ObjectId | string) {
    return await this.roomModel.findById(roomId);
  }
}
