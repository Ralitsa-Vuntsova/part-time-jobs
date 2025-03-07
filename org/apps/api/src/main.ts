import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from './config';
import { SeedsService } from './seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.get('server.port');

  const seedService = app.get(SeedsService);
  await seedService.runSeed();

  app.enableCors();

  await app.listen(port);
}

bootstrap();
