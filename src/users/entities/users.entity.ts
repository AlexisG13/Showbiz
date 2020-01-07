import {
  BaseEntity,
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
import { Rent } from 'src/movies/entities/rent.entity';
import { Buy } from 'src/movies/entities/rent.entity copy';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
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
  @ManyToOne(
    type => Role,
    role => role.users,
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
    type => Buy,
    buy => buy.movie,
  )
  buys: Rent[];

  async validatePassword(password: string): Promise<boolean> {
    const validate = await hash(password, this.salt);
    return validate === this.password;
  }
}
