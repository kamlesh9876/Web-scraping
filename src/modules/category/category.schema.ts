import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  navigation_slug: string;

  @Prop()
  url: string;

  @Prop()
  product_count: number;

  @Prop()
  last_scraped_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
