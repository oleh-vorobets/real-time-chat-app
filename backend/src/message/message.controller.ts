import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageDto } from './dtos/message.dto';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('message')
// @UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async addMessage(
    @Body() messageDto: MessageDto,
    @Body('roomId') roomId: string,
  ) {
    return await this.messageService.create(messageDto, roomId);
  }

  @Get(':id')
  async getRoomMessages(@Param('id') roomId: string) {
    return await this.messageService.getMessages(roomId);
  }
}
