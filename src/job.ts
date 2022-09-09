import { NestFactory } from '@nestjs/core';

import { JobModule } from './job.module';

async function bootstrap() {
  const app = await NestFactory.create(JobModule);

  app.enableShutdownHooks();

  await app.init();
}
bootstrap();
