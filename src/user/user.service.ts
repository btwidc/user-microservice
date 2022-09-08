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

  async connectUsersWithDepartment(departmentName: string): Promise<void> {
    const department = await this.departmentService.getDepartment(
      departmentName,
    );
    department.users = await this.userRepository.find();
    await this.departmentService.saveDepartment(department);
  }

  async addNewUsers(newUsers): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(newUsers)
      .execute();
    await this.connectUsersWithDepartment('Front-end');
  }
}
