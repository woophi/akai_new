import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from 'nest-utils';
import { cacheConfig } from './config/cache.config';
import { coreConfig } from './config/core.config';
import { dbConfig } from './config/db.config';
import { integrationConfig } from './config/integration.config';
import { vkConfig } from './config/vk.config';
import { EventsModule } from './events/events.module';
import { ShowTimeLibModule } from './show-time-lib/show-time-lib.module';
import { ShowTimeModule } from './show-time/show-time.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, cacheConfig, coreConfig, integrationConfig, vkConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ...(configService.get<string>('database.psqlUrl')
          ? {
              url: configService.get<string>('database.psqlUrl'),
            }
          : {
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              database: configService.get<string>('database.dbName'),
            }),
        entities: [__dirname + '/db/client/tables/*{.ts,.js}'],
        migrations: [__dirname + '/db/client/migrations/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logNotifications: true,
        logger: 'advanced-console',
        logging: configService.get<boolean>('core.devMode')
          ? ['query', 'schema', 'error', 'warn']
          : ['migration', 'error', 'warn'],
      }),
      inject: [ConfigService],
    }),
    RedisCacheModule,
    ShowTimeModule,
    EventsModule,
    ShowTimeLibModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
