import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';
import { UserDto } from 'src/user/dtos/user.dto';
import { SigninDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: SigninDto) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: UserDto) {
    return await this.userService.findByPayload(payload);
  }
}
