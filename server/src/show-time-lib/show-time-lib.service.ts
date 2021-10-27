import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { autoRetryTransaction, HashKey } from 'nest-utils';
import { RedisHashService } from 'nest-utils/dist/redis-cache/redis-cache.module';
import { LibInfo } from 'src/contracts/library';
import { ShowTimeLibrary } from 'src/db/client/tables/ShowTimeLibrary';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ShowTimeLibService {
  constructor(
    @InjectRepository(ShowTimeLibrary)
    private readonly libTable: Repository<ShowTimeLibrary>,
    private readonly connection: Connection,
    private readonly rHash: RedisHashService,
  ) {}

  async getUserLib(vkUserId: number) {
    const hashed = await this.rHash.hgetField(HashKey.UserLibrary, vkUserId);
    if (hashed) return hashed;
    const data: LibInfo[] = await this.libTable.find({ vkUserId });
    this.rHash.hset(HashKey.UserLibrary, vkUserId, data);

    return data;
  }

  async toggleItemWatched(id: string, vkUserId: number, watched: boolean) {
    const affected = await autoRetryTransaction(this.connection, async qr => {
      const { affected } = await qr.manager.update(ShowTimeLibrary, { vkUserId, id }, { watched });

      if (!affected) return affected;
      this.rHash.hdel(HashKey.UserLibrary, vkUserId);
      await qr.commitTransaction();
      return affected;
    });

    if (!affected) {
      throw new NotFoundException();
    }
  }

  async saveNewItem(vkUserId: number, movieDBId: number) {
    try {
      await autoRetryTransaction(this.connection, async qr => {
        const newItem = new ShowTimeLibrary();

        newItem.movieDBId = movieDBId;
        newItem.vkUserId = vkUserId;
        newItem.watched = false;

        await qr.manager.save(newItem);
        this.rHash.hdel(HashKey.UserLibrary, vkUserId);
        await qr.commitTransaction();
      });
    } catch (error) {
      throw new ConflictException();
    }
  }
  async deleteItem(id: string, vkUserId: number) {
    const affected = await autoRetryTransaction(this.connection, async qr => {
      const { affected } = await qr.manager.delete(ShowTimeLibrary, { vkUserId, id });

      if (!affected) return affected;
      this.rHash.hdel(HashKey.UserLibrary, vkUserId);
      await qr.commitTransaction();
      return affected;
    });
    if (!affected) {
      throw new NotFoundException();
    }
  }
}
