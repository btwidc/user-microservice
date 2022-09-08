import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserProducerService } from '../jobs/producers/user.producer.service';
import { UserConsumer } from '../jobs/consumers/user.consumer';

import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'user',
    }),
    HttpModule,
    DepartmentModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProducerService, UserConsumer],
  exports: [UserProducerService],
})
export class UserModule {}
