import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true, unique: true })
  source_id: string;

  @Prop({ required: true })
  product_source_id: string;

  @Prop()
  reviewer_name: string;

  @Prop()
  rating: number;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  review_date: Date;

  @Prop()
  helpful_count: number;

  @Prop()
  source_url: string;

  @Prop()
  last_scraped_at: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
