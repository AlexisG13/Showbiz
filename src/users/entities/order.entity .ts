/* istanbul ignore file */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movies.entity';
import { User } from './users.entity';

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
  total: number;
  @UpdateDateColumn()
  updatedDate: Date;
  @Column()
  quantity: number;
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
