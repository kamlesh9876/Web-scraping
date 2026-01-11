import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { NavigationProxyModule } from './modules/navigation-proxy/navigation-proxy.module';
import { CategoryProxyModule } from './modules/category-proxy/category-proxy.module';
import { ProductProxyModule } from './modules/product-proxy/product-proxy.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/api-gateway'),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),
    NavigationProxyModule,
    CategoryProxyModule,
    ProductProxyModule,
    HistoryModule,
  ],
})
export class AppModule {}
