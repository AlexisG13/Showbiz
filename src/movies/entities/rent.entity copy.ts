import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Movie } from './movies.entity';

@Entity()
export class Buy {
  @PrimaryGeneratedColumn()
  rentId: number;
  @Column()
  userId: number;
  @Column()
  movieId: number;
  @CreateDateColumn({ default: new Date() })
  boughtDate: Date;
  @ManyToOne(
    type => User,
    user => user.buys,
  )
  public user!: User;

  @ManyToOne(
    type => Movie,
    movie => movie.buys,
  )
  public movie!: Movie;
}
