import {
  Module,
  OnModuleInit,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';

import { UserProducerService } from './jobs/producers/user.producer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'btwidc',
      password: 'btwidc',
      database: 'user_microservice_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DepartmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class JobModule implements OnModuleInit, BeforeApplicationShutdown {
  constructor(private readonly userProducerService: UserProducerService) {}
  async onModuleInit() {
    await this.userProducerService.jobAddNewUsers();
  }
  async beforeApplicationShutdown() {
    await this.userProducerService.clearUnnecessaryJobs();
  }
}
