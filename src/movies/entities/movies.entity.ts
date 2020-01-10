/* istanbul ignore file */
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rent } from '../../users/entities/rent.entity';
import { Tag } from '../../tags/entities/tags.entity';
import { Order } from '../../users/entities/order.entity ';

@Entity()
export class Movie {
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
  @Column({ default: 0 })
  likes: number;
  @Column()
  availability: boolean;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @OneToMany(
    type => Rent,
    rent => rent.movie,
  )
  rents: Rent[];
  @OneToMany(
    type => Order,
    order => order.movie,
  )
  orders: Rent[];
  @ManyToMany(
    type => Tag,
    tag => tag.movies,
    { eager: true },
  )
  @JoinTable()
  tags: Tag[];
}
