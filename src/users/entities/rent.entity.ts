/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Movie } from '../../movies/entities/movies.entity';
import { User } from './users.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  rentId: number;
  @Column()
  userId: number;
  @Column()
  movieId: number;
  @Column({ default: new Date() })
  rentDate: Date;
  @Column()
  devolutionDate: Date;
  @Column({ default: false })
  devolution: boolean;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @ManyToOne(
    type => User,
    user => user.rents,
  )
  user!: User;

  @ManyToOne(
    type => Movie,
    movie => movie.rents,
  )
  movie!: Movie;
}
