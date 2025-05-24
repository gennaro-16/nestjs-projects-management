import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ultra-permissive CORS (allows everything)
  app.enableCors({
    origin: '*',                 // Allow ALL origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // All HTTP methods
    allowedHeaders: '*',         // Allow ALL headers
    credentials: false,          // Disable credentials (set to `true` if using cookies/auth)
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();