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

  async getDepartment(name: string): Promise<Department> {
    return await this.departmentRepository.findOneBy({
      name,
    });
  }

  async saveDepartment(department: Department): Promise<Department> {
    return await this.departmentRepository.save(department);
  }
}
