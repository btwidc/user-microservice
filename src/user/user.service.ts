import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { User } from './user.entity';

import { DepartmentService } from '../department/department.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly departmentService: DepartmentService,
  ) {}

  async getNewUsers(): Promise<AxiosResponse> {
    const newUsers = await this.httpService.axiosRef.get(
      'https://reqres.in/api/users?page=1',
    );
    return newUsers.data;
  }

  async addNewUsersToDepartment(users): Promise<void> {
    const department = await this.departmentService.getDepartmentById(1);
    const newUsers = users.map((user) => ({ ...user, department }));

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(newUsers)
      .execute();
    await this.departmentService.saveDepartment(department);
  }
}
