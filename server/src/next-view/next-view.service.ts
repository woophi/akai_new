// @ts-ignore
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { coreConfig } from 'src/config/core.config';

@Injectable()
export class NextViewService implements OnModuleInit {
  private server: NextServer;

  constructor(
    @Inject(coreConfig.KEY)
    private core: ConfigType<typeof coreConfig>,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: this.core.devMode,
        dir: '../../../',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }
}
