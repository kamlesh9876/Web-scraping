import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { ViewHistory, ViewHistorySchema } from './history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ViewHistory.name, schema: ViewHistorySchema }])
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
