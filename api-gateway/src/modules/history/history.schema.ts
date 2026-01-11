import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ViewHistory extends Document {
  @Prop({ required: true })
  session_id: string;

  @Prop({ type: Object })
  path_json: any; // list of navigation/category/product paths

  @Prop()
  user_id?: string;
}

export const ViewHistorySchema = SchemaFactory.createForClass(ViewHistory);
