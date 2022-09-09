import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Department } from './department.entity';
import { DepartmentService } from './department.service';

import { CreateDepartmentDto } from './dto/createDepartmentDto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getDepartments(): Promise<Department[]> {
    return this.departmentService.getDepartments();
  }

  @Get(':id')
  getDepartmentWithUsers(@Param('id') id: number) {
    return this.departmentService.getDepartmentWithUsers(id);
  }

  @Post()
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Delete(':id')
  deleteDepartment(@Param('id') id: number) {
    return this.departmentService.deleteDepartment(id);
  }
}
