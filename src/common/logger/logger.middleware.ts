import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: any, res: any, next: () => void) {
    next();
    res.on('finish', () => {
      this.logger.log(
        `Request: ${req.url}, Body: ${JSON.stringify(
          req.body,
        )}, Query: ${JSON.stringify(req.query)}, Status: ${JSON.stringify(
          res.statusCode,
        )}`,
      );
    });
  }
}
