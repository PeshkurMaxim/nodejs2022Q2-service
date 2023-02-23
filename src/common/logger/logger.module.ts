import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { RequestLoggerMiddleware } from './logger.middleware';

@Module({
  providers: [CustomLoggerService, RequestLoggerMiddleware],
  exports: [CustomLoggerService, RequestLoggerMiddleware],
})
export class LoggerModule {}
