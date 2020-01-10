/* istanbul ignore file */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class JWT extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  jwt: string;
  @ManyToOne(
    type => User,
    user => user.jwts,
  )
  user: User;
}
