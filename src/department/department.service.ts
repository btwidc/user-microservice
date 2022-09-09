import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/createDepartmentDto';

import { UserService } from '../user/user.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
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
    const newDepartmentData = await this.departmentRepository
      .createQueryBuilder()
      .insert()
      .into(Department)
      .values({ name: createDepartmentDto.name })
      .returning('*')
      .execute();

    return newDepartmentData.raw;
  }

  async deleteDepartment(id: number) {
    await this.userService.deleteUsersInDepartment(id);

    const deletedDepartmentData = await this.departmentRepository
      .createQueryBuilder()
      .delete()
      .from(Department)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return deletedDepartmentData.raw;
  }

  async saveDepartment(department: Department): Promise<Department> {
    return await this.departmentRepository.save(department);
  }

  async getDepartmentWithUsers(id: number) {
    const departmentData = await this.departmentRepository
      .createQueryBuilder('department')
      .innerJoinAndSelect('department.users', 'user')
      .where('department.id = :id', { id })
      .getOne();

    if (!departmentData) {
      return await this.getDepartmentById(id);
    }

    return departmentData;
  }
}
