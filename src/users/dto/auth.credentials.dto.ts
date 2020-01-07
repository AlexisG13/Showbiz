import { IsDefined, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsDefined()
  username: string;
  @IsDefined()
  password: string;
  @IsDefined()
  @IsEmail()
  email: string;
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
