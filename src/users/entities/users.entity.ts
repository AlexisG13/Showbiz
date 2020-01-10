/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { JWT } from './jwt.entity';
import { Rent } from './rent.entity';
import { Order } from './order.entity ';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @Column()
  @Exclude()
  salt: string;
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
  @Column({ default: true })
  isActive: boolean;
  @ManyToOne(
    type => Role,
    role => role.users,
    { eager: true },
  )
  role: Role;
  @OneToMany(
    type => JWT,
    jwt => jwt.user,
  )
  jwts: JWT[];

  @OneToMany(
    type => Rent,
    rent => rent.user,
  )
  rents: Rent[];

  @OneToMany(
    type => Order,
    order => order.movie,
  )
  orders: Rent[];

  async validatePassword(password: string): Promise<boolean> {
    const validate = await hash(password, this.salt);
    return validate === this.password;
  }
}
