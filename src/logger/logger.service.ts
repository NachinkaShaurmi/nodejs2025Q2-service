import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL', 'info');
    const maxFileSize = this.configService.get<number>(
      'LOG_FILE_SIZE_KB',
      2048,
    );

    const fileTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%',
      extension: '.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: `${maxFileSize}k`,
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });

    const errorFileTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%',
      extension: '.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: `${maxFileSize}k`,
      maxFiles: '14d',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });

    const consoleTransport = new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta) : ''
          }`;
        }),
      ),
    });

    this.logger = winston.createLogger({
      level: logLevel,
      levels: winston.config.npm.levels,
      transports: [consoleTransport, fileTransport, errorFileTransport],
    });
  }

  log(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, { context, ...meta });
  }

  error(
    message: string,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.error(message, { context, ...meta });
  }

  warn(
    message: string,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.warn(message, { context, ...meta });
  }

  debug(
    message: string,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.debug(message, { context, ...meta });
  }

  verbose(
    message: string,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.verbose(message, { context, ...meta });
  }
}
