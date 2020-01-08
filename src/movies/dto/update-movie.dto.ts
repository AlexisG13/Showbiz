import { IsOptional, IsNotEmpty, MinLength, IsArray } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  poster: string;
  @IsOptional()
  stock: number;
  @IsOptional()
  trailer: string;
  @IsOptional()
  salePrice: number;
  @IsOptional()
  availability: boolean;
  @IsOptional()
  @IsArray()
  @MinLength(1, { each: true })
  tags: string[];
}
