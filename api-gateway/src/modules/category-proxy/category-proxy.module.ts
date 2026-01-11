import { Module } from '@nestjs/common';
import { CategoryProxyController } from './category-proxy.controller';
import { CategoryProxyService } from './category-proxy.service';

@Module({
  controllers: [CategoryProxyController],
  providers: [CategoryProxyService],
  exports: [CategoryProxyService],
})
export class CategoryProxyModule {}
