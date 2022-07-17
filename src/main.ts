import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

import { AppModule } from './app.module';

import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.useGlobalPipes(new ValidationPipe());

  const apiDocFilePath = resolve(process.cwd(), 'doc', 'api.yaml');
  const apiDoc = await readFile(apiDocFilePath, 'utf8');

  SwaggerModule.setup('doc', app, parse(apiDoc));

  await app.listen(port);
}
bootstrap();
