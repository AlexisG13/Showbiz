import { IsDefined, IsDate } from 'class-validator';

export class RentMovieDto {
  @IsDefined()
  @IsDate()
  devolutionDate: Date;
}
