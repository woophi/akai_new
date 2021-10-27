import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextViewService } from './next-view.service';

@Controller('/')
export class NextViewController {
  constructor(private readonly nvs: NextViewService) {}

  @Get('*')
  public async all(@Req() req: Request, @Res() res: Response) {
    await this.nvs.handler(req, res);
  }

  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.nvs.handler(req, res);
  }
}
