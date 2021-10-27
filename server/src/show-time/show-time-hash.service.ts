import { Injectable } from '@nestjs/common';
import { dayInS, HashKey, RedisHashService } from 'nest-utils';
import { ShowTimeService } from './show-time.service';

@Injectable()
export class ShowTimeHashService {
  constructor(private readonly redis: RedisHashService, private readonly ss: ShowTimeService) {}

  async getTvShow(id: number) {
    const hashed = await this.redis.hgetField(HashKey.TVShow, id);
    if (hashed) return hashed;
    const data = await this.ss.getTvShow(id);
    if (data) {
      this.redis.hsetWithExpire(HashKey.TVShow, id, data, dayInS);
    }
    return data;
  }

  async getPerson(id: number) {
    const hashed = await this.redis.hgetField(HashKey.TVPerson, id);
    if (hashed) return hashed;
    const data = await this.ss.getPerson(id);
    if (data) {
      this.redis.hsetWithExpire(HashKey.TVPerson, id, data, dayInS);
    }
    return data;
  }
}
