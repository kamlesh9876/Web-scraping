import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScrapeJob, ScrapeJobStatus, ScrapeJobType } from './scrape-job.schema';

@Injectable()
export class ScrapeJobService {
  constructor(
    @InjectModel(ScrapeJob.name) private scrapeJobModel: Model<ScrapeJob>,
  ) {}

  async create(jobData: Partial<ScrapeJob>): Promise<ScrapeJob> {
    const job = new this.scrapeJobModel(jobData);
    return job.save();
  }

  async findById(id: string): Promise<ScrapeJob | null> {
    return this.scrapeJobModel.findById(id).exec();
  }

  async updateById(id: string, updateData: Partial<ScrapeJob>): Promise<ScrapeJob | null> {
    return this.scrapeJobModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async findByStatus(status: ScrapeJobStatus): Promise<ScrapeJob[]> {
    return this.scrapeJobModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  async findByType(type: ScrapeJobType): Promise<ScrapeJob[]> {
    return this.scrapeJobModel.find({ type }).sort({ createdAt: -1 }).exec();
  }

  async findRecent(limit = 10): Promise<ScrapeJob[]> {
    return this.scrapeJobModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }
}
