import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { config } from 'dotenv';

import { AppModule } from './app.module';

import { getLogLevels } from './common/utils';

config();

const logLevels = getLogLevels(+process.env.LOGGER_LEVEL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  const port = process.env.PORT || 4000;

  app.useGlobalPipes(new ValidationPipe());

  const apiDocFilePath = resolve(process.cwd(), 'doc', 'api.yaml');
  const apiDoc = await readFile(apiDocFilePath, 'utf8');

  SwaggerModule.setup('doc', app, parse(apiDoc));

  await app.listen(port);
}
bootstrap();
