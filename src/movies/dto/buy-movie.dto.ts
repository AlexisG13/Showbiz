import { IsDefined, IsNumber } from 'class-validator';

export class BuyMovieDto {
  @IsDefined()
  @IsNumber()
  quantity: number;
}
