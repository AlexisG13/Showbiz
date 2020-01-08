import { IsNotEmpty } from 'class-validator';

export class TagDto {
  @IsNotEmpty()
  title: string;
}
