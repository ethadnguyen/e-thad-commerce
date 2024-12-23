import * as dotenv from 'dotenv';
dotenv.config();

import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-version-id',
  });

  const configService = app.get(ConfigService);
  if (!configService.get('App.isProduction') || false) {
    const config = new DocumentBuilder()
      .setTitle('NestJS API E-thad-commerce')
      .setDescription('API e-thad-commerce Documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
  }
  await app.listen(configService.get('APP.port'));
}

bootstrap();
