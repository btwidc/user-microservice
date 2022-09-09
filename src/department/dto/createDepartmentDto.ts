import { IsNotEmpty, Length } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @Length(2, 20)
  readonly name: string;
}
