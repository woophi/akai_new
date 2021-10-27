import { INestApplicationContext } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import { cacheConfig } from 'src/config/cache.config';

export class RedisIoAdapter extends IoAdapter {
  constructor(private readonly app: INestApplicationContext, private readonly cache: ConfigType<typeof cacheConfig>) {
    super(app);
  }
  createIOServer(serverPort: number, options?: ServerOptions) {
    const { host, port, uri, db } = this.cache;
    const pubClient = createClient(!uri ? { host, port: port as number, db } : { url: uri });
    const subClient = pubClient.duplicate();
    const redisAdapter = createAdapter({ pubClient, subClient });
    const server = super.createIOServer(serverPort, options);
    server.adapter(redisAdapter);
    return server;
  }
}
