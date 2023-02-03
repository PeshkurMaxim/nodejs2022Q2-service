import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { getDocument } from './openapi';

dotenvConfig();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = await getDocument();
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
