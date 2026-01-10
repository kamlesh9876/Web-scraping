import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapeJobController } from './scrape-job.controller';
import { ScrapeJobService } from './scrape-job.service';
import { ScrapeJob, ScrapeJobSchema } from './scrape-job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScrapeJob.name, schema: ScrapeJobSchema }])
  ],
  controllers: [ScrapeJobController],
  providers: [ScrapeJobService],
  exports: [ScrapeJobService],
})
export class ScrapeJobModule {}
