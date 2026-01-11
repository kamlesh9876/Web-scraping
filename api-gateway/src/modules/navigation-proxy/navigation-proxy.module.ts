import { Module } from '@nestjs/common';
import { NavigationProxyController } from './navigation-proxy.controller';
import { NavigationProxyService } from './navigation-proxy.service';

@Module({
  controllers: [NavigationProxyController],
  providers: [NavigationProxyService],
  exports: [NavigationProxyService],
})
export class NavigationProxyModule {}
