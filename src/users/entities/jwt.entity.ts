import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class JWT extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  jwt: string;
  @Column()
  expiration: Date;
  @ManyToOne(
    type => User,
    user => user.jwts,
  )
  user: User;
}
