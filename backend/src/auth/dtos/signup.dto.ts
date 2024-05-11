import { IsString } from 'class-validator';
import { SigninDto } from './signin.dto';

export class SignupDto extends SigninDto {
  @IsString()
  initials: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
