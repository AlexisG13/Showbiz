import { IsDefined, IsDateString } from 'class-validator';

export class RentMovieDto {
  @IsDefined()
  @IsDateString()
  devolutionDate: Date;
}
