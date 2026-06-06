import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ApiFail } from './shared/api/response';

import { join } from 'path';
import express from 'express';

async function App() {
  const app = await NestFactory.create(AppModule);

  app.use('/public', express.static(join(process.cwd(), 'public')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors) {
        const message = errors.map((error) =>
          Object.values(error.constraints ?? {}).join(', '),
        )[0];

        const result = new ApiFail(message, 'API 필수값 에러');

        return new BadRequestException(result);
      },
    }),
  );

  app.enableCors({
    origin: [process.env.CORS_URL],
    credentials: true,
    exposedHeaders: ['a-t', 'r-t'],
  });

  app.setGlobalPrefix('backend/api', {
    exclude: ['health'],
  });

  const port = Number(process.env.PORT);

  await app.listen(port);
  console.log('connect', port);
}
App();
