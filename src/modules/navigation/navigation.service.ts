import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Navigation } from './navigation.schema';
import { TTL_CONSTANTS } from '../../common/constants';
import { isDataStale } from '../../common/utils';

@Injectable()
export class NavigationService {
  constructor(
    @InjectModel(Navigation.name) private navigationModel: Model<Navigation>,
  ) {}

  async findAll(): Promise<Navigation[]> {
    return this.navigationModel.find().sort({ title: 1 }).exec();
  }

  async findBySlug(slug: string): Promise<Navigation | null> {
    return this.navigationModel.findOne({ slug }).exec();
  }

  async create(navigationData: Partial<Navigation>): Promise<Navigation> {
    const navigation = new this.navigationModel(navigationData);
    return navigation.save();
  }

  async updateBySlug(slug: string, updateData: Partial<Navigation>): Promise<Navigation | null> {
    return this.navigationModel.findOneAndUpdate(
      { slug },
      { ...updateData, last_scraped_at: new Date() },
      { new: true, upsert: true }
    ).exec();
  }

  async isDataStale(slug: string): Promise<boolean> {
    const navigation = await this.findBySlug(slug);
    return isDataStale(navigation?.last_scraped_at || null, TTL_CONSTANTS.NAVIGATION);
  }

  async getStaleEntries(): Promise<Navigation[]> {
    const cutoffDate = new Date(Date.now() - TTL_CONSTANTS.NAVIGATION);
    return this.navigationModel.find({
      $or: [
        { last_scraped_at: { $lt: cutoffDate } },
        { last_scraped_at: { $exists: false } }
      ]
    }).exec();
  }
}
