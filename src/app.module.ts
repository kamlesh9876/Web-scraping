import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { BullModule } from '@nestjs/bullmq';

import { AppController } from './app.controller';
import { NavigationModule } from './modules/navigation/navigation.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';
import { ReviewModule } from './modules/review/review.module';
import { ScrapeJobModule } from './modules/scrape-job/scrape-job.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/world-of-books'),
    // BullModule.forRoot({
    //   connection: {
    //     host: process.env.REDIS_HOST || 'localhost',
    //     port: parseInt(process.env.REDIS_PORT || '6379'),
    //   },
    // }),
    NavigationModule,
    CategoryModule,
    ProductModule,
    ProductDetailModule,
    ReviewModule,
    ScrapeJobModule,
    QueueModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
