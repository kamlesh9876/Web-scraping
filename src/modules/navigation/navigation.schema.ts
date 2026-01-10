import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Navigation extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  url: string;

  @Prop()
  last_scraped_at: Date;
}

export const NavigationSchema = SchemaFactory.createForClass(Navigation);
