import { Module } from '@nestjs/common';
import { NextViewController } from './next-view.controller';
import { NextViewService } from './next-view.service';

@Module({
  imports: [],
  providers: [NextViewService],
  controllers: [NextViewController],
})
export class NextViewModule {}
