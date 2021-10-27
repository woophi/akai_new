import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FetchLimiter } from 'nest-utils';
import { ShowTimeLibrary } from 'src/db/client/tables/ShowTimeLibrary';
import { ShowTimeLibController } from './show-time-lib.controller';
import { ShowTimeLibService } from './show-time-lib.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShowTimeLibrary])],
  controllers: [ShowTimeLibController],
  providers: [ShowTimeLibService],
})
export class ShowTimeLibModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FetchLimiter).forRoutes({ path: 'api/show-time/lib*', method: RequestMethod.ALL });
  }
}
