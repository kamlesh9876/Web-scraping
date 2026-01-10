import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { TTL_CONSTANTS } from '../../common/constants';
import { isDataStale } from '../../common/utils';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findByNavigationSlug(navigationSlug: string): Promise<Category[]> {
    return this.categoryModel.find({ navigation_slug: navigationSlug }).sort({ title: 1 }).exec();
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async updateBySlug(slug: string, updateData: Partial<Category>): Promise<Category | null> {
    return this.categoryModel.findOneAndUpdate(
      { slug },
      { ...updateData, last_scraped_at: new Date() },
      { new: true, upsert: true }
    ).exec();
  }

  async isDataStale(slug: string): Promise<boolean> {
    const category = await this.findBySlug(slug);
    return isDataStale(category?.last_scraped_at || null, TTL_CONSTANTS.CATEGORIES);
  }
}
