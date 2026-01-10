import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { TTL_CONSTANTS } from '../../common/constants';
import { isDataStale } from '../../common/utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findProducts(categorySlug?: string, page = 1, limit = 20): Promise<{ products: Product[], total: number }> {
    const skip = (page - 1) * limit;
    const filter = categorySlug ? { category_slug: categorySlug } : {};
    
    const [products, total] = await Promise.all([
      this.productModel.find(filter).sort({ title: 1 }).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(filter).exec()
    ]);

    return { products, total };
  }

  async findBySourceId(sourceId: string): Promise<Product | null> {
    return this.productModel.findOne({ source_id: sourceId }).exec();
  }

  async upsertBySourceId(sourceId: string, productData: Partial<Product>): Promise<Product> {
    return this.productModel.findOneAndUpdate(
      { source_id: sourceId },
      { ...productData, last_scraped_at: new Date() },
      { new: true, upsert: true }
    ).exec();
  }

  async isDataStale(categorySlug: string): Promise<boolean> {
    const latestProduct = await this.productModel
      .findOne({ category_slug: categorySlug })
      .sort({ last_scraped_at: -1 })
      .exec();
    
    return isDataStale(latestProduct?.last_scraped_at || null, TTL_CONSTANTS.PRODUCT_GRID);
  }
}
