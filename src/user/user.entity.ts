import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Contains, Length } from 'class-validator';

import { Department } from '../department/department.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  @Length(15, 50)
  @Contains('@')
  email: string;

  @Column()
  @Length(2, 15)
  first_name: string;

  @Column()
  @Length(2, 20)
  last_name: string;

  @Column({ default: 'https://avatar' })
  avatar: string;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;
}
