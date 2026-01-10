import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetailService } from './product-detail.service';
import { ProductDetail, ProductDetailSchema } from './product-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductDetail.name, schema: ProductDetailSchema }])
  ],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
