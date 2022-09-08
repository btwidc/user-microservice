import { Controller, Get, Param } from '@nestjs/common';

import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.departmentService.getDepartmentUsers(name);
  }
}
