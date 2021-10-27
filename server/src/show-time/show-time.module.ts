import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FetchLimiter } from 'nest-utils';
import { ShowTimeHashService } from './show-time-hash.service';
import { ShowTimeController } from './show-time.controller';
import { ShowTimeService } from './show-time.service';

@Module({
  imports: [HttpModule],
  controllers: [ShowTimeController],
  providers: [ShowTimeService, ShowTimeHashService],
})
export class ShowTimeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FetchLimiter).forRoutes({ path: 'api/show-time*', method: RequestMethod.ALL });
  }
}
