import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { dirname, join } from 'node:path';
import 'dotenv/config';

const PORT = env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const apiFile = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf8',
  );

  const document = load(apiFile) as OpenAPIObject;

  document.servers = [{ url: `http://localhost:${PORT}` }];

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
