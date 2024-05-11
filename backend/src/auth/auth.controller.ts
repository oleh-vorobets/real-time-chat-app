import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.userService.create(signupDto);
    const token = await this.authService.signPayload(user);
    return { user, token };
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    const user = await this.userService.findUserByLogin(signinDto);
    const token = await this.authService.signPayload(user);
    return { user, token };
  }
}
