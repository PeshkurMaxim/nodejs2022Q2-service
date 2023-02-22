import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { getDocument } from './openapi';
import { AllExceptionFilter } from './common/exceptionsFilters/all-exception.filter';

process.on('uncaughtException', (err) => {
  // logger
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  //logger
});

dotenvConfig();

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  const document = await getDocument();
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
