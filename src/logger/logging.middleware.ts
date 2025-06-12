import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const startTime = Date.now();

    this.loggerService.log(`Incoming request`, 'LoggingMiddleware', {
      method,
      url: originalUrl,
      query,
      body,
    });

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const { statusCode } = res;

      this.loggerService.log(`Response sent`, 'LoggingMiddleware', {
        method,
        url: originalUrl,
        statusCode,
        responseTime: `${responseTime}ms`,
      });
    });

    next();
  }
}
