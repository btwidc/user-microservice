import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/createDepartmentDto';

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

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentRepository
      .createQueryBuilder()
      .insert()
      .into(Department)
      .values({ name: createDepartmentDto.name })
      .execute();
  }

  async deleteDepartment(id: number) {
    return await this.departmentRepository
      .createQueryBuilder()
      .delete()
      .from(Department)
      .where('id = :id', { id })
      .execute();
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
