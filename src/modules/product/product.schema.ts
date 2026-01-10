import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, unique: true })
  source_id: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;

  @Prop()
  image_url: string;

  @Prop({ unique: true })
  source_url: string;

  @Prop()
  category_slug: string;

  @Prop()
  navigation_slug: string;

  @Prop()
  last_scraped_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
