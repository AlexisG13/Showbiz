import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Rent } from './rent.entity';
import { Tag } from '../../tags/entities/tags.entity';
import { Buy } from './rent.entity copy';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  poster: string;
  @Column()
  stock: number;
  @Column()
  trailer: string;
  @Column()
  salePrice: number;
  @Column()
  likes: number;
  @Column()
  availability: boolean;
  @OneToMany(
    type => Rent,
    rent => rent.movie,
  )
  rents: Rent[];
  @OneToMany(
    type => Buy,
    buy => buy.movie,
  )
  buys: Rent[];
  @ManyToMany(type => Tag, category => tag.movies)
  @JoinTable()
  tags: Tag[];
}
