import { Controller, Get, Param } from '@nestjs/common';

import { Department } from './department.entity';
import { DepartmentService } from './department.service';

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
}
