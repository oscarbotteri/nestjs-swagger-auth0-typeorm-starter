import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);

  // This will cause class-validator to use nestJS module resolution
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Compression middleware for responses
  app.use(compression());

  // Sets global pipe for auto validate routes https://docs.nestjs.com/pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Sets global interceptor to log each http request/response
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  // sets global interceptor to serialize controller responses using class-transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Starts API listening on the desidered port
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
