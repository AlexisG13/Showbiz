import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
