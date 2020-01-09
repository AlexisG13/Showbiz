import { IsDefined, IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsDefined()
  username: string;
  @IsDefined()
  password: string;
  @IsDefined()
  @IsEmail()
  email: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  role: string;
}
