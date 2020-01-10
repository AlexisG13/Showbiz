/* istanbul ignore file */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @OneToMany(
    type => User,
    user => user.role,
  )
  users: User[];
}
