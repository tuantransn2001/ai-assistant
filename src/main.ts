import * as express from 'express';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// ? Local imports
import { AppModule } from './app.module';
import { I_ENV } from 'src/utils/env/env.config';

async function server() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService<I_ENV>);

  const PORT = config.get<number>('PORT');
  const PREFIX = config.get<string>('PREFIX');
  const SWAGGER_PATH = config.get<string>('SWAGGER_PATH');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gemini example')
    .setDescription('The Gemini API description')
    .setVersion('1.0')
    .addTag('google gemini')
    .addServer(PREFIX)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  app.setGlobalPrefix(PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(express.json({ limit: '1000kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());

  try {
    await app.listen(PORT);
    console.log(`Server started on ${await app.getUrl()}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
server();
