import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
// import { QueueProcessor } from './queue-processor';
import { NavigationModule } from '../navigation/navigation.module';

@Module({
  imports: [NavigationModule],
  providers: [ScraperService /*, QueueProcessor */],
  exports: [ScraperService],
})
export class QueueModule {}
