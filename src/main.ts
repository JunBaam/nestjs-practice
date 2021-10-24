import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

// NOTE: 시작점
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  await app.listen(serverConfig.port);
  Logger.log(`포트실행중 ${serverConfig.port}`);
}
bootstrap();
