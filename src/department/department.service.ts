import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async getDepartments(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async getDepartmentById(id: number): Promise<Department> {
    return await this.departmentRepository.findOneBy({
      id,
    });
  }

  async saveDepartment(department: Department): Promise<Department> {
    return await this.departmentRepository.save(department);
  }

  async getDepartmentWithUsers(id: number) {
    return await this.departmentRepository
      .createQueryBuilder('department')
      .innerJoinAndSelect('department.users', 'user')
      .where('department.id = :id', { id })
      .getMany();
  }
}
