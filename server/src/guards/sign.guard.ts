import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { vk } from 'nest-utils';
import { Observable } from 'rxjs';
import { vkAppAdapterFromBasePath } from 'src/adapters/vk-app.adapter';
import { coreConfig } from 'src/config/core.config';
import { vkConfig } from 'src/config/vk.config';

@Injectable()
export class SignGuard implements CanActivate {
  constructor(
    @Inject(vkConfig.KEY)
    private vkKeys: ConfigType<typeof vkConfig>,
    @Inject(coreConfig.KEY)
    private core: ConfigType<typeof coreConfig>,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const basePath = request.path.split('/')[2];
    const selectedVkApp = vkAppAdapterFromBasePath[basePath];

    const signed = vk.isSignValid(request.query as any, this.vkKeys[selectedVkApp].secretKey ?? '');

    return this.core.devMode || signed;
  }
}
