import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, ManyToMany } from 'typeorm';
import { Movie } from '../../movies/entities/movies.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToMany(type => Movie, movie => movie.tags)
  movies: Movie[];
}
