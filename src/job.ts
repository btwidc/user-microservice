import { NestFactory } from '@nestjs/core';
import { JobModule } from './job.module';

async function bootstrap() {
  const app = await NestFactory.create(JobModule);
  await app.init();
}
bootstrap();
