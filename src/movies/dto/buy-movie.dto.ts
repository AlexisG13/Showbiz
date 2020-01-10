import { IsDefined, IsNumber } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BuyMovieDto {
  @IsDefined()
  @IsNumber()
  quantity: number;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
