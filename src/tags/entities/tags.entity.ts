/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movies.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @ManyToMany(
    type => Movie,
    movie => movie.tags,
  )
  movies: Movie[];
}
