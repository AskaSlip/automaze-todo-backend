import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {AppConfig} from "./configs/config-type";
import 'dotenv/config';
import {ValidationPipe} from "@nestjs/common";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: `${process.env.FRONT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
  );

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');


  await app.listen(appConfig?.port || 5000, () => {
    console.log(
        `App  is running on http://${appConfig?.host}:${appConfig?.port}`,
    );
    console.log(
        `Swagger is running on http://${appConfig?.host}:${appConfig?.port}/docs`,
    );
  });
}

bootstrap();
