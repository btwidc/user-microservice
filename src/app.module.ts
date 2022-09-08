import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';

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
    DepartmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
