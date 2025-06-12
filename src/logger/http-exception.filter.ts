import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    this.loggerService.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      'HttpExceptionFilter',
      {
        trace: exception.stack,
        path: request.url,
        method: request.method,
        body: request.body,
        query: request.query,
      },
    );

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return response
        .status(status)
        .json({ statusCode: status, message: 'Internal server error' });
    }

    return response
      .status(status)
      .json(
        exception instanceof HttpException
          ? exception.getResponse()
          : { statusCode: status, message },
      );
  }
}
