import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDetail } from './product-detail.schema';
import { TTL_CONSTANTS } from '../../common/constants';
import { isDataStale } from '../../common/utils';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectModel(ProductDetail.name) private productDetailModel: Model<ProductDetail>,
  ) {}

  async findBySourceId(sourceId: string): Promise<ProductDetail | null> {
    return this.productDetailModel.findOne({ source_id: sourceId }).exec();
  }

  async upsertBySourceId(sourceId: string, productDetailData: Partial<ProductDetail>): Promise<ProductDetail> {
    return this.productDetailModel.findOneAndUpdate(
      { source_id: sourceId },
      { ...productDetailData, last_scraped_at: new Date() },
      { new: true, upsert: true }
    ).exec();
  }

  async isDataStale(sourceId: string): Promise<boolean> {
    const productDetail = await this.findBySourceId(sourceId);
    return isDataStale(productDetail?.last_scraped_at || null, TTL_CONSTANTS.PRODUCT_DETAIL);
  }
}
