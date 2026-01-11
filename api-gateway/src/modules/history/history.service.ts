import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ViewHistory } from './history.schema';
import { HISTORY_CONSTANTS } from '../../common/constants';
import { v4 as uuidv4 } from 'uuid';

export interface CreateHistoryDto {
  session_id: string;
  path_json: any;
  user_id?: string;
}

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(ViewHistory.name) private historyModel: Model<ViewHistory>,
  ) {}

  async create(historyData: CreateHistoryDto): Promise<ViewHistory> {
    const history = new this.historyModel({
      ...historyData,
      session_id: historyData.session_id || uuidv4(),
    });
    return history.save();
  }

  async findBySessionId(sessionId: string): Promise<ViewHistory[]> {
    return this.historyModel
      .find({ session_id: sessionId })
      .sort({ createdAt: -1 })
      .limit(HISTORY_CONSTANTS.MAX_SESSION_ITEMS)
      .exec();
  }

  async findByUserId(userId: string): Promise<ViewHistory[]> {
    return this.historyModel
      .find({ user_id: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async deleteOldSessions(): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - HISTORY_CONSTANTS.SESSION_EXPIRY_HOURS);
    
    await this.historyModel.deleteMany({
      createdAt: { $lt: cutoffDate }
    }).exec();
  }
}
