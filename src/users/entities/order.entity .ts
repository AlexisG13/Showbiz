import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Movie } from '../../movies/entities/movies.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  rentId: number;
  @Column()
  userId: number;
  @Column()
  movieId: number;
  @CreateDateColumn({ default: new Date() })
  boughtDate: Date;
  @Column()
  Total: number;
  @Column()
  Quantity: number;
  @ManyToOne(
    type => User,
    user => user.orders,
  )
  public user!: User;

  @ManyToOne(
    type => Movie,
    movie => movie.orders,
  )
  public movie!: Movie;
}
