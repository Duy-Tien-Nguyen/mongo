/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation') 
    .setDescription('API for my NestJS project')  
    .setVersion('1.0')  // Phiên bản API
    // .setBasePath(globalPrefix)
    .addBearerAuth()  // Nếu có xác thực JWT
    .build();

  const document = ()=> SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document,{
    jsonDocumentUrl:'api-json'
  }); // Đường dẫn /api sẽ mở Swagger UI
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
