import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { dirname, join } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT', 4000);

  const loggerService = app.get(LoggerService);

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const apiFile = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf8',
  );

  const document = load(apiFile) as OpenAPIObject;

  document.servers = [{ url: `http://localhost:${PORT}` }];

  SwaggerModule.setup('doc', app, document);

  process.on('uncaughtException', (error) => {
    loggerService.error('Uncaught Exception', 'UncaughtException', {
      trace: error.stack,
    });
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error('Unhandled Rejection', 'UnhandledRejection', {
      trace: reason instanceof Error ? reason.stack : String(reason),
      promise: String(promise),
    });
  });

  await app.listen(PORT);

  loggerService.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
