import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';

import { User } from '../user/user.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 20)
  name: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
