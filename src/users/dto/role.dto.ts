import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;
}
