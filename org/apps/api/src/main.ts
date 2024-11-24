import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.get('server.port');

  app.enableCors();

  await app.listen(port);
}

bootstrap();
