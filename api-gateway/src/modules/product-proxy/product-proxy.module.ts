import { Module } from '@nestjs/common';
import { ProductProxyController } from './product-proxy.controller';
import { ProductProxyService } from './product-proxy.service';

@Module({
  controllers: [ProductProxyController],
  providers: [ProductProxyService],
  exports: [ProductProxyService],
})
export class ProductProxyModule {}
