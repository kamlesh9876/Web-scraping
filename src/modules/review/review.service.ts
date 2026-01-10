import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) {}

  async findByProductSourceId(productSourceId: string): Promise<Review[]> {
    return this.reviewModel.find({ product_source_id: productSourceId }).sort({ review_date: -1 }).exec();
  }

  async findBySourceId(sourceId: string): Promise<Review | null> {
    return this.reviewModel.findOne({ source_id: sourceId }).exec();
  }

  async upsertBySourceId(sourceId: string, reviewData: Partial<Review>): Promise<Review> {
    return this.reviewModel.findOneAndUpdate(
      { source_id: sourceId },
      { ...reviewData, last_scraped_at: new Date() },
      { new: true, upsert: true }
    ).exec();
  }
}
