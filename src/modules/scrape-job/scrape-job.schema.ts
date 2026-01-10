import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ScrapeJobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum ScrapeJobType {
  NAVIGATION = 'navigation',
  CATEGORIES = 'categories',
  PRODUCTS = 'products',
  PRODUCT_DETAIL = 'product_detail',
  REVIEWS = 'reviews',
}

@Schema({ timestamps: true })
export class ScrapeJob extends Document {
  @Prop({ required: true, enum: ScrapeJobType })
  type: ScrapeJobType;

  @Prop({ required: true, enum: ScrapeJobStatus, default: ScrapeJobStatus.PENDING })
  status: ScrapeJobStatus;

  @Prop()
  target_url: string;

  @Prop()
  target_slug: string;

  @Prop()
  started_at: Date;

  @Prop()
  completed_at: Date;

  @Prop()
  items_processed: number;

  @Prop()
  total_items: number;

  @Prop()
  error_log: string;

  @Prop()
  retry_count: number;

  @Prop({ default: 0 })
  max_retries: number;
}

export const ScrapeJobSchema = SchemaFactory.createForClass(ScrapeJob);
