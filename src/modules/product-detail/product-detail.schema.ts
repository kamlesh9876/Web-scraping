import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProductDetail extends Document {
  @Prop({ required: true, unique: true })
  source_id: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  isbn: string;

  @Prop()
  publisher: string;

  @Prop()
  publication_date: Date;

  @Prop()
  description: string;

  @Prop()
  condition: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;

  @Prop()
  image_url: string;

  @Prop()
  source_url: string;

  @Prop()
  last_scraped_at: Date;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
