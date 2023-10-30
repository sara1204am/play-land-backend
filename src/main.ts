/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalPrefixOptions } from '@nestjs/common/interfaces';
import { AuthGuard } from './core-services/guards/auth.guard';
import { AuthService } from './services/auth/auth.service';

const prefixOptions: GlobalPrefixOptions = {
  exclude: ['/'],
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: false,
  });
  app.setGlobalPrefix(process.env.API_ROOT || 'api', prefixOptions);

  /* const config = new DocumentBuilder()
  .setTitle('SPCC- API REST')
  .setDescription('All endpoints for the application')
  .setVersion('1.0')
  .addBasicAuth({
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
    description: 'JWT authorization of an API',
    bearerFormat: 'JWT',
  })
  .addApiKey(
    {
      type: 'apiKey',
      in: 'header',
      name: 'platform-seed',
      description: 'Platform seed of your project',
    },
    'platform-seed',
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);
  app.useGlobalGuards(new AuthGuard(reflector, authService)) */;
  
  await app.listen(3000);
}
bootstrap();
