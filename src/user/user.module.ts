import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

import { DepartmentModule } from '../department/department.module';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserProducerService } from '../jobs/producers/user.producer.service';
import { UserConsumer } from '../jobs/consumers/user.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'user',
    }),
    HttpModule,
    forwardRef(() => DepartmentModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserProducerService, UserConsumer],
  exports: [UserProducerService, UserService],
})
export class UserModule {}
