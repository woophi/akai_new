import { ValidationPipe } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import moment from 'moment';
import { TimeoutInterceptor } from 'nest-utils';
import { join } from 'path';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { AppModule } from './app.module';
import { cacheConfig } from './config/cache.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(
    helmet({
      frameguard: false,
      contentSecurityPolicy: false,
    }),
  );
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useWebSocketAdapter(new RedisIoAdapter(app, configService.get<ConfigType<typeof cacheConfig>>('cache')!));

  const config = new DocumentBuilder().setTitle('Show-time api').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('core.port', 3000);
  await app.listen(port, () => {
    console.log(moment().format('DD MM YYYY hh:mm:ss'));
    console.log('Server listen on port', port, 'in', process.env.NODE_ENV, 'mode');
  });
}
bootstrap();
