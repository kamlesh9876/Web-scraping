import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import { ScraperService } from './scraper.service';
import { QUEUE_NAMES } from '../../common/constants';
import { NavigationService } from '../navigation/navigation.service';

interface ScrapeJobData {
  type: string;
  targetUrl: string;
  targetSlug?: string;
  navigationSlug?: string;
  categorySlug?: string;
}

@Injectable()
export class QueueProcessor implements OnModuleInit {
  private readonly logger = new Logger(QueueProcessor.name);
  private workers: Worker[] = [];

  constructor(
    private readonly scraperService: ScraperService,
    private readonly navigationService: NavigationService,
  ) {}

  async onModuleInit() {
    await this.setupWorkers();
  }

  private async setupWorkers() {
    const navigationWorker = new Worker(QUEUE_NAMES.SCRAPE_NAVIGATION, async (job: Job<ScrapeJobData>) => {
      this.logger.log(`Processing navigation scrape job: ${job.id}`);
      
      try {
        const navigationData = await this.scraperService.scrapeNavigation(job.data.targetUrl);
        
        for (const navItem of navigationData) {
          await this.navigationService.updateBySlug(navItem.slug, navItem);
        }

        this.logger.log(`Navigation scrape completed: ${navigationData.length} items`);
      } catch (error) {
        this.logger.error(`Navigation scrape failed: ${error.message}`);
        throw error;
      }
    });

    this.workers.push(navigationWorker);
  }

  async onModuleDestroy() {
    for (const worker of this.workers) {
      await worker.close();
    }
  }
}