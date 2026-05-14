import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.enableShutdownHooks();
    // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Read PORT from .env
  const port = configService.get<number>('PORT') || 5000;

  await app.listen(port);
}
bootstrap();
