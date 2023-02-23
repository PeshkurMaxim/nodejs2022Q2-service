import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { getDocument } from './openapi';
import { AllExceptionFilter } from './common/exceptionsFilters/all-exception.filter';
import { CustomLoggerService } from './common/logger/logger.service';

dotenvConfig();

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const logger = app.get(CustomLoggerService);

  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException! Message: ' + err.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.warn('Unhandled Rejection at: ' + promise + '   reason: ' + reason);
  });

  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionFilter(logger));

  const document = await getDocument();
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
