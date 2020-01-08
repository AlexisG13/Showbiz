import { IsDefined, IsArray, MinLength } from 'class-validator';

export class MovieDto {
  @IsDefined()
  title: string;
  @IsDefined()
  description: string;
  @IsDefined()
  poster: string;
  @IsDefined()
  stock: number;
  @IsDefined()
  trailer: string;
  @IsDefined()
  salePrice: number;
  @IsDefined()
  availability: boolean;
  @IsDefined()
  @IsArray()
  @MinLength(1, { each: true })
  tags: string[];
}
