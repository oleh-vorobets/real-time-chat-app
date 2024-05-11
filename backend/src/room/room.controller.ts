import { Body, Controller, Post, UseGuards, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateRoomDto } from './dtos/create-room.dto';
import { AddUsersDto } from './dtos/add-users.dto';

@Controller('room')
// @UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post(':id')
  async addUsers(
    @Body()
    { users }: AddUsersDto,
    @Param('id') roomId: string,
  ) {
    return await this.roomService.addMembers(roomId, users);
  }

  @Post()
  async createRoom(@Body() payload: CreateRoomDto) {
    return await this.roomService.create(payload);
  }

  @Get(':id')
  async getRooms(@Param('id') userId: string) {
    return await this.roomService.getUserRooms(userId);
  }
}
