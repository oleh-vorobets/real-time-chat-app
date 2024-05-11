import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SanitizeUserInterceptor } from './user/interceptors/sanitize-user.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Chat')
    .setDescription('Real time chat apllication')
    .setVersion('1.0')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new SanitizeUserInterceptor(),
    new LoggerInterceptor(),
  );
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
