import { IsDefined, IsEmail} from 'class-validator';

export class AuthCredentialsDto {
  @IsDefined()
  username: string;
  @IsDefined()
  password: string;
  @IsDefined()
  @IsEmail()
  email: string;
}
