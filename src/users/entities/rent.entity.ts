import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Movie } from '../../movies/entities/movies.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  rentId: number;
  @Column()
  userId: number;
  @Column()
  movieId: number;
  @CreateDateColumn({ default: new Date() })
  rentDate: Date;
  @Column('date')
  devolutionDate: Date;
  @Column()
  devolution: boolean;
  @ManyToOne(
    type => User,
    user => user.rents,
  )
  public user!: User;

  @ManyToOne(
    type => Movie,
    movie => movie.rents,
  )
  public movie!: Movie;
}
